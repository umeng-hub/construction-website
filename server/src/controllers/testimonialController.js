import Testimonial from '../models/Testimonial.js';
import { validationResult } from 'express-validator';

// Get all testimonials (public - only approved)
export const getTestimonials = async (req, res) => {
  try {
    const { featured } = req.query;
    let filter = { isApproved: true };
    
    if (featured === 'true') {
      filter.isFeatured = true;
    }
    
    const testimonials = await Testimonial.find(filter)
      .populate('projectId', 'title category')
      .sort({ createdAt: -1 });
    
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all testimonials (admin - including unapproved)
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .populate('projectId', 'title category')
      .sort({ createdAt: -1 });
    
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single testimonial
export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id)
      .populate('projectId', 'title category');
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create testimonial (public)
export const createTestimonial = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const testimonial = new Testimonial({
      ...req.body,
      isApproved: false // Requires admin approval
    });
    
    const newTestimonial = await testimonial.save();
    
    res.status(201).json({
      message: 'Thank you for your feedback! Your testimonial will be reviewed shortly.',
      testimonial: newTestimonial
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update testimonial (admin)
export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Approve testimonial (admin)
export const approveTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json({ message: 'Testimonial approved', testimonial });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete testimonial (admin)
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get statistics
export const getStats = async (req, res) => {
  try {
    const stats = await Testimonial.aggregate([
      { $match: { isApproved: true } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          fiveStarCount: {
            $sum: { $cond: [{ $eq: ['$rating', 5] }, 1, 0] }
          },
          fourStarCount: {
            $sum: { $cond: [{ $eq: ['$rating', 4] }, 1, 0] }
          }
        }
      }
    ]);

    const result = stats[0] || {
      averageRating: 0,
      totalReviews: 0,
      fiveStarCount: 0,
      fourStarCount: 0
    };

    res.json({
      averageRating: Math.round(result.averageRating * 10) / 10,
      totalReviews: result.totalReviews,
      satisfactionRate: result.totalReviews > 0 
        ? Math.round((result.averageRating / 5) * 100) 
        : 100,
      fiveStarCount: result.fiveStarCount,
      fourStarCount: result.fourStarCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
