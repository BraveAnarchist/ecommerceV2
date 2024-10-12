import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { addToCart } from "../controllers/cartController";

const cartRouter = Router();

cartRouter.post("/add", authMiddleware, addToCart);
