import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

let clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.GITHUB_REDIRECT_URI;


interface GitHubData {
  login: string;
  id: number;
}


interface oAuthController {
  login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  reqIdentity: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  queryWithAccessToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const oAuthController: oAuthController= {

  login : async (req, res, next) => {
    try {
      console.log('sending get request to github ');
      // console.log('client id', clientId)
      let redirectStr =
        `https://github.com/login/oauth/authorize?` +
        'client_id=' +
        clientId +
        '&redirect_uri=' +
        redirectUri;
      let redirectURL = new URL(redirectStr);
      res.locals.url = redirectURL;
      // console.log('res.locals', res.locals.url);
      console.log('redirectStr', redirectStr);

      return next();
    } 
    catch(error){ 
      console.log(error, ': oath 41')
      return next({
        log: 'Error occurred in the oauthController.oAuthLogin middleware',
        status: 400, // bad request
        err: {err: 'Error occurred in sending user to login to GitHub to login'}
      });
    }
  },

  reqIdentity : async (req, res, next) => {
    const requestToken = req.query.code
    console.log('inside reqIdentity', requestToken)
    try {
      const response = await fetch(`https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${requestToken}`, {
        method: 'POST',
        headers: {'Accept': 'application/json'},
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code: requestToken
        })
    });
      const data = await response.json();
      res.locals.access_token = data.access_token;
      console.log('req token??', data)
      return next();
  }
  catch (error){
    console.log(error, ': oath 67')
    // return next({
    //   log: `Error occurred in the oauthController.requestGitHubIdentity middleware\n Error: ${error.message}`,
    //   status: 400, // bad request
    //   err: { err: 'Error occurred in getting your Github user identity' }
    // });
  }
},

  queryWithAccessToken : async (req, res, next) => {
    const { access_token } = res.locals
    console.log('inside query with token')
    try{
      const response = await fetch ('https://api.github.com/user', {
        method: 'GET',
        headers: {'Authorization': `Bearer ${access_token}`}
      })
      const data = await response.json();
      const { login, id } = data
      res.locals.user = { username: login, id: id}
      console.log('access token?', res.locals.user)
      return next()
    }
    catch (error) {
      console.log(error, ': oath 90')
      // return next({
      //   log: `Error occurred in the oauthController.queryGitHubAPIWithAccessToken middleware\n Error: ${error.message}`,
      //   status: 400, // bad request
      //   err: { err: 'Error occurred in querying Github API with access token' }
      // });
    }
  }

}
export default oAuthController

