# 🖼️ Image Upload & Display Troubleshooting

## Quick Diagnosis

### Step 1: Check if images are being uploaded

```bash
# Navigate to server folder
cd server

# List uploaded files
ls -la uploads/

# Or on Windows:
dir uploads\
```

**Expected:** You should see image files like `image-1234567890-987654321.jpg`

**If empty:** Images aren't being uploaded successfully.

---

### Step 2: Test if server can serve the image

After uploading an image, note the filename. Then test:

**In browser, visit:**
```
http://localhost:5000/uploads/YOUR-IMAGE-FILENAME.jpg
```

**Example:**
```
http://localhost:5000/uploads/house-1707995400000-123456789.jpg
```

**Expected:** Image should display in browser.

**If 404 error:** Server isn't serving uploads folder correctly.

**If image shows:** Server is working! Problem is in frontend URL construction.

---

## Common Issues & Solutions

### Issue 1: Images Upload But Don't Display

**Symptoms:**
- Upload succeeds (shows success message)
- Files exist in `server/uploads/`
- Images don't show on frontend
- Browser shows broken image icon

**Solution:**

1. **Check browser console** (F12):
   - Look for 404 errors
   - Copy the image URL that failed
   - Try opening that URL directly

2. **Verify image URL format:**
   ```javascript
   // In browser console on Projects page:
   document.querySelectorAll('img').forEach(img => {
     console.log(img.src);
   });
   ```
   
   Should show:
   ```
   http://localhost:5000/uploads/filename.jpg
   ```
   
   NOT:
   ```
   http://localhost:5173/uploads/filename.jpg  ❌ Wrong port
   /uploads/filename.jpg                       ❌ Missing domain
   ```

3. **Restart backend server:**
   ```bash
   # Stop server (Ctrl+C)
   cd server
   npm run dev
   ```
   
   You should see:
   ```
   📁 Serving uploads from: /path/to/server/uploads
   ```

---

### Issue 2: CORS Error Loading Images

**Symptoms:**
- Browser console shows: "blocked by CORS policy"
- Images exist and URL is correct

**Solution:**

Check `server/src/server.js` has:
```javascript
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
```

---

### Issue 3: Images Upload to Wrong Location

**Symptoms:**
- Upload succeeds
- Can't find files in `server/uploads/`

**Solution:**

1. **Search for uploaded files:**
   ```bash
   # From project root
   find . -name "*.jpg" -type f
   
   # Windows PowerShell:
   Get-ChildItem -Path . -Filter *.jpg -Recurse
   ```

2. **Check upload config:**
   ```bash
   cat server/src/config/upload.js
   ```
   
   Should have:
   ```javascript
   destination: (req, file, cb) => {
     cb(null, path.join(__dirname, '../../uploads'));
   }
   ```

3. **Ensure uploads folder exists:**
   ```bash
   mkdir -p server/uploads
   chmod 755 server/uploads  # Linux/Mac
   ```

---

### Issue 4: File Permissions Error

**Symptoms:**
- Error: "EACCES: permission denied"
- Upload fails

**Solution:**

**Linux/Mac:**
```bash
chmod 755 server/uploads
chmod 644 server/uploads/*
```

**Windows:**
- Right-click `server/uploads` folder
- Properties → Security
- Give yourself Full Control

---

### Issue 5: Images Show in Admin But Not Projects Page

**Symptoms:**
- Admin panel shows images fine
- Projects page shows broken images

**Solution:**

The `getImageUrl()` helper is different. Check `client/src/pages/Projects.jsx`:

```javascript
const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http')) return imageUrl;
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const baseUrl = apiUrl.replace('/api', '');
  return `${baseUrl}${imageUrl}`;
};
```

And it's being used:
```javascript
<img src={getImageUrl(project.images[0].url)} />
```

---

## Manual Testing

### Test 1: Upload via API

```bash
# Create a test image or use any image file
curl -X POST http://localhost:5000/api/uploads/single \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/path/to/test-image.jpg"
```

**Expected response:**
```json
{
  "message": "File uploaded successfully",
  "file": {
    "filename": "test-image-1707995400000-123456789.jpg",
    "url": "/uploads/test-image-1707995400000-123456789.jpg"
  }
}
```

### Test 2: Access the uploaded image

```bash
curl -I http://localhost:5000/uploads/test-image-1707995400000-123456789.jpg
```

**Expected:** HTTP 200 OK

---

## Debugging Steps

### 1. Enable Debug Logging

Add to `server/src/controllers/uploadController.js`:

```javascript
export const uploadSingle = async (req, res) => {
  try {
    console.log('📸 Upload request received');
    console.log('File:', req.file);
    
    if (!req.file) {
      console.log('❌ No file in request');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('✅ File saved to:', req.file.path);
    console.log('📍 URL will be:', `/uploads/${req.file.filename}`);
    
    const fileUrl = `/uploads/${req.file.filename}`;
    
    res.status(200).json({
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        url: fileUrl,
        fullPath: req.file.path  // Debug only
      }
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ message: error.message });
  }
};
```

### 2. Check Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Upload an image
4. Look at the upload request:
   - Should be POST to `/api/uploads/single`
   - Check Response tab for the returned URL
5. Try to view a project with images
6. Look for GET requests to `/uploads/...`
   - Should be 200 OK
   - If 404, URL is wrong

### 3. Verify Database Storage

```bash
mongosh
use construction-company
db.projects.findOne({ images: { $exists: true, $ne: [] } })
```

Check the `images` array:
```javascript
images: [
  {
    url: "/uploads/filename.jpg",  // ✅ Correct
    alt: "Project image"
  }
]
```

NOT:
```javascript
images: [
  {
    url: "http://localhost:5000/uploads/filename.jpg",  // ❌ Wrong - contains domain
    alt: "Project image"
  }
]
```

---

## Complete Reset

If nothing works, do a complete reset:

### 1. Clear Uploads Folder
```bash
rm -rf server/uploads/*
# Keep the .gitkeep file
touch server/uploads/.gitkeep
```

### 2. Clear Database Projects
```bash
mongosh
use construction-company
db.projects.deleteMany({})
```

### 3. Restart Everything
```bash
# Stop both servers

# Backend
cd server
npm run dev

# Frontend
cd client  
npm run dev
```

### 4. Test Upload Fresh
1. Login to admin: http://localhost:5173/admin
2. Create new project
3. Upload ONE test image
4. Check:
   - File exists in `server/uploads/`
   - Visit `http://localhost:5000/uploads/FILENAME.jpg`
   - View project in Projects page

---

## Environment Variables Check

**Backend** (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/construction-company
```

**Frontend** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

**Important:** If you change ports, update URLs everywhere!

---

## Common Mistakes

❌ **Wrong:** Uploading with full URL
```javascript
{ url: "http://localhost:5000/uploads/file.jpg" }
```

✅ **Correct:** Uploading with relative path
```javascript
{ url: "/uploads/file.jpg" }
```

---

❌ **Wrong:** Frontend on wrong port
```
Frontend: http://localhost:3000
Backend:  http://localhost:5000
Images:   http://localhost:3000/uploads/file.jpg  ❌ Won't work
```

✅ **Correct:** 
```
Frontend: http://localhost:5173
Backend:  http://localhost:5000
Images:   http://localhost:5000/uploads/file.jpg  ✅ Works
```

---

## Quick Fix Checklist

Run through this checklist:

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB running
- [ ] Logged in to admin panel
- [ ] `server/uploads/` folder exists
- [ ] `server/uploads/` has write permissions
- [ ] Can visit `http://localhost:5000/api` (shows API info)
- [ ] Can visit `http://localhost:5000/uploads/` (shows file list or 404)
- [ ] Browser console shows no errors
- [ ] Network tab shows image requests going to port 5000 (not 5173)

---

## Still Not Working?

Collect this info:

1. **Backend logs:**
   - Copy terminal output from `npm run dev`

2. **Browser console:**
   - F12 → Console
   - Copy any red errors

3. **Network tab:**
   - F12 → Network
   - Filter by "uploads"
   - Screenshot failed requests

4. **File system:**
   ```bash
   ls -la server/uploads/
   ```

5. **Database:**
   ```bash
   mongosh
   use construction-company
   db.projects.findOne({}, { images: 1 })
   ```

6. **Test direct access:**
   - Visit: http://localhost:5000/uploads/
   - What do you see?

Share this info for further debugging!

---

**Remember:** After ANY change to `server/src/server.js`, you MUST restart the backend server!
