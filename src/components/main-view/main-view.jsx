import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view'
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

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

  onLoggedIn(user) {
    this.setState ({
      user
    });
  }

  onRegistration(register) {
    this.setState({
      register,
    });
  }
  
  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return <RegistrationView onRegistration= {register => this.onRegistration(register)} />;

    if (!user) return <LoginView onLoggedIn= {(user) => this.onLoggedIn(user)} />;

    if (movies.lenght === 0) return <div className="main-view" />;

    return (
    <div className="main-view">
      {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(movie) }}/>
        ))
      }
    </div>
    );
  }
}

export default MainView;