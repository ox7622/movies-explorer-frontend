import logo from '../../images/logo.png';
import { useState } from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
function Header({ loggedIn }) {
    const location = useLocation();
    const mainPage = (location.pathname === '/');
    const notFoundPage = (location.pathname === '/404');
    const moviesPage = (location.pathname === '/movies');
    const savedMoviesPage = (location.pathname === '/saved-movies');
    const profilePage = (location.pathname === '/profile');
    const [isNavOpen, setNavOpen] = useState(false);
    function handleNavOpen() {
        setNavOpen(true);
    };

    function handleNavClose() {
        setNavOpen(false);
    };
    return (
        <>
            {(!(notFoundPage || location.pathname === '/signin' || location.pathname === '/signup')) &&
                (<header className={`section header ${mainPage && "header_promo"}`}>
                    <div className='header__block'>
                        <Link to={'/'}><img src={logo} className="header__logo hover-opacity" alt="лого проекта" /></Link>
                        {!mainPage &&
                            (<button className="header__burger-menu hover-opacity hover-button" type='button' onClick={handleNavOpen} />)}
                        <ul className={`header__links ${mainPage ? "" : "header__links_desktop"}`}>
                            {(moviesPage || savedMoviesPage || profilePage || (mainPage && loggedIn)) &&
                                (<><li><Link to={'/movies'} className={`link header__link hover-link hover-opacity ${moviesPage && "link_selected"}`}>Фильмы</Link></li>
                                    <li><Link to={'/saved-movies'} className={`link header__link header__link_saved-films hover-link hover-opacity ${savedMoviesPage && "link_selected"}`}>Сохраненные фильмы</Link></li>
                                    <li><Link to={'/profile'} className={`link header__link  header__link_account hover-button ${profilePage && "link_selected"}`}>Аккаунт</Link></li></>)}
                            {(mainPage && loggedIn === false) &&
                                (<><li><Link to={'/signup'} className="link header__link hover-link hover-opacity">Регистрация</Link></li>
                                    <li><Link to={'/signin'} className="link header__link header__link_signin hover-button">Войти</Link></li></>)}
                        </ul>
                    </div>
                    <Navigation isOpen={isNavOpen} handleClick={handleNavClose}>
                        <li className="nav__list-item"><Link to={'/movies'} onClick={handleNavClose} className={`link nav__link  hover-link hover-opacity ${moviesPage && "link_selected"}`}>Фильмы</Link></li>
                        <li className="nav__list-item"><Link to={'/saved-movies'} onClick={handleNavClose} className={`link nav__link  hover-link hover-opacity ${savedMoviesPage && "link_selected"}`}>Сохраненные фильмы</Link></li>
                    </Navigation>
                </header>)}
        </>
    )
}
export default Header;