# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### ❌ "No Authentication Token, Access Denied"

**Problem:** You're logged in but can't upload images or create projects.

**Solutions:**

1. **Check if you're actually logged in:**
   - Open browser console (F12)
   - Type: `localStorage.getItem('token')`
   - Should return a long string (JWT token)
   - If `null`, you're not logged in - go to `/login`

2. **Clear cache and re-login:**
   ```javascript
   // In browser console:
   localStorage.clear();
   // Then go to /login and login again
   ```

3. **Check browser console for errors:**
   - Press F12 to open DevTools
   - Go to Console tab
   - Look for red errors
   - Check Network tab for failed requests

4. **Verify token is being sent:**
   - Open Network tab in DevTools (F12)
   - Try to upload/create something
   - Click on the failed request
   - Check "Request Headers"
   - Should see: `Authorization: Bearer eyJhbG...`
   - If missing, refresh the page and try again

5. **Restart frontend:**
   ```bash
   # Stop the frontend (Ctrl+C)
   # Start it again
   cd client
   npm run dev
   ```

---

### ❌ Images Not Displaying in Admin Panel

**Problem:** Uploaded images show broken image icon.

**Solutions:**

1. **Check backend is running:**
   - Backend should be on port 5000
   - Visit: http://localhost:5000/api
   - Should see API documentation

2. **Verify image exists:**
   ```bash
   # Check uploads folder
   ls server/uploads/
   # Should see your uploaded images
   ```

3. **Check image URL:**
   - Right-click broken image → "Inspect"
   - Look at `src` attribute
   - Should be: `http://localhost:5000/uploads/filename.jpg`
   - Try visiting that URL directly in browser

4. **CORS issue:**
   - Check browser console for CORS errors
   - Backend should allow requests from `http://localhost:5173`

---

### ❌ Can't Login - "Invalid Credentials"

**Problem:** Login fails even with correct password.

**Solutions:**

1. **Username is case-sensitive (sort of):**
   - Usernames are stored lowercase
   - "Admin" becomes "admin" 
   - Try logging in with lowercase

2. **Create new admin user:**
   ```bash
   cd server
   npm run create-admin
   ```

3. **Check MongoDB is running:**
   ```bash
   # Windows
   net start MongoDB
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

4. **Verify user exists in database:**
   ```bash
   mongosh
   use construction-company
   db.users.find()
   ```

---

### ❌ "Token Expired" Error

**Problem:** You were logged in, now you're not.

**Solution:**
- Tokens expire after 7 days
- Simply login again: http://localhost:5173/login
- Token will be refreshed automatically

---

### ❌ Can't Access Admin Page

**Problem:** Gets redirected to login even after logging in.

**Solutions:**

1. **Check token is saved:**
   ```javascript
   // Browser console
   localStorage.getItem('token')
   ```

2. **Clear localStorage and login again:**
   ```javascript
   localStorage.clear();
   window.location.href = '/login';
   ```

3. **Check for JavaScript errors:**
   - F12 → Console
   - Look for red errors
   - Fix any errors shown

4. **Hard refresh:**
   - Windows/Linux: Ctrl + Shift + R
   - Mac: Cmd + Shift + R

---

### ❌ "Page Not Found" (404) on Page Refresh

**Problem:** Refreshing the page (F5) on routes like `/projects`, `/contact`, `/admin` gives a 404 error.

**Solutions:**

1. **Development mode (Vite dev server on port 5173):**
   - Always access the app via `http://localhost:5173` — Vite handles SPA routing automatically
   - Do **not** access routes directly through `http://localhost:5000` in development
   - Make sure both backend (`npm run dev` in `server/`) and frontend (`npm run dev` in `client/`) are running

2. **Production mode:**
   - Build the frontend first: `cd client && npm run build`
   - The backend catch-all route then serves `client/dist/index.html` for all non-API routes
   - Check backend logs for: `⚠️  Production build not found` — if you see this, run the build step

3. **Check the backend logs** when a 404 occurs:
   - You should see: `🌐 SPA fallback: /your-route` before the error
   - If the log shows `⚠️  Production build not found`, the `client/dist/` folder is missing

---

### ❌ "CORS Policy" Error

**Problem:** Browser blocks requests to backend.

**Solutions:**

1. **Verify backend CORS config:**
   - Check `server/.env` has: `CLIENT_URL=http://localhost:5173`
   - Restart backend server

2. **Check URL matches:**
   - Frontend on: `http://localhost:5173` (port 5173)
   - Backend on: `http://localhost:5000` (port 5000)
   - Both should use `http://` (not `https://`)

---

### ❌ Projects Not Showing After Creation

**Problem:** Created project but don't see it in list.

**Solutions:**

1. **Refresh the page:**
   - Press F5 or Ctrl+R

2. **Check MongoDB:**
   ```bash
   mongosh
   use construction-company
   db.projects.find()
   ```

3. **Check browser console:**
   - F12 → Console
   - Look for API errors

---

### ❌ Upload Progress Stuck at 0%

**Problem:** Upload progress bar doesn't move.

**Solutions:**

1. **Check file size:**
   - Max 5MB per file
   - Compress images if too large

2. **Check file type:**
   - Only: JPEG, PNG, GIF, WEBP
   - No PDFs, videos, etc.

3. **Check backend logs:**
   - Look at terminal where backend is running
   - Check for error messages

---

### ❌ "MongoDB connection failed"

**Problem:** Backend can't connect to database.

**Solutions:**

1. **Start MongoDB:**
   ```bash
   # Windows
   net start MongoDB
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

2. **Check connection string:**
   - In `server/.env`
   - Should be: `MONGODB_URI=mongodb://localhost:27017/construction-company`

3. **Test connection:**
   ```bash
   mongosh
   # If this connects, MongoDB is running
   ```

---

## 🔍 Debugging Steps

### Step 1: Check Everything is Running

```bash
# Backend should show:
✓ MongoDB Connected: localhost:27017
✓ Server running on port 5000

# Frontend should show:
➜ Local: http://localhost:5173/
```

### Step 2: Check You're Logged In

1. Go to: http://localhost:5173/login
2. Login with your credentials
3. Should redirect to: http://localhost:5173/admin

### Step 3: Check Token

```javascript
// In browser console (F12)
const token = localStorage.getItem('token');
console.log(token ? 'Token exists ✓' : 'No token ✗');
```

### Step 4: Test API

```bash
# Get your token from localStorage
# Then test API:
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📝 Logging for Debugging

### Add console logs in Admin.jsx:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log('Token:', localStorage.getItem('token'));
  console.log('Submitting project:', projectData);
  
  try {
    // ... rest of code
  } catch (error) {
    console.error('Full error:', error);
    console.error('Response:', error.response?.data);
  }
};
```

---

## 🆘 Still Having Issues?

### Collect Information:

1. **Backend logs** (terminal output)
2. **Browser console errors** (F12 → Console)
3. **Network requests** (F12 → Network)
4. **What you're trying to do**
5. **Error message (exact text)**

### Reset Everything:

```bash
# Stop both servers (Ctrl+C)

# Clear browser data
localStorage.clear();

# Restart MongoDB
# (see commands above for your OS)

# Restart backend
cd server
npm run dev

# Restart frontend
cd client  
npm run dev

# Create new admin user
cd server
npm run create-admin

# Login again
Visit: http://localhost:5173/login
```

---

## 📞 Get Help

If you're still stuck:
- Check AUTHENTICATION.md for setup guide
- Check IMAGE_UPLOAD_GUIDE.md for upload help
- Check README.md for general setup
- Contact: support@prestigebuild.com

---

**Most issues are solved by:**
1. ✅ Restart both servers
2. ✅ Clear localStorage and login again  
3. ✅ Check MongoDB is running
4. ✅ Look at browser console for errors
