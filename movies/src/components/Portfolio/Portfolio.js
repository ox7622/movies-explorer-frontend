import './Portfolio.css';

function Portfolio() {
    return (
        <section className="section portfolio">

            <h2 className="portfolio__header">Портфолио</h2>
            <ul className='portfolio__list'>
                <li className='portfolio__item'><a href="https://ox7622.github.io/russian-travel/" target={'_blank'} className='portfolio__link hover-button' rel="noreferrer">Статичный сайт<span className='portfolio__item-arrow'>↗</span></a></li>
                <li className='portfolio__item'><a href="http://ox7622.nomoredomains.club/" target={'_blank'} className='portfolio__link hover-button' rel="noreferrer">Адаптивный сайт <span className='portfolio__item-arrow'>↗</span></a></li>
                <li className='portfolio__item'><a href="http://ox7622.nomoredomains.club/" target={'_blank'} className='portfolio__link hover-button' rel="noreferrer">Одностраничное приложение <span className='portfolio__item-arrow'>↗</span></a></li>
            </ul>
        </section>
    )
}
export default Portfolio;