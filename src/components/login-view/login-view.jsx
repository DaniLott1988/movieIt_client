import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Card, CardGroup, Container, Col, Row, Stack } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './login-view.scss';

export function LoginView(props) {
  
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://movie-it-1986.herokuapp.com/login', {
      Username: Username,
      Password: Password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };
  return (
    <Container>
      <Row>
        <Col className="justify-content-md-center">
          <CardGroup>
            <Card>
              <Card.Header>Please LogIn:</Card.Header>
              <Stack gap={2} className="col-sm-5 col-md-5 mx-auto">
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" value={Username} required placeholder="Please write here your Username" onChange={e => setUsername(e.target.value)} />
                  </Form.Group>
      
                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={Password} required placeholder="Please write here your password" onChange={e => setPassword(e.target.value)} />
                  </Form.Group>

                  <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>

                    <p className="mt-5">
                      Curious? Go ahead and &nbsp;
                        <Link to="/register" className="btn btn-warning">register</Link>
                        &nbsp; to join today!
                    </p>
                
                </Form>
              </Stack>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (Username, Password) => dispatch(handleSubmit(Username, Password))
});

export default connect(null, mapDispatchToProps)(LoginView);