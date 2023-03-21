import { Request, Response, NextFunction } from 'express';

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

interface GithubController {
  callback: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  // auth2: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
const githubController: GithubController= {

  callback : async (req, res, next) => {
    const requestToken = req.query.code
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
    } catch(error){
        console.log('Error with githubcontroller.auth: ', error)
    }
  },

  // auth2 : async (req, res, next) => {
  //   const { access_token } = res.locals
  //   try{  
  //     const response = await fetch(``, {
  //       method: 'GET',
  //       headers: {'Authorization': 'token ' + access_token}
  //     })
  //     const userData = await response.json()
  //     res.locals.userData = userData
  //   } catch (error){
  //     console.log('error in girthubcontroller auth2: ', error)
  //   }

  // }
}
export default githubController

