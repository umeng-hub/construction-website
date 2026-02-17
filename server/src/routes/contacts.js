import express from 'express';
import { body } from 'express-validator';
import {
  getContacts,
  createContact,
  updateContactStatus,
  deleteContact
} from '../controllers/contactController.js';

const router = express.Router();

const contactValidation = [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('projectType').isIn(['residential', 'apartment', 'renovation', 'commercial', 'other']).withMessage('Valid project type is required'),
  body('message').notEmpty().trim().withMessage('Message is required')
];

router.get('/', getContacts);
router.post('/', contactValidation, createContact);
router.patch('/:id/status', updateContactStatus);
router.delete('/:id', deleteContact);

export default router;
