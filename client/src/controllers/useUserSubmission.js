import axios from "axios";

export const checkUserSubmission = async (questionId, answerId) => {
  try {
    const response = await axios.get(
      `http://localhost:8800/api/userSubmit/question=${questionId}/answer=${answerId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
