import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SingleProduct from "./pages/SingleProduct";
import { createContext, useEffect, useState } from "react";
import axios from "./axiosConfig";
import Login from "./pages/Login";
import Register from "./components/Register";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProtectedRoute from "./ProtectedRoute";

export const userContext = createContext();
export const cartContext = createContext();

async function fetchData() {
  try {
    const response = await axios.get("/check/me", {
      validateStatus: false,
    });
    return response.status === 200 && response.data.user;
  } catch (error) {
    console.log(error);
  }
}

function App() {
  const [isUserLoggedIn, setIsUserLoggedin] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    async function temp() {
      const response = await fetchData();
      if (response) setIsUserLoggedin(true);
    }
    temp();
  }, []);

  function addToWishlist(productToAdd) {
    setWishlist([...wishlist, productToAdd]);
  }
  function addToCart(productToAdd) {
    setCart([...cart, productToAdd]);
  }

  return (
    <>
      <BrowserRouter>
        <userContext.Provider
          value={{
            isUserLoggedIn,
            setIsUserLoggedin,
          }}
        >
          <cartContext.Provider
            value={{ cart, addToCart, wishlist, addToWishlist }}
          >
            <Header />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/product/:id" element={<SingleProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </cartContext.Provider>
        </userContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
