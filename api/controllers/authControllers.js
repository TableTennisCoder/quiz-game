import { db } from "../mysqlConnect.js";

export const registerUser = (req, res) => {
  res.send("User registered successfully!");
};

export const loginUser = (req, res) => {
  res.send("User signed in successfully!");
};

export const logoutUser = (req, res) => {
  res.send("User logged out successfully!");
};
