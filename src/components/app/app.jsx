import React from "react";
import styles from "./app.module.css";
import Header from "../header/header";
import { HomePage } from "../../pages/home-page";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <div className={styles.app}>
      <Header />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}


export default App;
