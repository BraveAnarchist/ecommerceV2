import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import ecomRouter from "./routes/ecomRoutes.js";
import productRouter from "./routes/productRoutes.js";
import couponRouter from "./routes/couponRoutes.js";
import cartRouter from "./routes/couponRoutes.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend origin
  credentials: true, // This allows the server to accept cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // Allowed methods
};

const PORT = process.env.PORT;
const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", ecomRouter);
app.use("/api/product", productRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/cart", cartRouter);
app.use("/api/check", authRouter);

try {
  await mongoose.connect(
    process.env.MONGO_DB_URL
  );
  app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ${PORT}`));
} catch (err) {
  console.log(err);
}
