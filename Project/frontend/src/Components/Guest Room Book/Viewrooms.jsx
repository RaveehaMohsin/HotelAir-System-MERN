import React, { useEffect, useState } from "react";
import './viewrooms.css';
import { FaPhoneAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

export default function Viewrooms({  isSidebarOpen , onBookNowClick  }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const arrivalDate = queryParams.get('arrivaldate');
    const departureDate = queryParams.get('departuredate');

    if (arrivalDate && departureDate) {
      fetchRooms(arrivalDate, departureDate);
    } else {
      setError('Arrival and departure dates are required');
      setLoading(false);
    }
  }, [location.search]);

  const handleBookNowClick = (roomNo) => {
    if (onBookNowClick) {
      onBookNowClick({ isOpen: true, roomNo }); 
    }
  };

  const fetchRooms = async (arrivalDate, departureDate) => {
    setLoading(true);
    try {
      const response = await fetch(`https://lavender-iron-azimuth.glitch.me/getAvailablerooms?arrivaldate=${arrivalDate}&departuredate=${departureDate}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch rooms. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`rooms-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {loading && <p>Loading rooms...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && data.length === 0 && <p>No available rooms found for the selected dates.</p>}
      {!loading && !error && data.map((room) => (
        <div key={room.roomNo} className={`room-card ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="room-image-container">
            <img src={room.roomImage} className="room-image" alt="Room" />
          </div>
          <div className="room-content">
            <h3 className="room-title"> {room.roomType} - 
              {room.roomType === 'Single' ? (
                <span style={{ color: '#778899'}}> Perfect for solo travelers</span>
              ) : (
                <span style={{ color: '#2F4F4F' }}> Great for families</span>
              )}
            </h3>
            <p className="room-description">{room.roomDescription}</p>
            <div className="room-details">
              <p><FaMoneyCheckAlt className="room-icon" /> {`Price per Day: $${room.roomPricePerDay.$numberDecimal}`}</p>
              <p><FaPhoneAlt className="room-icon" /> {`Servant: ${room.roomServantName} (+${room.servantContact})`}</p>
            </div>
            <button className="btn btn-book" onClick={() => handleBookNowClick(room.roomNo)}>Book Now</button>
          </div>
        </div>
      ))}
    </div>
  );
}
