import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
function MoviesCardList({ cards, AllMovies }) {
    const location = useLocation();
    const moviesPage = (location.pathname === '/movies');
    return (
        <section className='section movie-cards'>
            <ul className='movie-cards__list'>
                {cards.map(item => (<MoviesCard key={item.MovieId} />))}
            </ul>
            {moviesPage &&
                (<button className='movies__more hover-button' type="button" aria-label="еще">Ещё</button>)}
        </section>
    )
}


export default MoviesCardList;