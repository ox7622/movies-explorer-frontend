import pic from '../../images/promo-pic.svg'
import "./Promo.css"
import NavButton from "../NavButton/NavButton";
function Promo() {

    return (<>
        <section className="section promo">
            <h1 className="promo__header" >Учебный проект студента факультета Веб-разработки.</h1>
            <NavButton />
            <img src={pic} className="promo__pic" alt="спираль" />
        </section>
    </>
    )
}
export default Promo;