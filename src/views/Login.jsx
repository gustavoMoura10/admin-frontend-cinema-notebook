/* eslint-disable no-unused-vars */
import { useState } from "react";
import AxiosHelper from "../config/AxiosHelper";
import "../style/Login.css";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../states";
export default function Login() {
  let navigate = useNavigate();
  const [userLogin, setUserLogin] = useAtom(userAtom);
  const [user, setUser] = useState({
    login: "",
    password: ""
  });
  async function doLogin(e) {
    e.preventDefault();
    const { data } = await AxiosHelper.post("/users/login", user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/dashboard");
    setUserLogin(data.user);
  }
  return (
    <div className="login d-flex flex-column justify-content-center align-items-center">
      <form onSubmit={doLogin}>
        <div className="form-group mt-3">
          <label htmlFor="login">Email/Username</label>
          <input
            onChange={(e) => {
              setUser({
                ...user,
                login: e.target.value
              });
            }}
            type="text"
            className="form-control"
            id="login"
            placeholder="Enter email or username"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => {
              setUser({
                ...user,
                password: e.target.value
              });
            }}
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}
