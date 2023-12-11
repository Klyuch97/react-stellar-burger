import styles from "./profile-info.module.css";
import React, { ChangeEvent, FC, ReactHTMLElement, useEffect } from "react";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useUser } from "../../hooks/user";
import { updateUserInfo } from "../../services/actions/autnUser";
import { useDispatch, useSelector } from "../../services/hooks";
import { User } from "../../types/types";

export const ProfileInfo: FC = () => {
    const userData: User | null = useSelector((state) => state.user.user)

    const dispatch = useDispatch();
    const inputRef: React.MutableRefObject<null> = React.useRef(null)
    const { name, mail, password, setName, setMail, setPassword } = useUser();
    useEffect(() => {
        if (userData) {
            setName(userData.name || '');
            setMail(userData.email || '');
        }
    }, [userData, setName, setMail]);
    const CheckData = (): boolean => {
        return name === userData?.name && mail === userData?.email && password === "" ? true : false;
    }

    const cancelChanges = (): void => {
        setName(userData?.name ?? "");
        setMail(userData?.email ?? "");
        setPassword("");
    }

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();

        const userData = {
            email: mail,
            password: password,
            name: name,
        };

        dispatch(updateUserInfo(userData));
    };

    return (
        <div className={styles.inputs}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                icon={'EditIcon'}
                value={name}
                name={'name'}
                error={false}
                ref={inputRef}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMail(e.target.value)}
                value={mail}
                name={'email'}
                placeholder="Логин"
                icon={'EditIcon'}
                extraClass="mb-6"
            />
            <PasswordInput
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                value={password}
                name={'password'}
                icon="EditIcon"
                extraClass="mb-6"
            />
            {CheckData() === true ? '' : <div className={styles.buttons}>
                <Button htmlType="submit" type="primary" size="medium"
                    onClick={handleSubmit}>Сохранить</Button>
                <Button htmlType="button" type="secondary" size="medium"
                    onClick={cancelChanges}
                >Отмена</Button>
            </div>}
        </div>
    )
}