import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './config/database.js';
import projectRoutes from './routes/projects.js';
import contactRoutes from './routes/contacts.js';
import serviceRoutes from './routes/services.js';
import uploadRoutes from './routes/uploads.js';
import authRoutes from './routes/auth.js';
import testimonialRoutes from './routes/testimonials.js';
import statsRoutes from './routes/stats.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files - IMPORTANT: Use absolute path
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));
console.log('📁 Serving uploads from:', uploadsPath);

// Root API route
app.get('/api', (req, res) => {
  res.json({
    message: 'Prestige Build Construction API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      projects: {
        list: 'GET /api/projects',
        single: 'GET /api/projects/:id',
        create: 'POST /api/projects',
        update: 'PUT /api/projects/:id',
        delete: 'DELETE /api/projects/:id'
      },
      services: {
        list: 'GET /api/services',
        single: 'GET /api/services/:slug',
        create: 'POST /api/services',
        update: 'PUT /api/services/:id',
        delete: 'DELETE /api/services/:id'
      },
      contacts: {
        list: 'GET /api/contacts',
        create: 'POST /api/contacts',
        updateStatus: 'PATCH /api/contacts/:id/status',
        delete: 'DELETE /api/contacts/:id'
      },
      uploads: {
        single: 'POST /api/uploads/single',
        multiple: 'POST /api/uploads/multiple',
        list: 'GET /api/uploads',
        delete: 'DELETE /api/uploads/:filename'
      }
    },
    documentation: 'See README.md for full API documentation'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/stats', statsRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Serve React frontend build in production (for deployments without a separate web server)
const clientBuildPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientBuildPath));

// Catch-all: serve index.html for client-side routes (SPA fallback)
app.get('*', (req, res) => {
  const indexFile = path.join(clientBuildPath, 'index.html');
  console.log(`🌐 SPA fallback: ${req.path}`);
  res.sendFile(indexFile, (err) => {
    if (err) {
      console.error(`⚠️  Production build not found at ${indexFile}. Run 'npm run build' in the client folder.`);
      res.status(404).json({ message: 'Route not found' });
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
