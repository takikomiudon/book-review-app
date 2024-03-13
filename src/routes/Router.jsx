import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "../pages/Form";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
