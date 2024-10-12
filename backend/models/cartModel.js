import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        price: Number,
        count: Number,
        attributes: [
          {
            type: String,
            value: String,
          },
        ],
      },
    ],
    orderBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    cartTotal: Number,
  },
  { timestamps: true }
);
const cartModel = model("Cart", cartSchema);

export default cartModel;
