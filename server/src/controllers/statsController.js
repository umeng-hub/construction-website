import Project from '../models/Project.js';
import Testimonial from '../models/Testimonial.js';

export const getHomeStats = async (req, res) => {
  try {
    // Get completed projects count
    const completedProjects = await Project.countDocuments({ 
      status: 'completed' 
    });

    // Get approved testimonials statistics
    const testimonialStats = await Testimonial.aggregate([
      { $match: { isApproved: true } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    const testimonialData = testimonialStats[0] || {
      averageRating: 5,
      totalReviews: 0
    };

    // Calculate years of experience (company started in 2015)
    const companyStartYear = 2021;
    const currentYear = new Date().getFullYear();
    const yearsOfExperience = currentYear - companyStartYear;

    // Calculate satisfaction rate (percentage based on average rating)
    const satisfactionRate = testimonialData.totalReviews > 0
      ? Math.round((testimonialData.averageRating / 5) * 100)
      : 100; // Default to 100% if no reviews yet

    res.json({
      projectsCompleted: completedProjects || 0,
      happyClients: testimonialData.totalReviews || 0,
      yearsOfExperience: yearsOfExperience,
      satisfactionRate: satisfactionRate,
      averageRating: Math.round(testimonialData.averageRating * 10) / 10
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
