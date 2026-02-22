import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['residential', 'apartment', 'renovation', 'commercial']
  },
  location: {
    type: String,
    required: true
  },
  completionDate: {
    type: Date,
    required: true
  },
  images: [{
    url: String,
    alt: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  stats: {
    area: String,
    duration: String,
    client: String
  },
  status: {
    type: String,
    enum: ['completed', 'ongoing', 'upcoming'],
    default: 'completed'
  }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
