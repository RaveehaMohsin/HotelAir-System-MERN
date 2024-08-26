import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faClipboardList , faHotel } from '@fortawesome/free-solid-svg-icons';
import { HomeIcon } from '@heroicons/react/solid';
import './homeadmin.css';
import BookingsChart from './graph';
import RoomBookingsChart from './ratiograph'
import { UserIcon } from '@heroicons/react/solid';

export default function Homeadmin({isSidebarOpen}) {
  const [bookings, setbookings] = useState([]);
  const [rooms, setrooms] = useState(0);
  const [employees, setemployees] = useState(0);
  const [pending, setpending] = useState(0);

  const fetchData = async () => {
    try {
      const response1 = await fetch('https://lavender-iron-azimuth.glitch.me/bookings');
      const response2 = await fetch('https://lavender-iron-azimuth.glitch.me/employee');
      const response3 = await fetch('https://lavender-iron-azimuth.glitch.me/room');
      const response4 = await fetch('https://lavender-iron-azimuth.glitch.me/bookings/pending');

      const result1 = await response1.json();
      const result2 = await response2.json();
      const result3 = await response3.json();
      const result4 = await response4.json();

      setbookings(result1);
      setrooms(result3.length);
      setemployees(result2.length);
      setpending(result4.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [employeess, setEmployees] = useState([]);

  const fetchEmployeesData = async () => {
    try {
      const response = await fetch('https://lavender-iron-azimuth.glitch.me/employee'); // Adjust API endpoint as necessary
      const data = await response.json();
      setEmployees(data.slice(0, 4)); // Get only the first 4 employees
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };


  useEffect(() => {
    fetchData();
    fetchEmployeesData();
  }, []);

  // Calculate statistics
  const totalBookings = bookings.length;
  const approvedBookings = bookings.filter(booking => booking.statusofBooking === 'Approved').length;
  const pendingBookings = pending;
  const occupancyRate = rooms > 0 ? (totalBookings / rooms) * 100 : 0;
  const averageStayDuration = bookings.length > 0 ? bookings.reduce((total, booking) => {
    const arrival = new Date(booking.arrivalDate);
    const departure = new Date(booking.departureDate);
    return total + (departure - arrival) / (1000 * 60 * 60 * 24); // Convert to days
  }, 0) / bookings.length : 0;

  return (
    <div>
      <div>
        <h5><span className="home-text">Home</span> / Dashboard</h5>
      </div>
      <div className='maincontainerdisplay'>
        <div className={`singlediv ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="heading-container1">
            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
            <h4>All Bookings</h4>
          </div>
          <h2>{totalBookings}</h2>
          <h6>Occupancy Rate: {occupancyRate.toFixed(2)}%</h6>
          <p>Approved: {approvedBookings}, Pending: {pendingBookings}</p>
        </div>

        <div className={`singlediv ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="heading-container1">
            <FontAwesomeIcon icon={faUser} className="icon" />
            <h4>Curr Employees</h4>
          </div>
          <h2>{employees}</h2>
          <h6>+2</h6>
          <p>Since Last Week</p>
        </div>

        <div className={`singlediv ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="heading-container1">
          <HomeIcon className="icon" />
            <h4>Total Rooms</h4>
          </div>
          <h2>{rooms}</h2>
          <h6>+22%</h6>
          <p>From Last Month</p>
        </div>

        <div className={`singlediv ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="heading-container1">
            <FontAwesomeIcon icon={faClipboardList} className="icon" />
            <h4>Pending Tasks</h4>
          </div>
          <h2>{pending}</h2>
          <h6>-3</h6>
          <p>Compared to Last Week</p>
        </div>

        <div className={`singlediv ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="heading-container1">
            <FontAwesomeIcon icon={faHotel} className="icon" />
            <h4>Avg Stay Duration</h4>
          </div>
          <h2>{averageStayDuration.toFixed(2)} days</h2>
          <h6>+1%</h6>
          <p>Across All Bookings</p>
        </div>
      </div>
     
      <div className={`graphdiv ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <BookingsChart isSidebarOpen={isSidebarOpen} />
      </div> 
      <div className='empndgraph'>
      <div className={`ratiograph ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <RoomBookingsChart isSidebarOpen={isSidebarOpen} />
      </div>
      <div className={`popularemployees ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div style={{display:"flex"}}><UserIcon className="icon" /><h6>Popular Employees</h6></div>
        {employeess.map((employee) => (
          <div key={employee._id} className='employee-card'>
            <img
              src={`https://lavender-iron-azimuth.glitch.me/employeeImages/${employee.employeeImage}`}
              alt={employee.employeeName}
              className='employee-image'
            />
            <div className='employee-details'>
              <h4 className='employee-name'>{employee.employeeName}</h4>
              <p className='employee-contact'>{employee.employeeContact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>   
    </div>
  );
}

