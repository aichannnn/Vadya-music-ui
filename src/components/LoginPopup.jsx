import React from 'react';
import { useNavigate } from 'react-router-dom';


function LoginPopup({ onClose }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  const handleSignup = () => {
    onClose();
    navigate('/signup');
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-content">
          <div className="popup-image">
            <img
              src='./src/assets/img.jpg'
            />
          </div>

          <div className="popup-text">
            <h2>Start listening with a free Vadya account</h2>
            <div className="popup-buttons">
              <button className="signup-btn" onClick={handleSignup}>Sign up free</button>
              <button className="download-btn" onClick={() => window.open("https://www.spotify.com/download", "_blank")}>Download app</button>
            </div>
            <p>
              Already have an account? <span className="login-link" onClick={handleLogin}>Log in</span>
            </p>
          </div>
        </div>
        <button className="popup-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default LoginPopup;
