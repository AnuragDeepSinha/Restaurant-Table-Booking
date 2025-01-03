import BookingForm from '../components/BookingForm';
import AvailabilityDisplay from '../components/AvailabilityDisplay';

export default function Home() {
  return (
    <div>
      <header>
        <h1>Restaurant Table Booking</h1>
        <p>Reserve your table for an unforgettable experience!</p>
      </header>
      
      <main>
        <section>
          <BookingForm />
        </section>

        <section>
          <AvailabilityDisplay />
        </section>
      </main>

      <footer>
        <p>© 2025 Restaurant Name. All rights reserved.</p>
      </footer>
    </div>
  );
}
