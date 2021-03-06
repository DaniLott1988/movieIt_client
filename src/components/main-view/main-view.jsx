import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movie-list';
import { RegisterView } from '../registration-view/registration-view';
import LoginView from '../login-view/login-view';
import MovieView from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import { NavBar } from '../navbar-view/navbar-view';

import './main-view.scss';

import { Row, Col, Container } from 'react-bootstrap';

class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null,
    };
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState ({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
  
  getMovies(token) {
    axios.get('https://movie-it-1986.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
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

  render() {
    const { movies } = this.props;
    const { user } = this.state;

    return (
      <Container>
          <Router>
            <NavBar user={user} />
            
            <Row className="main-view justify-content-md-center">

              <Route exact path="/" render={() => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies}/>;
              }} />
            
              <Route path="/register" render={() => {
                if (user) return <Redirect to="/" />
                return <Col>
                  <RegisterView />
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
          
              <Route exact path='/users/:Username' render={({ history }) => {
                if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
                if (movies.length === 0) return;
                return <ProfileView history={history} movies={movies} />
              }} />

            </Row>
          </Router>
        </Container>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);