import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiStar, HiX } from 'react-icons/hi';
import { testimonialsAPI } from '../services/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0, satisfactionRate: 100 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    company: '',
    rating: 5,
    testimonial: '',
    projectType: 'residential'
  });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchTestimonials();
    fetchStats();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialsAPI.getAll();
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await testimonialsAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: '', message: '' });

    try {
      await testimonialsAPI.create(formData);
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your feedback! Your testimonial will be reviewed and published shortly.'
      });
      setFormData({
        clientName: '',
        clientEmail: '',
        company: '',
        rating: 5,
        testimonial: '',
        projectType: 'residential'
      });
      
      // Close modal after 3 seconds
      setTimeout(() => {
        setShowForm(false);
        setSubmitStatus({ type: '', message: '' });
      }, 3000);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to submit testimonial. Please try again.'
      });
    }
  };

  const openForm = () => {
    setShowForm(true);
    document.body.style.overflow = 'hidden';
  };

  const closeForm = () => {
    setShowForm(false);
    setSubmitStatus({ type: '', message: '' });
    document.body.style.overflow = 'unset';
  };

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
            <h1 className="text-white mb-6">Client Testimonials</h1>
            <p className="text-xl text-neutral-300 mb-8">
              Read what our satisfied clients have to say about working with Prestige Build.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold text-accent-500 mb-2">
                  {stats.averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <HiStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(stats.averageRating) ? 'text-accent-500' : 'text-neutral-500'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-neutral-300">Average Rating</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-500 mb-2">{stats.totalReviews}</div>
                <p className="text-sm text-neutral-300">Total Reviews</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-500 mb-2">{stats.satisfactionRate}%</div>
                <p className="text-sm text-neutral-300">Satisfaction Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Share Your Experience Button */}
      <section className="bg-accent-500 py-12">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-bold text-primary-900 mb-4">
              Share Your Experience
            </h3>
            <p className="text-primary-800 mb-6 max-w-2xl mx-auto">
              We'd love to hear about your experience working with Prestige Build. 
              Your feedback helps us improve and helps others make informed decisions.
            </p>
            <button
              onClick={openForm}
              className="bg-primary-900 text-white px-8 py-4 font-semibold uppercase tracking-wide hover:bg-primary-800 transition-all shadow-lg hover:shadow-xl"
            >
              Write a Testimonial
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-neutral-600 mb-6">
                No testimonials yet. Be the first to share your experience!
              </p>
              <button onClick={() => setShowForm(true)} className="btn-accent">
                Write a Testimonial
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-8 border border-neutral-200 hover:border-accent-500 transition-all"
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
          )}
        </div>
      </section>

      {/* Testimonial Submission Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeForm}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={closeForm}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <HiX className="w-6 h-6 text-primary-800" />
              </button>

              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-display font-bold text-primary-800 mb-2">
                  Share Your Experience
                </h2>
                <p className="text-neutral-600 mb-8">
                  Tell us about your experience working with RDC Elite Builders. Your testimonial will be reviewed before being published.
                </p>

                {submitStatus.message && (
                  <div
                    className={`p-4 mb-6 rounded ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary-800 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-800 mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="clientEmail"
                        value={formData.clientEmail}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary-800 mb-2">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                        placeholder="Your Company"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-800 mb-2">
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                      >
                        <option value="residential">Residential</option>
                        <option value="apartment">Apartment</option>
                        <option value="renovation">Renovation</option>
                        <option value="commercial">Commercial</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-800 mb-2">
                      Rating *
                    </label>
                    <div className="flex gap-2 items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="focus:outline-none"
                        >
                          <HiStar
                            className={`w-8 h-8 transition-colors ${
                              star <= formData.rating ? 'text-accent-500' : 'text-neutral-300'
                            } hover:text-accent-400`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-neutral-600">
                        ({formData.rating} {formData.rating === 1 ? 'star' : 'stars'})
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-800 mb-2">
                      Your Testimonial *
                    </label>
                    <textarea
                      name="testimonial"
                      value={formData.testimonial}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Tell us about your experience working with Prestige Build..."
                      className="w-full px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all resize-none"
                    />
                    <p className="text-sm text-neutral-500 mt-2">
                      Please share your honest experience with our services.
                    </p>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-accent w-full"
                    disabled={submitStatus.type === 'success'}
                  >
                    {submitStatus.type === 'success' ? 'Submitted Successfully!' : 'Submit Testimonial'}
                  </button>

                  <p className="text-sm text-neutral-600 text-center">
                    Your testimonial will be reviewed before being published on our website.
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Testimonials;
