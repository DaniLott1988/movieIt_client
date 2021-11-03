import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Card } from 'react-bootstrap';

import axios from 'axios';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
  }

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  addFavorite_Movie(_id) {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');

    axios.post(`https://movie-it-1986.herokuapp.com/users/${Username}/movies/${this.props.movie._id}`, {}, {
      headers: {Authorization: `Bearer ${token}` },
    })
    .then(response => {
      alert(`Added to Favorites`)
    })
    .catch(function (error){
      console.log(error);
    });
  };

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className="movie-view justify-content-md-center">
        <Col md={8}>
          <Card className="Card">
            <div className="movie-poster">
              <img src={movie.ImagePath} crossOrigin="anonymous" />
            </div>
          
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>

            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>

            <div className="movie-year">
              <span className="label">Release Year: </span>
              <span className="value">{movie.Release_Year}</span>
            </div>
          
            <div className="movie-genre">
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">Genre: </Button>
              </Link>
              <span className="value">{movie.Genre.Name}</span>
            </div>
          
            <div className="movie-director">
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">Director: </Button>
              </Link>
              <span className="value">{movie.Director.Name}</span>
            </div>
          
            <div className="movie-featured">
              <span className="label">Featured: </span>
              <span className="value">{movie.Featured}</span>
            </div>
          
            <Button variant="secondary" className="favButton" value={movie._id} onClick={(e) => this.addFavorite_Movie(e, movie)}>Add Movie to Favorites</Button>

            <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
        
          </Card>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Release_Year: PropTypes.number.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }), 
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired,
}