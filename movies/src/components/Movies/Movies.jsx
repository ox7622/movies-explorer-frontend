import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import './Movies.css';
import Preloader from '../Preloader/Preloader.jsx';
import Header from '../Header/Header.jsx';

const Movies = ({
    movies,
    searchDone,
    handleSetLike,
    handleDeleteLike,
    savedMovies,
    loggedIn,
    isLoading,
    checked,
    input,
    handleSearchMovies,
    handleDurationFilterMovies,
    error
}) => {



    return (<>
        <Header loggedIn={loggedIn} />
        <main>
            <SearchForm onSubmit={handleSearchMovies}
                onSwitch={handleDurationFilterMovies}
                checked={checked}
                input={input}
                moviesPage={true}
                error={error}
            />

            {isLoading ? <Preloader /> : <MoviesCardList
                movies={movies}
                moviesPage={true}
                isSearchDone={searchDone}
                handleSetLike={handleSetLike}
                handleDeleteLike={handleDeleteLike}
                savedMovies={savedMovies}
            />}
        </main>
    </>
    )
}


export default Movies;