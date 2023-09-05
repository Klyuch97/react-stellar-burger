import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from '../header/header.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    return (
        <header className={headerStyles.header}>
            <div className={`${headerStyles.content} mt-4 mb-4`}>
                <div className={headerStyles.listItem}>
                    <Link to="/" className={`${headerStyles.navigation} ml-5 mr-5`}>
                        <BurgerIcon type={location.pathname === "/" ? "primary" : "secondary"} />
                        <p className={`pl-2 text text_type_main-default text_color_${location.pathname === "/" ? "active" : "inactive"}`}
                        >Конструктор</p>
                    </Link>
                    <a href='#' className={`${headerStyles.navigation} ml-5 mr-5`}>
                        <ListIcon type="secondary" />
                        <p className="pl-2 text text_type_main-default text_color_inactive">Лента заказов</p>
                    </a>
                </div>
                <div className={headerStyles.logo}>
                    <Logo></Logo>
                </div>
                <Link to="/profile" className={`${headerStyles.navigation} ml-5 mr-5`}>
                    <ProfileIcon type={location.pathname === "/profile" ? "primary" : "secondary"} />
                    <p className={`pl-2 text text_type_main-default text_color_${location.pathname === "/profile" ? "active" : "inactive"}`}>
                        Личный кабинет</p>
                </Link>

            </div>
        </header>
    )
}


export default Header;