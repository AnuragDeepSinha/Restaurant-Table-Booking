import React, { useState } from 'react';

export default function BookingForm() {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isBooked, setIsBooked] = useState(false);  // State to track if booking is confirmed

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulating a successful booking response
    console.log({ name, guests, date, time });

    // After submitting the form, reset all fields to their initial state
    setName('');
    setGuests('');
    setDate('');
    setTime('');
    setIsBooked(true);  // Set booking status to true

    // Optionally, you can show a confirmation message and clear it after a few seconds
    setTimeout(() => {
      setIsBooked(false);  // Reset the booking status after a few seconds
    }, 3000);  // Message stays for 3 seconds
  };

  return (
    <div className="booking-form">
      <h2>Reserve Your Table</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="guests">Number of Guests:</label>
        <input
          type="number"
          id="guests"
          name="guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          required
        />

        <label htmlFor="date">Reservation Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <button type="submit">Book Now</button>
      </form>

      {/* Show confirmation message after booking */}
      {isBooked && <p className="confirmation-message">Booking Confirmed!</p>}
    </div>
  );
}


