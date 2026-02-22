# Deployment Guide

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- Git installed

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd construction-website
```

2. **Create environment files**
```bash
# Backend
cp server/.env.example server/.env

# Frontend
cp client/.env.example client/.env
```

3. **Start with Docker Compose**
```bash
docker-compose up -d
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- MongoDB: mongodb://localhost:27017

## Manual Deployment

### 1. Server Setup (Ubuntu/Debian)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Nginx
sudo apt install -y nginx

# Install PM2 (Process Manager)
sudo npm install -g pm2
```

### 2. Deploy Backend

```bash
# Navigate to server directory
cd /var/www/construction-website/server

# Install dependencies
npm ci --only=production

# Create .env file
nano .env
# Add your production environment variables

# Start with PM2
pm2 start src/server.js --name construction-api
pm2 save
pm2 startup
```

### 3. Deploy Frontend

```bash
# Navigate to client directory
cd /var/www/construction-website/client

# Install dependencies
npm ci

# Create production .env
nano .env
# Add your production API URL

# Build for production
npm run build

# Files will be in dist/ directory
```

### 4. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/construction-website
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend
    location / {
        root /var/www/construction-website/client/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/construction-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
sudo certbot renew --dry-run
```

## Platform-Specific Deployments

### Vercel (Frontend)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd client
vercel
```

3. Set environment variables in Vercel dashboard

### Heroku (Backend)

1. Install Heroku CLI and login:
```bash
heroku login
```

2. Create app:
```bash
cd server
heroku create construction-api
```

3. Add MongoDB addon:
```bash
heroku addons:create mongolab
```

4. Deploy:
```bash
git subtree push --prefix server heroku main
```

### Railway (Full Stack)

1. Connect GitHub repository to Railway
2. Configure environment variables
3. Deploy automatically on push

### DigitalOcean App Platform

1. Connect GitHub repository
2. Configure build commands:
   - Backend: `npm install && npm start`
   - Frontend: `npm install && npm run build`
3. Set environment variables
4. Deploy

## Post-Deployment Checklist

- [ ] Verify all environment variables are set correctly
- [ ] Test all API endpoints
- [ ] Check database connectivity
- [ ] Verify SSL certificate is working
- [ ] Test contact form submission
- [ ] Check responsive design on mobile devices
- [ ] Verify all images load correctly
- [ ] Test navigation and routing
- [ ] Set up monitoring (e.g., UptimeRobot)
- [ ] Configure backups for MongoDB
- [ ] Set up error logging (e.g., Sentry)
- [ ] Configure analytics (e.g., Google Analytics)

## Monitoring and Maintenance

### PM2 Commands
```bash
pm2 status                 # Check status
pm2 logs construction-api  # View logs
pm2 restart construction-api  # Restart app
pm2 stop construction-api  # Stop app
```

### MongoDB Backup
```bash
# Backup
mongodump --db construction-company --out /backup/$(date +%Y%m%d)

# Restore
mongorestore --db construction-company /backup/20240101/construction-company
```

### Update Application
```bash
# Pull latest changes
git pull origin main

# Update backend
cd server
npm install
pm2 restart construction-api

# Update frontend
cd ../client
npm install
npm run build
```

## Troubleshooting

### Backend not starting
- Check MongoDB is running: `sudo systemctl status mongod`
- Verify environment variables in `.env`
- Check PM2 logs: `pm2 logs construction-api`

### Frontend not loading
- Check Nginx configuration: `sudo nginx -t`
- Verify build files exist in `client/dist`
- Check browser console for errors

### Database connection issues
- Verify MongoDB URI in `.env`
- Check firewall rules
- Ensure MongoDB is accepting connections

## Support

For deployment support, contact: support@prestigebuild.com
