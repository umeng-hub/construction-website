import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';
import { projectsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Admin = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'residential',
    location: '',
    completionDate: '',
    featured: false,
    status: 'completed',
    stats: {
      area: '',
      duration: '',
      client: ''
    }
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('stats.')) {
      const statKey = name.split('.')[1];
      setFormData({
        ...formData,
        stats: {
          ...formData.stats,
          [statKey]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleImageUpload = (files) => {
    const images = Array.isArray(files) ? files : [files];
    const imageObjects = images.map(file => ({
      url: file.url,
      alt: formData.title || 'Project image'
    }));
    setUploadedImages([...uploadedImages, ...imageObjects]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      images: uploadedImages
    };

    try {
      if (editingProject) {
        await projectsAPI.update(editingProject._id, projectData);
        alert('Project updated successfully!');
      } else {
        await projectsAPI.create(projectData);
        alert('Project created successfully!');
      }
      
      resetForm();
      fetchProjects();
      setShowForm(false);
    } catch (error) {
      alert('Error saving project: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      location: project.location,
      completionDate: project.completionDate?.split('T')[0] || '',
      featured: project.featured,
      status: project.status,
      stats: project.stats || { area: '', duration: '', client: '' }
    });
    setUploadedImages(project.images || []);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id);
        alert('Project deleted successfully!');
        fetchProjects();
      } catch (error) {
        alert('Error deleting project: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'residential',
      location: '',
      completionDate: '',
      featured: false,
      status: 'completed',
      stats: { area: '', duration: '', client: '' }
    });
    setUploadedImages([]);
    setEditingProject(null);
  };

  const removeImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-primary-900 text-white py-12">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-white text-4xl mb-2">Admin Dashboard</h1>
              <p className="text-neutral-300">Manage projects and uploads</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-neutral-400">Logged in as</p>
                <p className="font-semibold">{user?.username}</p>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 transition-colors text-sm font-medium uppercase tracking-wide"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Add Project Button */}
          {!showForm && (
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="btn-accent mb-8"
            >
              + Add New Project
            </button>
          )}

          {/* Project Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-elevated p-8 mb-12"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="text-neutral-600 hover:text-neutral-800"
                >
                  ✕ Close
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary-800 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-800 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                    >
                      <option value="residential">Residential</option>
                      <option value="apartment">Apartment</option>
                      <option value="renovation">Renovation</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-800 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary-800 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-800 mb-2">
                      Completion Date *
                    </label>
                    <input
                      type="date"
                      name="completionDate"
                      value={formData.completionDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary-800 mb-2">
                      Area (sq ft)
                    </label>
                    <input
                      type="text"
                      name="stats.area"
                      value={formData.stats.area}
                      onChange={handleChange}
                      placeholder="e.g., 3,500 sq ft"
                      className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-800 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="stats.duration"
                      value={formData.stats.duration}
                      onChange={handleChange}
                      placeholder="e.g., 8 months"
                      className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-800 mb-2">
                      Client
                    </label>
                    <input
                      type="text"
                      name="stats.client"
                      value={formData.stats.client}
                      onChange={handleChange}
                      placeholder="e.g., Private Client"
                      className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary-800 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                    >
                      <option value="completed">Completed</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-8">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className="w-5 h-5 text-accent-500 border-neutral-300 rounded focus:ring-accent-500"
                      />
                      <span className="ml-3 text-sm font-semibold text-primary-800">
                        Feature this project on homepage
                      </span>
                    </label>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="border-t border-neutral-200 pt-6">
                  <h3 className="text-lg font-semibold text-primary-800 mb-4">
                    Project Images
                  </h3>
                  
                  <ImageUpload
                    onUploadComplete={handleImageUpload}
                    multiple={true}
                    maxFiles={10}
                  />

                  {/* Uploaded Images Preview */}
                  {uploadedImages.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-primary-800 mb-3">
                        Attached Images ({uploadedImages.length})
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image.url.startsWith('http') ? image.url : `${window.location.origin.replace('5173', '5000')}${image.url}`}
                              alt={image.alt}
                              className="w-full h-32 object-cover border border-neutral-300"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6 border-t border-neutral-200">
                  <button type="submit" className="btn-accent flex-1">
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Projects List */}
          {!showForm && (
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-6">
                All Projects ({projects.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project._id} className="card-elevated">
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary-600 to-primary-800">
                      {project.images && project.images[0] && (
                        <img
                          src={project.images[0].url.startsWith('http') ? project.images[0].url : `${window.location.origin.replace('5173', '5000')}${project.images[0].url}`}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-accent-500 font-semibold uppercase mb-2">
                        {project.category}
                      </div>
                      <h3 className="text-xl mb-2">{project.title}</h3>
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="flex-1 px-4 py-2 bg-primary-600 text-white text-sm hover:bg-primary-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="flex-1 px-4 py-2 bg-red-600 text-white text-sm hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Admin;
