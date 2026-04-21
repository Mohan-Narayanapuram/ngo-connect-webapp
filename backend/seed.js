require('dotenv').config();
const mongoose = require('mongoose');
const Ngo      = require('./models/Ngo');

const ngos = [
  {
    name: 'Green Earth Foundation',
    cause: 'Environment',
    location: 'Chennai, Tamil Nadu',
    description: 'We work to restore forests and promote sustainable living across South India.',
    mission: 'Plant 1 million trees by 2030.',
    verified: true,
    image: '/images/ngo1.jpg',
    campaigns: [
      { title: 'Plant 10K Trees', description: 'Reforesting the Eastern Ghats.', goal: 100000, raised: 45000, image: '/images/c1.jpg' },
      { title: 'Clean Beaches Drive', description: 'Marina beach cleanup campaign.', goal: 20000, raised: 8000,  image: '/images/c2.jpg' },
    ],
  },
  {
    name: 'Shiksha Daan',
    cause: 'Education',
    location: 'Mumbai, Maharashtra',
    description: 'Providing quality education to underprivileged children in rural areas.',
    mission: 'Every child deserves a classroom.',
    verified: true,
    image: '/images/ngo2.jpg',
    campaigns: [
      { title: 'Build a School', description: 'Constructing school building in Vidarbha.', goal: 500000, raised: 220000, image: '/images/c3.jpg' },
      { title: 'Scholarship Fund',  description: 'Fund 100 students for higher education.', goal: 150000, raised: 60000, image: '/images/c4.jpg' },
    ],
  },
  {
    name: 'Aarogya Seva',
    cause: 'Healthcare',
    location: 'Hyderabad, Telangana',
    description: 'Free medical camps and medicine distribution in underserved communities.',
    mission: 'Healthcare is a right, not a privilege.',
    verified: false,
    image: '/images/ngo3.jpg',
    campaigns: [
      { title: 'Mobile Medical Unit', description: 'Take healthcare to remote villages.', goal: 300000, raised: 90000, image: '/images/c5.jpg' },
    ],
  },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Ngo.deleteMany();
  await Ngo.insertMany(ngos);
  console.log('✅ Seeded 3 NGOs');
  process.exit();
});
