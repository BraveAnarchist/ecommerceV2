import cartModel from "../models/cartModel.js";
import { productModel } from "../models/productModel.js";
import { userModel } from "../models/userModel.js";

export async function addToCart(req, res) {
  const { cart } = req.body;
  const userID = req.user._id;

  try {
    let products = [];

    const user = await userModel.findById(userID);

    // check if user already have product in cart
    const alreadyExistingCart = await cartModel.findOne({ orderBy: user._id });

    //If found, Delete that
    if (alreadyExistingCart) alreadyExistingCart.remove();

    // Add individual products to an array
    for (let i = 0; i < cart.length; i++) {
      let obj = {};
      obj.product = cart[i]._id;
      obj.count = cart[i].count;

      //Fetch price at runtime
      let fetchPrice = await productModel
        .findById(cart[i]._id)
        .select("price")
        .exec();
      obj.price = fetchPrice.price;
      products.push(obj);
    }

    // Calculate the total price which the user needs to pay
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      totalPrice += products[i].price * products[i].count;
    }

    let newUserCart = new cartModel({
      products,
      totalPrice,
      orderBy: user._id,
    });

    //Save it in the DB
    await newUserCart.save();

    res.json(newUserCart);
  } catch (err) {
    res.json({ error: err.message });
  }
}
