import './MoviesCard.css';
import image from '../../images/film-pic.png';
import { useEffect, useState } from 'react';
import useViewport from '../../hooks/useViewport';
import { useLocation } from 'react-router-dom';
function MoviesCard({ likeButton }) {
    const [style, setStyle] = useState({});

    const [isLiked, setLike] = useState(false);
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

    function handleLike() {
        if (isLiked) {
            setLike(false);
        } else {
            setLike(true);
        }
    };

    return (
        <li className='movie-card' onMouseEnter={e => setStyle({ display: "block" })} onMouseLeave={e => setStyle({ display: displayProp })} >
            <img src={image} className='movie-card__image' alt='кадр из фильма' />
            <div className='movie-card__content'>
                <p className='movie-card__title'>33 слова о дизайне</p>
                <p className='movie-card__duration'>1ч 47м</p>
                {moviesPage ? <button className={`movie-card__like ${isLiked && "movie-card__like_active"} hover-button`} style={style} type="button" onClick={handleLike} aria-label="нравится"></button> :
                    <button className="movie-card__delete hover-button" style={style} type="button" aria-label="нравится"></button>}

            </div>
        </li >
    )
}


export default MoviesCard;