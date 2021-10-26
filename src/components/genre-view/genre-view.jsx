import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

 export function GenreView (props)  {
  const { genre } = props; 
  console.log (genre);
  return (
    <Row className="genre-view justify-content-md-center">
      <Col md={8}>

        <div className="genre-name">
          <span className="label">Name: </span>
          <span className="value">{genre.Name}</span>      
        </div>

        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span>     
        </div>

        <Link to={`/`}>
          <Button className='returnButton' variant='secondary'>Return to Movie List</Button>
        </Link>
      </Col>
    </Row>
)}