import React, { useEffect, useState } from 'react';

export default function Revenue() {
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [price , setPrice] = useState();

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

        const fetchBookings = async () => {
            try {
                const response = await fetch('https://lavender-iron-azimuth.glitch.me/bookings');
                if (!response.ok) {
                    throw new Error('Failed to fetch booking data');
                }
                const data = await response.json();
                const checkouts = data.filter(row => row.statusofBooking === 'Checkout');
                setBookings(checkouts);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
        fetchBookings();
    }, []);

    useEffect(() => {
        
        if (bookings.length > 0 && rooms.length > 0) {
            const calculatedData = bookings.map(booking => calculateStayCountAndTotalPayment(booking));
            setData(calculatedData);  
            
        }
    }, [bookings, rooms]);

    useEffect(() => {
        if (data.length > 0) {
            const price1 = getTotalSum();
            setPrice(price1);
        }
    }, [data]);

    const calculateStayCountAndTotalPayment = (booking) => {
        const arrivalDate = new Date(booking.arrivalDate);
        const departureDate = new Date(booking.departureDate);
        const timeDiff = departureDate.getTime() - arrivalDate.getTime();
        const stayCount = Math.ceil(timeDiff / (1000 * 3600 * 24));

        const room = rooms.find(room => room.roomNo === booking.roomNo);
        if (room) {
            const roomPrice = parseFloat(room.roomPricePerDay.$numberDecimal);
            const totalPayment = stayCount * roomPrice;

            return {
                roomNo: room.roomNo,
                guestName: booking.personName,
                email: booking.personEmail,
                stayCount: stayCount,
                roomPrice: '$ '+ roomPrice,
                totalPrice:  totalPayment,
            };
        } else {
            return {
                roomNo: 'N/A',
                guestName: booking.personName,
                email: booking.personEmail,
                stayCount: stayCount,
                roomPrice: 'N/A',
                totalPrice: 'N/A'
            };
        }
    };

    const getTotalSum = () => {
        let totalSum = 0;
        for (const row of data) {
            const totalPrice = parseFloat(row.totalPrice);
            totalSum += totalPrice;
            
        }
        return totalSum.toFixed(2); 
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const columns = [
        { key: 'roomNo', title: 'Room No' },
        { key: 'guestName', title: 'Guest' },
        { key: 'email', title: 'Email' },
        { key: 'stayCount', title: 'Stay Count' },
        { key: 'roomPrice', title: 'Room Price/Day' },
        { key: 'totalPrice', title: 'Total Price' }
    ];


    return (
        <div>
            <div>
                <h5><span className="home-text">Home</span> / Revenue</h5>
            </div>
            <div className='header'>
                <h3>Earnings Overview</h3>
            </div>
            <div className="mt-4 m-2">
                <table className="table table-dark table-striped table-hover align-middle caption-top table-responsive">
                    <thead className='align-middle'>
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key}>{col.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} style={{ padding: '1rem' }}>
                                {columns.map((col) => (
                                    <td key={col.key} style={{ padding: '1rem' }}>
                                        {row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={columns.length} className="text-center">
                                <span>Total Revenue: ${price}</span>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
