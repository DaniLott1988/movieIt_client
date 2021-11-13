import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import './movie-card.scss';

const mapStateToProps = state => {
  const {user} = state;
  return {user};
};

function MovieCard(props){

  const {movie, user} = props;
  let favorite = false;
  if(Object.keys(user).indexOf("Favorite_Movies") > -1){
    if(user.Favorite_Movies.includes(movie._id)){
      favorite = true;
    }
  }

  return (
    <Container>
      <Card className="Card">
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`} >
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default connect(mapStateToProps)(MovieCard);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    }).isRequired,
};