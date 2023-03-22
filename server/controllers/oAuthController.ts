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
  queryForOrgs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
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
      // console.log('redirectStr', redirectStr);
      return next();
    } 
    catch(error){ 
      return next({
        log: 'Error occurred redirecting user to github',
        status: 400, 
        err: {err: 'Error occurred redirecting to Github'}
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
      console.log('req token: ', data)
      return next();
  }
  catch(error){ 
    return next({
      log: 'Error occurred authenticating via github',
      status: 400, 
      err: {err: 'Error occurred authenticating user'}
    });
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
      const { login, id, organizations_url } = data
      res.locals.user = { username: login, id: id}
      console.log('user', res.locals.user)
      console.log('organizations url', organizations_url)
      res.locals.orgsUrl = organizations_url
      return next()
    }
    catch(error){ 
      return next({
        log: 'Error occurred query w acces token middleware',
        status: 400,
        err: {err: 'Error occurred using access token'}
      });
    }
  },
  queryForOrgs : async (req, res, next) => {
    const { orgsUrl, access_token } = res.locals
    // const dummyURL = 'https://api.github.com/users/Chanduh/forks'
    try{
      const response = await fetch(`${orgsUrl}`, {
        headers: {'Authorization': `token ${access_token}`}
      })
      const data = await response.json()
      console.log('user oganizations', data)

      if (!data.includes('codesmith') || !data.includes('Codesmith')){
        res.locals.codesmith = false;
      }
      else res.locals.codesmith = true;
    
    }
    catch(error){ 
      return next({
        log: 'Error occurred in query for orgs middleware',
        status: 400, 
        err: {err: 'Error occurred authenticating organization'}
      });
    }
    return next();
  }

}
export default oAuthController

