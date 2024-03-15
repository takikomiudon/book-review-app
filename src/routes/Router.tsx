import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "../pages/Form";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { AuthProvider } from "../hooks/useAuth";
import ProtectedRoute from "./ProtectedRoute";
import BookList from "../pages/BookList";

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route
            path="form"
            element={
              <ProtectedRoute>
                <Form />
              </ProtectedRoute>
            }
          />
          <Route
            path=""
            element={
              <ProtectedRoute>
                <BookList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;