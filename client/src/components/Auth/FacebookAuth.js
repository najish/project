import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookAuth = () => {
  const handleResponse = (response) => {
    console.log('Facebook login success:', response);
    // You can send the access token to your backend for verification
  };

  const handleFailure = (error) => {
    console.error('Facebook login failed:', error);
  };

  return (
    <div>
      <FacebookLogin
        appId="YOUR_FACEBOOK_APP_ID" // Replace with your App ID
        autoLoad={false}
        fields="name,email,picture"
        callback={handleResponse}
        onFailure={handleFailure}
        textButton="Facebook"
        icon="fa-facebook"
      />
    </div>
  );
};

export default FacebookAuth;
