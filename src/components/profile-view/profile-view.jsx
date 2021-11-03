import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import './profile-view.scss';


export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birth_date: null,
      Favorite_Movies: [],
      validated: null,
    };
  }  

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const Username = localStorage.getItem('user');
    axios.get(`https://movie-it-1986.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
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

  removeFavouriteMovie(_id) {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');

    axios
      .delete(`https://movie-it-1986.herokuapp.com/users/${Username}/movies/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Movie was removed from the Favorites');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
    // .then(() => window.location.reload());
  }

  editUser(e) {
    e.preventDefault();

    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://movie-it-1986.herokuapp.com/users/${Username}`, {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birth_date: this.state.Birth_date
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) =>{
      alert('Saved Changes');
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birth_date: response.data.Birth_date,
        });
        localStorage.setItem('user', this.state.Username);
        window.open(`/users/${Username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirth_date(value) {
    this.state.Birth_date = value;
  }

  handleDeleteUser(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');

    axios.delete(`https://movie-it-1986.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open(`/`, '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { Favorite_Movies, validated } = this.state;
    const { movies } = this.props;

    return (

      <Row className="profile-view">
        <Card className="profile-card">
          <h2>Favorites Movies</h2>
          <Card.Body>
            {Favorite_Movies.length === 0 && <div className="text-center">No Favorite Movies Yet</div>}

            <div className="favorites-movies">
              {Favorite_Movies.length > 0 &&
                movies.map((movie) => {
                  if (movie._id === Favorite_Movies.find((favMovie) => favMovie === movie._id)) {
                    return (
                      <Col lg={4} md={4} key={movie._id}>
                        <Card className="favorites-item card-content">
                          <Card.Img  className="movieCard" variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
                          <Card.Body>
                            <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
                            <Button size='sm' className='profile-button remove-favorite' variant='secondary' value={movie.Title} onClick={(e) => this.removeFavouriteMovie(movie._id)}>
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  }
                })}
            </div>
          </Card.Body>

          <h1 className="section">Update Profile</h1>
          <Card.Body>
            <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.Username, this.Password, this.Email, this.Birth_date)}>

              <Form.Group controlId="formBasicUsername">
                <Form.Label className="form-label">Username</Form.Label>
                <Form.Control type="text" placeholder="Change Username" onChange={(e) => this.setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form-label">
                  Password<span className="required">*</span>
                </Form.Label>
                <Form.Control type="password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" placeholder="Change Email" onChange={(e) => this.setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicBirthday">
                <Form.Label className="form-label">Birth_date</Form.Label>
                <Form.Control type="date" placeholder="Change Birth_date" onChange={(e) => this.setBirth_date(e.target.value)} />
              </Form.Group>

              <Button variant='danger' type="submit">
                Update
              </Button>

              <h3>Delete your Account</h3>
              <Card.Body>
                <Button variant='danger' onClick={(e) => this.handleDeleteUser(e)}>
                  Delete Account
                </Button>
              </Card.Body>
            </Form>

          </Card.Body>
        </Card>
      </Row >
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string,
  }),
};