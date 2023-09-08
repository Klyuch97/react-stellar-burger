import React, { useEffect } from "react";
import styles from "../login/login.module.css";
import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useUser } from "../../hooks/user";
import { resetPassword } from "../../services/actions/autnUser";
import { useDispatch } from "react-redux";


export const ResetPassword = () => {

    const inputRef = React.useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { newPassword, setNewPassword, codeMail, setCodeMail } = useUser();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(newPassword, codeMail, () => { navigate('/login') }));

    };

    if (!localStorage.getItem('resetPasswordFlag')) {
        return <Navigate to="/login" />;
    }

    return (
        <div className={styles.content}>
            <div className={`${styles.data} mb-20`}>
                <h1 className={`${styles.title} mb-6 text text_type_main-medium`}>
                    Восстановление пароля</h1>
                <PasswordInput
                    onChange={e => setNewPassword(e.target.value)}
                    value={newPassword}
                    name={'password'}
                    extraClass="mb-6"
                    placeholder="Введите новый пароль"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setCodeMail(e.target.value)}
                    value={codeMail}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button htmlType="button" type="primary" onClick={handleSubmit}
                    size="medium" extraClass={styles.button} disabled={!newPassword || !codeMail}>
                    Сохранить
                </Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${styles.text} `}>
                Вспомнили пароль? <Link to="/login" className={styles.spanText}>Войти</Link></p>
        </div>

    )

}