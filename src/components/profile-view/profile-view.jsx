import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import './profile-view.scss';


export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Name: null,
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
          Name: response.data.Name,
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
    const user = localStorage.getItem('user');

    axios.delete(`https://movie-it-1986.herokuapp.com/users/${user}/favorites/${_id}` , {  
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      alert ('Favorite was removed')
      window.location.reload(); 

      

    })
    .catch(function (error) {
      console.log(error);
    })
  }
  deleteUser() {

    const answer = window.confirm("Are you sure you want to delete your account?");
    if (answer) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
        axios.delete( `https://movie-it-1986.herokuapp.com/users/${user}`,
          { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            alert(user + " has been successfully deleted.");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.pathname = "/";
          })
          .catch(function (error) {
              console.log(error);
          })};
          
      }

      handleUpdate(e, newName, newUsername, newPassword, newEmail, newBirth_date) {
        this.setState({
          validated: null,
        });
    
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
          this.setState({
            validated: true,
          });
          return;
        }
        e.preventDefault();
    
        const token = localStorage.getItem('token');
        const Username = localStorage.getItem('user');
    
        axios.put(`https://movie-it-1986.herokuapp.com/users/${Username}`, {
          headers: { Authorization: `Bearer ${token}` },
          data: {
            Name: newName ? newName : this.state.Name,
            Username: newUsername ? newUsername : this.state.Username,
            Password: newPassword ? newPassword : this.state.Password,
            Email: newEmail ? newEmail : this.state.Email,
            Birth_date: newBirth_date ? newBirth_date : this.state.Birth_date,
          },
        })
          .then((response) => {
            alert('Saved Changes');
            this.setState({
              Name: response.data.Name,
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
      setName(input) {
        this.Name = input;
      }
    
      setUsername(input) {
        this.Username = input;
      }
    
      setPassword(input) {
        this.Password = input;
      }
    
      setEmail(input) {
        this.Email = input;
      }
    
      setBirthdate(input) {
        this.Birth_date = input;
      }

   render() {
    const { movies, user, Username, Email, Password, Birth_date, Favorite_Movies } = this.props;

    return(
      <Container className="ProfileView">
        
        <Row className="justify-content-md-center">
          <Card>
            <h1>Favorite Movies</h1>
            <Card.Body>
            {Favorite_Movies.length === 0 && <div className="text-center">Empty</div>}
                <CardDeck className="movie-card-deck"> 
                {Favorite_Movies.length > 0 &&
                    movies.map((movie) => {
                      if (movie._id === Favorite_Movies.find((fav) => fav === movie._id)) {
                        return (
                          <Col lg={4} key={movie._id}>
                            <Card className="favorites-item card-content" >
                              <Card.Img  className="movieCard" variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
                              <Card.Body>
                                <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
                                <Button size='sm' className='profile-button remove-favorite' variant='danger' value={movies.Title} onClick={() => this.removeFavouriteMovie(movie._id)}>Remove</Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        )}                    
                      })
                     }
                </CardDeck>
            </Card.Body>
          </Card>
        </Row>    
                  
        <Row>
          <Col className="acc-btns mt-1">
            <Button size="md" variant="secondary" type="submit" ml="4" onClick={() => this.deleteUser()} >Delete Account</Button>
            </Col>           
        </Row>
         
     </Container>
    )
   }  
}