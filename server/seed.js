import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './src/models/Project.js';
import Service from './src/models/Service.js';
import Testimonial from './src/models/Testimonial.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/construction-company');
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const sampleProjects = [
  {
    title: 'Modern Family Residence',
    description: 'A stunning 4-bedroom contemporary home featuring open-plan living, sustainable materials, and smart home technology. Built with attention to detail and energy efficiency.',
    category: 'residential',
    location: 'Beverly Hills, CA',
    completionDate: new Date('2023-08-15'),
    featured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        alt: 'Modern Family Residence Exterior'
      }
    ],
    stats: {
      area: '3,500 sq ft',
      duration: '8 months',
      client: 'Private Client'
    },
    status: 'completed'
  },
  {
    title: 'Luxury Apartment Complex',
    description: 'A 24-unit luxury apartment building with premium amenities including rooftop terrace, fitness center, and underground parking. Modern architecture meets sophisticated living.',
    category: 'apartment',
    location: 'Downtown Miami, FL',
    completionDate: new Date('2023-11-30'),
    featured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        alt: 'Luxury Apartment Complex'
      }
    ],
    stats: {
      area: '45,000 sq ft',
      duration: '14 months',
      client: 'Miami Development Corp'
    },
    status: 'completed'
  },
  {
    title: 'Victorian Home Renovation',
    description: 'Complete restoration and modernization of a historic Victorian home, preserving original character while adding modern conveniences and energy-efficient systems.',
    category: 'renovation',
    location: 'San Francisco, CA',
    completionDate: new Date('2023-05-20'),
    featured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        alt: 'Victorian Home Renovation'
      }
    ],
    stats: {
      area: '2,800 sq ft',
      duration: '6 months',
      client: 'Heritage Properties LLC'
    },
    status: 'completed'
  },
  {
    title: 'Tech Startup Office',
    description: 'Modern office space designed for collaboration and innovation. Features include open workspaces, private meeting pods, break areas, and state-of-the-art infrastructure.',
    category: 'commercial',
    location: 'Austin, TX',
    completionDate: new Date('2023-09-10'),
    featured: false,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        alt: 'Tech Startup Office'
      }
    ],
    stats: {
      area: '12,000 sq ft',
      duration: '5 months',
      client: 'TechVentures Inc'
    },
    status: 'completed'
  },
  {
    title: 'Lakeside Retreat',
    description: 'Custom-built lakeside home featuring panoramic windows, natural materials, and seamless indoor-outdoor living spaces. Perfect harmony with nature.',
    category: 'residential',
    location: 'Lake Tahoe, CA',
    completionDate: new Date('2023-07-01'),
    featured: false,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        alt: 'Lakeside Retreat'
      }
    ],
    stats: {
      area: '4,200 sq ft',
      duration: '10 months',
      client: 'Private Client'
    },
    status: 'completed'
  },
  {
    title: 'Urban Loft Conversion',
    description: 'Transformation of an industrial warehouse into modern residential lofts with exposed brick, high ceilings, and contemporary finishes.',
    category: 'renovation',
    location: 'Brooklyn, NY',
    completionDate: new Date('2023-12-15'),
    featured: false,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
        alt: 'Urban Loft Conversion'
      }
    ],
    stats: {
      area: '8,500 sq ft',
      duration: '7 months',
      client: 'Urban Living Properties'
    },
    status: 'completed'
  }
];

const sampleServices = [
  {
    title: 'Residential Construction',
    slug: 'residential-construction',
    description: 'Custom home building from the ground up. We work closely with you to design and construct your dream home with precision and attention to detail.',
    icon: '🏡',
    features: [
      'Custom home design',
      'Site preparation and foundation',
      'Premium materials and finishes',
      'Energy-efficient construction',
      'Smart home integration',
      'Warranty and support'
    ],
    order: 1
  },
  {
    title: 'Apartment Buildings',
    slug: 'apartment-buildings',
    description: 'Multi-unit residential development with modern amenities and sustainable design principles.',
    icon: '🏢',
    features: [
      'Multi-story construction',
      'Amenity space planning',
      'Parking solutions',
      'Common area design',
      'Property management integration'
    ],
    order: 2
  },
  {
    title: 'Renovations & Remodeling',
    slug: 'renovations-remodeling',
    description: 'Transform your existing space with our comprehensive renovation and remodeling services.',
    icon: '🔨',
    features: [
      'Kitchen remodeling',
      'Bathroom upgrades',
      'Home additions',
      'Interior redesign',
      'Exterior improvements',
      'Historic restoration'
    ],
    order: 3
  },
  {
    title: 'Commercial Construction',
    slug: 'commercial-construction',
    description: 'Professional commercial building services for offices, retail, and mixed-use developments.',
    icon: '🏗️',
    features: [
      'Office buildings',
      'Retail spaces',
      'Mixed-use developments',
      'Tenant improvements',
      'ADA compliance',
      'Fast-track scheduling'
    ],
    order: 4
  }
];

// Sample Testimonials
const sampleTestimonials = [
  {
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah.j@email.com',
    company: 'Johnson Family',
    rating: 5,
    testimonial: 'Working with Prestige Build was an absolute pleasure! They transformed our dated home into a modern masterpiece. The attention to detail and professionalism exceeded our expectations.',
    projectType: 'residential',
    isApproved: true,
    isFeatured: true
  },
  {
    clientName: 'Michael Chen',
    clientEmail: 'mchen@techcorp.com',
    company: 'Tech Corp',
    rating: 5,
    testimonial: 'Our new office space is incredible. The team completed the project ahead of schedule and stayed within budget. Highly recommend!',
    projectType: 'commercial',
    isApproved: true,
    isFeatured: true
  },
  {
    clientName: 'Emily Rodriguez',
    clientEmail: 'emily.r@email.com',
    company: '',
    rating: 5,
    testimonial: 'The kitchen renovation exceeded all my expectations. The craftsmanship is outstanding and the project was completed on time. I couldn\'t be happier!',
    projectType: 'renovation',
    isApproved: true,
    isFeatured: true
  },
  {
    clientName: 'David Thompson',
    clientEmail: 'david.t@email.com',
    company: 'Thompson Investments',
    rating: 5,
    testimonial: 'Professional, reliable, and skilled. Our apartment complex turned out beautifully. The attention to modern amenities and sustainable design was impressive.',
    projectType: 'apartment',
    isApproved: true,
    isFeatured: false
  },
  {
    clientName: 'Lisa Martinez',
    clientEmail: 'lisa.m@email.com',
    company: '',
    rating: 5,
    testimonial: 'From design to completion, Prestige Build made our dream home a reality. The team was responsive, professional, and delivered exceptional quality.',
    projectType: 'residential',
    isApproved: true,
    isFeatured: false
  },
  {
    clientName: 'Robert Anderson',
    clientEmail: 'robert.a@retailco.com',
    company: 'Retail Co',
    rating: 4,
    testimonial: 'Great experience overall. The commercial space looks fantastic and the project was well-managed. Minor delays but nothing major.',
    projectType: 'commercial',
    isApproved: true,
    isFeatured: false
  },
  {
    clientName: 'Jennifer Lee',
    clientEmail: 'jennifer.l@email.com',
    company: '',
    rating: 5,
    testimonial: 'The bathroom remodel is stunning! High quality work and great communication throughout the entire process. Worth every penny.',
    projectType: 'renovation',
    isApproved: true,
    isFeatured: false
  },
  {
    clientName: 'James Wilson',
    clientEmail: 'james.w@email.com',
    company: 'Wilson Properties',
    rating: 5,
    testimonial: 'Built our second property with Prestige Build and they delivered again. Reliable, professional, and the quality is consistently excellent.',
    projectType: 'residential',
    isApproved: true,
    isFeatured: false
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await Project.deleteMany({});
    await Service.deleteMany({});
    await Testimonial.deleteMany({});

    // Insert sample data
    console.log('Inserting sample projects...');
    await Project.insertMany(sampleProjects);
    console.log(`✓ Inserted ${sampleProjects.length} projects`);

    console.log('Inserting sample services...');
    await Service.insertMany(sampleServices);
    console.log(`✓ Inserted ${sampleServices.length} services`);

    console.log('Inserting sample testimonials...');
    await Testimonial.insertMany(sampleTestimonials);
    console.log(`✓ Inserted ${sampleTestimonials.length} testimonials`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nYou can now:');
    console.log('1. Start the backend server: npm run dev');
    console.log('2. View projects at: http://localhost:5000/api/projects');
    console.log('3. View services at: http://localhost:5000/api/services');
    console.log('4. View testimonials at: http://localhost:5000/api/testimonials');
    console.log('5. View stats at: http://localhost:5000/api/stats/home');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
