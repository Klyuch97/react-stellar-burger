import React from "react";
import styles from "../login/login.module.css";
import { Link } from "react-router-dom";
import { EmailInput, PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

export const Register = () => {

    const inputRef = React.useRef(null)
    const [value, setValue] = React.useState('')
    const onChange = e => {
        setValue(e.target.value)
    }

    return (
        <div className={styles.content}>
            <div className={`${styles.data} mb-20`}>
                <h1 className={`${styles.title} mb-6 text text_type_main-medium`}>Регистрация</h1>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setValue(e.target.value)}
                    //value={value}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
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
                    Зарегистрироваться
                </Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${styles.text} `}>
                Уже зарегистрированы? <Link to='/login' className={styles.spanText}>Войти</Link></p>
        </div>
    )
}