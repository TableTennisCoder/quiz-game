import {db} from "../mysqlConnect.js";

// select randomly 15 questions from the db
export const getQuestions = (req, res) => {
  const q = `SELECT * FROM questions 
             ORDER BY RAND()
             LIMIT 15`;

  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }

    return res.json(data);
  });
};
