import React from "react";
import styles from "../login/login.module.css";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/user";
import { useDispatch } from "react-redux";
import { registerUser } from "../../services/actions/autnUser";
import { EmailInput, PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

export const Register = () => {


    const inputRef = React.useRef(null)

    const { name, mail, password, setName, setMail, setPassword } = useUser();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email: mail,
            password: password,
            name: name,
        };
        if (mail && password && name) {
            dispatch(registerUser(userData));
        }

    };

    return (
        <div className={styles.content}>

            <form className={`${styles.data} mb-20`} >
                <h2 className={`${styles.title} mb-6 text text_type_main-medium`}>Регистрация</h2>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                    value={name}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <EmailInput
                    onChange={e => setMail(e.target.value)}
                    value={mail}
                    name={'email'}
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <Button htmlType="button" type="primary"
                    size="medium" extraClass={styles.button}
                    onClick={handleSubmit} disabled={!mail || !password || !name}>
                    Зарегистрироваться
                </Button>
            </form>
            <p className={`text text_type_main-default text_color_inactive ${styles.text} `}>
                Уже зарегистрированы? <Link to='/login' className={styles.spanText}>Войти</Link></p>
        </div>
    )
}