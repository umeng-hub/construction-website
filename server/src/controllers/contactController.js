import { validationResult } from 'express-validator';
import { sendContactEmail, sendAutoReply } from '../config/email.js';

// Submit contact form - sends email instead of saving to database
export const createContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, subject, message } = req.body;

    // Send email to company
    await sendContactEmail({ name, email, phone, subject, message });

    // Send auto-reply to customer (optional, doesn't block if it fails)
    await sendAutoReply(email, name);

    res.status(200).json({
      message: 'Thank you for contacting us! We will get back to you within 24-48 hours.',
      success: true
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'Failed to send your message. Please try again or contact us directly.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
