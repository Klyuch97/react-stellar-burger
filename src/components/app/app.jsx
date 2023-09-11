import React, { useEffect } from "react";
import styles from "./app.module.css";
import Header from "../header/header";
import { HomePage } from "../../pages/home-page";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Login } from "../../pages/login/login";
import { Register } from "../../pages/register/register";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { Profile } from "../../pages/profile/profile";
import { Ingredient } from "../../pages/ingredient/ingredient";
import Modal from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { useDispatch } from 'react-redux';
import { getIngrid } from "../../services/actions/burgerState";
import { checkUserAuth } from "../../services/actions/autnUser";
import { OnlyUnAuth, OnlyAuth } from "../../utils/protected-route";
import { NotFound404 } from "../../pages/notFound404/notFound404";
import { ProfileInfo } from "../profile-info/profile-info";
import { Feed } from "../../pages/feed/feed";
import { WS_CONNECTION_START } from "../../services/actions/web-socket";


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngrid());
    dispatch(checkUserAuth());
    dispatch({ type: WS_CONNECTION_START });
  }, [dispatch]);
  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };
  return (
    <div className={styles.app}>
      <Header />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />} >
          <Route index element={<ProfileInfo />} />
          <Route path="orders" element={<p>История заказов</p>} />
        </Route>
        <Route path="/ingredients/:id" element={<Ingredient />} />
        <Route path="*" element={<NotFound404 />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
      {background && (
        <Routes>
          <Route path='/ingredients/:id'
            element={
              <Modal onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>} />
        </Routes>
      )}
    </div>
  );
}


export default App;
