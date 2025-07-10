import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import "../App.css";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  location: Yup.string().required("Location is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  linkedin: Yup.string(),
  github: Yup.string(),
  projects: Yup.array().of(
    Yup.object({
      title: Yup.string().required("Project title required"),
      tech: Yup.string().required("Tech/Stack required"),
      date: Yup.string().required("Date required"),
      description: Yup.string().required("Description required"),
      link: Yup.string(),
    })
  ),
  certificates: Yup.array().of(
    Yup.object({
      title: Yup.string().required("Certificate title required"),
      provider: Yup.string().required("Provider required"),
      date: Yup.string().required("Date required"),
      link: Yup.string(),
    })
  ),
  skills: Yup.object({
    languages: Yup.string().required("Languages are required"),
    frameworks: Yup.string(),
    technologies: Yup.string(),
    skills: Yup.string(),
  }),
  education: Yup.array().of(
    Yup.object({
      degree: Yup.string().required("Degree required"),
      school: Yup.string().required("School required"),
      date: Yup.string().required("Date required"),
      location: Yup.string().required("Location required"),
      details: Yup.string(),
    })
  ),
});

const initialValues = {
  name: "",
  location: "",
  phone: "",
  email: "",
  linkedin: "",
  github: "",
  projects: [
    {
      title: "",
      tech: "",
      date: "",
      description: "",
      link: "",
    },
  ],
  certificates: [
    {
      title: "",
      provider: "",
      date: "",
      link: "",
    },
  ],
  skills: {
    languages: "",
    frameworks: "",
    technologies: "",
    skills: "",
  },
  education: [
    {
      degree: "",
      school: "",
      date: "",
      location: "",
      details: "",
    },
  ],
};

export default function ResumeForm() {
  const { resumeData, setResumeData } = useResume();
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h1 className="header">Resume Builder</h1>
      <Formik
        initialValues={resumeData.name ? resumeData : initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setResumeData(values);
          navigate("/preview");
        }}
      >
        {({ values }) => (
          <Form>
            <section>
              <h2 className="section-title">Personal Info</h2>
              <div className="form-row">
                <label>Name*</label>
                <Field name="name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="form-row">
                <label>Location*</label>
                <Field name="location" />
                <ErrorMessage name="location" component="div" className="error" />
              </div>
              <div className="form-row">
                <label>Phone*</label>
                <Field name="phone" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>
              <div className="form-row">
                <label>Email*</label>
                <Field name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-row">
                <label>LinkedIn</label>
                <Field name="linkedin" />
              </div>
              <div className="form-row">
                <label>GitHub</label>
                <Field name="github" />
              </div>
            </section>

            <section>
              <h2 className="section-title">Projects</h2>
              <FieldArray name="projects">
                {({ push, remove }) => (
                  <div>
                    {values.projects.map((_, idx) => (
                      <div className="multi-row" key={idx}>
                        <Field name={`projects[${idx}].title`} placeholder="Project Title*" />
                        <Field name={`projects[${idx}].tech`} placeholder="Tech/Stack*" />
                        <Field name={`projects[${idx}].date`} placeholder="Date*" />
                        <Field
                          as="textarea"
                          name={`projects[${idx}].description`}
                          placeholder="Description (one bullet per line)"
                        />
                        <Field name={`projects[${idx}].link`} placeholder="Link" />
                        <button type="button" className="remove-btn" onClick={() => remove(idx)} disabled={values.projects.length === 1}>-</button>
                        <ErrorMessage name={`projects[${idx}].title`} component="div" className="error" />
                        <ErrorMessage name={`projects[${idx}].tech`} component="div" className="error" />
                        <ErrorMessage name={`projects[${idx}].date`} component="div" className="error" />
                        <ErrorMessage name={`projects[${idx}].description`} component="div" className="error" />
                      </div>
                    ))}
                    <button type="button" className="add-btn" onClick={() => push({ title: "", tech: "", date: "", description: "", link: "" })}>Add Project</button>
                  </div>
                )}
              </FieldArray>
            </section>

            <section>
              <h2 className="section-title">Certificates</h2>
              <FieldArray name="certificates">
                {({ push, remove }) => (
                  <div>
                    {values.certificates.map((_, idx) => (
                      <div className="multi-row" key={idx}>
                        <Field name={`certificates[${idx}].title`} placeholder="Certificate Title*" />
                        <Field name={`certificates[${idx}].provider`} placeholder="Provider*" />
                        <Field name={`certificates[${idx}].date`} placeholder="Date*" />
                        <Field name={`certificates[${idx}].link`} placeholder="Link" />
                        <button type="button" className="remove-btn" onClick={() => remove(idx)} disabled={values.certificates.length === 1}>-</button>
                        <ErrorMessage name={`certificates[${idx}].title`} component="div" className="error" />
                        <ErrorMessage name={`certificates[${idx}].provider`} component="div" className="error" />
                        <ErrorMessage name={`certificates[${idx}].date`} component="div" className="error" />
                      </div>
                    ))}
                    <button type="button" className="add-btn" onClick={() => push({ title: "", provider: "", date: "", link: "" })}>Add Certificate</button>
                  </div>
                )}
              </FieldArray>
            </section>

            <section>
              <h2 className="section-title">Technical Skills</h2>
              <div className="form-row">
                <label>Languages*</label>
                <Field name="skills.languages" placeholder="e.g. HTML, CSS, C++, JavaScript" />
                <ErrorMessage name="skills.languages" component="div" className="error" />
              </div>
              <div className="form-row">
                <label>Frameworks</label>
                <Field name="skills.frameworks" placeholder="e.g. Bootstrap, Angular" />
              </div>
              <div className="form-row">
                <label>Technologies</label>
                <Field name="skills.technologies" placeholder="e.g. GitHub, GitLab" />
              </div>
              <div className="form-row">
                <label>Skills</label>
                <Field name="skills.skills" placeholder="e.g. Responsive Web Design" />
              </div>
            </section>

            <section>
              <h2 className="section-title">Education</h2>
              <FieldArray name="education">
                {({ push, remove }) => (
                  <div>
                    {values.education.map((_, idx) => (
                      <div className="multi-row" key={idx}>
                        <Field name={`education[${idx}].degree`} placeholder="Degree*" />
                        <Field name={`education[${idx}].school`} placeholder="School*" />
                        <Field name={`education[${idx}].date`} placeholder="Date*" />
                        <Field name={`education[${idx}].location`} placeholder="Location*" />
                        <Field name={`education[${idx}].details`} placeholder="Details" />
                        <button type="button" className="remove-btn" onClick={() => remove(idx)} disabled={values.education.length === 1}>-</button>
                        <ErrorMessage name={`education[${idx}].degree`} component="div" className="error" />
                        <ErrorMessage name={`education[${idx}].school`} component="div" className="error" />
                        <ErrorMessage name={`education[${idx}].date`} component="div" className="error" />
                        <ErrorMessage name={`education[${idx}].location`} component="div" className="error" />
                      </div>
                    ))}
                    <button type="button" className="add-btn" onClick={() => push({ degree: "", school: "", date: "", location: "", details: "" })}>Add Education</button>
                  </div>
                )}
              </FieldArray>
            </section>

            <div className="form-actions">
              <button type="submit" className="submit-btn">Preview Resume</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}