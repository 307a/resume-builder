const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: false,  // Made optional to avoid validation errors
    trim: true,
    default: ''
  },
  title: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    required: false,  // Made optional to avoid validation errors
    trim: true,
    default: ''
  },
  phone: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  linkedin: {
    type: String,
    trim: true
  },
  github: {
    type: String,
    trim: true
  },
  summary: {
    type: String,
    trim: true
  },
  education: [{
    school: {
      type: String,
      trim: true
    },
    degree: {
      type: String,
      trim: true
    },
    year: {
      type: String,
      trim: true
    },
    date: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    details: {
      type: String,
      trim: true
    }
  }],
  experience: [{
    jobTitle: {
      type: String,
      trim: true
    },
    company: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    year: {
      type: String,
      trim: true
    }
  }],
  projects: [{
    title: {
      type: String,
      trim: true
    },
    tech: {
      type: String,
      trim: true
    },
    date: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    link: {
      type: String,
      trim: true
    }
  }],
  skills: {
    languages: {
      type: String,
      trim: true,
      default: ''
    },
    frameworks: {
      type: String,
      trim: true,
      default: ''
    },
    technologies: {
      type: String,
      trim: true,
      default: ''
    },
    skills: {
      type: String,
      trim: true,
      default: ''
    }
  },
  certificates: [{
    title: {
      type: String,
      trim: true
    },
    provider: {
      type: String,
      trim: true
    },
    date: {
      type: String,
      trim: true
    },
    link: {
      type: String,
      trim: true
    }
  }],
  resumeTitle: {
    type: String,
    required: true,
    trim: true,
    default: 'My Resume'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);
