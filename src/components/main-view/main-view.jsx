import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view'
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import './main-view.scss';
import { Row, Col } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: "",
      register: "",
    };
  }

  componentDidMount(){
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

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
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

  onRegistration(register) {
    this.setState({
      register,
    });
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
  
  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return <RegistrationView onRegistration= {register => this.onRegistration(register)} />;

    if (user === "") return <LoginView onLoggedIn= {(user) => this.onLoggedIn(user)} />;

    if (movies.lenght === 0) return <div className="main-view" />;

    return (
    <Row className="main-view justify-content-md-center">
      {selectedMovie
        ? (
          <Col md={8}>
            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          </Col>
        )
        : movies.map(movie => (
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
              </Col>
            ))
      }
    </Row>
    );
  }
}

export default MainView;