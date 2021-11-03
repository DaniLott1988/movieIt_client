import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './registration-view.scss';

export function RegistrationView(props) {

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Birth_date, setBirth_date] = useState("");

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [birth_dateError, setBirth_dateError] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    if (setisValid) {
      axios.post('https://movie-it-1986.herokuapp.com/users', {
        Username: Username,
        Password: Password,
        Email: Email,
        Birth_date: Birth_date
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', 'self');
      })
      .catch(e => {
        console.log('There was an error when registering the user.')
      });
    };
  }
    

  const formValidation = () => {
    let usernameError = {}
    let passwordError = {}
    let emailError = {}
    let birth_dateError = {}
    let isValid = true;

    if (Username.trim().length < 5) {
      usernameError = "Username must only be of alphanumeric characters."
      isValid = false;
    }

    if (Password.trim().length < 9) {
      passwordError = "Password must have a minimum of 9 characters."
      isValid = false;
    }

    if (Email.includes("@") ) {
      emailError = "Please enter a valid email address."
      isValid = false;
    }

    if (Birth_date === '' ) {
      birth_dateError = "Please enter your date of Birth."
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    return isValid;

  }

  return (
    <Container>
      <Row>
        <Col className="justify-content-md-center">
          <CardGroup>
            <Card>
              <Card.Header>Please Register:</Card.Header>
              <Form>
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" value={Username} required placeholder="Please write here your Username" onChange={e => setUsername(e.target.value)} />
                </Form.Group>
      
                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" value={Password} required placeholder="Please write here your password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                
                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" value={Email} required placeholder="Please write here your Email" onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                
                <Form.Group>
                  <Form.Label>Birth_date:</Form.Label>
                  <Form.Control type="date" value={Birth_date} required placeholder="Please write here your Birth_date" onChange={e => setBirth_date(e.target.value)} />
                </Form.Group>
                
                <span>
                  <Button type="submit" onClick={handleSubmit}>Submit</Button>
                    {' '}
                    <Link to="/">
                    <Button variant="secondary" type="button">Back</Button>
                    </Link>
                </span>
                
              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
    
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }).isRequired
};