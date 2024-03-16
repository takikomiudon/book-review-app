import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "../pages/Form";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { AuthProvider } from "../hooks/useAuth";
import ProtectedRoute from "./ProtectedRoute";
import BookList from "../pages/BookList";
import AuthRedirect from "./AuthRedirect";
import Profile from "../pages/Profile";
import NewBook from "../pages/NewBook";
import BookDetail from "../pages/BookDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="signup" element={<Signup />} />
          <Route
            path="login"
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <NewBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="detail/:id"
            element={
              <ProtectedRoute>
                <BookDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="form"
            element={
              <ProtectedRoute>
                <Form />
              </ProtectedRoute>
            }
          />
          <Route path="" element={<BookList />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
