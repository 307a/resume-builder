import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResumeProvider } from "./context/ResumeContext";
import ResumeForm from "./pages/ResumeForm";
import ResumePreview from "./pages/ResumePreview";
import Landing from "./pages/Landing";
import ResumePreview2 from "./pages/ResumePreview2";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ResumeProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/form" element={<ResumeForm />} />
          <Route path="/preview" element={<ResumePreview />} />
          <Route path="/preview2" element={<ResumePreview2 />} />
        </Routes>
      </ResumeProvider>
    </BrowserRouter>
  );
}

export default App;
