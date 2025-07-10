import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResumeProvider } from "./context/ResumeContext";
import ResumeForm from "./pages/ResumeForm";
import ResumePreview from "./pages/ResumePreview";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ResumeProvider>
        <Routes>
          <Route path="/" element={<ResumeForm />} />
          <Route path="/preview" element={<ResumePreview />} />
        </Routes>
      </ResumeProvider>
    </BrowserRouter>
  );
}

export default App;
