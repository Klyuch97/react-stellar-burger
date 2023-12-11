import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from '../header/header.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';

const Header = () => {
    const location = useLocation();
    const isActive: boolean = location.pathname === "/profile" || location.pathname === "/profile/orders";
    const isActiveLenta: boolean = location.pathname === "/feed";
    const { user } = useSelector(state => state.user);

    return (
        <header className={headerStyles.header}>
            <div className={`${headerStyles.content} mt-4 mb-4`}>
                <div className={headerStyles.listItem}>
                    <Link to="/" className={`${headerStyles.navigation} ml-5 mr-5`}>
                        <BurgerIcon type={location.pathname === "/" ? "primary" : "secondary"} />
                        <p className={`pl-2 text text_type_main-default text_color_${location.pathname === "/" ? "active" : "inactive"}`}
                        >Конструктор</p>
                    </Link>
                    <Link to="/feed" className={`${headerStyles.navigation} ml-5 mr-5`}>
                        <ListIcon type={isActiveLenta ? "primary" : "secondary"} />
                        <p className={`pl-2 text text_type_main-default text_color_${isActiveLenta ? "active" : "inactive"}`}>
                            Лента заказов</p>
                    </Link>
                </div>
                <div className={headerStyles.logo}>
                    <Logo></Logo>
                </div>
                <Link to="/profile" className={`${headerStyles.navigation} ml-5 mr-5`}>
                    <ProfileIcon type={isActive ? "primary" : "secondary"} />
                    {user === null ? <p className={`pl-2 text text_type_main-default text_color_inactive`}>
                        Личный кабинет</p> : <p className={`pl-2 text text_type_main-default text_color_active ${headerStyles.activeUser}`}>
                        {user.name}</p>}
                </Link>

            </div>
        </header>
    )
}


export default Header;