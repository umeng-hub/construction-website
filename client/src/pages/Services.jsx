import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesAPI } from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAll();
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 lg:pt-24 min-h-screen flex items-center justify-center">
        <div className="text-xl text-neutral-600">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <section className="bg-primary-900 text-white section-padding grain-overlay">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-white mb-6">Our Services</h1>
            <p className="text-xl text-neutral-300">
              Comprehensive construction solutions delivered with precision, quality, and professionalism.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="text-6xl mb-6">{service.icon || '🏗️'}</div>
                  <h2 className="text-4xl mb-6">{service.title}</h2>
                  <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <span className="w-6 h-6 bg-accent-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs">✓</span>
                        </span>
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Image Section - THIS IS THE KEY PART */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  {service.image?.url ? (
                    <img 
                      src={service.image.url} 
                      alt={service.image.alt || service.title}
                      className="w-full aspect-[4/3] object-cover card-elevated"
                    />
                  ) : (
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary-600 to-primary-800 card-elevated" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-neutral-600 mb-10">
              Let's discuss your project and see how we can bring your vision to life.
            </p>
            <Link to="/contact" className="btn-accent">
              Contact Us Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
