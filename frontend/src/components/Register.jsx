import { useState } from "react";
import axios from "../axiosConfig";
import { Link } from "react-router-dom";

function Register() {
  const searchParams = new URLSearchParams(window.location.search);

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "user",
  });
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/user/register", { ...user });

    if (response.data.message === "success" || response.status === 201)
      setRegistrationStatus(true);
    else setRegistrationStatus(false);
  };

  return (
    <>
      {registrationStatus !== null ? (
        <h3>
          You can
          <Link
            to={
              searchParams.has("back_to")
                ? `/login?back_to=${searchParams.getAll("back_to").join("")}`
                : `/login`
            }
          >
            login
          </Link>
          now
        </h3>
      ) : registrationStatus === false ? (
        <h3>There was some problem. Try back later</h3>
      ) : (
        ""
      )}
      <form action="" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="firstname"
          value={user.firstname}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="Last Name"
          name="lastname"
          value={user.lastname}
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;
