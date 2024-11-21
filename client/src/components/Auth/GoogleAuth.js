import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleAuth = () => {
  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <div className="oauth-container">
      <div className="google-login">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#4285F4',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Google
            </button>
          )}
        />
      </div>
      <div className="facebook-login">facebook</div>
    </div>
  );
};

export default GoogleAuth;
