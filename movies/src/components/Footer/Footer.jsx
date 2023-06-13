import { useLocation } from 'react-router-dom';
import './Footer.css';
function Footer() {
    const location = useLocation();
    return (<>
        {(location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies') &&
            (<footer className="section footer">
                <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__block">
                    <p className="footer__copyright">&copy; {new Date().getFullYear()} </p>
                    <ul className="footer__links">
                        <li><a href='https://practicum.yandex.ru/profile/web/' target={'_blank'} className=" link footer__link hover-link" rel="noreferrer" >Яндекс.Практикум</a></li>
                        <li><a href='https://github.com/ox7622' target={'_blank'} className="link footer__link hover-link" rel="noreferrer">Github</a></li>
                    </ul>
                </div>
            </footer>)}
    </>
    )
}
export default Footer;