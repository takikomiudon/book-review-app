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
import NewReview from "../pages/NewReview";
import BookDetail from "../pages/BookDetail";
import EditReview from "../pages/EditReview";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
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
                <NewReview />
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
            path="edit/:id"
            element={
              <ProtectedRoute>
                <EditReview />
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
