import express from 'express';
import { body } from 'express-validator';
import { createContact } from '../controllers/contactController.js';

const router = express.Router();

// Validation rules
const contactValidation = [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
  body('subject').notEmpty().trim().withMessage('Subject is required'),
  body('message').notEmpty().trim().withMessage('Message is required')
];

// Public route - submit contact form (sends email)
router.post('/', contactValidation, createContact);

export default router;
