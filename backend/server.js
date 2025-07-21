const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Samarpreet_Singh:Samar_4734@cluster0.jmaniwk.mongodb.net/resumebuilder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resumes', require('./routes/resumes'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Resume Builder API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});