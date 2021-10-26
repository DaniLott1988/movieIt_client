import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

 export function DirectorView (props)  {
  const { director } = props; 
  console.log (director);
  return (
    <Row className="director-view justify-content-md-center">
      <Col md={8}>

        <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{director.Name}</span>      
        </div>

        <div className="director-bio">
          <span className="label">Bio: </span>
          <span className="value">{director.Bio}</span>     
        </div>

        <div className="director-birth">
          <span className="label">Birth: </span>
          <span className="value">{director.Birth}</span>      
        </div>

        <div className="director-death">
          <span className="label">Death: </span>
          <span className="value">{director.Death}</span>      
        </div>

        <Link to={`/`}>
          <Button className='returnButton' variant='secondary'>Return to Movie List</Button>
        </Link>
      </Col>
    </Row>
)}