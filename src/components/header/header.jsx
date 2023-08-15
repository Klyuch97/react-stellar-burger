import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from '../header/header.module.css'

const Header = () => {
    return (
        <header className={headerStyles.header}>
            <div className={`${headerStyles.content} mt-4 mb-4`}>
                <div className={headerStyles.listItem}>
                    <a href='#' className={`${headerStyles.navigation} ml-5 mr-5`}>
                        <BurgerIcon type="primary" />
                        <p className="pl-2 text text_type_main-default">Конструктор</p>
                    </a>
                    <a href='#' className={`${headerStyles.navigation} ml-5 mr-5`}>
                        <ListIcon type="secondary" />
                        <p className="pl-2 text text_type_main-default text_color_inactive">Лента заказов</p>
                    </a>
                </div>
                <div className={headerStyles.logo}>
                    <Logo></Logo>
                </div>
                <a href='#' className={`${headerStyles.navigation} ml-5 mr-5`}>
                    <ProfileIcon type="secondary" />
                    <p href='#' className="pl-2 text text_type_main-default text_color_inactive">Личный кабинет</p>
                </a>

            </div>
        </header>
    )
}


export default Header;