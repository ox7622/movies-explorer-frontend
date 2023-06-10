import logo from '../../images/logo.png';
import { useState } from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
function Header({ loggedIn }) {
    const location = useLocation();
    const mainPage = (location.pathname === '/');
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
            <header className={`section header ${mainPage && "header_promo"}`}>
                <div className='header__block'>
                    <Link to={'/'}><img src={logo} className="header__logo hover-opacity" alt="лого проекта" /></Link>

                    <button className="header__burger-menu hover-opacity hover-button" type='button' onClick={handleNavOpen} />
                    <ul className={"header__links header__links_desktop"}>
                        {loggedIn ?
                            (<><li><Link to={'/movies'} className={`link header__link hover-link hover-opacity ${moviesPage && "link_selected"}`}>Фильмы</Link></li>
                                <li><Link to={'/saved-movies'} className={`link header__link header__link_saved-films hover-link hover-opacity ${savedMoviesPage && "link_selected"}`}>Сохраненные фильмы</Link></li>
                                <li><Link to={'/profile'} className={`link header__link  header__link_account hover-button ${profilePage && "link_selected"}`}>Аккаунт</Link></li></>)
                            :
                            (<><li><Link to={'/signup'} className="link header__link hover-link hover-opacity">Регистрация</Link></li>
                                <li><Link to={'/signin'} className="link header__link header__link_signin hover-button">Войти</Link></li></>)}
                    </ul>
                </div>
                <Navigation isOpen={isNavOpen} handleClick={handleNavClose}>
                    {!loggedIn ?
                        <ul className="nav__links">
                            <li className="nav__list-item"><Link to={'/'} onClick={handleNavClose} className='link nav__link  hover-link hover-opacity'> Главная </Link></li>
                            <li className="nav__list-item"><Link to={'/signup'} className='link nav__link hover-link hover-opacity'>Регистрация</Link></li>
                            <li className="nav__list-item"><Link to={'/signin'} className='link nav__link hover-link hover-opacity'>Войти</Link></li>
                        </ul>
                        : <><ul className="nav__links">
                            <li className="nav__list-item"><Link to={'/'} onClick={handleNavClose} className='link nav__link  hover-link hover-opacity'> Главная </Link></li>
                            <li className="nav__list-item"><Link to={'/movies'} onClick={handleNavClose} className={`link nav__link  hover-link hover-opacity ${moviesPage && "link_selected"}`}>Фильмы</Link></li>
                            <li className="nav__list-item"><Link to={'/saved-movies'} onClick={handleNavClose} className={`link nav__link  hover-link hover-opacity ${savedMoviesPage && "link_selected"}`}>Сохраненные фильмы</Link></li>
                        </ul>
                            <Link to={'/profile'} onClick={handleNavClose} className="link nav__link nav__link_account hover-button">Аккаунт</Link></>
                    }
                </Navigation>
            </header>
        </>
    )
}
export default Header;