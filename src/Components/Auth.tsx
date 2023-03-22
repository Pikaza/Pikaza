import { response } from "express";
import React from "react";

const Auth = ( props: any ) => {

  const handleGithubClick = async () => {
    console.log('click');
    try {
      const response = await fetch('http://localhost:8080/github/connect', {
        method: 'GET',
        redirect: 'follow'
      });
      const data = await response.json();
      window.location.href=(data);
    } 
    catch (error) {
      console.log(error, 'auth.tsx');
    }
  };
  

  return(
  <div id='auth-container'>
    <h1>PIKAZA</h1>
    <img src='/images/itus.webp' id='splash-logo'/>
      <button id='auth-button' onClick={handleGithubClick}>
        <img src='/images/github-icon.png' className='github-icon'/>
        {'PROVE ITS YOU'}
      </button>
  
  </div>
  )
}

export default Auth;