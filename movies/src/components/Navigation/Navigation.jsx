import "./Navigation.css"
import { TabletSize } from "../../constants/constants";
import useViewport from "../../hooks/useViewport";
function Navigation({ children, isOpen, handleClick }) {
    const { width } = useViewport();


    const burgerMenu = width < TabletSize;

    return (
        <div className={`nav-div ${isOpen ? 'nav-div_open' : ""}`}><nav className={`nav ${isOpen ? "nav_open" : ""} ${burgerMenu ? "nav_mobile" : "nav_desktop"} `}>
            <button className="nav__close hover-button" type="button" onClick={handleClick} ></button>
            <div className="nav__container">

                {children}

            </div>
        </nav>
        </div>
    )
}
export default Navigation;