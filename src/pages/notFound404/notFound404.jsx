import { Link } from 'react-router-dom';
import styles from "./notFound404.module.css"

export const NotFound404 = () => {
    return (
        <div className={styles.content}>
            < h1 className={styles.text} > Ошибка</ h1 >
            <Link to="/" className={styles.link} >  Вернуться на главную страницу</Link>
        </div>
    )
}