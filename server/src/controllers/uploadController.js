import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Upload single image
export const uploadSingle = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    
    res.status(200).json({
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload multiple images
export const uploadMultiple = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const files = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: `/uploads/${file.filename}`
    }));

    res.status(200).json({
      message: `${files.length} file(s) uploaded successfully`,
      files: files
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an uploaded file
export const deleteFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../../uploads', filename);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Delete file
    await fs.unlink(filePath);

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List all uploaded files
export const listFiles = async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../../uploads');
    const files = await fs.readdir(uploadsDir);

    const fileList = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(uploadsDir, filename);
        const stats = await fs.stat(filePath);
        
        return {
          filename,
          url: `/uploads/${filename}`,
          size: stats.size,
          createdAt: stats.birthtime,
          modifiedAt: stats.mtime
        };
      })
    );

    res.status(200).json({
      count: fileList.length,
      files: fileList
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
