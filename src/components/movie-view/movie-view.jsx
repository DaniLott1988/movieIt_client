import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './movie-view.scss';

const mapStateToProps = state => {
  const { movies , user} = state;
  return { movies , user};
};

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

export default connect(mapStateToProps)(MovieView);

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Release_Year: PropTypes.number.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }).isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};