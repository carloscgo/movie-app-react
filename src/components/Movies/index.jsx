import React from 'react';
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { Col, Row } from 'react-bootstrap';
import Card from '../Card';

const Movies = ({ movies, onFavorite, onDelete, type }) => {
  const heigth = isEmpty(movies.data) ? 'h-100' : ''

  return (
    <div className={`d-flex flex-column ${heigth}`}>
      {movies.loading && (
        <div className='w-100 p-4 mt-3 mb-1 d-flex align-items-center justify-content-center' id='loading'>
          <label
            className="text-white" htmlFor="loading"
          >
            Cargando....
          </label>
        </div>
      )}

      <div className={`p-4 d-flex align-items-center justify-content-center w-100 ${heigth}`}>
        {!isEmpty(movies.data) && (
          <Row xs={1} md={2} lg={4} className="g-4 d-flex align-items-center justify-content-center p-3">
            {movies.data.map((movie) => (
              <Col key={movie.id} className="d-flex align-items-center justify-content-center">
                <Card movie={movie} onFavorite={onFavorite} onDelete={onDelete} type={type} />
              </Col>
            ))}
          </Row>
        )}

        {isEmpty(movies.data) && (
          <div className='d-flex align-items-center justify-content-center w-100 h-100 text-center p-4 m-4'>
            <h2 className='display-1 text-white'>
              Encuentra tus peliculas preferidas.
            </h2>
          </div>
        )}
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
