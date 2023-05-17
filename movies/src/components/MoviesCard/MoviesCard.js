import './MoviesCard.css';
import { useCallback, useEffect, useState } from 'react';
import useViewport from '../../hooks/useViewport';
import { useLocation } from 'react-router-dom';



function MoviesCard({ movie, handleLikeClick }) {
    //findVideos();
    const [style, setStyle] = useState({});
    const [video, setVideo] = useState(false);


    const { width } = useViewport();
    const isMobile = width <= 500;

    const location = useLocation();
    const moviesPage = (location.pathname === '/movies');
    let displayProp = '';
    if (!isMobile && !moviesPage) {
        displayProp = "none";
    }

    const [isClicked, setClicked] = useState(false)


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

    const handleVideo = useCallback(() => {
        if (video) {
            setVideo(false);
            setClicked(false);
        } else {
            setVideo(true);
            setClicked(true);
        }

    })

    const parseLink = useCallback((link) => {
        const regex = link.split('v=');
        return regex[1];
    })


    const movieLikeClass = (`movie-card__like ${movie.isLiked && "movie-card__like_active"} hover-button`);



    return (
        <li className='movie-card' onMouseEnter={e => setStyle({ display: "block" })} onMouseLeave={e => setStyle({ display: displayProp })} >

            <div className={`video video_enabled`} onClick={handleVideo} >
                {video ? <iframe className='video__media' title={movie.nameEN} src={'https://www.youtube.com/embed/' + parseLink(movie.trailerLink) + '?rel=0&showinfo=0&autoplay=1'} allowFullScreen allow='autoplay' /> :
                    <><a className="video__link" href={`${isClicked ? '' : movie.trailerLink}`} target='_blank' rel='noreferrer' >
                        <img className='video__media' src={`${moviesPage ? 'https://api.nomoreparties.co' + movie.image.url : movie.imageURL}`}
                            alt={`${moviesPage ? movie.image.alt : movie.nameRU}`} />
                    </a>
                        <button className="video__button" aria-label="Запустить видео">
                            <svg width="64" height="64" viewBox="0 0 64 64"
                                fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <rect className="video__button-shape" width="64" height="64" rx="64" fill="#ECEBE8" />
                                <path className="video__button-icon" d="M41 31.4999L26.75 39.7272L26.75 31.4999L26.75 23.2727L41 31.4999Z"
                                    fill="#242424" />
                            </svg></button></>}

            </div>

            <div className='movie-card__content'>
                <p className='movie-card__title'>{movie.nameRU}</p>
                <p className='movie-card__duration'>{duration(movie.duration)}</p>
                {moviesPage ? <button className={movieLikeClass} style={style} type="button" onClick={handleLike} aria-label="нравится" /> :
                    <button className="movie-card__delete hover-button" style={style} type="button" aria-label="удалить нравится" onClick={handleLike} />}

            </div>
        </li >
    )
}


export default MoviesCard;