import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';
function NotFoundPage() {
    let navigate = useNavigate();
    return (<>
        <section className='section not-found-page'>
            <div >
                <h1 className='not-found-page__header'>404</h1>
                <p className='not-found-page__text'>Страница не найдена</p></div>
            <button onClick={(e) => navigate(-1)} type="button" className='not-found-page__button'>Назад</button>
        </section>
    </>
    )

}

export default NotFoundPage;