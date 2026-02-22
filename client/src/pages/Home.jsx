import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiCheckCircle, 
  HiTrendingUp, 
  HiUserGroup, 
  HiOfficeBuilding,
  HiStar
} from 'react-icons/hi';
import { projectsAPI, statsAPI, testimonialsAPI } from '../services/api';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [stats, setStats] = useState({
    projectsCompleted: 0,
    happyClients: 0,
    yearsOfExperience: 0,
    satisfactionRate: 100
  });
  const [featuredTestimonials, setFeaturedTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch projects
        const projectsResponse = await projectsAPI.getAll({ featured: true });
        setFeaturedProjects(projectsResponse.data.slice(0, 3));

        // Fetch stats
        const statsResponse = await statsAPI.getHome();
        setStats(statsResponse.data);

        // Fetch testimonials
        const testimonialsResponse = await testimonialsAPI.getAll({ featured: true });
        setFeaturedTestimonials(testimonialsResponse.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const statsDisplay = [
    { 
      icon: HiOfficeBuilding, 
      value: `${stats.projectsCompleted}+`, 
      label: 'Projects Completed' 
    },
    { 
      icon: HiUserGroup, 
      value: `${stats.happyClients}+`, 
      label: 'Happy Clients' 
    },
    { 
      icon: HiTrendingUp, 
      value: `${stats.yearsOfExperience}+`, 
      label: 'Years Experience' 
    },
    { 
      icon: HiCheckCircle, 
      value: `${stats.satisfactionRate}%`, 
      label: 'Satisfaction Rate' 
    },
  ];

  // Helper function to get full image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const baseUrl = apiUrl.replace('/api', '');
    return `${baseUrl}${imageUrl}`;
  };

  const services = [
    {
      title: 'Residential Homes',
      description: 'Custom-built homes designed to your exact specifications with premium materials and craftsmanship.',
      icon: '🏡',
    },
    {
      title: 'Apartment Buildings',
      description: 'Multi-unit residential complexes engineered for modern living and maximum efficiency.',
      icon: '🏢',
    },
    {
      title: 'Renovations',
      description: 'Transform your existing space with our expert renovation and remodeling services.',
      icon: '🔨',
    },
    {
      title: 'Commercial Buildings',
      description: 'Professional office spaces and commercial structures built to meet your business needs.',
      icon: '🏗️',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center grain-overlay">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-2 bg-accent-500/20 border border-accent-500 mb-6">
                <span className="text-accent-400 font-semibold tracking-wider uppercase text-sm">
                  Premium Construction Services
                </span>
              </div>
              
              <h1 className="text-white mb-6 animate-slide-up">
                Building Excellence,<br />
                Crafting Dreams
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-300 mb-10 leading-relaxed max-w-2xl animate-slide-up animation-delay-200">
                Transforming visions into reality with precision, innovation, and unparalleled craftsmanship. Your trusted partner in construction.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-400">
                <Link to="/projects" className="btn-accent">
                  View Our Work
                </Link>
                <Link to="/contact" className="btn-secondary bg-white/10 text-white border-white hover:bg-white hover:text-primary-900">
                  Get Started
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-neutral-50 section-padding border-b border-neutral-200">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statsDisplay.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-accent-500" />
                <div className="font-display text-4xl md:text-5xl font-bold text-primary-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="mb-6">Our Services</h2>
            <div className="section-divider" />
            <p className="text-xl text-neutral-600">
              Comprehensive construction solutions tailored to meet your unique needs and exceed your expectations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="card-elevated p-8 h-full hover:border-accent-500 transition-all duration-500">
                  <div className="text-5xl mb-6">{service.icon}</div>
                  <h3 className="text-2xl mb-4 group-hover:text-accent-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services" className="btn-primary">
              Explore All Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="mb-6">Featured Projects</h2>
              <div className="section-divider" />
              <p className="text-xl text-neutral-600">
                Explore our portfolio of exceptional construction projects that showcase our commitment to quality.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-elevated group cursor-pointer image-zoom-effect"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    {project.images && project.images[0] ? (
                      <img
                        src={getImageUrl(project.images[0].url)}
                        alt={project.images[0].alt || project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800" />
                    )}
                    <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-all duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-accent-500 font-semibold uppercase tracking-wider mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-xl mb-3 group-hover:text-accent-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-neutral-600 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link to="/projects" className="btn-primary">
                View All Projects
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Client Testimonials */}
      {featuredTestimonials.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="mb-6">What Our Clients Say</h2>
              <div className="section-divider" />
              <p className="text-xl text-neutral-600">
                Don't just take our word for it. Hear from the clients who've experienced our exceptional service.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-neutral-50 p-8 border border-neutral-200 hover:border-accent-500 transition-all"
                >
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <HiStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating ? 'text-accent-500' : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-neutral-700 mb-6 italic leading-relaxed">
                    "{testimonial.testimonial}"
                  </p>

                  {/* Client Info */}
                  <div className="border-t border-neutral-200 pt-4">
                    <p className="font-semibold text-primary-800">{testimonial.clientName}</p>
                    {testimonial.company && (
                      <p className="text-sm text-neutral-600">{testimonial.company}</p>
                    )}
                    {testimonial.projectType && (
                      <p className="text-xs text-accent-500 uppercase mt-1">
                        {testimonial.projectType}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link to="/testimonials" className="btn-primary">
                Read More Reviews
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-primary-900 text-white relative overflow-hidden grain-overlay">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-neutral-300 mb-10 leading-relaxed">
              Let's bring your vision to life. Contact us today for a free consultation and discover how we can transform your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-accent">
                Get Free Quote
              </Link>
              <Link to="/projects" className="btn-secondary bg-white/10 text-white border-white hover:bg-white hover:text-primary-900">
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
