# Prestige Build - Construction Company Website

A modern, responsive, and professional full-stack construction company website built with React, Node.js, Express, and MongoDB.

## 🏗️ Features

### Frontend
- **Modern React Architecture**: Built with React 18 and Vite for optimal performance
- **Premium Design System**: Custom Tailwind CSS configuration with elegant color palette and typography
- **Smooth Animations**: Framer Motion for polished transitions and micro-interactions
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **SEO Optimized**: Semantic HTML and meta tags for better search visibility

### Backend
- **RESTful API**: Clean Express.js API with proper routing and middleware
- **MongoDB Database**: Scalable NoSQL database for flexible data management
- **Input Validation**: Server-side validation with express-validator
- **Security**: Helmet.js for HTTP headers, CORS protection
- **Performance**: Compression middleware and optimized queries

### Pages
1. **Home**: Hero section, services overview, featured projects, stats, and CTA
2. **About**: Company story, core values, team members
3. **Services**: Detailed service descriptions with features
4. **Projects**: Filterable portfolio of completed projects
5. **Contact**: Contact form with validation, company info, and map section

## 🚀 Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Framer Motion
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Express Validator
- Helmet (Security)
- Morgan (Logging)
- CORS
- Compression

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd construction-website
```

2. **Install Backend Dependencies**
```bash
cd server
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../client
npm install
```

4. **Configure Environment Variables**

**Backend** (`server/.env`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/construction-company
CLIENT_URL=http://localhost:5173
```

**Frontend** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

5. **Start MongoDB**
```bash
# Make sure MongoDB is running
mongod
```

6. **Start the Backend Server**
```bash
cd server
npm run dev
```

7. **Start the Frontend Development Server**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## 🗂️ Project Structure

```
construction-website/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Contact.jsx
│   │   ├── services/      # API services
│   │   │   └── api.js
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── server/                # Backend Node.js application
    ├── src/
    │   ├── config/        # Configuration files
    │   │   └── database.js
    │   ├── controllers/   # Route controllers
    │   │   ├── projectController.js
    │   │   ├── contactController.js
    │   │   └── serviceController.js
    │   ├── models/        # Mongoose models
    │   │   ├── Project.js
    │   │   ├── Contact.js
    │   │   └── Service.js
    │   ├── routes/        # API routes
    │   │   ├── projects.js
    │   │   ├── contacts.js
    │   │   └── services.js
    │   └── server.js      # Main server file
    ├── uploads/           # File uploads directory
    └── package.json
```

## 🔌 API Endpoints

### Projects
- `GET /api/projects` - Get all projects (with optional filters)
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:slug` - Get service by slug
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Contacts
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Submit contact form
- `PATCH /api/contacts/:id/status` - Update contact status
- `DELETE /api/contacts/:id` - Delete contact

## 🎨 Design System

### Colors
- **Primary**: Deep blue tones (#2c4f6f) - Professional and trustworthy
- **Accent**: Golden yellow (#ffaa00) - Energy and quality
- **Neutral**: Gray scale - Balance and sophistication

### Typography
- **Display Font**: Cormorant Garamond (Serif) - Elegant headlines
- **Body Font**: Work Sans (Sans-serif) - Clean, readable text
- **Mono Font**: JetBrains Mono - Code and technical details

### Components
- Premium card designs with shadows
- Smooth animations and transitions
- Consistent spacing and layout
- Mobile-first responsive design

## 🏭 Production Deployment

### Build Frontend
```bash
cd client
npm run build
```

### Environment Variables for Production
Update your `.env` files with production values:
- Set `NODE_ENV=production`
- Use production MongoDB URI
- Configure proper CORS settings
- Add SSL certificates for HTTPS

### Deployment Options

#### Option 1: Traditional Hosting (VPS/Dedicated Server)
1. Deploy backend to a Node.js hosting service
2. Deploy frontend to a static hosting service (Netlify, Vercel, etc.)
3. Configure environment variables
4. Set up reverse proxy with Nginx

#### Option 2: Platform as a Service (PaaS)
- **Backend**: Heroku, Railway, Render
- **Frontend**: Vercel, Netlify
- **Database**: MongoDB Atlas

#### Option 3: Containerization
- Use Docker for both frontend and backend
- Deploy to AWS ECS, Google Cloud Run, or DigitalOcean App Platform

### Example Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /var/www/construction-website/client/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔒 Security Considerations

- Enable HTTPS in production
- Use environment variables for sensitive data
- Implement rate limiting for API endpoints
- Add authentication for admin routes
- Sanitize user inputs
- Keep dependencies updated
- Use MongoDB connection string with authentication

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Navigation works on all devices
- [ ] Contact form submits successfully
- [ ] Project filtering works
- [ ] API endpoints respond correctly
- [ ] Images load properly
- [ ] Animations are smooth
- [ ] Mobile responsiveness

### Recommended Testing Tools
- Jest for unit testing
- React Testing Library for component testing
- Cypress for E2E testing
- Postman for API testing

## 📝 License

MIT License - Feel free to use this project for your construction company!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Future Enhancements

- [ ] Admin dashboard for content management
- [ ] Image upload functionality
- [ ] Project detail pages
- [ ] Blog section
- [ ] Client testimonials
- [ ] Online quote calculator
- [ ] Photo gallery with lightbox
- [ ] Email notifications for contact forms
- [ ] Integration with Google Maps API
- [ ] Multi-language support
- [ ] Dark mode theme

## 📧 Support

For support and questions, please contact: info@prestigebuild.com

---

Built with ❤️ by the Prestige Build team
