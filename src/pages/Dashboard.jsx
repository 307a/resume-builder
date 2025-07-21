import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import Footer from '../components/Footer';

function Dashboard() {
  const { user, logout } = useAuth();
  const { 
    savedResumes, 
    loadSavedResumes, 
    loadResume, 
    deleteResume, 
    resetResume,
    loading, 
    error 
  } = useResume();
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    loadSavedResumes();
  }, []);

  const handleCreateNew = () => {
    resetResume();
    navigate('/form');
  };

  const handleEditResume = async (resumeId) => {
    console.log('Editing resume:', resumeId);
    try {
      await loadResume(resumeId);
      console.log('Resume loaded successfully, navigating to form');
      navigate('/form');
    } catch (error) {
      console.error('Failed to load resume:', error);
    }
  };

  const handleDeleteResume = async (resumeId) => {
    const result = await deleteResume(resumeId);
    if (result.success) {
      setDeleteConfirm(null);
      // Refresh the list
      loadSavedResumes();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-info">
              <h1>Resume Dashboard</h1>
              <p>Welcome back, {user?.username}! ✨</p>
            </div>
            <div className="header-actions">
              <button 
                className="btn-landing"
                onClick={() => navigate('/')}
                title="Go to Landing Page"
              >
                Home
              </button>
              <button 
                className="btn-primary"
                onClick={() => navigate('/form')}
              >
                ✨ CREATE NEW RESUME
              </button>
              <button 
                className="btn-secondary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="dashboard-main">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Loading your resumes...</p>
            </div>
          ) : (
            <>
              {savedResumes.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10,9 9,9 8,9"/>
                    </svg>
                  </div>
                  <h3 className="empty-title">No resumes yet</h3>
                  <p className="empty-description">
                    Get started by creating your first professional resume. 
                    It only takes a few minutes!
                  </p>
                  <button
                    onClick={handleCreateNew}
                    className="btn-primary"
                  >
                    🚀 Create Your First Resume
                  </button>
                </div>
              ) : (
                <div className="resume-grid">
                  {savedResumes.map((resume) => (
                    <div key={resume._id} className="resume-card">
                      <h3 className="resume-title">
                        {resume.resumeTitle || 'Untitled Resume'}
                      </h3>
                      <div className="resume-meta">
                        <p className="resume-date">
                          📅 Created: {formatDate(resume.createdAt)}
                        </p>
                        <p className="resume-date">
                          🔄 Updated: {formatDate(resume.updatedAt)}
                        </p>
                      </div>
                      <div className="resume-actions">
                        <button
                          onClick={() => handleEditResume(resume._id)}
                          className="btn-edit"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(resume._id)}
                          className="btn-delete"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Delete Resume</h3>
              <p className="modal-description">
                Are you sure you want to delete this resume? This action cannot be undone.
              </p>
              <div className="modal-actions">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteResume(deleteConfirm)}
                  className="btn-confirm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
}

export default Dashboard;
