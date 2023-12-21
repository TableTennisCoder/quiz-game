import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.post("/logout", logoutUser);

export default authRouter;
