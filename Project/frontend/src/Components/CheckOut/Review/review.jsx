import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaSignOutAlt } from 'react-icons/fa';
import './reviewguest.css';
import AddReviewDialog from './reviewadd';

export default function ReviewGuest({isSidebarOpen}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAddingReview , setIsAddingReview] = useState(false);

    const openmodal=()=>
    {
        setIsAddingReview(true);
    }

    const handleCloseDialog =()=>
    {
        setIsAddingReview(false);
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("CurrentUser"));
        setCurrentUser(user);
    }, []);

    useEffect(() => {
        if (currentUser) {
            fetchData();
        }
    }, [currentUser]);

    const fetchData = async () => {
        try {
            const response = await fetch('https://lavender-iron-azimuth.glitch.me/bookings');
            const result = await response.json();
            const userBookings = result.filter(
                booking => 
                    booking.user === currentUser.Username && 
                    (booking.statusofBooking === "Approved" || booking.statusofBooking === "Checkout")
            );
            setData(userBookings);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) return <p className="loading">Loading...</p>;

    return (
        <div>
            <div>
        <h5><span className="home-text">Home</span> / Review</h5>
      </div>
        <div className="review-container">
            <h2 className="review-title">Your Approved and Checked Out Bookings</h2>
            <div className="booking-list">
                {data.map(booking => (
                    <div key={booking._id} className="booking-card">
                        <div className="booking-header">
                            <FaCheckCircle className="booking-icon" 
                                style={{ color: booking.statusofBooking === "Approved" ? "#28a745" : "#ffc107" }} 
                            />
                            <h3 className="booking-details">Room {booking.roomNo} - {booking.statusofBooking}</h3>
                        </div>
                        <p className="booking-details">Booked Under: {booking.personName}</p>
                        <p className="booking-details">Children: {booking.numberofChildren}, Adults: {booking.numberofAdults}</p>
                        <p className="booking-details">Arrival: {formatDate(booking.arrivalDate)} at {booking.arrivalTime}</p>
                        <p className="booking-details">Departure: {formatDate(booking.departureDate)} at {booking.departureTime}</p>
                    </div>
                ))}
            </div>
            <button className="review-button" onClick={openmodal}>
                <FaSignOutAlt className="review-icon" /> Review Us
            </button>
        </div>
        {isAddingReview && (
        <AddReviewDialog
          isOpen={isAddingReview}
          onCancel={handleCloseDialog}
          isSidebarOpen={isSidebarOpen} 
        />
      )}
        </div>
    );
}
