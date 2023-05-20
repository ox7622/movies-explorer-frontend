import './MoviesCard.css';
import { memo, useCallback, useEffect, useState } from 'react';
import useViewport from '../../hooks/useViewport';
import { useLocation } from 'react-router-dom';
import MovieImage from '../MovieImage/MovieImage';



const MoviesCard = memo(({ movie, handleLikeClick }) => {
    //findVideos();
    const [style, setStyle] = useState({});


    const { width } = useViewport();
    const isMobile = width <= 500;

    const location = useLocation();
    const moviesPage = (location.pathname === '/movies');
    let displayProp = '';
    if (!isMobile && !moviesPage) {
        displayProp = "none";
    }



    useEffect(() => {
        if (isMobile) {
            setStyle({ display: "block" });
        }
        else if (!isMobile && !moviesPage) {
            setStyle({ display: "none" });

        } else if (moviesPage) {
            setStyle({ display: "block" });
        }

    }, [width])


    const handleLike = useCallback(() => {
        handleLikeClick(movie);

    });


    const duration = (num) => {
        let duration = '';

        if (num > 60) {
            const hours = Math.floor(num / 60);
            const min = num - (hours * 60);
            duration = `${hours}ч ${min}м`;
        } else {
            duration = `${num}м`;
        }

        return duration
    }

    const movieLikeClass = (`movie-card__like ${movie.isLiked && "movie-card__like_active"} hover-button`);



    return (
        <li className='movie-card' onMouseEnter={e => setStyle({ display: "block" })} onMouseLeave={e => setStyle({ display: displayProp })} >

            <MovieImage movie={movie} />
            <div className='movie-card__content'>
                <p className='movie-card__title'>{movie.nameRU}</p>
                <p className='movie-card__duration'>{duration(movie.duration)}</p>
                {moviesPage ? <button className={movieLikeClass} style={style} type="button" onClick={handleLike} aria-label="нравится" /> :
                    <button className="movie-card__delete hover-button" style={style} type="button" aria-label="удалить нравится" onClick={handleLike} />}

            </div>
        </li >
    )
})



export default MoviesCard;