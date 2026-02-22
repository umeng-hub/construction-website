# 🔍 Login Issue Debug Guide

## Quick Fix Steps

### Step 1: Clear Everything
```javascript
// Open browser console (F12) and run:
localStorage.clear();
sessionStorage.clear();
```

### Step 2: Hard Refresh
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### Step 3: Check Token After Login

After logging in, immediately check:
```javascript
// In browser console:
const token = localStorage.getItem('token');
console.log('Token:', token);
console.log('Token exists:', !!token);
```

Should show a long JWT token string.

---

## Debug Login Flow

### Add Console Logs to Login.jsx

Temporarily add these logs to see what's happening:

```javascript
const Login = () => {
  const { login, isAuthenticated, loading, user } = useAuth();
  
  // Add these console logs:
  console.log('Login Page - isAuthenticated:', isAuthenticated);
  console.log('Login Page - loading:', loading);
  console.log('Login Page - user:', user);

  useEffect(() => {
    console.log('useEffect - isAuthenticated changed:', isAuthenticated);
    if (isAuthenticated) {
      console.log('Redirecting to /admin');
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting login...');
    
    const result = await login(formData.username, formData.password);
    console.log('Login result:', result);
    
    if (result.success) {
      console.log('Login successful!');
    } else {
      console.log('Login failed:', result.message);
      setError(result.message);
      setLoading(false);
    }
  };
```

### Check Console Output

You should see:
1. `Login Page - isAuthenticated: false` (initially)
2. `Submitting login...`
3. `Login result: { success: true }`
4. `Login successful!`
5. `useEffect - isAuthenticated changed: true`
6. `Redirecting to /admin`

If you DON'T see step 5 & 6, the auth context isn't updating properly.

---

## Common Issues

### Issue 1: Token Saves But User Doesn't Update

**Problem:** Token is in localStorage but `isAuthenticated` stays false.

**Debug:**
```javascript
// In AuthContext.jsx, check the login function:
const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    console.log('Login response:', response.data);
    
    const { token: newToken, user: userData } = response.data;
    console.log('Token:', newToken);
    console.log('User data:', userData);
    
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    
    console.log('State updated - token:', newToken, 'user:', userData);
    
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed'
    };
  }
};
```

### Issue 2: Redirect Loop

**Symptoms:** Page keeps refreshing/redirecting.

**Fix:** Make sure the redirect is in useEffect:
```javascript
// ✅ CORRECT
useEffect(() => {
  if (isAuthenticated) {
    navigate('/admin', { replace: true });
  }
}, [isAuthenticated, navigate]);

// ❌ WRONG (causes loop)
if (isAuthenticated) {
  navigate('/admin');
}
```

### Issue 3: Backend Not Returning User Data

**Check backend response:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

Should return:
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

If missing `user` object, backend has an issue.

---

## Test Authentication Manually

### 1. Login via API
```bash
# Replace with your credentials
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

Copy the token from response.

### 2. Test Token Works
```bash
# Replace YOUR_TOKEN with the token from step 1
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Should return your user data.

### 3. Test Protected Endpoint
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Should return projects list.

---

## Nuclear Option: Complete Reset

If nothing works, do a complete reset:

### 1. Stop Everything
```bash
# Stop backend (Ctrl+C)
# Stop frontend (Ctrl+C)
```

### 2. Clear Browser
```javascript
// In console:
localStorage.clear();
sessionStorage.clear();
// Then close all browser tabs
```

### 3. Clear Node Modules
```bash
# Backend
cd server
rm -rf node_modules package-lock.json
npm install

# Frontend
cd ../client
rm -rf node_modules package-lock.json
npm install
```

### 4. Recreate Admin User
```bash
cd server
npm run create-admin
# Use NEW credentials
```

### 5. Start Fresh
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

### 6. Login Again
- Go to: http://localhost:5173/login
- Use NEW credentials from step 4
- Check console for logs

---

## Still Not Working?

### Collect Debug Info:

1. **Browser Console Output**
   - Press F12 → Console
   - Copy ALL logs (especially errors in red)

2. **Network Tab**
   - F12 → Network
   - Try to login
   - Click on the POST request to `/api/auth/login`
   - Copy the Response

3. **Backend Logs**
   - Copy terminal output from backend server

4. **localStorage Check**
   ```javascript
   console.log(localStorage.getItem('token'));
   ```

5. **Auth State**
   ```javascript
   // Add to Login.jsx
   const auth = useAuth();
   console.log('Full auth state:', auth);
   ```

Share this info for further debugging.

---

## Alternative: Bypass Auth Temporarily

If you need to test other features, temporarily disable auth:

### In `client/src/App.jsx`:
```javascript
// Comment out ProtectedRoute temporarily
<Route 
  path="/admin" 
  element={<Admin />}  // Remove ProtectedRoute wrapper
/>
```

**⚠️ Remember to re-enable before production!**

---

## Expected Flow (What Should Happen)

1. User enters credentials on `/login`
2. Frontend sends POST to `/api/auth/login`
3. Backend validates and returns token + user data
4. Frontend saves token to localStorage
5. Frontend updates user state in AuthContext
6. `isAuthenticated` becomes `true`
7. useEffect in Login.jsx detects change
8. Redirects to `/admin`
9. ProtectedRoute checks `isAuthenticated`
10. If true, shows Admin page
11. All API requests include token in header

If any step fails, login won't work. Use the debug logs above to find which step is failing.
