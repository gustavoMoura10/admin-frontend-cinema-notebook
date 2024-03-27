/* eslint-disable no-unused-vars */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import NoPages from "./views/NoPages";
import Login from "./views/Login";
import Register from "./views/Register";

import Dashboard from "./views/Dashboard";

import Reviews from "./views/Reviews";
import { useEffect, useMemo } from "react";
import { userAtom } from "./states";
import { useAtom } from "jotai";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./views/Users";
import AxiosHelper from "./config/AxiosHelper";

export default function Router() {
  const [user, setUser] = useAtom(userAtom);
  useMemo(() => {
    (async () => {
      if (localStorage.getItem("user") && localStorage.getItem("token")) {
        setUser(JSON.parse(localStorage.getItem("user")));
        try {
          const { data } = await AxiosHelper.get("/users/revalidateToken");
          if (data) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(JSON.parse(localStorage.getItem("user")));
          }
        } catch (error) {
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          console.log(error);
        }
      }
    })();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            path="/"
            element={
              user ? <Navigate to="dashboard" /> : <Navigate to="login" />
            }
          />
          <Route
            path="register"
            element={!user ? <Register /> : <Navigate to="/page-not-found" />}
          />
          <Route
            path="login"
            element={!user ? <Login /> : <Navigate to="/page-not-found" />}
          />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute user={user}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NoPages />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
