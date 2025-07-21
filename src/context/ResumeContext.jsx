import { createContext, useState, useContext } from "react";
import { resumeAPI } from "../services/api";
import { useAuth } from "./AuthContext";

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState({
    name: "",
    location: "",
    title: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    summary: "",
    education: [{ school: "", degree: "", date: "", location: "", details: "" }],
    experience: [{ jobTitle: "", company: "", description: "", year: "" }],
    projects: [{ title: "", tech: "", date: "", description: "", link: "" }],
    skills: {
      languages: "",
      frameworks: "",
      technologies: "",
      skills: ""
    },
    certificates: [
      { title: "", provider: "", date: "", link: "" }
    ],
    resumeTitle: "My Resume",
  });

  const [savedResumes, setSavedResumes] = useState([]);
  const [currentResumeId, setCurrentResumeId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load all saved resumes
  const loadSavedResumes = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError('');
      const resumes = await resumeAPI.getAllResumes(user.id);
      setSavedResumes(resumes);
    } catch (error) {
      setError('Failed to load saved resumes');
      console.error('Error loading resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load a specific resume
  const loadResume = async (id) => {
    try {
      setLoading(true);
      setError('');
      const resume = await resumeAPI.getResume(id);
      console.log('Loaded resume from API:', resume);
      
      // Transform the resume data to match form structure
      const transformedResume = {
        ...resume,
        location: resume.location || "",
        linkedin: resume.linkedin || "",
        github: resume.github || "",
        projects: resume.projects || [{ title: "", tech: "", date: "", description: "", link: "" }],
        skills: resume.skills || {
          languages: "",
          frameworks: "",
          technologies: "",
          skills: ""
        },
        education: resume.education || [{ school: "", degree: "", date: "", location: "", details: "" }],
        certificates: resume.certificates || [{ title: "", provider: "", date: "", link: "" }]
      };
      
      console.log('Transformed resume data:', transformedResume);
      setResumeData(transformedResume);
      setCurrentResumeId(id);
      console.log('ResumeData set in context, currentResumeId:', id);
    } catch (error) {
      setError('Failed to load resume');
      console.error('Error loading resume:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save current resume - modified to accept data parameter
  const saveResume = async (dataToSave = null) => {
    if (!user) {
      return { success: false, error: 'Please login first' };
    }

    try {
      setLoading(true);
      setError('');
      
      // Use provided data or fall back to resumeData from context
      const dataForSaving = dataToSave || resumeData;
      
      // Add userId to resume data with defaults
      const resumeDataWithUser = {
        ...dataForSaving,
        userId: user.id,
        name: dataForSaving.name || 'Untitled Resume',
        email: dataForSaving.email || 'email@example.com',
        resumeTitle: dataForSaving.resumeTitle || 'My Resume'
      };
      
      console.log('Saving resume data:', resumeDataWithUser);
      
      if (currentResumeId) {
        // Update existing resume
        const response = await resumeAPI.updateResume(currentResumeId, resumeDataWithUser);
        console.log('Resume updated successfully');
        return { success: true, message: 'Resume updated successfully' };
      } else {
        // Create new resume
        const response = await resumeAPI.createResume(resumeDataWithUser);
        const newResumeId = response.resume._id;
        setCurrentResumeId(newResumeId);
        
        // Update resumeData with the saved data including the new ID
        setResumeData({
          ...resumeDataWithUser,
          _id: newResumeId
        });
        
        console.log('Resume saved successfully with ID:', newResumeId);
        return { success: true, message: 'Resume saved successfully', resumeId: newResumeId };
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to save resume';
      setError(errorMessage);
      console.error('Error saving resume:', error);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Delete a resume
  const deleteResume = async (id) => {
    try {
      setLoading(true);
      setError('');
      await resumeAPI.deleteResume(id);
      setSavedResumes(savedResumes.filter(resume => resume._id !== id));
      
      if (currentResumeId === id) {
        // Reset to default if deleted resume was currently loaded
        resetResume();
      }
      
      return { success: true, message: 'Resume deleted successfully' };
    } catch (error) {
      setError('Failed to delete resume');
      console.error('Error deleting resume:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Reset to default resume
  const resetResume = () => {
    setResumeData({
      name: "",
      title: "",
      email: "",
      phone: "",
      summary: "",
      education: [{ school: "", degree: "", year: "" }],
      experience: [{ jobTitle: "", company: "", description: "", year: "" }],
      skills: [""],
      certificates: [
        { title: "", provider: "", date: "", link: "" }
      ],
      resumeTitle: "My Resume",
    });
    setCurrentResumeId(null);
  };

  return (
    <ResumeContext.Provider value={{ 
      resumeData, 
      setResumeData,
      savedResumes,
      currentResumeId,
      loading,
      error,
      loadSavedResumes,
      loadResume,
      saveResume,
      deleteResume,
      resetResume,
      setError
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}