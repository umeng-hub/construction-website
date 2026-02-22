import { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onUploadComplete, multiple = false, maxFiles = 10 }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      return validTypes.includes(file.type);
    });

    if (validFiles.length !== files.length) {
      setError('Some files were skipped. Only image files (JPEG, PNG, GIF, WEBP) are allowed.');
    } else {
      setError('');
    }

    // Limit number of files
    const filesToUpload = multiple ? validFiles.slice(0, maxFiles) : [validFiles[0]];
    setSelectedFiles(filesToUpload);

    // Generate previews
    const previewUrls = filesToUpload.map(file => URL.createObjectURL(file));
    setPreviews(previewUrls);
    setSuccess('');
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one file');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');
    setUploadProgress(0);

    const formData = new FormData();
    
    if (multiple) {
      selectedFiles.forEach(file => {
        formData.append('images', file);
      });
    } else {
      formData.append('image', selectedFiles[0]);
    }

    try {
      const endpoint = multiple ? '/api/uploads/multiple' : '/api/uploads/single';
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      setSuccess(response.data.message);
      
      // Call callback with uploaded file(s) info
      if (onUploadComplete) {
        onUploadComplete(multiple ? response.data.files : response.data.file);
      }

      // Clear selection after successful upload
      setTimeout(() => {
        setSelectedFiles([]);
        setPreviews([]);
        setUploadProgress(0);
        setSuccess('');
      }, 3000);

    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePreview = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  return (
    <div className="w-full">
      {/* File Input */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-primary-800 mb-2">
          {multiple ? 'Upload Images (Max ' + maxFiles + ')' : 'Upload Image'}
        </label>
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={uploading}
          className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all disabled:bg-neutral-100 disabled:cursor-not-allowed"
        />
        <p className="text-xs text-neutral-600 mt-1">
          Supported formats: JPEG, PNG, GIF, WEBP (Max 5MB per file)
        </p>
      </div>

      {/* Previews */}
      {previews.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover border border-neutral-300"
                />
                <button
                  onClick={() => handleRemovePreview(index)}
                  disabled={uploading}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity disabled:cursor-not-allowed"
                  aria-label="Remove image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="text-xs text-neutral-600 mt-1 truncate">
                  {selectedFiles[index]?.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="mb-4">
          <div className="w-full bg-neutral-200 rounded-full h-2.5">
            <div
              className="bg-accent-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-neutral-600 mt-2 text-center">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-sm rounded">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 text-sm rounded">
          {success}
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={selectedFiles.length === 0 || uploading}
        className="btn-accent w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? 'Uploading...' : multiple ? 'Upload Images' : 'Upload Image'}
      </button>
    </div>
  );
};

export default ImageUpload;
