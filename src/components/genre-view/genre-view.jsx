import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card } from 'react-bootstrap';

 export function GenreView (props)  {
  const { genre } = props; 
  console.log (genre);
  return (
    <Row className="genre-view justify-content-md-center">
      <Col md={8}>
        <Card className="Card">
          
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

        </Card>
      </Col>
    </Row>
)}