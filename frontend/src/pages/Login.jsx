/* eslint-disable react/no-unescaped-entities */
import axios from "../axiosConfig";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";

function Login() {
  const searchParams = new URLSearchParams(window.location.search);
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [loginErr, setLoginErr] = useState(null);

  const navigate = useNavigate();

  const { setIsUserLoggedin } = useContext(userContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await axios.post("/user/login", { ...data });
    if (
      response.status === 200 &&
      response.data.message === "Login Successful"
    ) {
      setIsUserLoggedin((prev) => true);
      
      searchParams.has("back_to")
        ? navigate(searchParams.getAll("back_to").join(""))
        : navigate("/");
    } else {
      setLoginErr(true);
    }
  }

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <>
      {loginErr ? <h3>Invalid Credentials</h3> : ""}
      <form action="" method="post" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Login</button>
      </form>

      <Link
        to={
          searchParams.has("back_to")
            ? `/register?back_to=${searchParams.getAll("back_to").join("")}`
            : `/register`
        }
      >
        Don't have an account? Register
      </Link>
    </>
  );
}

export default Login;
