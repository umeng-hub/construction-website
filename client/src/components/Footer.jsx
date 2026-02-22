import { Link } from 'react-router-dom';
import { 
  HiLocationMarker, 
  HiPhone, 
  HiMail, 
  HiClock 
} from 'react-icons/hi';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram 
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="font-display text-3xl font-bold mb-2">
                RDC Elite Builders 
              </div>
              <div className="text-sm text-neutral-400 tracking-wider uppercase">
                One Person Co.
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              Building dreams with precision, quality, and integrity. Your trusted partner in construction excellence.
            </p>
            <div className="flex space-x-4">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-primary-800 hover:bg-accent-500 transition-colors duration-300"
                  aria-label="Social media"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About Us' },
                { path: '/services', label: 'Our Services' },
                { path: '/projects', label: 'Projects' },
                { path: '/contact', label: 'Contact' },
                { path: '/login', label: 'Admin Login' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-neutral-300 hover:text-accent-400 transition-colors duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                'Residential Homes',
                'Apartment Buildings',
                'Renovations',
                'Commercial Buildings',
                'Project Management',
              ].map((service) => (
                <li key={service}>
                  <span className="text-neutral-300">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-6">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <HiLocationMarker className="w-5 h-5 text-accent-400 mt-1 flex-shrink-0" />
                <span className="text-neutral-300">
                  Calapan City, 5200<br />
                  Oriental Mindoro
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <HiPhone className="w-5 h-5 text-accent-400 flex-shrink-0" />
                <a 
                  href="tel:+639171782889" 
                  className="text-neutral-300 hover:text-accent-400 transition-colors"
                >
                  +63 (917) 178-2889
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <HiMail className="w-5 h-5 text-accent-400 flex-shrink-0" />
                <a 
                  href="mailto:rdcatapang@rdccorporation.com" 
                  className="text-neutral-300 hover:text-accent-400 transition-colors"
                >
                  rdcatapang@rdccorporation.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <HiClock className="w-5 h-5 text-accent-400 mt-1 flex-shrink-0" />
                <span className="text-neutral-300">
                  Mon - Fri: 8:00 AM - 6:00 PM<br />
                  Sat: 9:00 AM - 4:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 text-sm text-center md:text-left">
              © {currentYear} RDC Elite Builders OPC. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-neutral-400 hover:text-accent-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-neutral-400 hover:text-accent-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
