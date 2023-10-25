import styles from "./login.module.css";
import React, { ChangeEvent, FC, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { LogIn } from "../../services/actions/autnUser";
import { useUser } from "../../hooks/user";
import { useDispatch } from "../../services/hooks";

export const Login:FC = () => {
    const { mail, password, setMail, setPassword } = useUser();
    const dispatch = useDispatch();

    const handleSubmit = (e:SyntheticEvent<Element, Event>):void => {
        e.preventDefault();
        const userData = {
            email: mail,
            password: password,
        };
        if (mail && password) {
            dispatch(LogIn(userData));
        }
    };

    return (
        <div className={styles.content}>
            <div className={`${styles.data} mb-20`}>
                <h1 className={`${styles.title} mb-6 text text_type_main-medium`}>Вход</h1>
                <EmailInput
                    onChange={(e:ChangeEvent<HTMLInputElement>) => setMail(e.target.value)}
                    value={mail}
                    name={'email'}
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <Button htmlType="button" type="primary"
                    size="medium" extraClass={styles.button}
                    onClick={handleSubmit} disabled={!mail || !password}>
                    Войти
                </Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${styles.text} `}>
                Вы — новый пользователь? <Link to='/register' className={styles.spanText}>Зарегистрироваться</Link></p>
            <p className={`text text_type_main-default text_color_inactive ${styles.text} `}>
                Забыли пароль? <Link to='/forgot-password' className={styles.spanText}>Восстановить пароль</Link></p>
        </div>
    )
}