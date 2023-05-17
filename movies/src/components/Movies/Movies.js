import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';


function Movies({ movies,
    moviesLimit,
    onMoviesSearch,
    isSearchDone,
    onShortSwitch,
    checked,
    handleMore,
    input,
    error,
    handleLikeClick,
}) {

    return (<>
        <SearchForm onSubmit={onMoviesSearch}
            onSwitch={onShortSwitch}
            checked={checked}
            error={error}
            input={input}
        />
        <MoviesCardList movies={movies}
            moviesLimit={moviesLimit}
            isSearchDone={isSearchDone}
            handleMore={handleMore}
            handleLikeClick={handleLikeClick}

        />
    </>
    )
}


export default Movies;