import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';


const MoviesCardList = ({ movies, moviesLimit, savedMovies, handleLikeClick, handleMore, isSearchDone }) => {
    const location = useLocation();
    const moviesPage = (location.pathname === '/movies');
    const savedMoviesPage = (location.pathname === '/saved-movies');


    return (
        <section className='section movie-cards'>


            {((isSearchDone > 0 && (movies === undefined || movies.length === 0) && moviesPage) || (savedMoviesPage && (savedMovies === undefined || savedMovies.length === 0)))
                && (<p className=''>Ничего не найдено</p>)}

            {(<>
                {/* <p className=''>Найдено фильмов -  {(savedMoviesPage ? savedMovies.length : movies.length)}</p> */}
                <ul className='movie-cards__list' >
                    {(savedMoviesPage ? savedMovies : moviesLimit).map(item => (<MoviesCard key={`${moviesPage ? item.id : item._id}`} movie={item} handleLikeClick={handleLikeClick} />))}
                </ul></>)}

            {(moviesPage && (movies.length > moviesLimit.length)) &&
                (<button className='movies__more hover-button' type="button" aria-label="еще" onClick={handleMore}>Ещё</button>)}
        </section>
    )
}

export default MoviesCardList;