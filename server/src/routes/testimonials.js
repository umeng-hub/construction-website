import express from 'express';
import { body } from 'express-validator';
import {
  getTestimonials,
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  approveTestimonial,
  deleteTestimonial,
  getStats
} from '../controllers/testimonialController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const testimonialValidation = [
  body('clientName').notEmpty().trim().withMessage('Name is required'),
  body('clientEmail').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('testimonial').notEmpty().trim().withMessage('Testimonial is required')
];

// Public routes
router.get('/', getTestimonials); // Only approved testimonials
router.get('/stats', getStats); // Statistics
router.post('/', testimonialValidation, createTestimonial); // Submit testimonial

// Protected routes (admin only)
router.get('/all', authenticate, getAllTestimonials); // All testimonials
router.get('/:id', authenticate, getTestimonialById);
router.put('/:id', authenticate, updateTestimonial);
router.patch('/:id/approve', authenticate, approveTestimonial);
router.delete('/:id', authenticate, deleteTestimonial);

export default router;
