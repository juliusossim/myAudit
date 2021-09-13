import program0 from '../assets/images/projects/Rectangle 19.svg';
import program1 from '../assets/images/projects/Rectangle 19 (1).svg';
import program2 from '../assets/images/projects/Rectangle 19 (2).svg';
import program3 from '../assets/images/projects/Rectangle 19 (3).svg';
/**
 * api model data
 * backend resources
 */

export const projectType = [
  'select project type',
  {
    id: 1,
    type: 'business',
    desc: 'corporate project',
    value: 1
  },
  {
    id: 2,
    type: 'ngo',
    desc: 'organisational project',
    value: 2
  },
  {
    id: 3,
    type: 'religious organisation',
    desc: 'organisational project',
    value: 3
  }
];
export const countries = [
  'select your country',
  {
    id: 1,
    name: 'Nigeria'
  },
  {
    id: 2,
    name: 'USA'
  },
  {
    id: 3,
    name: 'UK'
  },
  {
    id: 4,
    name: 'Other'
  }
];
export const sortCats = [
  'select project type',
  {
    id: 1,
    type: 'most popular',
    desc: 'corporate project',
    value: 1
  },
  {
    id: 2,
    type: 'almost funded',
    desc: 'organisational project',
    value: 2
  },
  {
    id: 3,
    type: 'newly started',
    desc: 'organisational project',
    value: 3
  },
  {
    id: 4,
    type: 'ending soon',
    desc: 'organisational project',
    value: 4
  },
  {
    id: 5,
    type: 'completed',
    desc: 'organisational project',
    value: 5
  }
];
export const profileType = [
  'select item...',
  {
    id: 1,
    type: 'corporate',
    desc: 'corporate project',
    value: 2
  },
  {
    id: 3,
    type: 'individual',
    desc: 'individual project',
    value: 1
  }
];
export const managers = [
  'select a manager',
  {
    id: 1,
    fullName: 'olufemi adebayor',
    accountNumber: 129448757
  },
  {
    id: 2,
    fullName: 'ossim julius',
    accountNumber: 450940488
  }
];
export const days = [
  'select a manager',
  {
    id: 1,
    name: '7 days',
    value: 7
  },
  {
    id: 2,
    name: '30 days',
    value: 30
  }
];
export const projectCategories = [
  'select a category',
  {
    id: 1,
    name: 'education'
  },
  {
    id: 2,
    name: 'tourism'
  }
];
export const approvalStatus = [
  'pending',
  'approved',
  'returned',
  'rejected',
  'paused',
  'deleted',
  'none'
];
export const approvalColors = {
  deleted: 'secondary',
  approved: 'primary',
  paused: 'secondary'
};
export const popularProjects = [
  {
    id: 1,
    photo: program0,
    name: 'operation feed the nation',
    target: 4250250,
    raised: 234002,
    duration: 30,
    created_at: '01/03/2021',
    manager_name: 'Julius Ossim',
    location: 'abuja, nigeria',
    description: 'Nigeria is a black nation inhabited by great minds but rule by imbeciles. The country is ravaged by rampaging hunger'
  },
  {
    id: 2,
    photo: program1,
    name: 'operation feed the nation',
    manager_name: 'Julius Ossim',
    target: 4250250,
    raised: 2940002,
    duration: 30,
    created_at: '04/03/2021',
    location: 'abuja, nigeria',
    description: 'Nigeria is a black nation inhabited by great minds but rule by imbeciles. The country is ravaged by rampaging hunger'
  },
  {
    id: 3,
    photo: program2,
    name: 'operation feed the nation',
    manager_name: 'Julius Ossim',
    target: 4250250,
    raised: 2340002,
    duration: 30,
    created_at: '03/03/2021',
    location: 'abuja, nigeria',
    description: 'Nigeria is a black nation inhabited by great minds but rule by imbeciles. The country is ravaged by rampaging hunger'
  },
  {
    id: 4,
    photo: program3,
    name: 'operation feed the nation',
    manager_name: 'Julius Ossim',
    target: 4250250,
    raised: 294002,
    duration: 30,
    created_at: '04/02/2021',
    location: 'abuja, nigeria',
    description: 'Nigeria is a black nation inhabited by great minds but rule by imbeciles. The country is ravaged by rampaging hunger'
  }
];

export const raisersCategory = [
  'education', 'technology', 'business', 'agriculture',
  'sports', 'charity', 'emergency', 'health', 'finance',
  'community', 'NGOs', 'government'
];
