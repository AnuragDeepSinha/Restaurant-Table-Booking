const mongoose = require('mongoose');
const Booking = require('./models/Booking'); // Import Booking model

mongoose.connect('mongodb://localhost:27017/restaurantDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB!'))
.catch(err => console.log('Error connecting to MongoDB:', err));

// Sample data to insert
const newBooking = new Booking({
  name: 'Jane Doe',
  date: '2025-01-04',
  time: '20:00',
  guests: 2,
  contact: '987-654-3210'
});

newBooking.save()
  .then(() => console.log('Booking added!'))
  .catch(err => console.log('Error adding booking:', err));

