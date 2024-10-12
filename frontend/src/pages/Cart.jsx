import { useContext, useEffect, useState } from "react";
import { cartContext } from "../App";
import axios from "../axiosConfig";

function Cart() {
  const { cart, setCart } = useContext(cartContext);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartTotal(
      cart
        .map((item) => item.price * item.quantity)
        .reduce((accumulator, current) => {
          return accumulator + current;
        }, 0)
    );
  }, [cart]);

  async function handleCheckout() {
    const userCart = {
      products: [...cart],
      orderBy: USERID,
      cartTotal: cartTotal,
    };

    try {
      const repsonse = await axios.post("/cart/add", userCart);
      console.log(repsonse);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        {cart.length > 0
          ? cart.map((item) => {
              return (
                <div className="" key={item._id}>
                  <img
                    src={item.url ? item.url : "https://placehold.co/200x300"}
                    alt=""
                  />
                  <h4>{item.name}</h4>
                  <p>{item.price}</p>
                </div>
              );
            })
          : ""}
      </div>
      <div className="checkout">
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </>
  );
}

export default Cart;
