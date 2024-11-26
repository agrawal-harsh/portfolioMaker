const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    trim: true,
    maxLength: [500, 'Bio cannot be more than 500 characters']
  },
  location: {
    type: String,
    trim: true,
    maxLength: [100, 'Location cannot be more than 100 characters']
  },
  website: {
    type: String,
    trim: true,
    maxLength: [100, 'Website cannot be more than 100 characters']
  },
  social: {
    twitter: {
      type: String,
      trim: true,
      maxLength: [100, 'Twitter username cannot be more than 100 characters']
    },
    linkedin: {
      type: String,
      trim: true,
      maxLength: [100, 'LinkedIn username cannot be more than 100 characters']
    },
    github: {
      type: String,
      trim: true,
      maxLength: [100, 'GitHub username cannot be more than 100 characters']
    }
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxLength: [100, 'Name cannot be more than 100 characters']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxLength: [100, 'Title cannot be more than 100 characters']
  },
  tagline: {
    type: String,
    required: [true, 'Tagline is required'],
    trim: true,
    maxLength: [100, 'Tagline cannot be more than 100 characters']
  },
  image: {
    type: String,
    default: '/api/placeholder/200/200'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxLength: [100, 'Project title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxLength: [500, 'Project description cannot be more than 500 characters']
  },
  tech: [{
    type: String,
    trim: true
  }],
  stars: {
    type: Number,
    default: 0,
    min: [0, 'Stars cannot be negative']
  },
  image: {
    type: String,
    default: '/api/placeholder/400/250'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ExperienceSchema = new Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxLength: [100, 'Company name cannot be more than 100 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    maxLength: [100, 'Role cannot be more than 100 characters']
  },
  period: {
    type: String,
    required: [true, 'Period is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Experience description is required'],
    trim: true,
    maxLength: [500, 'Experience description cannot be more than 500 characters']
  },
  current: {
    type: Boolean,
    default: false
  },
  endDate: {
    type: Date
  }
});

const WorkSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Work title is required'],
    trim: true,
    maxLength: [100, 'Work title cannot be more than 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Work description is required'],
    trim: true,
    maxLength: [500, 'Work description cannot be more than 500 characters']
  },
  image: {
    type: String,
    required: [true, 'Work image is required']
  },
  link: {
    type: String,
    trim: true
  },
  tech: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ServiceSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    maxLength: [100, 'Service title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true,
    maxLength: [500, 'Service description cannot be more than 500 characters']
  },
  icon: {
    type: String,
  }
});

const TestimonialSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Testimonial name is required'],
    trim: true,
    maxLength: [100, 'Name cannot be more than 100 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    maxLength: [100, 'Role cannot be more than 100 characters']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true,
    maxLength: [500, 'Comment cannot be more than 500 characters']
  },
  image: {
    type: String,
    default: '/api/placeholder/80/80'
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  }
});

const AchievementSchema = new Schema({
  number: {
    type: String,
    required: [true, 'Achievement number is required'],
    trim: true
  },
  label: {
    type: String,
    required: [true, 'Achievement label is required'],
    trim: true,
    maxLength: [100, 'Label cannot be more than 100 characters']
  },
  icon: {
    type: String
  }
});

const PortfolioSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  profile: ProfileSchema,
  projects: [ProjectSchema],
  experiences: [ExperienceSchema],
  works: [WorkSchema],
  services: [ServiceSchema],
  testimonials: [TestimonialSchema],
  achievements: [AchievementSchema],
  skills: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

PortfolioSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Project = mongoose.model('Project', ProjectSchema);
const Experience = mongoose.model('Experience', ExperienceSchema);
const Work = mongoose.model('Work', WorkSchema);
const Service = mongoose.model('Service', ServiceSchema);
const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
const Achievement = mongoose.model('Achievement', AchievementSchema);
const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = {
  Project,
  Experience,
  Work,
  Service,
  Testimonial,
  Achievement,
  Portfolio
};