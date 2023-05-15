import "./Navigation.css"
import { Link } from "react-router-dom";
import useViewport from "../../hooks/useViewport";
function Navigation({ children, isOpen, handleClick }) {
    const { width } = useViewport();


    const burgerMenu = width < 768;
    return (<nav className={`nav ${isOpen ? "nav_open" : ""} ${burgerMenu ? "nav_mobile" : "nav_desktop"} `}>
        <button className="nav__close hover-button" type="button" onClick={handleClick} ></button>
        <div className="nav__container">
            <ul className="nav__links">
                <li className="nav__list-item"><Link to={'/'} onClick={handleClick} className='link nav__link  hover-link hover-opacity'> Главная </Link></li>
                {children}
            </ul>
            <Link to={'/profile'} onClick={handleClick} className="link nav__link nav__link_account hover-button">Аккаунт</Link>
        </div>
    </nav>
    )
}
export default Navigation;