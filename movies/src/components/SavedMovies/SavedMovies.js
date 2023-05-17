
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm'
import { useState } from 'react';
function SavedMovies({
    movies,
    moviesLimit,
    savedMovies,
    onMoviesSearch,
    isSearchDone,
    onShortSwitch,
    error,
    handleLikeClick,
}) {



    return (<>
        <SearchForm
            onSubmit={onMoviesSearch}
            onSwitch={onShortSwitch}
            error={error}
        />
        <MoviesCardList
            movies={movies}
            moviesLimit={moviesLimit}
            savedMovies={savedMovies}
            isSearchDone={isSearchDone}
            handleLikeClick={handleLikeClick}
        />

    </>
    )
}

export default SavedMovies;