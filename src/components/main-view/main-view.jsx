import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { RegistrationView } from '../registration-view/registration-view'
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import './main-view.scss';

import { Row, Col, Container } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
      Username: '',
      Password: '',
      Email: '',
      Birth_date: '',
      Favorite_Movies: [],
    };
  }

  getMovies(token) {
    axios.get('https://movie-it-1986.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token} `}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getUser(token) {
    const Username = localStorage.getItem('user');
    axios.get(`https://movie-it-1986.herokuapp.com/users/$(Username)`, {
      headers: { Authorization: `Bearer $(token)` },
    })
    .then((response) => {
      this.setState ({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birth_date: response.data.Birth_date,
        Favorite_Movies: response.data.Favorite_Movies,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState ({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }

    axios.get('https://movie-it-1986.herokuapp.com/movies')
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  onRegistration(register) {
    this.setState({
      register,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
  
  render() {
    const { movies, user, Username, Password, Email, Birth_date, Favorite_Movies} = this.state;

    if (!user) return 
      <Row>
        <Col>
          <LoginView onLoggedIn= {(user) => this.onLoggedIn(user)} />
        </Col>
      </Row>
      if (movies.lenght === 0) return <div className="main-view" />;

    <button onClick={() => { this.onLoggedOut()}}>Logout</button>

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() =>{
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
              ))
          }} />

          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match }) => {
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
            </Col>
          }} />

          <Route path="/director/:name" render={({ match }) => {
            return <Col md={8}>
              <DirectorView genre={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
            </Col>
          }} />

          <Route path="/profile" render={() => { (!user)
            return (
              <Col md={8}>
                <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
              </Col>
            );
            
            if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <ProfileView Username={Username} Password={Password} Email={Email} Birth_date={Birth_date} Favorite_Movies={Favorite_Movies} movies={movies} onBackClick={() => history.goBack()} removeMovie={(_id) => this.removeFromFavorites(_id)} /> 
                </Col>
              )
          }} />

          <Route exact path="/editProfile" render={({ history }) => {
            if (!user)
              return 
                <Col md={6}>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
                
                if (movies.length === 0)return <div className="main-view" />;
                  return <Col md={8}>
                    <Edit Username={Username} Password={Password} Email={Email} Birth_date={Birth_date} onBackClick={() => history.goBack()} />
                </Col>
        }} />
        
        </Row>
      </Router>
    );
  }
}

export default MainView;