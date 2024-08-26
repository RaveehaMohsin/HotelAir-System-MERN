import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import debounce from 'lodash.debounce'; // Import lodash.debounce

export default function BookingsChart({ isSidebarOpen }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Function to group bookings by month
  const groupBookingsByMonth = (bookings) => {
    const bookingsByMonth = new Array(12).fill(0); // Initialize an array for 12 months

    bookings.forEach((booking) => {
      const arrivalDate = new Date(booking.arrivalDate);
      const month = arrivalDate.getMonth(); // Get month (0-11)
      bookingsByMonth[month] += 1; // Increment the count for that month
    });

    return bookingsByMonth;
  };

  const fetchBookingsData = async () => {
    try {
      const response = await fetch('https://lavender-iron-azimuth.glitch.me/bookings'); // Adjust API endpoint as necessary
      const data = await response.json();
      const monthlyData = groupBookingsByMonth(data); // Group bookings by month
      setMonthlyBookings(monthlyData); // Set the grouped data to state
    } catch (error) {
      console.error('Error fetching bookings data:', error);
    }
  };

  // Fetch data on component mount and whenever screen width changes
  useEffect(() => {
    fetchBookingsData();
  }, [screenWidth]);

  useEffect(() => {
    if (chartRef.current && monthlyBookings.length > 0) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destroy previous chart instance
      }

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              type: 'bar',
              label: 'Monthly Bookings',
              data: monthlyBookings,
              backgroundColor: 'rgba(137, 190, 197, 0.5)',
              borderColor: 'rgb(137, 190, 197)',
              borderWidth: 1,
            },
            {
              type: 'line',
              label: 'Cumulative Bookings',
              data: monthlyBookings.map((sum => value => sum += value)(0)),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: true,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [monthlyBookings, isSidebarOpen]);

  // Debounced resize handler to refetch data on screen width change
  const handleResize = debounce(() => {
    setScreenWidth(window.innerWidth);
  }, 500); // Adjust debounce delay as needed

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Adjust canvas size based on sidebar state
  const canvasWidth = isSidebarOpen ? 'calc(100% - 250px)' : 'calc(100% - 100px)'; // Example widths

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={chartRef}
        style={{ width: canvasWidth, height: '100%' }} // Responsive width and height
      ></canvas>
    </div>
  );
}
