import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Adjust path if necessary

export default function AvailabilityDisplay() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availability, setAvailability] = useState([]);
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Fetch bookings for the selected date
  useEffect(() => {
    if (date) {
      axios
        .get(`/api/bookings/${date}`)
        .then((response) => {
          setAvailability(response.data);
        })
        .catch((error) => {
          console.error('Error fetching bookings:', error.response || error.message);
        });
    }
  }, [date]);

  const handleCheckAvailability = () => {
    if (date && time) {
      // Check if the selected time is already booked on the selected date
      const isTimeBooked = availability.some(
        (booking) => booking.time === time
      );

      if (isTimeBooked) {
        setAvailabilityMessage('The selected time slot is already booked.');
      } else {
        setAvailabilityMessage('The selected time slot is available.');
      }
    } else {
      setAvailabilityMessage('Please select both a date and time.');
    }
  };

  const handleBooking = () => {
    if (date && time && availabilityMessage === 'The selected time slot is available.') {
      const name = "Test User";  // Replace with input field for user name
      const guests = 2; // Replace with input field for guests

      axios
        .post('/api/bookings', { name, guests, date, time })
        .then((response) => {
          setBookingConfirmed(true);
          setAvailabilityMessage('Your booking is confirmed!');
        })
        .catch((error) => {
          console.error('Error making booking:', error.response || error.message);
          setAvailabilityMessage('There was an issue with your booking.');
        });
    } else {
      setAvailabilityMessage('Please ensure the time slot is available before booking.');
    }
  };

  return (
    <div>
      <h2>Check Availability</h2>

      {/* Date Input */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Select a date"
      />

      {/* Time Input */}
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Select a time"
      />

      {/* Check Availability Button */}
      <button onClick={handleCheckAvailability}>Check Availability</button>

      {/* Availability Message */}
      {availabilityMessage && <p>{availabilityMessage}</p>}

      {/* Book Now Button */}
      {availabilityMessage === 'The selected time slot is available.' && !bookingConfirmed && (
        <button onClick={handleBooking}>Book Now</button>
      )}

      {/* Display bookings for the selected date */}
      <ul>
        {availability.map((booking) => (
          <li key={booking._id}>
            {booking.time} - {booking.name} ({booking.guests} guests)
          </li>
        ))}
      </ul>
    </div>
  );
}













