import './AboutMe.css';
import photo from '../../images/vitaly.png';
function AboutMe() {
    return (
        <section className="section about-me">

            <h2 className="section__header about-me__header">Студент</h2>
            <div className='about-me__content' >
                <h3 className="about-me__name">Оксана</h3>
                <p className="about-me__title">Начинающий фронтенд-разработчик, 37 лет</p>
                <p className="about-me__text"></p>
                <a href="https://github.com/ox7622" target={'_blank'} className="link about-me__github hover-opacity" rel="noreferrer">Github</a>
            </div>
            <img src={photo} alt="фото студента" className="about-me__photo"></img>
        </section>
    )
}
export default AboutMe;