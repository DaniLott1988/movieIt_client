import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { RegistrationView } from '../registration-view/registration-view'
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavBar } from '../navbar-view/navbar-view';
import './main-view.scss';

import { Row, Col, Container } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
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
    const { movies, user} = this.state;

    if (!user) return (
      <Row>
        <Col>
          <LoginView onLoggedIn= {(user) => this.onLoggedIn(user)} />
        </Col>
      </Row>
    )
      if (movies.lenght === 0) return (
      <div className="main-view" />
      );

    <button onClick={() => { this.onLoggedOut()}}>Logout</button>

    return (
      <Router>
        <NavBar user={user} />
        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
              ))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
            </Col>
          }} />

          <Route path="/profile" render={() => { 
            if (!user) return
              <Col>
                <ProfileView /> 
              </Col>
          }} />

        </Row>
      </Router>
    );
  }
}

export default MainView;