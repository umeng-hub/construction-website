import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiLocationMarker, 
  HiPhone, 
  HiMail, 
  HiClock 
} from 'react-icons/hi';
import { contactsAPI } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'residential',
    budget: '',
    timeline: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await contactsAPI.create(formData);
      setStatus({ type: 'success', message: response.data.message });
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: 'residential',
        budget: '',
        timeline: '',
        message: '',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: HiLocationMarker,
      title: 'Visit Us',
      content: '123 Construction Ave, Building City, ST 12345',
    },
    {
      icon: HiPhone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: HiMail,
      title: 'Email Us',
      content: 'info@prestigebuild.com',
      link: 'mailto:info@prestigebuild.com',
    },
    {
      icon: HiClock,
      title: 'Working Hours',
      content: 'Mon - Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 4:00 PM',
    },
  ];

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
            <h1 className="text-white mb-6">Get In Touch</h1>
            <p className="text-xl text-neutral-300">
              Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-accent-500 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-800 mb-2">
                      {item.title}
                    </h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-neutral-600 hover:text-accent-500 transition-colors whitespace-pre-line"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-neutral-600 whitespace-pre-line">
                        {item.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="card-elevated p-8 lg:p-10">
                <h2 className="text-3xl mb-8">Send Us a Message</h2>

                {status.message && (
                  <div
                    className={`mb-6 p-4 rounded ${
                      status.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary-800 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-800 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary-800 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-800 mb-2">
                        Project Type *
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                      >
                        <option value="residential">Residential Home</option>
                        <option value="apartment">Apartment Building</option>
                        <option value="renovation">Renovation</option>
                        <option value="commercial">Commercial Building</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary-800 mb-2">
                        Budget Range
                      </label>
                      <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        placeholder="e.g., $100k - $200k"
                        className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-800 mb-2">
                        Timeline
                      </label>
                      <input
                        type="text"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        placeholder="e.g., 6 months"
                        className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-800 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-accent w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-neutral-200">
        <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
          <div className="text-center text-white">
            <HiLocationMarker className="w-16 h-16 mx-auto mb-4" />
            <p className="text-xl font-display">
              Interactive Map Goes Here
            </p>
            <p className="text-sm text-neutral-300 mt-2">
              (Integrate Google Maps API)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
