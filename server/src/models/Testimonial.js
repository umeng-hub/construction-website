import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  clientEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  testimonial: {
    type: String,
    required: true
  },
  projectType: {
    type: String,
    enum: ['residential', 'apartment', 'renovation', 'commercial', 'other']
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  clientImage: {
    type: String
  }
}, {
  timestamps: true
});

// Index for faster queries
testimonialSchema.index({ isApproved: 1, rating: -1 });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
