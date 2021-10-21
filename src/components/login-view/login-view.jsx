import React, { useState } from 'react';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password);
    props.onLoggedIn(Username);
  };
  return (
    <Container>
      <Row>
        <Col className="justify-content-md-center">
          <CardGroup>
            <Card>
              <Card.Header>Please LogIn:</Card.Header>
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
                
              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}