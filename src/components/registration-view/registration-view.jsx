import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Birth_date, setBirth_date] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, Birth_date);
    props.onRegistration(Username);
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
                
                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                
              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
    
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};