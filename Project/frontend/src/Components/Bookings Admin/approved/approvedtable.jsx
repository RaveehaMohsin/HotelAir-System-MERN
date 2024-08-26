import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; 

const ApprovedBookings = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [refetch, setRefetch] = useState(false); 

  const fetchData = async () => {
    try {
      const response = await fetch('https://lavender-iron-azimuth.glitch.me/bookings/approved-or-checkout');
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refetch]); 

  const handleRefetch = () => {
    setRefetch(prev => !prev); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const columns = [
    { key: 'roomNo', title: 'Room No' },
    { key: 'personName', title: 'Person Name' },
    { key: 'personEmail', title: 'Person Email' },
    { key: 'numberofChildren', title: 'No. of Children' },
    { key: 'numberofAdults', title: 'No. of Adults' },
    { key: 'arrival', title: 'Arrival' },
    { key: 'departure', title: 'Departure' },
    { key: 'statusofBooking', title: 'Status' },
  ];

  return (
    <div className="mt-4 m-2">
      <button onClick={handleRefetch} className="refetchbtn mb-3">Refetch Data</button>
      <table className="table table-dark table-striped table-hover align-middle caption-top table-responsive">
        <caption className="text-light">Secured Bookings...</caption>
        <thead className='align-middle'>
          <tr style={{textAlign:"center"}}>
            {columns.map((col) => (
              <th key={col.key}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {           
            return (
              <tr key={row._id} style={{ padding: '1rem' , textAlign:"center" }}>
                {columns.map((col) => (
                  <td key={col.key} style={{ padding: '1rem' }}>
                    {col.key === 'arrival' ? (
                      `${new Date(row.arrivalDate).toLocaleDateString()} ${row.arrivalTime}`
                    ) : col.key === 'departure' ? (
                      `${new Date(row.departureDate).toLocaleDateString()} ${row.departureTime}`
                    ) : col.key === 'statusofBooking' ? (
                        <span
                          style={{
                            backgroundColor: row[col.key] === 'Approved' ? '#175718' : 'grey',
                            color: 'white',
                            padding: '0.3rem',
                            borderRadius: '5px',
                          }}
                        >
                          {row[col.key]}
                        </span>
                      ) :(
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columns.length} className="text-center">
              <span>Total Approved Bookings: {data.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ApprovedBookings;
