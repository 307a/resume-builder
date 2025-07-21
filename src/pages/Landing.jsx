import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Landing.css";
import resumelogo from "../assets/Screenshot 2025-07-12 165421.png";
import Footer from '../components/Footer';

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="landing-main-bg">
        {/* Navigation Header */}
        <nav className="landing-nav">
          <div className="nav-content">
            <div className="nav-logo">
              <h2>ResumeBuilder</h2>
            </div>
            <div className="nav-links">
              {isAuthenticated ? (
                <div className="auth-nav">
                  <span className="welcome-text">Welcome, {user?.username}!</span>
                  <button 
                    className="nav-btn dashboard-btn"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </button>
                  <button 
                    className="nav-btn logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="auth-nav">
                  <button 
                    className="nav-btn login-btn"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button 
                    className="nav-btn signup-btn"
                    onClick={() => navigate("/register")}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className="landing-top">
          <div className="landing-best">ONLINE RESUME BUILDER</div>
          <h1 className="landing-headline">
            Your success <span className="emoji">👏</span>
            <br />
            Story Begins <span className="spark">✍️</span>
            <br />
            with a <span className="landing-resume">Resume</span>
          </h1>
          <button
            className="landing-order-btn"
            onClick={handleGetStarted}
          >
            {isAuthenticated ? "Go to Dashboard" : "Get Started"} <span className="arrow">→</span>
          </button>
          
          {!isAuthenticated && (
            <div className="landing-features">
              <p className="feature-text">✓ Save multiple resumes</p>
              <p className="feature-text">✓ Edit anytime</p>
              <p className="feature-text">✓ Professional templates</p>
            </div>
          )}
        </div>
        <div className="landing-preview">
          <img
            src={resumelogo}
            alt="Resume Demo"
            className="resume-demo-img"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}