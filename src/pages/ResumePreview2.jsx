import { useResume } from "../context/ResumeContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/ResumePreview2.css";

export default function ResumePreview2() {
  const { resumeData } = useResume();
  const navigate = useNavigate();
  const [format, setFormat] = useState("classic");

  const handleFormatPreview = () => {
    if (format === "modern") {
      navigate("/preview");
    } else {
      navigate("/preview2");
    }
  };

  return (
    <div className="classic-resume-container">
      <div className="classic-header">
        <div className="classic-header-left">
          <div className="classic-name">{resumeData.name || "Your Name"}</div>
          <div className="classic-links">
            {resumeData.linkedin && (
              <div>Linkedin: {resumeData.linkedin}</div>
            )}
            {resumeData.github && (
              <div>GitHub: {resumeData.github}</div>
            )}
          </div>
        </div>
        <div className="classic-header-right">
          {resumeData.email && (
            <div>Email: {resumeData.email}</div>
          )}
          {resumeData.phone && (
            <div>Mobile: {resumeData.phone}</div>
          )}
        </div>
      </div>
      <hr className="classic-hr" />
      <div className="classic-section classic-skills-block">
        <div className="classic-section-title skills-title">SKILLS</div>
        <ul className="classic-skills-list">
          {resumeData.skills?.languages && (
            <li className="classic-skill-row">
              <span className="classic-skill-label"><span>Languages:</span></span>
              <span className="classic-skill-value">{resumeData.skills.languages}</span>
            </li>
          )}
          {resumeData.skills?.frameworks && (
            <li className="classic-skill-row">
              <span className="classic-skill-label"><span>Framework:</span></span>
              <span className="classic-skill-value">{resumeData.skills.frameworks}</span>
            </li>
          )}
          {resumeData.skills?.technologies && (
            <li className="classic-skill-row">
              <span className="classic-skill-label"><span>Tools/Platforms:</span></span>
              <span className="classic-skill-value">{resumeData.skills.technologies}</span>
            </li>
          )}
          {resumeData.skills?.skills && (
            <li className="classic-skill-row">
              <span className="classic-skill-label"><span>Soft Skills:</span></span>
              <span className="classic-skill-value">{resumeData.skills.skills}</span>
            </li>
          )}
        </ul>
      </div>
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="classic-section">
          <div className="classic-section-title">INTERNSHIP</div>
          {resumeData.experience.map((job, idx) => (
            <div className="classic-job-block" key={idx}>
              <div className="classic-job-title">{job.company} <span className="classic-job-date">{job.date}</span></div>
              <div className="classic-job-role">{job.role}</div>
              <ul className="classic-job-desc">
                {job.description && job.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line}</li>)}
                {job.tech && <li><b>Tech stack used:</b> {job.tech}</li>}
              </ul>
            </div>
          ))}
        </div>
      )}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <div className="classic-section">
          <div className="classic-section-title projects-title">PROJECTS</div>
          {resumeData.projects.map((proj, idx) => (
            <div className="classic-project-block" key={idx}>
              <div className="classic-project-title">{proj.title} <span className="classic-project-date">{proj.date}</span></div>
              <ul className="classic-project-desc">
                {proj.description && proj.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line}</li>)}
                {proj.tech && <li>Tech: {proj.tech}</li>}
              </ul>
            </div>
          ))}
        </div>
      )}
      {resumeData.certificates && resumeData.certificates.length > 0 && (
        <div className="classic-section">
          <div className="classic-section-title certs-title">CERTIFICATES</div>
          {resumeData.certificates.map((cert, idx) => (
            <div className="classic-certificate-row" key={idx}>
              <div className="classic-certificate-left">
                {cert.title}
                {cert.provider ? ` – ${cert.provider}` : ""}
              </div>
              <div className="classic-certificate-right">{cert.date}</div>
            </div>
          ))}
        </div>
      )}
      {resumeData.achievements && resumeData.achievements.length > 0 && (
        <div className="classic-section">
          <div className="classic-section-title">ACHIEVEMENTS</div>
          <ul className="classic-achievements-list">
            {resumeData.achievements.map((ach, idx) => (
              <li key={idx}>{ach}</li>
            ))}
          </ul>
        </div>
      )}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="classic-section">
          <div className="classic-section-title edu-title">EDUCATION</div>
          {resumeData.education.map((edu, idx) => (
            <div className="classic-education-row" key={idx}>
              <div className="classic-edu-left">
                <div className="classic-edu-school">{edu.school}</div>
                <div className="classic-edu-detail">{edu.degree}{edu.details && <span>, <b>{edu.details}</b></span>}</div>
              </div>
              <div className="classic-edu-right">
                <div className="classic-edu-location">{edu.location}</div>
                <div className="classic-edu-date">{edu.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="resume-actions no-print">
        <select value={format} onChange={e => setFormat(e.target.value)}>
          <option value="modern">Specialized Format</option>
          <option value="classic">General Format</option>
        </select>
        <button onClick={handleFormatPreview}>Preview</button>
        <button onClick={() => navigate("/form")}>Back to Edit</button>
      </div>
    </div>
  );
}
