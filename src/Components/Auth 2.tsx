import React from "react";

const Auth = ( props: any ) => {

return(
  <div id='auth-container'>
    <button id='auth-button'>
      <img src='public/images/github-icon.png' className='github-icon'/>
      {'LOG IN WITH GITHUB'}
    </button>
  </div>
)

}

export default Auth;