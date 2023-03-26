import "./AboutProject.css";
function AboutProject() {
    return (
        <section className="section about-project" id="about">
            <h2 className="section__header">О проекте</h2>
            <div className="about-project__articles">
                <article className="about-project__article article">
                    <h3 className="article__title">Дипломный проект включал 5 этапов</h3>
                    <p className="article__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </article>
                <article className="about-project__article article">
                    <h3 className="article__title">На выполнение диплома ушло 5 недель</h3>
                    <p className="article__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </article></div>
            <article className="about-project__timeline">
                <div className="about-project__timeline_1week">1 неделя</div>
                <div className="about-project__timeline_4weeks">4 недели</div>
                <p className="about-project__timeline_block">Back-end</p>
                <p className="about-project__timeline_block">Front-end</p>
            </article>



        </section>
    )
}
export default AboutProject;