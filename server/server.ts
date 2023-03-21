import path from 'path';
import express from 'express';
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import githubRouter from './routes/githubRouter';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());




app.use('/github', githubRouter)