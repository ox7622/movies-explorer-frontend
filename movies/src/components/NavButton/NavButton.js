import "./NavButton.css"
import { Link } from "react-router-dom";
function NavButton() {
    return (
        <Link to={"#about"} ><button className="nav-button hover-button" type="button" onClick={'#about'}>Узнать больше</button></Link>
    )
}
export default NavButton;