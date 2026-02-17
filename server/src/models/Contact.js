import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  projectType: {
    type: String,
    required: true,
    enum: ['residential', 'apartment', 'renovation', 'commercial', 'other']
  },
  message: {
    type: String,
    required: true
  },
  budget: {
    type: String
  },
  timeline: {
    type: String
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'completed'],
    default: 'new'
  }
}, {
  timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
