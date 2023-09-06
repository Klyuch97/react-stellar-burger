import React, { useEffect } from "react";
import styles from "../profile/profile.module.css";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";

export const Profile = () => {
    const userData = useSelector((state) => state.user.user)
 // console.log(userData);
    const dispatch = useDispatch();
    useEffect(() => {
       
    }, [dispatch]);
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
                    value={userData? userData.name:""}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    //onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    onChange={onChange}
                    value={userData? userData.email:""}
                    name={'email'}
                    placeholder="Логин"
                    icon={'EditIcon'}
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