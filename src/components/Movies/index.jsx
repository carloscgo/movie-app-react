import React from 'react';
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap';
import Card from '../Card';

const Movies = ({ movies, onFavorite, onDelete, type }) => {
  return (
    <div className='d-flex flex-column'>
      {movies.loading && (
        <div className='w-100 p-4 mt-3 mb-1 d-flex align-items-center justify-content-center' id='loading'>
          <label
            className="text-white" htmlFor="loading"
          >
            Cargando....
          </label>
        </div>
      )}

      <div className='p-4 d-flex align-items-center justify-content-center w-100'>
        <Row xs={1} md={2} lg={4} className="g-4 d-flex align-items-center justify-content-center p-3">
          {movies.data.map((movie) => (
            <Col key={movie.id} className="d-flex align-items-center justify-content-center">
              <Card movie={movie} onFavorite={onFavorite} onDelete={onDelete} type={type} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
};

//
// Types
//
Movies.propTypes = {
  movies: PropTypes.object,
  onFavorite: PropTypes.func,
  onDelete: PropTypes.func,
  type: PropTypes.string
};

export default Movies;
