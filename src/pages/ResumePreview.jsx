import { useResume } from "../context/ResumeContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import "../styles/ResumePreview.css";

export default function ResumePreview() {
  const { resumeData } = useResume();
  const navigate = useNavigate();
  const [format, setFormat] = useState("modern");

  const handleFormatPreview = () => {
    if (format === "modern") {
      navigate("/preview");
    } else {
      navigate("/preview2");
    }
  };

  return (
    <div className="resume-box">
      <div className="resume-header-block">
        <h1 className="resume-name">{resumeData.name || "Your Name"}</h1>
        <div className="resume-location">{resumeData.location || "City, State ZIP"}</div>
        <div className="resume-contact">
          {resumeData.phone && (
            <span>
              <span role="img" aria-label="phone" style={{ color: "#d72660" }}>📞</span> {resumeData.phone}
            </span>
          )}
          {resumeData.email && (
            <span>
              <span role="img" aria-label="email" style={{ color: "#b39ddb" }}>✉️</span> {resumeData.email}
            </span>
          )}
          {resumeData.linkedin && (
            <span>
              <span role="img" aria-label="linkedin" style={{ color: "#b39ddb" }}>🔗</span> {resumeData.linkedin}
            </span>
          )}
          {resumeData.github && (
            <span>
              <span role="img" aria-label="github" style={{ color: "#ffb347" }}>🦑</span> {resumeData.github}
            </span>
          )}
        </div>
      </div>

      <hr className="resume-hr" />

      {resumeData.projects && resumeData.projects.length > 0 && (
        <section>
          <div className="resume-section-title">Projects</div>
          {resumeData.projects.map((proj, idx) => (
            <div className="resume-project" key={idx}>
              <div className="resume-project-header">
                <div>
                  <span className="resume-project-title">{proj.title}</span>
                  {proj.tech && (
                    <span className="resume-project-tech"> | {proj.tech}</span>
                  )}
                </div>
                <span className="resume-project-date">{proj.date}</span>
              </div>
              <ul className="resume-project-desc">
                {proj.description
                  .split('\n')
                  .map(line => line.trim())
                  .filter(line => line.length > 0)
                  .map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
              </ul>
              {proj.link && (
                <div>
                  <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {resumeData.certificates && resumeData.certificates.length > 0 && (
        <>
          <hr className="resume-hr" />
          <section className="certificates-section">
            <div className="resume-section-title">Certificates</div>
            {resumeData.certificates.map((cert, idx) => (
              <div className="resume-cert" key={idx}>
                <div className="cert-left">
                  <span className="cert-title">{cert.title}</span>
                  <div className="cert-details">
                    {cert.provider}
                    {cert.link && (
                      <>
                        {" - "}
                        <a href={cert.link} target="_blank" rel="noopener noreferrer">
                          Certificate Link
                        </a>
                      </>
                    )}
                  </div>
                </div>
                <div className="cert-right">{cert.date}</div>
              </div>
            ))}
          </section>
        </>
      )}

      {resumeData.skills && (
        <>
          <hr className="resume-hr" />
          <section>
            <div className="resume-section-title">Technical Skills</div>
            <table className="resume-skills-table">
              <tbody>
                <tr>
                  <td className="resume-skills-label"><b>Languages:</b></td>
                  <td>{resumeData.skills.languages}</td>
                </tr>
                <tr>
                  <td className="resume-skills-label"><b>Frameworks:</b></td>
                  <td>{resumeData.skills.frameworks}</td>
                </tr>
                <tr>
                  <td className="resume-skills-label"><b>Technologies:</b></td>
                  <td>{resumeData.skills.technologies}</td>
                </tr>
                <tr>
                  <td className="resume-skills-label"><b>Skills:</b></td>
                  <td>{resumeData.skills.skills}</td>
                </tr>
              </tbody>
            </table>
          </section>
        </>
      )}

      {resumeData.education && resumeData.education.length > 0 && (
        <>
          <hr className="resume-hr" />
          <section className="education-section">
            <div className="resume-section-title">Education</div>
            {resumeData.education.map((edu, idx) => (
              <div className="education-entry" key={idx}>
                <div className="edu-left">
                  <div className="edu-school"><strong>{edu.school}</strong></div>
                  <div className="edu-detail">
                    <em>
                      {edu.degree}
                      {edu.details && ` — ${edu.details}`}
                    </em>
                  </div>
                </div>
                <div className="edu-right">
                  <div className="edu-date"><strong>{edu.date}</strong></div>
                  <div className="edu-location"><em>{edu.location}</em></div>
                </div>
              </div>
            ))}
          </section>
        </>
      )}

      <div className="resume-actions no-print">
        <select value={format} onChange={e => setFormat(e.target.value)}>
          <option value="modern">Specialized Format</option>
          <option value="classic">General Format</option>
        </select>
        <button onClick={handleFormatPreview}>Preview</button>
        <button onClick={() => navigate("/form")}>Back to Edit</button>
        <button onClick={() => window.print()}>Save as PDF</button>
      </div>
    </div>
  );
}