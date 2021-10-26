import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Button, Card } from 'react-bootstrap';

export function DirectorView (props)  {
    const { movie } = this.props; 
    console.log (director);
    return (
      <Row className="director-view justify-content-md-center">
        <Col md={8}>
          <Card>
          
            <div className="director-name">
              <span className="label">Name: </span>
              <span className="value">{movie.director.Name}</span>      
            </div>

            <div className="director-bio">
              <span className="label">Bio: </span>
              <span className="value">{movie.director.Bio}</span>     
            </div>

            <div className="director-birth">
              <span className="label">Birth: </span>
              <span className="value">{movie.director.Birth}</span>      
            </div>

            <div className="director-death">
              <span className="label">Death: </span>
              <span className="value">{movie.director.Death}</span>      
            </div>

            <Link to={`/`}>
             <Button className='returnButton' variant='secondary'>Return to Movie List</Button>
            </Link>

          </Card>
        </Col>
      </Row>
    );
  }

DirectorView.PropTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.isRequired,
  }).isRequired
};