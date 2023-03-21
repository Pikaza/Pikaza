// import types for req, res, next
import { Request, Response, NextFunction } from 'express';
// const app: Application = express();
// import db with all dbs
import { db } from '../db.js';
// assign the questions table to Questions
const Questions = db.questions;

// create interface for queries

const questionsController: any = {};

questionsController.getQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('getting the questions');
  try {
    const allQuestions = await Questions.findAll();
    console.log('got the questions');
    res.locals.questions = allQuestions;
    return next();
  } catch (err) {
    console.log('Error in getQuestions middleware', err);
    next({ err });
  }
};

// controller for creating questions
questionsController.createQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('I am creating a new question');
  try {
    const { question_body, company, role, tags } = req.body;
    const questionData = { question_body, company, role, tags };
    const newQuestion = await Questions.create(questionData);
    res.locals.question = newQuestion;
    return next();
  } catch (err) {
    console.log('Error in createQuestions middleware', err);
    next({ err });
  }
};



export default questionsController;
