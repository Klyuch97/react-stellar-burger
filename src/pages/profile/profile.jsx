import React from "react";
import styles from "../profile/profile.module.css";
import { Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

export const Profile = () => {
    const [value, setValue] = React.useState('')
    const inputRef = React.useRef(null)
    const onChange = e => {
        setValue(e.target.value)
    }
    return (
        <div className={`${styles.content}`}>
            <div className={`${styles.navigation} mr-15`}>
                <p className={`${styles.text} text text_type_main-medium`}>Профиль</p>
                <p className={`${styles.text} text text_type_main-medium text_color_inactive`}>История заказов</p>
                <p className={`${styles.text} text text_type_main-medium text_color_inactive mb-20`}>Выход</p>
                <span className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные</span>
            </div>
            <div className={styles.inputs}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setValue(e.target.value)}
                    icon={'EditIcon'}
                    value={value}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    //onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <EmailInput
                    onChange={onChange}
                    value={value}
                    name={'email'}
                    placeholder="Логин"
                    isIcon={true}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={onChange}
                    value={value}
                    name={'password'}
                    icon="EditIcon"
                />
            </div>
        </div>
    )
}