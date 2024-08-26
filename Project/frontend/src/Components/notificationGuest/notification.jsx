import React, { useEffect, useState } from 'react';
import './notifications.css';
import image from '../../Assets/nomail.png';
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle , FaSignOutAlt } from 'react-icons/fa';

export default function Notification() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

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
            const userBookings = result.filter(booking => booking.user === currentUser.Username);
            setData(userBookings);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    if (loading) return <p className="loading">Loading...</p>;

    if (data.length === 0) {
        return (
            <div className="notification no-notifications">
                <img src={image} alt="No notifications" />
                <h3 >No Notifications Yet</h3>
                <p>Looks like you don't have any notifications at the moment. Check back later!</p>
            </div>
        );
    }

    return (
      <div>
     <div>
        <h5><span className="home-text">Home</span> / Notifications</h5>
      </div>
       
        <div className="notifications-container">
         
            {data.map((booking, index) => {
                let notificationClass = '';
                let icon = null;
                let message = '';

                switch (booking.statusofBooking) {
                    case 'Approved':
                        notificationClass = 'notification accepted';
                        icon = <FaCheckCircle className="icon approved" />;
                        message = (
                          <span>
                              Congratulations! Your booking has been accepted. Room No: <strong style={{color:""}}>{booking.roomNo}</strong>, Arrival: {formatDate(booking.arrivalDate)} at {booking.arrivalTime}, Departure: {formatDate(booking.arrivalDate)} at {booking.departureTime}.
                              <p style={{color:"#c7c6c6"}}>We look forward to your stay!</p>
                          </span>
                      );

                        break;
                    case 'Pending':
                        notificationClass = 'notification pending';
                        icon = <FaHourglassHalf className="icon pending" />;
                        message = (
                          <span style={{color:"white"}}>
                              Your booking request is still pending. Room No: <strong style={{color:""}}>{booking.roomNo}</strong>, Arrival: {formatDate(booking.arrivalDate)} at {booking.arrivalTime}, Departure: {formatDate(booking.arrivalDate)} at {booking.departureTime}.
                              <p style={{color:"white"}}>We will notify you once it's processed.</p>
                          </span>
                      );
                
                        break;
                    case 'Rejected':
                        notificationClass = 'notification rejected';
                        icon = <FaTimesCircle className="icon rejected" />;
                        message = (
                          <span >
                              Unfortunately, your booking request has been rejected. Room No: <strong style={{color:""}}>{booking.roomNo}</strong>, Arrival: {formatDate(booking.arrivalDate)} at {booking.arrivalTime}, Departure: {formatDate(booking.arrivalDate)} at {booking.departureTime}.
                              <p style={{color:"#c7c6c6"}}>Please contact support for more information.</p>
                          </span>
                      );

                    break;
                    case 'Checkout':
                      notificationClass = 'notification checkout';
                      icon = <FaSignOutAlt className="icon checkout" />;
                      message = (
                        <span>
                            Your booking has been successfully checked out. Room No: <strong style={{color:"#ffffff"}}>{booking.roomNo}</strong>, Arrival: {formatDate(booking.arrivalDate)} at {booking.arrivalTime}, Departure: {formatDate(booking.departureDate)} at {booking.departureTime}.
                            <p style={{color:"#c7c6c6"}}>Thank you for staying with us!</p>
                        </span>
                    );
                  break;
                  
                    default:
                        notificationClass = 'notification';
                        message = 'Unknown status';
                }

                return (
                    <div key={booking._id} className={notificationClass} style={{animationDelay: `${index * 0.3}s`}}>
                        <div className="icon-container">{icon}</div>
                        <div className="notification-content">
                            <h4>{booking.statusofBooking}</h4>
                            <p>{message}</p>
                        </div>
                    </div>
                );
            })}
        </div>
        </div>
    );
}
