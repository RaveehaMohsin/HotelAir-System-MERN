import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import debounce from 'lodash.debounce';

export default function RoomBookingsChart({ isSidebarOpen }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [roomBookingsData, setRoomBookingsData] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Function to fetch room bookings and room data
  const fetchRoomBookingsData = async () => {
    try {
      const bookingsResponse = await fetch('https://lavender-iron-azimuth.glitch.me/bookings'); // Adjust API endpoint as necessary
      const bookingsData = await bookingsResponse.json();

      const roomsResponse = await fetch('https://lavender-iron-azimuth.glitch.me/room'); // Adjust API endpoint as necessary
      const roomsData = await roomsResponse.json();

      // Process and aggregate bookings data
      const monthlyBookings = {};

      bookingsData.forEach((booking) => {
        const arrivalDate = new Date(booking.arrivalDate);
        const month = arrivalDate.getMonth(); // Get month (0-11)
        const roomNo = booking.roomNo;
        const room = roomsData.find((room) => room.roomNo === roomNo);
        if (room) {
          const roomType = room.roomType;
          if (!monthlyBookings[roomType]) {
            monthlyBookings[roomType] = new Array(12).fill(0);
          }
          monthlyBookings[roomType][month] += 1;
        }
      });

      setRoomBookingsData(monthlyBookings); // Set the aggregated data to state
    } catch (error) {
      console.error('Error fetching room bookings data:', error);
    }
  };

  // Fetch data on component mount and whenever screen width changes
  useEffect(() => {
    fetchRoomBookingsData();
  }, [screenWidth]);

  useEffect(() => {
    if (chartRef.current && Object.keys(roomBookingsData).length > 0) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destroy previous chart instance
      }

      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      const datasets = Object.keys(roomBookingsData).map((roomType) => ({
        label: `${roomType} Bookings`,
        data: roomBookingsData[roomType],
        backgroundColor: roomType === 'Single' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 159, 64, 0.2)',
        borderColor: roomType === 'Single' ? 'rgb(75, 192, 192)' : 'rgb(255, 159, 64)',
        borderWidth: 2,
        fill: true,
      }));

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: months,
          datasets: datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const label = tooltipItem.dataset.label || '';
                  const value = tooltipItem.raw || '';
                  return `${label}: ${value} bookings`;
                },
              },
            },
          },
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
              beginAtZero: true,
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
  }, [roomBookingsData, isSidebarOpen]);

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
  const canvasWidth = isSidebarOpen ? 'calc(100% - 450px)' : 'calc(100% - 250px)'; // Example widths

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={chartRef}
        style={{ width: canvasWidth, height: '100%' }} // Responsive width and height
      ></canvas>
    </div>
  );
}
