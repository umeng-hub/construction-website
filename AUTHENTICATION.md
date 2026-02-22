# 🔐 Authentication & Security Guide

## Overview

Your construction website now has a complete authentication system to protect the admin dashboard. Only logged-in users can access the admin panel and upload images.

---

## 🚀 Quick Setup

### 1. Install New Dependencies

```bash
cd server
npm install
```

This installs:
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation

### 2. Update Environment Variables

Add to your `server/.env` file:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Important**: Change this to a random string in production!

### 3. Create Your First Admin User

```bash
cd server
npm run create-admin
```

Follow the prompts:
```
Enter username: admin
Enter email: admin@prestigebuild.com
Enter password: yourSecurePassword123
```

✅ Admin user created successfully!

### 4. Restart Your Servers

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

### 5. Login

Visit: **http://localhost:5173/login**

Use the credentials you just created!

---

## 🔒 What's Protected Now?

### Protected Routes (Require Login):

✅ **Admin Dashboard** - `/admin`  
✅ **Create Projects** - `POST /api/projects`  
✅ **Update Projects** - `PUT /api/projects/:id`  
✅ **Delete Projects** - `DELETE /api/projects/:id`  
✅ **Upload Images** - `POST /api/uploads/single` & `/api/uploads/multiple`  
✅ **Delete Images** - `DELETE /api/uploads/:filename`  
✅ **List Uploads** - `GET /api/uploads`

### Public Routes (No Login Required):

✅ **Website Pages** - Home, About, Services, Projects, Contact  
✅ **View Projects** - `GET /api/projects`  
✅ **View Services** - `GET /api/services`  
✅ **Submit Contact Form** - `POST /api/contacts`

---

## 🎯 How It Works

### Authentication Flow:

1. **User logs in** at `/login`
2. **Server verifies** credentials
3. **JWT token generated** and sent to client
4. **Token stored** in localStorage
5. **Token sent** with every API request
6. **Server validates** token before allowing access

### Token Structure:

```json
{
  "userId": "507f1f77bcf86cd799439011",
  "iat": 1707995400,
  "exp": 1708600200
}
```

Token expires after **7 days** (configurable)

---

## 🔐 Security Features

### Implemented:

✅ **Password Hashing** - bcrypt with salt rounds  
✅ **JWT Tokens** - Secure authentication  
✅ **Protected Routes** - Middleware authentication  
✅ **Token Expiration** - Auto logout after 7 days  
✅ **HTTPS Ready** - Works with SSL/TLS  
✅ **No Password in Responses** - Stripped from JSON

### Recommended for Production:

- [ ] Rate limiting on login attempts
- [ ] Password reset functionality  
- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] Session management
- [ ] IP whitelisting for admin
- [ ] Audit logging

---

## 👤 User Management

### Create Additional Admin Users:

```bash
cd server
npm run create-admin
```

### Via MongoDB (Advanced):

```javascript
// Connect to MongoDB
use construction-company

// View all users
db.users.find()

// Deactivate a user
db.users.updateOne(
  { username: "oldadmin" },
  { $set: { isActive: false } }
)

// Delete a user
db.users.deleteOne({ username: "oldadmin" })
```

---

## 🖥️ Using the Admin Dashboard

### 1. Login

Go to: http://localhost:5173/login

### 2. Access Admin Panel

After login, you'll be redirected to: http://localhost:5173/admin

### 3. Logout

Click the "Logout" button in the top-right corner

---

## 🔧 API Usage with Authentication

### Get Your Token:

**Login Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourPassword"}'
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "email": "admin@prestigebuild.com",
    "role": "admin"
  }
}
```

### Use Token in Requests:

```bash
# Upload image
curl -X POST http://localhost:5000/api/uploads/single \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "image=@/path/to/image.jpg"

# Create project
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"New Project","description":"...","category":"residential",...}'
```

---

## 🔄 Frontend Authentication

### Using the Auth Context:

```javascript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();

  // Login
  const handleLogin = async () => {
    const result = await login('admin', 'password');
    if (result.success) {
      console.log('Logged in!');
    }
  };

  // Logout
  const handleLogout = () => {
    logout();
  };

  // Check if authenticated
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return <div>Welcome {user.username}!</div>;
}
```

### Protecting Routes:

```javascript
import ProtectedRoute from './components/ProtectedRoute';

<Route 
  path="/admin" 
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  } 
/>
```

---

## 🛠️ Troubleshooting

### "Invalid credentials" Error

✓ Check username and password  
✓ Ensure user exists: `npm run create-admin`  
✓ Username is case-insensitive (stored lowercase)

### "Token expired" Error

✓ Token expires after 7 days  
✓ Login again to get a new token  
✓ Token is stored in localStorage

### "Not authorized" Error

✓ Check token is being sent  
✓ Verify token in localStorage  
✓ Check browser console for errors

### Can't Access Admin Page

✓ Make sure you're logged in  
✓ Clear browser cache and cookies  
✓ Check if token exists: `localStorage.getItem('token')`

### Images Not Showing

✓ Check backend server is running on port 5000  
✓ Verify images exist in `server/uploads/`  
✓ Check browser console for CORS errors

---

## 🔐 Changing Your Password

### Via Admin Dashboard (Coming Soon):

We'll add a password change feature in the next update.

### Via MongoDB:

```javascript
// Connect to MongoDB
use construction-company

// View user
db.users.findOne({ username: "admin" })

// Note: You can't directly change password due to hashing
// Create a new user instead or use the create-admin script
```

---

## 📱 Production Deployment

### Environment Variables:

Make sure to set in production:

```env
NODE_ENV=production
JWT_SECRET=super-long-random-string-at-least-32-characters
MONGODB_URI=mongodb+srv://...
```

### Generate Secure JWT Secret:

```bash
# Generate random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Security Checklist:

- [ ] Use HTTPS (SSL/TLS certificate)
- [ ] Set secure JWT_SECRET
- [ ] Use environment variables (not hardcoded)
- [ ] Enable MongoDB authentication
- [ ] Use strong passwords (12+ characters)
- [ ] Set up firewall rules
- [ ] Enable CORS properly
- [ ] Add rate limiting
- [ ] Keep dependencies updated
- [ ] Monitor for suspicious activity

---

## 🌐 Hiding Admin Page from Public

The admin page is now **protected**:

✅ **Not visible in navigation** - No link in navbar/footer  
✅ **Login required** - Redirects to login page  
✅ **Protected API endpoints** - Can't create/edit without token  
✅ **Manual URL access** - Requires authentication

### Additional Protection:

**1. robots.txt** (Prevent search engines):

Create `client/public/robots.txt`:
```
User-agent: *
Disallow: /admin
Disallow: /login
```

**2. Remove from Sitemap**:

Don't include `/admin` or `/login` in your sitemap.xml

**3. Add Security Headers**:

Already configured with Helmet.js in the backend!

---

## 📚 API Endpoints Reference

### Authentication Endpoints:

- `POST /api/auth/register` - Register new admin (can be disabled in production)
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/logout` - Logout
- `POST /api/auth/change-password` - Change password (requires auth)

### Protected Endpoints:

All these require `Authorization: Bearer TOKEN` header:

- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/uploads/single` - Upload single image
- `POST /api/uploads/multiple` - Upload multiple images
- `DELETE /api/uploads/:filename` - Delete image
- `GET /api/uploads` - List uploads

---

## 🎓 Best Practices

### Password Security:

✅ **Use strong passwords**: 12+ characters, mix of upper/lower/numbers/symbols  
✅ **Don't share credentials**: Each admin gets their own account  
✅ **Change default passwords**: Never use "admin/admin"  
✅ **Regular updates**: Change passwords every 90 days

### Token Security:

✅ **Keep tokens secret**: Never share your token  
✅ **Don't commit tokens**: Add to .gitignore  
✅ **Use HTTPS**: Always use SSL in production  
✅ **Short expiration**: 7 days is reasonable (configurable)

### Account Security:

✅ **Limit admin accounts**: Only create what you need  
✅ **Monitor activity**: Check for suspicious logins  
✅ **Deactivate old accounts**: Remove unused users  
✅ **Use 2FA**: Implement when possible

---

## 📞 Need Help?

- Check the main README.md
- Review API documentation at http://localhost:5000/api
- Contact: support@prestigebuild.com

---

**Your admin dashboard is now secure! 🔐🏗️**
