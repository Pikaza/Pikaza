import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
// import test from './test';
import githubRouter from './routes/githubRouter.js';
import questionsController from './controllers/questionsController.js';
// test();

const router: Router = express.Router();
const app: Application = express();
const PORT: number = 8080;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use('/github', githubRouter)


app.get(
  '/',
  questionsController.getQuestions,
  (req: Request, res: Response) => {
    res.status(200).send(res.locals.questions);
  }
);
app.post(
  '/',
  questionsController.createQuestion,
  (req: Request, res: Response) => {
    res.status(201).send(res.locals.question);
  }
);
app.patch(
  '/',
  questionsController.updateQuestion,
  (req: Request, res: Response) => {
    res.status(200).send(res.locals.question);
  }
);

//Define the error object type to use
type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

// global err handler
app.use(
  (
    err: ServerError,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response => {
    const defaultErr: ServerError = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = { defaultErr, ...err };
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  }
);


//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));

export default app;
