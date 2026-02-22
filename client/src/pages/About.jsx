import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCheckCircle } from 'react-icons/hi';

const About = () => {
  const values = [
    {
      title: 'Quality First',
      description: 'We never compromise on the quality of materials or workmanship.'
    },
    {
      title: 'Integrity',
      description: 'Honest, transparent communication in every project we undertake.'
    },
    {
      title: 'Innovation',
      description: 'Embracing new technologies and methods to deliver better results.'
    },
    {
      title: 'Safety',
      description: 'Maintaining the highest safety standards on every construction site.'
    }
  ];

  const team = [
    { name: 'Ruel Catapang', role: 'CEO & Founder', image: '👨‍💼' },
    { name: 'Sarah Williams', role: 'Chief Architect', image: '👩‍💼' },
    { name: 'Michael Chen', role: 'Project Manager', image: '👨‍🔧' },
    { name: 'Emily Rodriguez', role: 'Senior Engineer', image: '👩‍🔧' }
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
            <h1 className="text-white mb-6">About Us</h1>
            <p className="text-xl text-neutral-300">
              Building excellence since 1998. We're more than just builders—we're partners in bringing your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-neutral-600 leading-relaxed">
                <p>
                  Founded in 2021, RDC Elite Builders One Person Co. began with a simple mission: to deliver exceptional construction services with unwavering commitment to quality and client satisfaction.
                </p>
                <p>
                  Over the past years, we've grown from a small team of dedicated professionals to one of the region's most trusted construction companies. Our portfolio includes hundreds of successful projects, from custom homes to large-scale commercial developments.
                </p>
                <p>
                  What sets us apart is our people-first approach. We believe that great buildings are created by great teams, and we invest in the best talent, training, and technology to deliver results that exceed expectations.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-[4/3] bg-gradient-to-br from-primary-600 to-primary-800 card-elevated"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="mb-6">Our Core Values</h2>
            <p className="text-xl text-neutral-600">
              The principles that guide everything we do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated p-8 text-center"
              >
                <HiCheckCircle className="w-12 h-12 text-accent-500 mx-auto mb-4" />
                <h3 className="text-xl mb-3">{value.title}</h3>
                <p className="text-neutral-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="mb-6">Meet Our Team</h2>
            <p className="text-xl text-neutral-600">
              Experienced professionals dedicated to your success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated overflow-hidden"
              >
                <div className="aspect-square bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                  <span className="text-8xl">{member.image}</span>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl mb-2">{member.name}</h3>
                  <p className="text-accent-500 font-medium">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-900 text-white grain-overlay">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-white mb-6">Let's Build Together</h2>
            <p className="text-xl text-neutral-300 mb-10">
              Ready to start your construction project? We're here to help turn your vision into reality.
            </p>
            <Link to="/contact" className="btn-accent">
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
