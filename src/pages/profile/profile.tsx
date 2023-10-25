import React, { FC, MouseEventHandler } from "react";
import styles from "../profile/profile.module.css";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { logOut } from "../../services/actions/autnUser";
import { useDispatch } from "../../services/hooks";

export const Profile: FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const logOutUser: MouseEventHandler<HTMLAnchorElement> = (): void => {
        dispatch(logOut())
    }

    return (
        <div className={`${styles.content}`}>
            <div className={`${styles.navigation} mr-15`}>
                <NavLink to="/profile" className={`${styles.text} text text_type_main-medium text_color_${location.pathname === "/profile" ? "active" : "inactive"}`}>Профиль</NavLink>
                <NavLink to="orders" className={`${styles.text} text text_type_main-medium text_color_${location.pathname === "/profile/orders" ? "active" : "inactive"}`}>История заказов</NavLink>
                <Link className={`${styles.text} text text_type_main-medium text_color_inactive mb-20`}
                    onClick={logOutUser} to='/login'>Выход</Link>
                <span className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные</span>
            </div>
            <Outlet />
        </div>
    )
}