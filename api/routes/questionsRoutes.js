import express from "express";
import { getQuestions } from "../controllers/questionController.js";

const questionsRoutes = express.Router();

questionsRoutes.get("/questions", getQuestions)

export default questionsRoutes;