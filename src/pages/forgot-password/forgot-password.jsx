import React from "react";
import styles from "../login/login.module.css";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const ForgotPassword = () => {
    const [value, setValue] = React.useState('')
    const onChange = e => {
        setValue(e.target.value)
    }
    return (
        <div className={styles.content}>
            <div className={`${styles.data} mb-20`}>
                <h1 className={`${styles.title} mb-6 text text_type_main-medium`}>
                    Восстановление пароля</h1>
                <EmailInput
                    onChange={onChange}
                    value={value}
                    name={'email'}
                    isIcon={false}
                    extraClass="mb-6"
                    placeholder="Укажите e-mail"
                />
                <Button htmlType="button" type="primary"
                    size="medium" extraClass={styles.button}>
                    Восстановить
                </Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${styles.text} `}>
                Вспомнили пароль? <span className={styles.spanText}>Войти</span></p>
        </div>
    )
}