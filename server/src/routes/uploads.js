import express from 'express';
import upload from '../config/upload.js';
import {
  uploadSingle,
  uploadMultiple,
  deleteFile,
  listFiles
} from '../controllers/uploadController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All upload routes require authentication
router.post('/single', authenticate, upload.single('image'), uploadSingle);
router.post('/multiple', authenticate, upload.array('images', 10), uploadMultiple);
router.delete('/:filename', authenticate, deleteFile);
router.get('/', authenticate, listFiles);

export default router;
