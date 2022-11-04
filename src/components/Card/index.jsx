/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

import { routes } from '../../utils/constants';
import Container, { Image } from './styles';
import { TYPES } from './constants';

const Card = ({ movie, onFavorite, onDelete, type }) => {
  const iconFavorite = {
    [TYPES.list]: 'bi-heart-fill',
    [TYPES.favorite]: 'bi-heartbreak-fill',
  }[type];
  const iconDelete = {
    [TYPES.list]: 'bi-trash-fill',
    [TYPES.deletes]: 'bi-check-square-fill'
  }[type];

  return (
    <Container style={{ width: '18rem' }} bg="dark" text="white">
      <Link to={routes.movie.replace(':id', movie.id)} state={movie}>
        <Image
          variant="top"
          src={movie.img}
        />
      </Link>

      <Container.Body className="content">
        <Container.Title>{movie.title}</Container.Title>
        <Container.Text>
          {movie.date}
        </Container.Text>
      </Container.Body>

      <Container.Footer className="footer">
        {type !== TYPES.deletes && <i className={`bi ${iconFavorite} text-danger link`} onClick={() => onFavorite && onFavorite(movie)}></i>}
        {type !== TYPES.favorite && <i className={`bi ${iconDelete} text-secondary link`} onClick={() => onDelete && onDelete(movie)}></i>}
      </Container.Footer>
    </Container>
  )
};

//
// Types
//
Card.propTypes = {
  movie: PropTypes.object,
  onFavorite: PropTypes.func,
  onDelete: PropTypes.func,
  type: PropTypes.string
};

export default Card
