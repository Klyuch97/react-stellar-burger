import React from "react";
import styles from "../login/login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPassword } from "../../services/actions/autnUser";
import { useDispatch } from "react-redux";
import { useUser } from "../../hooks/user";


export const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { mail, setMail } = useUser();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: mail,
        };
        if (mail) {
            dispatch(forgotPassword(userData, () => { navigate('/reset-password') }));
        }
    };

    return (
        <div className={styles.content}>
            <div className={`${styles.data} mb-20`}>
                <h1 className={`${styles.title} mb-6 text text_type_main-medium`}>
                    Восстановление пароля</h1>
                <EmailInput
                    onChange={e => setMail(e.target.value)}
                    value={mail}
                    name={'email'}
                    isIcon={false}
                    extraClass="mb-6"
                    placeholder="Укажите e-mail"
                />
                <Button htmlType="button" type="primary" onClick={handleSubmit}
                    size="medium" extraClass={styles.button} disabled={!mail}>
                    Восстановить
                </Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${styles.text} `}>
                Вспомнили пароль? <Link to='/login' className={styles.spanText}>Войти</Link></p>
        </div>
    )
}