import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import TabStyles from '../tabs/tabs.module.css';
type TTab = {
    current: string,
    handleTabClick: (currentTab: string) => void
}

const Tabs: FC<TTab> = ({ current, handleTabClick }) => {
    return (
        <div className={`${TabStyles.page} mb-10`}>
            <Tab value="one" active={current === 'one'}
                onClick={(currentTab) => handleTabClick(currentTab)}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'}
                onClick={(currentTab) => handleTabClick(currentTab)}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'}
                onClick={(currentTab) => handleTabClick(currentTab)}>
                Начинки
            </Tab>
        </div>
    )
}

export default Tabs;