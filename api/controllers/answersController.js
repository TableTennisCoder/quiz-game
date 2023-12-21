import {db} from "../mysqlConnect.js";

// sql statement to fetch all the answers for the specific question
export const getAnswers = (req, res) => {
  const questionId = req.params.id;
  const q = "SELECT * FROM answers WHERE question_id = ?";

  db.query(q, [questionId], (err, data) => {
    if (err) {
      return req.json(err);
    }

    return res.json(data);
  });
};

// sql statement to check if user have chosen the rifght answer or not
export const userSubmission = (req, res) => {
  // user params
  const questionId = parseInt(req.params.questionId);
  const userAnswer = parseInt(req.params.answerId);

  // sql query
  const q = `SELECT * FROM correct_answers ca
            INNER JOIN answers a ON ca.answer_id = a.answer_id
            INNER JOIN questions q ON ca.question_id = q.question_id
            WHERE q.question_id = ?`;

  // execute query
  db.query(q, [questionId], (err, dbData) => {
    if (err) {
      return res.json(err);
    }

    // check if user answer was right or not
    const isCorrect = userAnswer === dbData[0].answer_id;

    // merge data from db with user submission data
    const mergedData = {
      ...dbData[0],
      user_submission: userAnswer,
      answered_correctly: isCorrect,
    };
    return res.json(mergedData);
  });
};
