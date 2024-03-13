import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "../pages/Form";
import Login from "../pages/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="form" element={<Form />} />
        <Route path="login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
