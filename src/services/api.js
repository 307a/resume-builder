const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to create headers
const createHeaders = () => {
  return {
    'Content-Type': 'application/json',
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// Auth API functions
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  getUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/auth/user/${userId}`, {
      headers: createHeaders(),
    });
    return handleResponse(response);
  },
};

// Resume API functions
export const resumeAPI = {
  getAllResumes: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/resumes/user/${userId}`, {
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  getResume: async (id) => {
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  createResume: async (resumeData) => {
    const response = await fetch(`${API_BASE_URL}/resumes`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(resumeData),
    });
    return handleResponse(response);
  },

  updateResume: async (id, resumeData) => {
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
      method: 'PUT',
      headers: createHeaders(),
      body: JSON.stringify(resumeData),
    });
    return handleResponse(response);
  },

  deleteResume: async (id) => {
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
      method: 'DELETE',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },
};

// Simple user management (storing in localStorage)
export const userManager = {
  setUser: (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  },

  removeUser: () => {
    localStorage.removeItem('currentUser');
  },

  getUser: () => {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('currentUser');
  },
};
