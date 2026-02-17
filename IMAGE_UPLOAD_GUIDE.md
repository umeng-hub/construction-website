# Image Upload Guide

## 📸 How to Upload Project Photos

The website now includes a complete image upload system! You can add photos to your projects through the Admin Dashboard.

---

## 🚀 Quick Start

### 1. Access the Admin Dashboard

Go to: **http://localhost:5173/admin**

### 2. Add a New Project

Click the **"+ Add New Project"** button

### 3. Fill in Project Details

- Project Title
- Category (Residential, Apartment, Renovation, Commercial)
- Description
- Location
- Completion Date
- Project Stats (Area, Duration, Client)
- Status (Completed, Ongoing, Upcoming)
- Featured (checkbox to show on homepage)

### 4. Upload Images

**Upload Single or Multiple Images:**
- Click "Choose Files" in the image upload section
- Select up to 10 images (JPEG, PNG, GIF, WEBP)
- Max 5MB per file
- Click "Upload Images"

**Manage Uploaded Images:**
- Preview shows thumbnails
- Hover over an image and click the X to remove it
- Images are automatically saved with the project

### 5. Save the Project

Click **"Create Project"** to save everything!

---

## 🔧 API Endpoints for Image Upload

### Upload Single Image
```bash
POST http://localhost:5000/api/uploads/single
Content-Type: multipart/form-data
Body: form-data with key "image"
```

**Example with cURL:**
```bash
curl -X POST http://localhost:5000/api/uploads/single \
  -F "image=@/path/to/image.jpg"
```

**Response:**
```json
{
  "message": "File uploaded successfully",
  "file": {
    "filename": "building-1234567890.jpg",
    "originalName": "building.jpg",
    "mimetype": "image/jpeg",
    "size": 245678,
    "url": "/uploads/building-1234567890.jpg"
  }
}
```

### Upload Multiple Images
```bash
POST http://localhost:5000/api/uploads/multiple
Content-Type: multipart/form-data
Body: form-data with key "images" (multiple files)
```

**Example with cURL:**
```bash
curl -X POST http://localhost:5000/api/uploads/multiple \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg" \
  -F "images=@/path/to/image3.jpg"
```

### List All Uploaded Files
```bash
GET http://localhost:5000/api/uploads
```

**Response:**
```json
{
  "count": 3,
  "files": [
    {
      "filename": "building-1234567890.jpg",
      "url": "/uploads/building-1234567890.jpg",
      "size": 245678,
      "createdAt": "2024-02-15T10:30:00.000Z",
      "modifiedAt": "2024-02-15T10:30:00.000Z"
    }
  ]
}
```

### Delete an Uploaded File
```bash
DELETE http://localhost:5000/api/uploads/:filename
```

---

## 💻 Programmatic Upload (JavaScript)

### Using Axios in React:

```javascript
import axios from 'axios';

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post('/api/uploads/single', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log('Uploaded:', response.data.file.url);
    return response.data.file;
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

### Using Fetch API:

```javascript
const uploadMultiple = async (files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('images', file);
  });

  const response = await fetch('http://localhost:5000/api/uploads/multiple', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  return data.files;
};
```

---

## 🎯 Using the ImageUpload Component

### Import and Use:

```javascript
import ImageUpload from '../components/ImageUpload';

function MyPage() {
  const handleUploadComplete = (files) => {
    console.log('Uploaded files:', files);
    // Do something with the uploaded file URLs
  };

  return (
    <div>
      {/* Single image upload */}
      <ImageUpload 
        onUploadComplete={handleUploadComplete}
        multiple={false}
      />

      {/* Multiple images upload (max 10) */}
      <ImageUpload 
        onUploadComplete={handleUploadComplete}
        multiple={true}
        maxFiles={10}
      />
    </div>
  );
}
```

---

## 📁 File Storage

### Where Are Images Stored?

- **Location**: `server/uploads/` directory
- **Format**: `originalname-timestamp-randomnumber.ext`
- **Example**: `house-1707995400000-123456789.jpg`

### Accessing Uploaded Images:

**In Browser:**
```
http://localhost:5000/uploads/house-1707995400000-123456789.jpg
```

**In React Components:**
```javascript
<img src={`http://localhost:5000${imageUrl}`} alt="Project" />
```

---

## ⚙️ Configuration

### Change Upload Limits:

Edit `server/src/config/upload.js`:

```javascript
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Change to 10MB
  },
  fileFilter: fileFilter
});
```

### Change Allowed File Types:

```javascript
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/; // Add SVG
  // ...
};
```

### Change Max Files:

In your component:
```javascript
<ImageUpload multiple={true} maxFiles={20} />
```

---

## 🛡️ Security Features

### Built-in Protections:

✅ **File Type Validation** - Only images allowed  
✅ **File Size Limits** - Max 5MB per file  
✅ **Filename Sanitization** - Removes spaces and special characters  
✅ **Unique Filenames** - Prevents overwrites  
✅ **Server-side Validation** - Double-checks file types

### Recommended for Production:

- [ ] Add authentication to upload endpoints
- [ ] Implement virus scanning (e.g., ClamAV)
- [ ] Use cloud storage (AWS S3, Cloudinary)
- [ ] Add image optimization (sharp, imagemin)
- [ ] Implement rate limiting
- [ ] Add file expiration/cleanup

---

## 🎨 Image Optimization Tips

### Before Uploading:

1. **Resize images** to appropriate dimensions
   - Hero images: 1920x1080px
   - Thumbnails: 800x600px
   - Gallery: 1200x900px

2. **Compress images**
   - Use tools like TinyPNG, ImageOptim
   - Target: 200-500KB per image

3. **Use correct format**
   - Photos: JPEG
   - Graphics/logos: PNG
   - Animations: GIF (or video)
   - Modern browsers: WEBP

### After Uploading:

Consider adding image optimization to the backend:

```javascript
// Install: npm install sharp
import sharp from 'sharp';

// Resize and optimize
await sharp(file.path)
  .resize(1200, 900, { fit: 'inside' })
  .jpeg({ quality: 85 })
  .toFile('optimized-' + file.filename);
```

---

## 🐛 Troubleshooting

### "No file uploaded" error
- Make sure input name matches: `image` for single, `images` for multiple
- Check that `enctype="multipart/form-data"` is set on forms

### "File too large" error
- Image exceeds 5MB limit
- Compress the image before uploading

### Images not displaying
- Check that backend server is running on port 5000
- Verify the URL: `http://localhost:5000/uploads/filename.jpg`
- Check browser console for CORS errors

### Upload fails silently
- Check browser console for errors
- Verify MongoDB is running
- Check backend logs: `npm run dev` in server folder

---

## 📚 Advanced Usage

### Drag and Drop:

Extend the ImageUpload component:

```javascript
const handleDrop = (e) => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files);
  handleFileSelect({ target: { files } });
};

return (
  <div 
    onDrop={handleDrop}
    onDragOver={(e) => e.preventDefault()}
    className="border-2 border-dashed p-8"
  >
    Drop images here or click to browse
  </div>
);
```

### Progress Tracking:

Already built-in! The ImageUpload component shows:
- Upload progress bar
- Percentage completed
- Success/error messages

### Image Cropping:

Install and use react-image-crop:

```bash
npm install react-image-crop
```

---

## 🚀 Production Deployment

### Using Cloud Storage (Recommended):

**Cloudinary:**
```bash
npm install cloudinary
```

**AWS S3:**
```bash
npm install aws-sdk
```

**Update upload config** to use cloud storage instead of local files.

---

## 📞 Need Help?

- Check the main README.md for general setup
- Review API documentation at `http://localhost:5000/api`
- Join our support forum (if available)
- Contact: support@prestigebuild.com

---

**Happy Uploading! 📸🏗️**
