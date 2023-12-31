
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../services/hooks";
import { FC, ReactElement } from "react";

type Protected = {
  onlyUnAuth?: boolean,
  component: ReactElement
}


const Protected: FC<Protected> = ({ onlyUnAuth = false, component }) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.

  const isAuthChecked = useSelector((store) => store.user);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    return null;
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth: FC<Protected> = Protected;
export const OnlyUnAuth: FC<Protected> = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
