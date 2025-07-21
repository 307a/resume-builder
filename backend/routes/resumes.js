const express = require('express');
const Resume = require('../models/Resume');

const router = express.Router();

// Get all resumes for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.params.userId })
      .select('resumeTitle createdAt updatedAt')
      .sort({ updatedAt: -1 });
    
    res.json(resumes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching resumes' });
  }
});

// Get a specific resume
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching resume' });
  }
});

// Create a new resume
router.post('/', async (req, res) => {
  try {
    console.log('Received resume data:', req.body);
    
    // Validate required fields
    if (!req.body.userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    // Ensure default values for optional fields
    const resumeData = {
      ...req.body,
      name: req.body.name || 'Untitled Resume',
      email: req.body.email || 'email@example.com',
      resumeTitle: req.body.resumeTitle || 'My Resume'
    };

    const resume = new Resume(resumeData);
    await resume.save();

    console.log('Resume created successfully:', resume._id);
    res.status(201).json({
      message: 'Resume created successfully',
      resume
    });
  } catch (error) {
    console.error('Error creating resume:', error);
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: validationErrors 
      });
    }
    res.status(500).json({ message: 'Server error while creating resume' });
  }
});

// Update a resume
router.put('/:id', async (req, res) => {
  try {
    console.log('Updating resume:', req.params.id, req.body);
    
    // Validate required fields
    if (req.body.name && req.body.name.trim() === '') {
      return res.status(400).json({ message: 'Name cannot be empty' });
    }
    
    if (req.body.email && req.body.email.trim() === '') {
      return res.status(400).json({ message: 'Email cannot be empty' });
    }

    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    console.log('Resume updated successfully:', resume._id);
    res.json({
      message: 'Resume updated successfully',
      resume
    });
  } catch (error) {
    console.error('Error updating resume:', error);
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: validationErrors 
      });
    }
    res.status(500).json({ message: 'Server error while updating resume' });
  }
});

// Delete a resume
router.delete('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting resume' });
  }
});

module.exports = router;
