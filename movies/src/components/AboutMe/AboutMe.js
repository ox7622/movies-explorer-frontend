import './AboutMe.css';
import photo from '../../images/vitaly.png';
function AboutMe() {
    return (
        <section className="section about-me">

            <h2 className="section__header about-me__header">Студент</h2>
            <div className='about-me__content' >
                <h3 className="about-me__name">Виталий</h3>
                <p className="about-me__title">Фронтенд-разработчик, 30 лет</p>
                <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                <a href="https://github.com/ox7622" target={'_blank'} className="link about-me__github hover-opacity" rel="noreferrer">Github</a>
            </div>
            <img src={photo} alt="фото студента" className="about-me__photo"></img>
        </section>
    )
}
export default AboutMe;