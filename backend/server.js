const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Destination = require('./models/Destination');
const Booking = require('./models/Booking');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
// GET /destinations
app.get('/api/destinations', async (req, res) => {
  try {
    const destinations = await Destination.find({});
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /bookings
app.post('/api/bookings', async (req, res) => {
  try {
    const { user, destination, date, travelers } = req.body;
    const newBooking = new Booking({
      user,
      destination,
      date,
      travelers
    });
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: 'Error creating booking' });
  }
});

// Seed data
app.post('/api/seed', async (req, res) => {
  try {
    await Destination.deleteMany({});
    const seedData = [
      {
        name: "Lalibela Ethiopia",
        location: "Amhara Region",
        description: "Famous for its unique rock-hewn monolithic churches.",
        imageURL: "https://i.pinimg.com/1200x/ac/c2/a0/acc2a005bb35a27ccd518e1ef35cb53f.jpg",
      },
      {
        name: "Danakil Depression Ethiopia",
        location: "Afar Region",
        description: "One of the hottest and lowest places on Earth with active volcanoes.",
        imageURL: "https://i.pinimg.com/736x/fe/c5/ff/fec5ffc941d1dfb602934536b4a33c0e.jpg",
      },
      {
        name: "Gondar Ethiopia Castle",
        location: "Amhara Region",
        description: "Known as the Camelot of Africa, featuring the Fasil Ghebbi royal enclosure.",
        imageURL: "https://i.pinimg.com/736x/03/82/28/0382282724284aaef3c9ace934ff550a.jpg",
      },
      {
        name: "Simien Mountains Ethiopia",
        location: "Amhara Region",
        description: "Stunning mountain peaks and unique wildlife like the Gelada baboon.",
        imageURL: "https://i.pinimg.com/736x/c4/f8/88/c4f8883f2fd479462ed631ad8eb4618d.jpg",
      },
      {
        name: "Axum Ethiopia",
        location: "Tigray Region",
        description: "Ancient city famous for its towering obelisks and Christian history.",
        imageURL: "https://i.pinimg.com/736x/d4/28/ae/d428ae3fcffc4fd64db00c1e29c17856.jpg",
      },
      {
        name: "Bale Mountains National Park Ethiopia",
        location: "Oromia Region",
        description: "A biodiversity hotspot with unique flora and the rare Ethiopian wolf.",
        imageURL: "https://i.pinimg.com/1200x/14/5b/60/145b60e3a8da9a81db70f2526b27b67a.jpg",
      },
    ];
    await Destination.insertMany(seedData);
    res.json({ message: 'Seed data inserted' });
  } catch (err) {
    res.status(500).json({ message: 'Seed Error' });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ethioexplore')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('MongoDB connection error:', error));
