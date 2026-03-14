import React, { useContext, useState, useEffect } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [authMode, setAuthMode] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    const endpoint = authMode === "Login" ? "/api/user/login" : "/api/user/register";

    try {
      const response = await axios.post(`${url}${endpoint}`, data);
      const resData = response.data;

      if (resData.success) {
        localStorage.setItem("token", resData.token);
        setToken(resData.token);
        toast.success(authMode === "Login" ? "Logged in successfully" : "Account created successfully");
        setShowLogin(false);
      } else {
        toast.error(resData.message || "Authentication failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Connection error. Please try again.");
    } finally {
      setIsLoading(false);
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
          <h2>{authMode === "Login" ? "Login" : "Sign Up"}</h2>
        </div>
        <img
          onClick={handleClose}
          src={assets.cross_icon}
          alt="Close"
          className="close-btn"
        />
      </div>

      <div className="login-popup-inputs">
        {authMode === "Sign Up" && (
          <div className="input-group">
            <label>Full Name</label>
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
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
        )}

        <div className="input-group">
          <label>Email Address</label>
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
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={authMode === "Sign Up" ? "Minimum 8 characters" : "Enter password"}
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
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
      </div>

      <button type="submit" className="auth-btn" disabled={isLoading}>
        {isLoading ? (
          <span className="loading-spinner">
            <span className="spinner"></span> Processing...
          </span>
        ) : (
          authMode === "Sign Up" ? "Create Account" : "Sign In"
        )}
      </button>

      <div className="auth-switch">
        {authMode === "Login" ? (
          <p>Don't have an account? <span onClick={() => !isLoading && handleModeSwitch("Sign Up")}>Sign up</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => !isLoading && handleModeSwitch("Login")}>Log in</span></p>
        )}
      </div>

    </form>
  </div>
);
};

export default LoginPopup;
