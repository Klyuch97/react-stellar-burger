import React from "react";
import styles from "../profile/profile.module.css";
import { Link, Outlet } from "react-router-dom";
import { logOut } from "../../services/actions/autnUser";
import { useDispatch } from "react-redux";

export const Profile = () => {
    const dispatch = useDispatch();
    const logOutUser = () => {
        dispatch(logOut())
    }

    return (
        <div className={`${styles.content}`}>
            <div className={`${styles.navigation} mr-15`}>
                <p className={`${styles.text} text text_type_main-medium`}>Профиль</p>
                <p className={`${styles.text} text text_type_main-medium text_color_inactive`}>История заказов</p>
                <Link className={`${styles.text} text text_type_main-medium text_color_inactive mb-20`}
                    onClick={logOutUser}>Выход</Link>
                <span className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные</span>
            </div>
            <Outlet />
        </div>
    )
}