import './Techs.css';
function Techs() {
    return (
        <section className="section techs">
            <h2 className="section__header">Технологии</h2>
            <div className='techs__content'>
                <h3 className="techs__header">7 технологий</h3>
                <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="techs__list">
                    <li className="techs__list-item hover-button"><a href="https://www.w3schools.com/html/" target={'_blank'} className='link ' rel="noreferrer">HTML</a></li>
                    <li className="techs__list-item hover-button"><a href="https://ru.wikipedia.org/wiki/CSS" target={'_blank'} className='link' rel="noreferrer">CSS</a></li>
                    <li className="techs__list-item hover-button"><a href="https://learn.javascript.ru/" target={'_blank'} className='link' rel="noreferrer">JS</a></li>
                    <li className="techs__list-item hover-button"><a href="https://ru.reactjs.org/" target={'_blank'} className='link ' rel="noreferrer">React</a></li>
                    <li className="techs__list-item hover-button"><a href="https://git-scm.com/" target={'_blank'} className='link' rel="noreferrer">Git</a></li>
                    <li className="techs__list-item hover-button"><a href="https://expressjs.com/ru/" target={'_blank'} className='link ' rel="noreferrer">Express.js</a></li>
                    <li className="techs__list-item hover-button"><a href="https://www.mongodb.com/" target={'_blank'} className='link ' rel="noreferrer">mongoDB</a></li>
                </ul>
            </div>
        </section>
    )
}
export default Techs;