import { response } from "express";
import React from "react";

const Auth = ( props: any ) => {

  const handleGithubClick = async() => {
    console.log('click')
    window.location.href = `http://localhost:8080/github/connect`;
  }

  return(
  <div id='auth-container'>
    
      <button id='auth-button' onClick={handleGithubClick}>
        <img src='/images/github-icon.png' className='github-icon'/>
        {'LOG IN WITH GITHUB'}
      </button>
  
  </div>
)

}

export default Auth;