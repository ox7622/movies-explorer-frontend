import './MoviesCard.css';
import { memo, useCallback, useEffect, useState } from 'react';
import useViewport from '../../hooks/useViewport';
import MovieImage from '../MovieImage/MovieImage';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLike, deleteLike } from '../../store/moviesSlice';

const MoviesCard = memo(({ movie, handleSetLike, handleDeleteLike,   image, alt }) => {

    const [style, setStyle] = useState({});
    const [isLiked, setIsLiked] = useState(false);

    const location = useLocation();
    const moviesPage = (location.pathname === '/movies');

    const savedMovies =  useSelector(state=> state.movies.savedMovies)

    const dispatch = useDispatch();

    const { width } = useViewport();
    const isMobile = width <= 500;

    let displayProp = '';
    if (!isMobile && !moviesPage) {
        displayProp = "none";
    }

    //  console.log(savedMovies);

    // const savedMovies = window.localStorage.getItem('savedMovies');
    useEffect(() => {
        if (isMobile) {
            setStyle({ display: "block" });
        }
        else if (!isMobile && !moviesPage) {
            setStyle({ display: "none" });

        } else if (moviesPage) {
            setStyle({ display: "block" });
        }

    }, [isMobile, moviesPage, width])



    const handleDelete = useCallback(async (e) => {

        // console.log(movie);
        const findMovie = savedMovies.find((i) => movie.id === i.id);
        console.log(findMovie);
        dispatch(deleteLike(findMovie));
        setIsLiked(false);
    }, [dispatch, movie.id, savedMovies])


    const handleLike = useCallback(async () => {
        //  debugger;
        //  console.log(movie, savedMovies);
        ;
        if (isLiked) {

            handleDelete();
        } else {
            setIsLiked(true);

            dispatch(setLike(movie));
        }

    }, [dispatch, handleDelete, isLiked, movie]);


    const duration = useCallback((num) => {
        let duration = '';

        if (num > 60) {
            const hours = Math.floor(num / 60);
            const min = num - (hours * 60);
            duration = `${hours}ч ${min}м`;
        } else {
            duration = `${num}м`;
        }

        return duration
    }, [])


    useEffect(() => {
        if (moviesPage) {
            if (savedMovies) {
                //   console.log('чекаю лайки', savedMovies, movie.id,)
                //   if (!isLiked) {
                const likeStatus = savedMovies.some(item => item.id === movie.id);
                // console.log(likeStatus);

                if (likeStatus) {
                    setIsLiked(true);
                } else {
                    setIsLiked(false);
                }
            }
        }

    }, [movie.id, moviesPage, savedMovies])


    return (
        <li className='movie-card' onMouseEnter={e => setStyle({ display: "block" })} onMouseLeave={e => setStyle({ display: displayProp })} >
            {/* <a className="movie-card__link" href={movie.trailerLink} target='_blank' rel="noreferrer"  >
                <img className='movie-card__image' src={image} alt={alt} /></a> */}
            <MovieImage movie={movie} />

            <div className='movie-card__content'>
                <p className='movie-card__title'>{movie.nameRU}</p>
                <p className='movie-card__duration'>{duration(movie.duration)}</p>
                {moviesPage ?
                    <button className={`movie-card__like ${isLiked ? "movie-card__like_active" : ""} `} style={style} type="button" onClick={handleLike} aria-label="нравится" />
                    :
                    <button className="movie-card__delete" style={style} type="button" aria-label="удалить нравится" onClick={handleDelete} />}

            </div>
        </li >
    )
})



export default MoviesCard;