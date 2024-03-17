/* eslint-disable no-unused-vars */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import NoPages from "./views/NoPages";
import Login from "./views/Login";
import Register from "./views/Register";

import Dashboard from "./views/Dashboard";

import Reviews from "./views/Reviews";
import { useEffect } from "react";
import { userAtom } from "./states";
import { useAtom } from "jotai";

export default function Router() {
  const [user, setUser] = useAtom(userAtom);
  useEffect(() => {
    if (localStorage.getItem("user") && localStorage.getItem("token")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={user ? <Dashboard /> : <Login />} />
        {!user ? (
          ((<Route path="login" element={<Login />} />),
          (<Route path="register" element={<Register />} />))
        ) : (
          <></>
        )}
        <Route
          path="dashboard"
          element={user ? <Dashboard /> : <Navigate to="login" />}
        />
        <Route path="*" element={<NoPages />} />
      </Routes>
    </BrowserRouter>
  );
}
