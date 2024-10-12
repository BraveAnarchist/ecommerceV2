import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import axios from "../axiosConfig";

function Header() {
  const { isUserLoggedIn, setIsUserLoggedin } = useContext(userContext);
  const navigate = useNavigate();

  function handleLogout() {
    async function fetchData() {
      const response = await axios.post("/user/logout");
      if (response.status === 200) {
        setIsUserLoggedin(false);
        navigate("/login");
      }
    }
    fetchData();
  }

  return (
    <header className="px-12 py-2 bg-slate-700 text-white flex items-center justify-between">
      <h1 className="text-3xl">
        <Link to="/">Ecommerce</Link>
      </h1>
      <ul className="flex items-center gap-4">
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/wishlist">Wishlist</Link>
        </li>
        <li>
          <Link to="/contact">Contact us</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          {isUserLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
