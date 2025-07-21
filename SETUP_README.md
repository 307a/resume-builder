# MERN Stack Resume Builder

A full-stack resume builder application built with React, Node.js, Express, and MongoDB.

## Features

- User registration and authentication
- Create, save, edit, and delete resumes
- Multiple resume templates
- Real-time preview
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - The `.env` file is already configured with MongoDB Atlas
   - For production, update the following in `.env`:
     ```
     PORT=5000
     MONGODB_URI=mongodb+srv://Samarpreet_Singh:Samar_4734@cluster0.jmaniwk.mongodb.net/resumebuilder
     JWT_SECRET=your_super_secret_jwt_key
     ```

4. Start MongoDB:
   - If using local MongoDB: Make sure MongoDB service is running
   - If using MongoDB Atlas: Ensure your connection string is correct in `.env`

5. Start the backend server:
   ```bash
   npm start
   ```

   The backend server will run on http://localhost:5000

### 2. Frontend Setup

1. Navigate to the main project directory:
   ```bash
   cd ..
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

   The frontend will run on http://localhost:5173

## Usage

1. **Registration/Login**: 
   - Visit http://localhost:5173
   - Click "Sign Up" to create a new account
   - Or "Login" if you already have an account

2. **Creating a Resume**:
   - After logging in, click "Create New Resume" from the dashboard
   - Fill in your details in the form
   - Use "Save Resume" to save your progress
   - Click "Preview Resume" to see how it looks

3. **Managing Resumes**:
   - From the dashboard, you can:
     - Edit existing resumes
     - Delete resumes
     - Create new resumes

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Resumes
- `GET /api/resumes` - Get all user's resumes
- `GET /api/resumes/:id` - Get specific resume
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

## Project Structure

```
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Resume.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── resumes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ResumeContext.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ResumeForm.jsx
│   │   └── ResumePreview.jsx
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   └── App.jsx
└── package.json
```

## Troubleshooting

1. **MongoDB Connection Issues**:
   - Make sure MongoDB is running
   - Check your connection string in `.env`
   - Ensure your IP is whitelisted (if using MongoDB Atlas)

2. **CORS Issues**:
   - The backend is configured to allow all origins
   - Make sure backend is running on port 5000

3. **Authentication Issues**:
   - Clear browser localStorage if experiencing login issues
   - Check that JWT_SECRET is set in backend `.env`

## Technologies Used

- **Frontend**: React, React Router, Formik, Yup
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **HTTP Client**: Fetch API (native)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
