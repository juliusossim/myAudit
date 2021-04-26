import React from 'react';
import program0 from '../assets/images/projects/Rectangle 19.svg';
import program1 from '../assets/images/projects/Rectangle 19 (1).svg';
import program2 from '../assets/images/projects/Rectangle 19 (2).svg';
import program3 from '../assets/images/projects/Rectangle 19 (3).svg';
/**
 * api model data
 * backend resources
 */

export const projectType = [
  {
    id: 1,
    type: 'ngo',
    desc: 'organisational project'
  },
  {
    id: 2,
    type: 'individual',
    desc: 'organisational project'
  }
];
export const managers = [
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
export const locations = [
  {
    id: 1,
    name: 'lekki',
    state: 'lagos'
  },
  {
    id: 2,
    name: 'calabar',
    state: 'cross-river'
  }
];

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
