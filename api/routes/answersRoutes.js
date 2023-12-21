import express from "express";
import {getAnswers, userSubmission} from "../controllers/answersController.js";

const answersRoute = express.Router();

// endpoint to get all the answers for my question
answersRoute.get("/answers/question=:id", getAnswers);

// endpoint to check user submission
answersRoute.get("/userSubmit/question=:questionId/answer=:answerId",userSubmission);

export default answersRoute;
