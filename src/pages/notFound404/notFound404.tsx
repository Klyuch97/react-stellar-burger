import { Link } from 'react-router-dom';
import styles from "./notFound404.module.css"
import { FC } from 'react';

export const NotFound404:FC = () => {
    return (
        <div className={styles.content}>
            < h1 className={styles.text} > Ошибка</ h1 >
            <Link to="/" className={styles.link} >
                <p> Вернуться на главную страницу</p></Link>
            <Link to="/login" className={styles.link} >
                <p> Войти в личный кабинет</p></Link>
        </div>
    )
}