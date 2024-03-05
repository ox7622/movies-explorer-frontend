import './MoviesCardList.css';
import { useEffect, useState, useCallback } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import useViewport from '../../hooks/useViewport';
import * as num from '../../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, searchMovies } from '../../store/moviesSlice.js';
import { useLocation } from 'react-router-dom';

const MoviesCardList = ({ handleSetLike, handleDeleteLike,  }) => {

    const movies = useSelector(state => state.movies.movies) || [];
    const savedMovies =  useSelector(state => state.movies.savedMovies) || []
    const isSearchDone = useSelector(state => state.movies.searchDone)
    const dispatch = useDispatch()

    const { width } = useViewport();
    const [cardLimit, setCardLimit] = useState(0);
    const location = useLocation();
    const moviesPage = (location.pathname === '/movies');


    useEffect(() => {

        const timeout = setTimeout(setCardLimit(), 2000);
        return clearTimeout(timeout);

    }, [width])

    useEffect(() => {

        if (width >= num.WideScreenSize) {
            setCardLimit(num.ThreeColumnsLayout);
        } else if (width < num.WideScreenSize && width > num.TabletSize) {

            setCardLimit(num.TwoColumnsLayout);

        } else {
            setCardLimit(num.OneColumnLayout);
        }

    }, [width]);


    const handleMore = useCallback(() => {
        let limit;
        if (width >= num.WideScreenSize) {
            limit = num.AddCardsWide;
        } else if (width < num.WideScreenSize && width > num.TabletSize) {
            limit = num.AddCardTablet;
        } else {
            limit = num.AddCardMob;
        }
        setCardLimit(cardLimit + limit);

    }, [cardLimit, width]);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch])


    return (
        <section className='section movie-cards'>


            {(isSearchDone > 0 && (movies === undefined || movies.length === 0))
                && (<p className=''>Ничего не найдено</p>)}

            {movies.length > 0 && <p className=''>Найдено фильмов -  {movies.length}</p>}

            <ul className='movie-cards__list' >
                {moviesPage ?
                    (movies.slice(0, cardLimit).map(item =>
                        <MoviesCard
                            key={item.id}
                            movie={item}
                            alt={item.image.alt}
                            image={`https://api.nomoreparties.co/${item.image.url}`}
                        //   handleSetLike={handleSetLike}
                        // handleDeleteLike={handleDeleteLike}
                        // savedMovies={savedMovies}
                        //moviesPage={moviesPage}
                        />))
                    : (savedMovies.map(item =>
                        <MoviesCard
                            key={item.id}
                            movie={item}
                            alt={item.nameRU}
                            image={item.imageURL}
                           // handleDeleteLike={handleDeleteLike}
                        //moviesPage={moviesPage}
                        />))
                }
            </ul>
            {(moviesPage && (movies.length > cardLimit)) &&
                (<button className='movies__more hover-button' type="button" aria-label="еще" onClick={handleMore}>Ещё</button>)}
        </section>
    )
}

export default MoviesCardList;