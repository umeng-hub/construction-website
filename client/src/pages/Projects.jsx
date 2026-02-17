import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { projectsAPI } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = filter !== 'all' ? { category: filter } : {};
      const response = await projectsAPI.getAll(params);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'residential', label: 'Residential' },
    { value: 'apartment', label: 'Apartments' },
    { value: 'renovation', label: 'Renovations' },
    { value: 'commercial', label: 'Commercial' },
  ];

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const baseUrl = apiUrl.replace('/api', '');
    return `${baseUrl}${imageUrl}`;
  };

  return (
    <div className="pt-20 lg:pt-24">
      <section className="bg-primary-900 text-white section-padding grain-overlay">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-white mb-6">Our Projects</h1>
            <p className="text-xl text-neutral-300">
              Explore our portfolio of exceptional construction projects that showcase our commitment to quality and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-50 py-8 border-b border-neutral-200">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setFilter(category.value)}
                className={`px-6 py-2 font-medium tracking-wide uppercase text-sm transition-all ${
                  filter === category.value
                    ? 'bg-accent-500 text-primary-900'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-neutral-600">
                No projects found in this category.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => openModal(project)}
                  className="card-elevated group cursor-pointer image-zoom-effect"
                >
                  <div className="aspect-[4/3] overflow-hidden relative bg-neutral-200">
                    {project.images && project.images[0] ? (
                      <img
                        src={getImageUrl(project.images[0].url)}
                        alt={project.images[0].alt || project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                        <span className="text-white text-6xl font-display">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-all duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-accent-500 font-semibold uppercase tracking-wider">
                        {project.category}
                      </span>
                      {project.status && (
                        <span className="text-xs text-neutral-500 uppercase">
                          {project.status}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl mb-3 group-hover:text-accent-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-neutral-600 line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    {project.location && (
                      <p className="text-sm text-neutral-500 mb-3">
                        📍 {project.location}
                      </p>
                    )}
                    <button className="text-accent-500 font-semibold text-sm uppercase tracking-wide hover:text-accent-600 transition-colors">
                      View Details →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white hover:bg-neutral-100 flex items-center justify-center shadow-lg transition-colors"
              >
                <HiX className="w-6 h-6 text-primary-800" />
              </button>

              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="relative bg-neutral-900">
                  <div className="aspect-[16/9] relative">
                    <img
                      src={getImageUrl(selectedProject.images[currentImageIndex].url)}
                      alt={selectedProject.images[currentImageIndex].alt || selectedProject.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center shadow-lg"
                      >
                        <HiChevronLeft className="w-6 h-6 text-primary-800" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center shadow-lg"
                      >
                        <HiChevronRight className="w-6 h-6 text-primary-800" />
                      </button>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded text-sm">
                        {currentImageIndex + 1} / {selectedProject.images.length}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="p-8 lg:p-12">
                <div className="mb-6">
                  <span className="inline-block px-4 py-1 bg-accent-500 text-primary-900 font-semibold text-xs uppercase tracking-wider mb-4">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-4xl font-display font-bold text-primary-800 mb-4">
                    {selectedProject.title}
                  </h2>
                  {selectedProject.location && (
                    <p className="text-neutral-600 flex items-center text-lg mb-2">
                      <span className="mr-2">📍</span> {selectedProject.location}
                    </p>
                  )}
                  {selectedProject.completionDate && (
                    <p className="text-neutral-600 flex items-center text-lg">
                      <span className="mr-2">📅</span> 
                      Completed: {new Date(selectedProject.completionDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  )}
                </div>

                {selectedProject.stats && (selectedProject.stats.area || selectedProject.stats.duration || selectedProject.stats.client) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-neutral-50 border border-neutral-200">
                    {selectedProject.stats.area && (
                      <div>
                        <div className="text-sm text-neutral-600 uppercase tracking-wide mb-1">Area</div>
                        <div className="text-2xl font-bold text-primary-800">{selectedProject.stats.area}</div>
                      </div>
                    )}
                    {selectedProject.stats.duration && (
                      <div>
                        <div className="text-sm text-neutral-600 uppercase tracking-wide mb-1">Duration</div>
                        <div className="text-2xl font-bold text-primary-800">{selectedProject.stats.duration}</div>
                      </div>
                    )}
                    {selectedProject.stats.client && (
                      <div>
                        <div className="text-sm text-neutral-600 uppercase tracking-wide mb-1">Client</div>
                        <div className="text-2xl font-bold text-primary-800">{selectedProject.stats.client}</div>
                      </div>
                    )}
                  </div>
                )}

                <div className="prose max-w-none">
                  <h3 className="text-2xl font-display font-semibold text-primary-800 mb-4">
                    Project Overview
                  </h3>
                  <p className="text-neutral-700 text-lg leading-relaxed whitespace-pre-line">
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.images && selectedProject.images.length > 1 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-display font-semibold text-primary-800 mb-4">
                      Gallery
                    </h3>
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                      {selectedProject.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`aspect-square overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? 'border-accent-500 opacity-100'
                              : 'border-neutral-300 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={getImageUrl(image.url)}
                            alt={image.alt || `${selectedProject.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.status && (
                  <div className="mt-8 pt-8 border-t border-neutral-200">
                    <span className="inline-block px-4 py-2 bg-green-100 text-green-800 font-semibold text-sm uppercase tracking-wider">
                      Status: {selectedProject.status}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
