import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";
import resumelogo from "../assets/Screenshot 2025-07-12 165421.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-main-bg">
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
          onClick={() => navigate("/form")}
        >
          Start Creating <span className="arrow">→</span>
        </button>
      </div>
      <div className="landing-preview">
        <img
          src={resumelogo}
          alt="Resume Demo"
          className="resume-demo-img"
        />
      </div>
    </div>
  );
}