import "./NavButton.css"
import { HashLink as Link } from 'react-router-hash-link';
function NavButton() {
    return (
        <Link to={"#about"} ><button className="nav-button hover-button" type="button" >Узнать больше</button></Link>
    )
}
export default NavButton;