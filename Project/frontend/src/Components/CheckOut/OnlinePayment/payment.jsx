import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Checkout.css';

const OnlinePayment = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPayment, setTotalPayment] = useState(0);
  const [stayCount, setStayCount] = useState(0);
  const [roomimage, setRoomimage] = useState();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('https://lavender-iron-azimuth.glitch.me/room');
        const rooms = await response.json();
        setRooms(rooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setError(error.message);
      }
    };

    const fetchBooking = async () => {
      try {
        const response = await fetch(`https://lavender-iron-azimuth.glitch.me/bookings/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch booking data');
        }
        const data = await response.json();
        setBooking(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
    fetchBooking();
  }, [id]);

  useEffect(() => {
    if (booking && rooms.length > 0) {
      calculateStayCountAndTotalPayment();
    }
  }, [booking, rooms]);

  const calculateStayCountAndTotalPayment = () => {
    const arrivalDate = new Date(booking.arrivalDate);
    const departureDate = new Date(booking.departureDate);
    const timeDiff = departureDate.getTime() - arrivalDate.getTime();
    const stayCount = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setStayCount(stayCount);

    const room = rooms.find(room => room.roomNo === booking.roomNo);
    if (room) {
      const totalPayment = stayCount * room.roomPricePerDay.$numberDecimal;
      setTotalPayment(totalPayment);
      setRoomimage(room.roomImage);
    }
  };

  const stripeCheckout = async () => {
    booking.statusofBooking = 'Checkout';
    try {
        const response = await fetch('https://lavender-iron-azimuth.glitch.me/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                personName: booking.personName,
                personEmail: booking.personEmail,
                roomNo: booking.roomNo,
                totalPayment: totalPayment,
                roomImage: roomimage,
                bookingid: booking._id,
            }),
        });

        const data = await response.json();
        if (data.url) {
            window.location.href = data.url; // Redirect to Stripe checkout page
        } else {
            console.error('Checkout URL not returned');
        }
    } catch (error) {
        console.error('Error during checkout:', error);
    }
};


  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!booking) {
    return <div className="no-booking">No booking data available.</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: "2%" }}>
        <h5><span className="home-text">Home</span> / Payment</h5>
      </div>
      <div className="checkoutf-container">
        <div className="checkoutf-header">
          <h2>Checking Out</h2>
        </div>
        <div className="checkoutf-details">
          <div className="detailf-item">
            <strong>Name:</strong> {booking.personName}
          </div>
          <div className="detailf-item">
            <strong>Room No:</strong> {booking.roomNo}
          </div>
          <div className="detailf-item">
            <strong>Your Stay Count:</strong> {stayCount} days
          </div>
          <div className="detailf-item">
            <strong>Total Payment:</strong> $ {totalPayment}
          </div>
          <div className="detailf-item">
            <strong>Email ID:</strong> {booking.personEmail}
          </div>
          <div className="detailf-item">
            <strong>Mobile No:</strong> + {booking.personContact}
          </div>
          <div className="detailf-item">
            <strong>Arrival Date:</strong> {new Date(booking.arrivalDate).toLocaleDateString()}
          </div>
          <div className="detailf-item">
            <strong>Departure Date:</strong> {new Date(booking.departureDate).toLocaleDateString()}
          </div>
        </div>
        <button className="checkoutf-button" onClick={stripeCheckout}>
          Confirm Checkout
        </button>
      </div>
    </div>
  );
};

export default OnlinePayment;
