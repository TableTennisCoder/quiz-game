import {useQuery} from "@tanstack/react-query";
import axios from "axios";

// Fetch answers for a question
const fetchAnswersForQuestion = async (questionId) => {
  try {
    const response = await axios.get(
      `http://localhost:8800/api/answers/question=${questionId}`
    );
    const answers = response.data;
    return answers;
  } catch (error) {
    throw error;
  }
};

// Merge them so I have a json which contains question + answers
const fetchQuestionsWithAnswers = async () => {
  try {
    // Fetch random questions
    const response = await axios.get("http://localhost:8800/api/questions/");
    const questions = response.data;

    // Fetch answers for each question
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        const answers = await fetchAnswersForQuestion(question.question_id);

        // return a new object with question and answers
        return {
          ...question,
          answers: answers,
        };
      })
    );

    return questionsWithAnswers;
  } catch (error) {
    throw error;
  }
};

export const useQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: fetchQuestionsWithAnswers,
  });
};
