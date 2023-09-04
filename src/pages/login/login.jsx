import styles from "./login.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const Login = () => {

    const [value, setValue] = React.useState('')
    const onChange = e => {
        setValue(e.target.value)
    }

    return (
        <div className={styles.content}>
            <div className={`${styles.data} mb-20`}>
                <h1 className={`${styles.title} mb-6 text text_type_main-medium`}>Вход</h1>
                <EmailInput
                    onChange={onChange}
                    value={value}
                    name={'email'}
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={onChange}
                    value={value}
                    name={'password'}
                    extraClass="mb-6"
                />
                <Button htmlType="button" type="primary"
                    size="medium" extraClass={styles.button}>
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