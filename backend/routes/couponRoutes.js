import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createCoupon, reActivate } from "../controllers/couponController.js";

const couponRouter = Router();

couponRouter.post("/create", authMiddleware, createCoupon);
couponRouter.post("/activate", authMiddleware, reActivate);

export default couponRouter;
