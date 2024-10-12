import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

export default authRouter;
