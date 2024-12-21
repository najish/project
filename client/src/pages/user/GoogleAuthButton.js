import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './GoogleAuthButton.css';
import { useNavigate } from 'react-router-dom';
const GoogleAuthButton = () => {
  const navigate = useNavigate()
  const handleSuccess = (response) => {
    console.log('Login Success:', response);
    navigate('/')
  };

  const handleError = () => {
    console.error('Login Failed');
    navigate('/test')
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="google-button"
          >
            Google
          </button>
        )}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthButton;
