import { createContext, useState, useContext } from "react";

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState({
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
  });

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}