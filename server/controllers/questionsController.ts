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
questionsController.createQuestion = async (
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

// controller for creating questions
questionsController.updateQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('I am updating a question');
  try {
    const { question_body, company, role, tags } = req.body;
    const questionRequest = req.body;
    const questionInDB = await Questions.findOne({
      where: { question_body: question_body },
    });
    
    // checks if question in DB already has company
    if (!questionInDB.company.includes(company[0])) {
      const newCompanies = [...questionInDB.company, company[0]];
      await Questions.update(
        { company: newCompanies },
        {
          where: { question_body: question_body },
        }
      );
    }

    // checks if question in DB already has role
    if (!questionInDB.role.includes(role[0])) {
      const newRoles = [...questionInDB.role, role[0]];
      await Questions.update(
        { role: newRoles },
        {
          where: { question_body: question_body },
        }
      );
    }

    // checks if question in DB already has tags
    for (const tag of tags) {
      if (!questionInDB.tags.includes(tag)) {
        const newTags = [...questionInDB.tags, tag];
        await Questions.update(
          { tags: newTags },
          {
            where: { question_body: question_body },
          }
        );
      }
    }
    res.locals.question = await Questions.findOne({
      where: { question_body: question_body },
    });
    const newFreq = questionInDB.frequency + 1;
    await Questions.update(
      { frequency: newFreq },
      {
        where: { question_body: question_body },
      }
    );
    return next();
  } catch (err) {
    console.log('Error in updateQuestion middleware', err);
    next({ err });
  }
};

export default questionsController;
