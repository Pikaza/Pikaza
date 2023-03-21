import express, { Router } from 'express';
const router: Router = express.Router();
import githubController from '../controllers/githubController.js';
import dotenv from 'dotenv';
dotenv.config();

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

// Implement Oauth
// router.get('/connect', (req, res) => {
//   console.log('in router get connect');
//   // console.log(clientId)
//   res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
// })
router.get('/connect', (req, res) => {
  console.log('in router get connect');
  try {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
  } catch (error) {
    console.error('in router get connect: ', error);
  }
});

router.post(
  '/callback', 
  githubController.callback,
  (req, res) => {
    console.log('access token in router.get', res.locals.access_token)
    res.send('You are authorized').json(res.locals.access_token);
  }
);

// router.get(
//   '/success', 
//   githubController.auth2,
//   (req, res) => {
//     res.status(200).json(res.locals.userData);
//   }
// );

export default router