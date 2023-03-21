import express, { Router } from 'express';
const githubRouter: Router = express.Router();
// import githubController from '../controllers/githubController.js';
import oAuthController from '../controllers/oAuthController.js';

// import dotenv from 'dotenv';
// dotenv.config();

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

githubRouter.get(
  '/connect',
  oAuthController.login,
  // oAuthController.requestGitHubIdentity,
  (req, res) => {
    console.log('in githubrouter.get, post authcontrolr.login');
    // return res.redirect(res.locals.url);
    res.status(200).json(res.locals.url)
  }
);

// github OAuth route
githubRouter.get(
  '/callback',
  oAuthController.reqIdentity,
  oAuthController.queryWithAccessToken,
  // accountController.createUser,
  // authController.sign,
  // cookieController.setSSIDCookie,
  (req, res) => {
    console.log('after requestGitHUbIdentity & query w/ access token'),
      console.log('res.locals.access_token', res.locals.access_token),
      console.log('final redirect to homepage');
    res.redirect('/');
  }
);












// router.get('/connect', (req, res) => {
//   console.log('in router get connect');
//   try {
//     res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
//   } catch (error) {
//     console.error('in router get connect: ', error);
//   }
// });

// router.post(
//   '/callback', 
//   githubController.callback,
//   (req, res) => {
//     console.log('access token in router.get', res.locals.access_token)
//     res.send('You are authorized').json(res.locals.access_token);
//   }
// );

// router.get(
//   '/success', 
//   githubController.auth2,
//   (req, res) => {
//     res.status(200).json(res.locals.userData);
//   }
// );

export default githubRouter