import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Routes, Route } from "react-router-dom";

import NavBar from '../../components/NavBar';
import Movies from '../../components/Movies';
import Details from '../../components/Details';
import FormMovie from '../../components/FormMovie';
import Error from '../../components/Error';
import { TYPES } from '../../components/Card/constants';

import { routes } from '../../utils/constants';
import {
  connect,
  createStructuredSelector,
  compose,
  useInjectReducer,
  useInjectSaga,
} from '../../utils/services';
import {
  getGenresRequestAction
} from '../../utils/services/getGenres/actions';
import {
  getMoviesRequestAction,
  getMoviesFavoriteAction,
  getMoviesUnfavoriteAction,
  getMoviesDeleteAction,
  getMoviesUndeleteAction,
  getMoviesAddAction
} from '../../utils/services/getMovies/actions';
import {
  makeDataSelector as makeDataSelectorGenres
} from '../../utils/services/getGenres/selectors';
import {
  makeDataSelector as makeDataSelectorMovies,
  makeFavoritesSelector,
  makeDeletesSelector
} from '../../utils/services/getMovies/selectors';
import {
  makeDataSelector as makeDataSelectorError
} from '../../utils/services/getError/selectors';
import reducerGenres from '../../utils/services/getGenres/reducer';
import reducerMovies from '../../utils/services/getMovies/reducer';
import reducerError from '../../utils/services/getError/reducer';
import sagaGenres from '../../utils/services/getGenres/saga';
import sagaMovies from '../../utils/services/getMovies/saga';

import Container from './styles';

const App = ({
  genres,
  movies,
  favorites,
  deletes,
  error,
  getGenresActionHandler,
  getMoviesActionHandler,
  favoriteMovieActionHandler,
  unfavoriteMovieActionHandler,
  deleteMovieActionHandler,
  restoreMovieActionHandler,
  addMovieActionHandler
}) => {
  useInjectReducer({ key: 'genres', reducer: reducerGenres })
  useInjectSaga({ key: 'genres', saga: sagaGenres })

  useInjectReducer({ key: 'movies', reducer: reducerMovies })
  useInjectSaga({ key: 'movies', saga: sagaMovies })

  useInjectReducer({ key: 'error', reducer: reducerError })

  useEffect(() => {
    getGenresActionHandler()
  }, [])

  return (
    <Container fluid className="d-flex flex-nowrap p-0 main-content bg-secondary">
      <Container.Content>
        <NavBar
          genres={genres}
          onSearch={(e) => getMoviesActionHandler(e)}
        />

        {error && <Error message={error} />}

        <Routes>
          <Route path={routes.addMovie} element={<FormMovie genres={genres.data} onSave={(e) => addMovieActionHandler(e)} />} />
          <Route path={routes.movie} element={<Details />} />
          <Route path={routes.home} element={<Movies
            movies={movies}
            type={TYPES.list}
            onFavorite={(e) => favoriteMovieActionHandler(e)}
            onDelete={(e) => deleteMovieActionHandler(e)}
          />} />
          <Route path={routes.favorites} element={<Movies
            movies={favorites}
            type={TYPES.favorite}
            onFavorite={(e) => unfavoriteMovieActionHandler(e)}
          />} />
          <Route path={routes.deletes} element={<Movies
            movies={deletes}
            type={TYPES.deletes}
            onDelete={(e) => restoreMovieActionHandler(e)}
          />} />
        </Routes>
      </Container.Content>
    </Container>
  )
};

//
// Types
//
App.propTypes = {
  genres: PropTypes.object,
  movies: PropTypes.object,
  favorites: PropTypes.object,
  deletes: PropTypes.object,
  error: PropTypes.string,
  getGenresActionHandler: PropTypes.func,
  getMoviesActionHandler: PropTypes.func,
  favoriteMovieActionHandler: PropTypes.func,
  unfavoriteMovieActionHandler: PropTypes.func,
  deleteMovieActionHandler: PropTypes.func,
  restoreMovieActionHandler: PropTypes.func,
  addMovieActionHandler: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  genres: makeDataSelectorGenres(),
  movies: makeDataSelectorMovies(),
  favorites: makeFavoritesSelector(),
  deletes: makeDeletesSelector(),
  error: makeDataSelectorError()
});

export const mapDispatchToProps = (dispatch) => ({
  getGenresActionHandler: () => dispatch(getGenresRequestAction()),
  getMoviesActionHandler: ({ offset, limit, genreId, title }) => dispatch(getMoviesRequestAction({ offset, limit, genreId, title })),
  favoriteMovieActionHandler: (data) => dispatch(getMoviesFavoriteAction({ data })),
  unfavoriteMovieActionHandler: (data) => dispatch(getMoviesUnfavoriteAction({ data })),
  deleteMovieActionHandler: (data) => dispatch(getMoviesDeleteAction({ data })),
  restoreMovieActionHandler: (data) => dispatch(getMoviesUndeleteAction({ data })),
  addMovieActionHandler: (data) => dispatch(getMoviesAddAction({ data })),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(App);
