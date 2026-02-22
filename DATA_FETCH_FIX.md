# 🔧 Quick Fix: Data Fetching Issues

## Problem: Testimonials and Login Can't Fetch Data

### ✅ **FIXED IN THIS UPDATE**

The issue was that some pages were using `axios` directly without the base URL configuration.

**What was fixed:**
1. ✅ Added `testimonialsAPI` to `client/src/services/api.js`
2. ✅ Added `statsAPI` to `client/src/services/api.js`
3. ✅ Updated `Testimonials.jsx` to use `testimonialsAPI`
4. ✅ Updated `Home.jsx` to use proper API services

---

## 🚀 How to Apply the Fix

### Option 1: Extract New ZIP
1. Extract the updated ZIP
2. Replace your `client/src` folder
3. Restart frontend

### Option 2: Manual Update
Replace these files from the new ZIP:
- `client/src/services/api.js`
- `client/src/pages/Testimonials.jsx`
- `client/src/pages/Home.jsx`

---

## 🧪 Testing the Fix

### 1. Check Backend is Running

```bash
# Backend should be on port 5000
curl http://localhost:5000/api/health

# Should return:
{"status":"OK","message":"Server is running"}
```

### 2. Test Testimonials Endpoint

```bash
curl http://localhost:5000/api/testimonials
```

Should return an array of testimonials.

### 3. Test Stats Endpoint

```bash
curl http://localhost:5000/api/stats/home
```

Should return:
```json
{
  "projectsCompleted": 6,
  "happyClients": 8,
  "yearsOfExperience": 10,
  "satisfactionRate": 98
}
```

### 4. Test Login Endpoint

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

Should return token and user data.

---

## 🔍 Still Having Issues?

### Issue 1: Backend Not Running

**Symptoms:**
- All API calls fail
- Can't connect to localhost:5000

**Solution:**
```bash
cd server
npm run dev
```

Should see:
```
✓ MongoDB Connected
✓ Server running on port 5000
```

---

### Issue 2: MongoDB Not Connected

**Symptoms:**
- Backend runs but API calls return errors
- "MongoDB connection failed" in logs

**Solution:**
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

---

### Issue 3: Database Not Seeded

**Symptoms:**
- API calls work but return empty arrays
- No projects, testimonials, or services

**Solution:**
```bash
cd server
npm run seed
```

Should see:
```
✓ Inserted 6 projects
✓ Inserted 4 services
✓ Inserted 8 testimonials
```

---

### Issue 4: CORS Errors in Browser

**Symptoms:**
- Browser console shows "blocked by CORS policy"
- Backend running but frontend can't connect

**Solution:**

Check `server/.env`:
```env
CLIENT_URL=http://localhost:5173
```

Restart backend:
```bash
cd server
npm run dev
```

---

### Issue 5: Wrong API URL

**Symptoms:**
- API calls go to wrong URL
- 404 errors

**Solution:**

Check `client/.env` or create it:
```env
VITE_API_URL=http://localhost:5000/api
```

Restart frontend:
```bash
cd client
npm run dev
```

---

## 📊 Check Environment Variables

### Backend (server/.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/construction-company
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
```

### Frontend (client/.env) - Optional
```env
VITE_API_URL=http://localhost:5000/api
```

**Note:** If `client/.env` doesn't exist, the app uses `http://localhost:5000/api` by default.

---

## 🐛 Debug Steps

### 1. Open Browser DevTools (F12)

**Check Console Tab:**
- Look for red errors
- Check what API URLs are being called

**Check Network Tab:**
- Filter by "XHR" or "Fetch"
- Look for failed requests
- Click on failed request to see details

### 2. Check Backend Logs

In terminal where backend is running:
- Look for errors
- Check if routes are registered
- Verify MongoDB connection

### 3. Test API Directly

Use the curl commands above or visit in browser:
- http://localhost:5000/api
- http://localhost:5000/api/testimonials
- http://localhost:5000/api/stats/home

---

## ✅ Verification Checklist

After applying the fix:

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB running and connected
- [ ] Database seeded with sample data
- [ ] Can visit http://localhost:5000/api (shows API info)
- [ ] Can visit http://localhost:5173 (shows homepage)
- [ ] Homepage shows stats (not all zeros)
- [ ] Testimonials page loads
- [ ] Can submit testimonial form
- [ ] Login page loads
- [ ] Can login with admin credentials
- [ ] No errors in browser console

---

## 🎯 Common Mistakes

❌ **Forgot to restart servers after changes**
```bash
# Always restart after making changes
cd server && npm run dev
cd client && npm run dev
```

❌ **Backend and frontend on wrong ports**
```
Backend should be: http://localhost:5000
Frontend should be: http://localhost:5173
```

❌ **Forgot to seed database**
```bash
cd server
npm run seed
```

❌ **MongoDB not running**
```bash
# Check if MongoDB is running
mongosh
# If this connects, MongoDB is running
```

---

## 🆘 Nuclear Option (Complete Reset)

If nothing works, start fresh:

```bash
# 1. Stop all servers (Ctrl+C)

# 2. Clear browser data
# Open browser console (F12)
localStorage.clear();
# Close all browser tabs

# 3. Backend
cd server
rm -rf node_modules
npm install
npm run seed
npm run create-admin
npm run dev

# 4. Frontend (new terminal)
cd client
rm -rf node_modules
npm install
npm run dev

# 5. Try again
Visit: http://localhost:5173
```

---

## 📞 Still Stuck?

If you've tried everything:

1. **Check exact error message** in browser console
2. **Check backend logs** for errors
3. **Verify all environment variables** are set
4. **Make sure ports aren't blocked** by firewall
5. **Try a different browser** (to rule out browser issues)

---

## 🎉 Success!

Once everything works:
- Homepage shows real stats (not zeros)
- Testimonials page loads with reviews
- Can submit new testimonials
- Login works and redirects to admin
- Can upload images
- Can create projects

---

**The fix is in the updated ZIP. Extract and restart your servers!** ✨
