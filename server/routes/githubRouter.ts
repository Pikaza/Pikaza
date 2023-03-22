import express, { Router } from 'express';
const githubRouter: Router = express.Router();
import oAuthController from '../controllers/oAuthController.js';

githubRouter.get(
  '/connect',
  oAuthController.login,
  (req, res) => {
    res.status(200).json(res.locals.url)
  }
);


githubRouter.get(
  '/callback',
  oAuthController.reqIdentity,
  oAuthController.queryWithAccessToken,
  oAuthController.queryForOrgs,
  // create user in database? why?
  (req, res) => {
    console.log('Oauth successful')
    res.redirect(`http://localhost:5173/home/${res.locals.user.username}`);
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