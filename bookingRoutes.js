const express = require('express');
const Booking = require('../../models/Booking');
const router = express.Router();

// Create Booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
});

// Get Bookings by Date
router.get('/:date', async (req, res) => {
  try {
    const bookings = await Booking.find({ date: req.params.date });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
});

// Delete Booking
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error });
  }
});

module.exports = router;
