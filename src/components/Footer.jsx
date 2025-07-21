import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-brand">ResumeBuilder</h3>
          <p className="footer-description">
            Create professional resumes with ease. Build your career story with our intuitive resume builder.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link">📧</a>
            <a href="#" className="social-link">🐦</a>
            <a href="#" className="social-link">💼</a>
            <a href="#" className="social-link">📱</a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Features</h4>
          <ul className="footer-links">
            <li><a href="#">Professional Templates</a></li>
            <li><a href="#">Easy Editor</a></li>
            <li><a href="#">Download PDF</a></li>
            <li><a href="#">Save Multiple Resumes</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Support</h4>
          <ul className="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Tutorials</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Company</h4>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2025 ResumeBuilder. All rights reserved.</p>
          <p className="footer-made">Made with ❤️ for job seekers worldwide</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;