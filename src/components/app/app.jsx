import React from "react";
import styles from "./app.module.css";
import Header from "../header/header";
import { HomePage } from "../../pages/home-page";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from "../../pages/login/login";
import { Register } from "../../pages/register/register";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { Profile } from "../../pages/profile/profile";


function App() {

  return (
    <div className={styles.app}>
      <Header />
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}


export default App;
