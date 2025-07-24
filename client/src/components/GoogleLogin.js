import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleLoginButton = ({ text = "Đăng nhập với Google" }) => {
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/google/google', {
        credential: credentialResponse.credential
      });

      if (response.data.success) {
        const { token, user } = response.data.data;
        
        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Update auth context
        setToken(token);
        setUser(user);
        
        // Redirect to home
        navigate('/');
      }
    } catch (error) {
      console.error('Google login error:', error);
      alert('Đăng nhập Google thất bại. Vui lòng thử lại.');
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
    alert('Đăng nhập Google thất bại. Vui lòng thử lại.');
  };

  return (
    <div className="google-login-container">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        text={text}
        shape="rectangular"
        theme="outline"
        size="large"
        width="100%"
      />
    </div>
  );
};

export default GoogleLoginButton;
