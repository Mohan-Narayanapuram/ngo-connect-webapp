const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: [
    'https://ngo-connect-webapp.vercel.app',
    'https://ngo-connect-webapp-production.up.railway.app'
  ],
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('NGO Connect API is running...');
});

app.use('/api/auth',    require('./routes/authRoutes'));
app.use('/api/ngos',    require('./routes/ngoRoutes'));
app.use('/api/donate',  require('./routes/donationRoutes'));
app.use('/api/users',   require('./routes/userRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error(err));