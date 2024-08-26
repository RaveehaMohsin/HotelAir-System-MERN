import React, { useEffect, useState } from 'react';
import { FaBed, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import './ApprovedbookingsCheckout.css'; 

export default function ApprovedbookingsCheckout() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("CurrentUser"));
        setCurrentUser(user);
    }, []);

    useEffect(() => {
        if (currentUser) {
            fetchData();
        }
    }, [currentUser]);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const fetchData = async () => {
        try {
            const response = await fetch('https://lavender-iron-azimuth.glitch.me/bookings');
            const result = await response.json();
            const userBookings = result.filter(
                booking => 
                    booking.user === currentUser.Username && 
                    booking.statusofBooking === "Approved"
            );
            setData(userBookings);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleCheckout = (bookingId) => {      
         history.push(`/checkout/payment/${bookingId}`);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="checkout-container">
            {data.length > 0 ? (
                data.map((booking) => (
                    <div key={booking._id} className="booking-row">
                        <div className="booking-info">
                            <span><FaUser /> {booking.personName}</span>
                            <span><FaCalendarAlt /> Arrival: {formatDate(booking.arrivalDate)}</span>
                            <span><FaCalendarAlt /> Departure: {formatDate(booking.departureDate)}</span>
                            <span><FaBed /> Room No: {booking.roomNo}</span>
                        </div>
                        <button 
                            className="checkout-btn" 
                            onClick={() => handleCheckout(booking._id)}
                        >
                            Checkout
                        </button>
                    </div>
                ))
            ) : (
                <div className="no-bookings">No approved bookings available.</div>
            )}
        </div>
    );
}
