import cartModel from "../models/cartModel.js";
import { productModel } from "../models/productModel.js";
import { userModel } from "../models/userModel.js";

export async function addToCart(req, res) {
  const { cart } = req.body;
  const userID = req.user._id;

  try {
    let products = [];

    const user = await userModel.findById(userID);


    const alreadyExistingCart = await cartModel.findOne({ orderBy: user._id });

   
    if (alreadyExistingCart) alreadyExistingCart.remove();


    for (let i = 0; i < cart.length; i++) {
      let obj = {};
      obj.product = cart[i]._id;
      obj.count = cart[i].count;

  
      let fetchPrice = await productModel
        .findById(cart[i]._id)
        .select("price")
        .exec();
      obj.price = fetchPrice.price;
      products.push(obj);
    }


    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      totalPrice += products[i].price * products[i].count;
    }

    let newUserCart = new cartModel({
      products,
      totalPrice,
      orderBy: user._id,
    });

    
    await newUserCart.save();

    res.json(newUserCart);
  } catch (err) {
    res.json({ error: err.message });
  }
}
