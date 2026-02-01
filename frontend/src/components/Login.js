import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, Star, Users, Zap } from 'lucide-react';
import './Login.css';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <div className="login-page">
      <div className="left-panel">
        <div className="hero-content">
          <div className="logo-container">
            <div className="logo-icon-container">
              <Star className="logo-icon" />
            </div>
            <span className="logo-text">Hackaton Star</span>
          </div>
          
          <h1 className="hero-title">
            Welcome to <span className="accent-text">Hackaton Star</span>
          </h1>
          
          <p className="hero-description">
            Join our innovative platform where creativity meets technology. 
            Collaborate, create, and compete in amazing hackathons.
          </p>
          
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="value">1000+</div>
              <div className="label">Active Users</div>
            </div>
            <div className="hero-stat">
              <div className="value">50+</div>
              <div className="label">Hackathons</div>
            </div>
            <div className="hero-stat">
              <div className="value">24/7</div>
              <div className="label">Support</div>
            </div>
          </div>
        </div>
        
        <div className="background-pattern">
          <div className="blur-3xl" style={{
            width: '300px',
            height: '300px',
            background: 'hsl(var(--accent))',
            top: '10%',
            left: '10%'
          }}></div>
          <div className="blur-2xl" style={{
            width: '200px',
            height: '200px',
            background: 'hsl(var(--primary))',
            bottom: '20%',
            right: '15%'
          }}></div>
        </div>
        
        <div className="decoration-circles">
          <Users size="120" />
          <Zap size="80" style={{ position: 'absolute', bottom: '40px', right: '40px' }} />
        </div>
      </div>
      
      <div className="right-panel">
        <div className="login-form-container">
          <div className="logo-container">
            <div className="logo-icon-container">
              <Star className="logo-icon" />
            </div>
            <span className="logo-text">Hackaton Star</span>
          </div>
          
          <h2>Sign in to your account</h2>
          <p>Enter your email and password to access your dashboard</p>
          
          {error && (
            <div style={{
              padding: '0.75rem',
              backgroundColor: 'hsl(var(--destructive))',
              color: 'hsl(var(--destructive-foreground))',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="email">Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  required
                  className="input-field"
                  placeholder="name@example.com"
                />
              </div>
            </div>
            
            <div className="input-group">
              <label className="input-label" htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  ref={passwordRef}
                  required
                  className="input-field"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size="20" /> : <Eye size="20" />}
                </button>
              </div>
            </div>
            
            <div className="extra-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>
            
            <button 
              disabled={loading} 
              type="submit"
              className="submit-button"
            >
              {loading ? (
                <>
                  <Loader2 className="spinner" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
          
          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
