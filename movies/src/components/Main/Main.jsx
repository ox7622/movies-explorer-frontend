
import AboutMe from "./AboutMe/AboutMe.jsx";
import AboutProject from "./AboutProject/AboutProject.jsx";
import Portfolio from "./Portfolio/Portfolio.jsx";
import Promo from "./Promo/Promo.jsx";
import Techs from "./Techs/Techs.jsx";
import Header from "../Header/Header.jsx";

function Main({ loggedIn }) {

    return (<>
        <Header loggedIn={loggedIn} />
        <main>
            <Promo></Promo>
            <AboutProject></AboutProject>
            <Techs></Techs>
            <AboutMe></AboutMe>
            <Portfolio></Portfolio>
        </main>
    </>
    )
}
export default Main;