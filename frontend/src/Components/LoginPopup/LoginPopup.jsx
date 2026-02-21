import React, { useContext, useState, useEffect } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [authMode, setAuthMode] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const attempts = parseInt(localStorage.getItem('loginAttempts') || '0');
    const lockTime = parseInt(localStorage.getItem('lockTime') || '0');

    if (lockTime && Date.now() < lockTime) {
      setIsLocked(true);
      setLoginAttempts(attempts);
      const remainingTime = Math.ceil((lockTime - Date.now()) / 1000 / 60);
      setTimeout(() => {
        setIsLocked(false);
        localStorage.removeItem('lockTime');
        localStorage.setItem('loginAttempts', '0');
      }, lockTime - Date.now());
    }
  }, []);

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const sanitizeInput = (input) => {
    return input.trim().replace(/[<>]/g, '');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (authMode === "Sign Up") {
      if (!data.name.trim()) {
        newErrors.name = "Name is required";
      } else if (data.name.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      } else if (data.name.length > 50) {
        newErrors.name = "Name is too long";
      }
    }
    
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    } else if (authMode === "Sign Up") {
      if (data.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(data.password)) {
        newErrors.password = "Password must contain uppercase and lowercase letters";
      } else if (!/(?=.*\d)/.test(data.password)) {
        newErrors.password = "Password must contain at least one number";
      }
    } else {
      if (data.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    setData(prev => ({ ...prev, [name]: sanitizedValue }));
    
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(sanitizedValue));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    if (isLocked) {
      alert("Account temporarily locked due to multiple failed attempts. Please try again later.");
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    const endpoint = authMode === "Login" ? "/api/user/login" : "/api/user/register";

    try {
      const response = await axios.post(`${url}${endpoint}`, data);
      const resData = response.data;

      if (resData.success) {
        localStorage.setItem("token", resData.token);
        setToken(resData.token);
        localStorage.setItem('loginAttempts', '0');
        localStorage.removeItem('lockTime');

        if (rememberMe) {
          localStorage.setItem('rememberEmail', data.email);
        }

        setShowLogin(false);
      } else {
        handleFailedLogin(resData.message || "Authentication failed");
      }
    } catch (err) {
      handleFailedLogin(err.response?.data?.message || "Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFailedLogin = (message) => {
    const attempts = loginAttempts + 1;
    setLoginAttempts(attempts);
    localStorage.setItem('loginAttempts', attempts.toString());

    if (attempts >= 5) {
      const lockTime = Date.now() + (15 * 60 * 1000);
      localStorage.setItem('lockTime', lockTime.toString());
      setIsLocked(true);
      alert("Too many failed attempts. Account locked for 15 minutes.");
    } else {
      alert(message + ` (${5 - attempts} attempts remaining)`);
    }
  };

  const handleModeSwitch = (newMode) => {
    setAuthMode(newMode);
    setData({ name: "", email: "", password: "" });
    setErrors({});
};

const handleClose = () => {
  setIsVisible(false);
  setTimeout(() => setShowLogin(false), 300);
};

return (
  <div className={`login-popup ${isVisible ? 'visible' : ''}`}>
    <form onSubmit={handleAuth} className={`login-popup-container ${isVisible ? 'slide-in' : ''}`}>

      <div className="login-popup-title">
        <div>
          <h2>{authMode === "Login" ? "🔐 Welcome Back" : "🎉 Create Account"}</h2>
          <p className="subtitle">
            {authMode === "Login" ? "Sign in to continue" : "Join us today"}
          </p>
        </div>
        <img
          onClick={handleClose}
          src={assets.cross_icon}
          alt="Close"
          className="close-btn"
        />
      </div>

      {isLocked && (
        <div className="security-alert">
          <span>🔒</span>
          <p>Account locked due to multiple failed attempts. Try again in 15 minutes.</p>
        </div>
      )}

      <div className="auth-mode-tabs">
        <button
          type="button"
          className={`tab-btn ${authMode === "Login" ? "active" : ""}`}
          onClick={() => handleModeSwitch("Login")}
          disabled={isLoading}
        >
          Login
        </button>
        <button
          type="button"
          className={`tab-btn ${authMode === "Sign Up" ? "active" : ""}`}
          onClick={() => handleModeSwitch("Sign Up")}
          disabled={isLoading}
        >
          Sign Up
        </button>
      </div>

      <div className="login-popup-inputs">
        {authMode === "Sign Up" && (
          <div className="input-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={data.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                maxLength="50"
                autoComplete="name"
                required
              />
            </div>
            {errors.name && <span className="error-message">⚠️ {errors.name}</span>}
          </div>
        )}

        <div className="input-group">
          <label>Email Address</label>
          <div className="input-wrapper">
            <span className="input-icon">📧</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              autoComplete="email"
              required
            />
          </div>
          {errors.email && <span className="error-message">⚠️ {errors.email}</span>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={authMode === "Sign Up" ? "Min. 8 characters" : "Enter password"}
              value={data.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              autoComplete={authMode === "Login" ? "current-password" : "new-password"}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex="-1"
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {errors.password && <span className="error-message">⚠️ {errors.password}</span>}

          {authMode === "Sign Up" && data.password && (
            <div className="password-strength">
              <div className="strength-bars">
                <div className={`bar ${passwordStrength >= 1 ? 'filled' : ''}`}></div>
                <div className={`bar ${passwordStrength >= 2 ? 'filled' : ''}`}></div>
                <div className={`bar ${passwordStrength >= 3 ? 'filled' : ''}`}></div>
                <div className={`bar ${passwordStrength >= 4 ? 'filled' : ''}`}></div>
                <div className={`bar ${passwordStrength >= 5 ? 'filled' : ''}`}></div>
              </div>
              <span className={`strength-text strength-${passwordStrength}`}>
                {passwordStrength <= 1 && "Weak"}
                {passwordStrength === 2 && "Fair"}
                {passwordStrength === 3 && "Good"}
                {passwordStrength === 4 && "Strong"}
                {passwordStrength === 5 && "Excellent"}
              </span>
            </div>
          )}
        </div>

        {authMode === "Login" && (
          <div className="remember-me">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
        )}
      </div>

      <button type="submit" className="auth-btn" disabled={isLoading || isLocked}>
        {isLoading ? (
          <span className="loading-spinner">
            <span className="spinner"></span> Processing...
          </span>
        ) : (
          authMode === "Sign Up" ? "Create Account" : "Sign In"
        )}
      </button>

      {authMode === "Sign Up" && (
        <div className="security-info">
          <p>🔐 Your password must contain:</p>
          <ul>
            <li className={data.password.length >= 8 ? 'valid' : ''}>At least 8 characters</li>
            <li className={/(?=.*[a-z])(?=.*[A-Z])/.test(data.password) ? 'valid' : ''}>Uppercase & lowercase letters</li>
            <li className={/(?=.*\d)/.test(data.password) ? 'valid' : ''}>At least one number</li>
          </ul>
        </div>
      )}

      <div className="login-popup-condition">
        <input type="checkbox" required id="terms" />
        <label htmlFor="terms">
          I agree to the <a href="#">Terms of Service</a> & <a href="#">Privacy Policy</a>
        </label>
      </div>

      <div className="auth-switch">
        {authMode === "Login" ? (
          <p>Don't have an account? <span onClick={() => !isLoading && handleModeSwitch("Sign Up")}>Sign up</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => !isLoading && handleModeSwitch("Login")}>Log in</span></p>
        )}
      </div>

      <div className="security-badges">
        <span>🔒 SSL Encrypted</span>
        <span>🛡️ Secure Login</span>
        <span>✅ GDPR Compliant</span>
      </div>

    </form>
  </div>
);
};

export default LoginPopup;
