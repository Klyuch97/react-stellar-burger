import React from "react";
import styles from "../login/login.module.css";
import { PasswordInput,Input,Button } from "@ya.praktikum/react-developer-burger-ui-components";


export const ResetPassword = () => {
    const inputRef = React.useRef(null)
    const [value, setValue] = React.useState('')
    const onChange = e => {
        setValue(e.target.value)
    }
    return (
        <div className={styles.content}>
            <div className={`${styles.data} mb-20`}>
            <h1 className={`${styles.title} mb-6 text text_type_main-medium`}>
                    Восстановление пароля</h1>
                    <PasswordInput
                    onChange={onChange}
                    value={value}
                    name={'password'}
                    extraClass="mb-6"
                    placeholder="Введите новый пароль"
                />
                 <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setValue(e.target.value)}
                    //value={value}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                  <Button htmlType="button" type="primary"
                    size="medium" extraClass={styles.button}>
                    Сохранить
                </Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${styles.text} `}>
                Вспомнили пароль? <span className={styles.spanText}>Войти</span></p>
        </div>

    )

}