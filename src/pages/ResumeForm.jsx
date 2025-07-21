import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ResumeForm.css';

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  location: Yup.string().required("Location is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  resumeTitle: Yup.string().required("Resume title is required"),
  skills: Yup.object({
    languages: Yup.string().required("Languages are required"),
  }),
});

export default function ResumeForm() {
  const { resumeData, setResumeData, saveResume, loading, currentResumeId } = useResume();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [saveMessage, setSaveMessage] = useState('');
  const hasSavedRef = useRef(false);
  
  // Simple state for initial values
  const [initialValues, setInitialValues] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    resumeTitle: "My Resume",
    projects: [{ title: "", tech: "", date: "", description: "", link: "" }],
    certificates: [{ title: "", provider: "", date: "", link: "" }],
    skills: { languages: "", frameworks: "", technologies: "", skills: "" },
    education: [{ degree: "", school: "", date: "", location: "", details: "" }],
  });

  // Load resume data ONLY when editing (not after saving)
  useEffect(() => {
    // Don't reload if we just saved
    if (hasSavedRef.current) {
      hasSavedRef.current = false;
      return;
    }

    if (currentResumeId && resumeData && resumeData._id === currentResumeId) {
      console.log('Loading saved resume for editing:', resumeData);
      setInitialValues({
        name: resumeData.name || "",
        location: resumeData.location || "",
        phone: resumeData.phone || "",
        email: resumeData.email || "",
        linkedin: resumeData.linkedin || "",
        github: resumeData.github || "",
        resumeTitle: resumeData.resumeTitle || "My Resume",
        projects: resumeData.projects?.length > 0 ? resumeData.projects : [{ title: "", tech: "", date: "", description: "", link: "" }],
        certificates: resumeData.certificates?.length > 0 ? resumeData.certificates : [{ title: "", provider: "", date: "", link: "" }],
        skills: {
          languages: resumeData.skills?.languages || "",
          frameworks: resumeData.skills?.frameworks || "",
          technologies: resumeData.skills?.technologies || "",
          skills: resumeData.skills?.skills || "",
        },
        education: resumeData.education?.length > 0 
          ? resumeData.education.map(edu => ({
              degree: edu.degree || "",
              school: edu.school || "",
              date: edu.year || edu.date || "",
              location: edu.location || "",
              details: edu.details || "",
            }))
          : [{ degree: "", school: "", date: "", location: "", details: "" }],
      });
    }
  }, [currentResumeId, resumeData]);

  const handleSave = async (values) => {
    console.log('Saving with values:', values);
    
    if (!isAuthenticated) {
      toast.error('Please login to save your resume');
      return;
    }

    if (!values.name?.trim()) {
      toast.error('Please enter your name!');
      return;
    }

    try {
      const transformedData = {
        name: values.name,
        location: values.location || '',
        phone: values.phone || '',
        email: values.email || 'email@example.com',
        linkedin: values.linkedin || '',
        github: values.github || '',
        resumeTitle: values.resumeTitle || 'My Resume',
        projects: values.projects || [],
        certificates: values.certificates || [],
        skills: {
          languages: values.skills?.languages || '',
          frameworks: values.skills?.frameworks || '',
          technologies: values.skills?.technologies || '',
          skills: values.skills?.skills || ''
        },
        education: (values.education || []).map(edu => ({
          school: edu.school || '',
          degree: edu.degree || '',
          year: edu.date || '',
          date: edu.date || '',
          location: edu.location || '',
          details: edu.details || ''
        }))
      };

      console.log('Saving transformed data:', transformedData);
      
      // Show loading toast
      const toastId = toast.loading('Saving resume...');
      
      // Pass data directly to saveResume
      const result = await saveResume(transformedData);
      
      if (result.success) {
        // Update context with saved data
        setResumeData(transformedData);
        hasSavedRef.current = true;
        
        // Update loading toast to success
        toast.update(toastId, {
          render: '✅ Resume saved successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        console.log('Save successful - form data should remain');
      } else {
        // Update loading toast to error
        toast.update(toastId, {
          render: `❌ Failed to save: ${result.error}`,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1 className="header">Fill Your Details</h1>
        {isAuthenticated && (
          <div className="save-section">
            <span className="save-status">
              {currentResumeId ? '✓ Editing saved resume' : '⚠ Unsaved changes'}
            </span>
          </div>
        )}
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          console.log('Form submitted for preview with:', values);
          
          // Show loading toast for preview
          const toastId = toast.loading('Preparing preview...');
          
          const transformedData = {
            name: values.name || 'Untitled Resume',
            location: values.location || '',
            phone: values.phone || '',
            email: values.email || 'email@example.com',
            linkedin: values.linkedin || '',
            github: values.github || '',
            resumeTitle: values.resumeTitle || 'My Resume',
            projects: values.projects || [],
            certificates: values.certificates || [],
            skills: {
              languages: values.skills?.languages || '',
              frameworks: values.skills?.frameworks || '',
              technologies: values.skills?.technologies || '',
              skills: values.skills?.skills || ''
            },
            education: (values.education || []).map(edu => ({
              school: edu.school || '',
              degree: edu.degree || '',
              year: edu.date || '',
              date: edu.date || '',
              location: edu.location || '',
              details: edu.details || ''
            }))
          };
          
          setResumeData(transformedData);
          
          // Update loading toast to success
          toast.update(toastId, {
            render: '✅ Preview ready!',
            type: 'success',
            isLoading: false,
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          
          setTimeout(() => {
            navigate("/preview");
          }, 1000);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <section>
              <h2 className="section-title">Resume Information</h2>
              <div className="form-row">
                <label>Resume Title*</label>
                <Field name="resumeTitle" placeholder="e.g. Software Developer Resume" />
                <ErrorMessage name="resumeTitle" component="div" className="error" />
              </div>
            </section>

            <section>
              <h2 className="section-title">Personal Info</h2>
              <div className="form-row">
                <label>Name*</label>
                <Field name="name" placeholder="Enter your full name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="form-row">
                <label>Location*</label>
                <Field name="location" placeholder="City, State" />
                <ErrorMessage name="location" component="div" className="error" />
              </div>
              <div className="form-row">
                <label>Phone*</label>
                <Field name="phone" placeholder="Phone number" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>
              <div className="form-row">
                <label>Email*</label>
                <Field name="email" placeholder="email@example.com" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-row">
                <label>LinkedIn</label>
                <Field name="linkedin" placeholder="LinkedIn profile URL" />
              </div>
              <div className="form-row">
                <label>GitHub</label>
                <Field name="github" placeholder="GitHub profile URL" />
              </div>
            </section>

            <section>
              <h2 className="section-title">Technical Skills</h2>
              <div className="form-row">
                <label>Languages*</label>
                <Field name="skills.languages" placeholder="e.g. HTML, CSS, JavaScript" />
                <ErrorMessage name="skills.languages" component="div" className="error" />
              </div>
              <div className="form-row">
                <label>Frameworks</label>
                <Field name="skills.frameworks" placeholder="e.g. React, Angular" />
              </div>
              <div className="form-row">
                <label>Technologies</label>
                <Field name="skills.technologies" placeholder="e.g. Node.js, MongoDB" />
              </div>
              <div className="form-row">
                <label>Skills</label>
                <Field name="skills.skills" placeholder="e.g. Problem Solving" />
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
                        <Field name={`projects[${idx}].tech`} placeholder="Tech Stack*" />
                        <Field name={`projects[${idx}].date`} placeholder="Date*" />
                        <Field as="textarea" name={`projects[${idx}].description`} placeholder="Description" />
                        <Field name={`projects[${idx}].link`} placeholder="Project Link" />
                        <button type="button" className="remove-btn" onClick={() => remove(idx)} disabled={values.projects.length === 1}>-</button>
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
                        <Field name={`certificates[${idx}].link`} placeholder="Certificate Link" />
                        <button type="button" className="remove-btn" onClick={() => remove(idx)} disabled={values.certificates.length === 1}>-</button>
                      </div>
                    ))}
                    <button type="button" className="add-btn" onClick={() => push({ title: "", provider: "", date: "", link: "" })}>Add Certificate</button>
                  </div>
                )}
              </FieldArray>
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
                        <Field name={`education[${idx}].details`} placeholder="Additional Details" />
                        <button type="button" className="remove-btn" onClick={() => remove(idx)} disabled={values.education.length === 1}>-</button>
                      </div>
                    ))}
                    <button type="button" className="add-btn" onClick={() => push({ degree: "", school: "", date: "", location: "", details: "" })}>Add Education</button>
                  </div>
                )}
              </FieldArray>
            </section>

            <div className="form-actions">
              {isAuthenticated && (
                <button 
                  type="button" 
                  className="save-btn"
                  onClick={() => handleSave(values)}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : (currentResumeId ? 'Update Resume' : 'Save Resume')}
                </button>
              )}
              <button type="submit" className="submit-btn">Preview Resume</button>
              <button 
                type="button" 
                className="back-btn"
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}
              >
                {isAuthenticated ? 'Back to Dashboard' : 'Back to Home'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}