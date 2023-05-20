import './MovieImage.css';
import {
    memo, useCallback, useState
} from "react";
import { useLocation } from 'react-router-dom';

const MovieImage = memo(({ movie }) => {

    const [video, setVideo] = useState(false);

    const [isClicked, setClicked] = useState(false);

    const location = useLocation();
    const moviesPage = (location.pathname === '/movies');


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


    return (

        <div className={`video video_enabled`} onClick={handleVideo} >
            {video ? <iframe className='video__media' title={movie.nameEN} src={'https://www.youtube.com/embed/' + parseLink(movie.trailerLink) + '?rel=0&showinfo=0&autoplay=1'} allowFullScreen allow='autoplay' /> :
                <><a className="video__link" href={`${isClicked ? '' : movie.trailerLink}`} target='_blank' rel='noreferrer' >
                    <img className='video__media' src={`${moviesPage ? 'https://api.nomoreparties.co' + movie.image.url : movie.imageURL}`}
                        alt={`${moviesPage ? movie.image.alt : movie.nameRU}`} />
                </a>
                    {/* <button className="video__button" aria-label="Запустить видео">
                <svg width="64" height="64" viewBox="0 0 64 64"
                    fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <rect className="video__button-shape" width="64" height="64" rx="64" fill="#ECEBE8" />
                    <path className="video__button-icon" d="M41 31.4999L26.75 39.7272L26.75 31.4999L26.75 23.2727L41 31.4999Z"
                        fill="#242424" />
                </svg></button> */}
                </>}

        </div>
    )

})

export default MovieImage;