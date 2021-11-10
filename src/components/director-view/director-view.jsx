import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card } from 'react-bootstrap';

 export function DirectorView (props)  {
  const { director } = props; 

  return (
    <Row className="director-view justify-content-md-center">
      <Col md={8}>
        <Card className="Card">
          
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

        </Card>
      </Col>
    </Row>
  );
}