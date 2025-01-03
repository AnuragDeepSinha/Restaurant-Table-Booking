const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Booking Schema and Model
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  guests: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

// Create a new booking
app.post('/api/bookings', async (req, res) => {
  const { name, guests, date, time } = req.body;

  try {
    // Check if the booking already exists for the same time and date
    const existingBooking = await Booking.findOne({ date, time });

    if (existingBooking) {
      return res.status(400).json({ message: 'This time slot is already booked.' });
    }

    const newBooking = new Booking({ name, guests, date, time });
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get bookings for a specific date
app.get('/api/bookings/:date', async (req, res) => {
  const { date } = req.params;

  try {
    const bookings = await Booking.find({ date });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a booking by ID
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


