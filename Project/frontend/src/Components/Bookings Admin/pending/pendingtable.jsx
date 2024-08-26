import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom'; 

const PendingBookings = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [refetch, setRefetch] = useState(false); 
  const history = useHistory();

  const fetchData = async () => {
    try {
      const response = await fetch('https://lavender-iron-azimuth.glitch.me/bookings/pending');
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

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`https://lavender-iron-azimuth.glitch.me/bookings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statusofBooking: 'Approved' }),
      });
  
      if (response.ok) {
        console.log(`Booking ${id} approved.`);
        handleRefetch(); // Refetch the data to update the UI
      } else {
        console.error('Failed to approve booking.');
      }
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };
  

  const handleReject = async (id) => {
    try {
        const response = await fetch(`https://lavender-iron-azimuth.glitch.me/bookings/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ statusofBooking: 'Rejected' }),
        });
    
        if (response.ok) {
          console.log(`Booking ${id} rejected.`);
          handleRefetch(); 
        } else {
          console.error('Failed to reject booking.');
        }
      } catch (error) {
        console.error('Error rejecting booking:', error);
      }
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
    { key: 'action', title: 'Action' },
  ];

  return (
    <div className="mt-4 m-2">
      <button onClick={handleRefetch} className="refetchbtn mb-3">Refetch Data</button>
      <table className="table table-dark table-striped table-hover align-middle caption-top table-responsive">
        <caption className="text-light">Reservation in Progress...</caption>
        <thead className='align-middle'>
          <tr style={{textAlign:"center"}}>
            {columns.map((col) => (
              <th key={col.key}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (   
            <tr key={row._id} style={{ padding: '1rem' , textAlign:"center" }}>             
              {columns.map((col) => (
                <td key={col.key} style={{ padding: '1rem' }}>
                  {col.key === 'arrival' ? (
                    `${new Date(row.arrivalDate).toLocaleDateString()} ${row.arrivalTime}`
                  ) : col.key === 'departure' ? (
                    `${new Date(row.departureDate).toLocaleDateString()} ${row.departureTime}`
                  ) : col.key === 'action' ? (
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                      <button 
                        className="custom-btn approved-btn" 
                        onClick={() => handleApprove(row._id)}
                        style={{ 
                          backgroundColor: '#28a745', 
                          color: 'white', 
                          border: 'none', 
                          padding: '0.5rem 1rem', 
                          borderRadius: '0.25rem', 
                          cursor: 'pointer'
                        }}
                      >
                        <FontAwesomeIcon icon={faCheck} style={{ marginRight: '0.5rem' }} />
                        Approve
                      </button>
                      <button 
                        className="custom-btn reject-btn" 
                        onClick={() => handleReject(row._id)}
                        style={{ 
                          backgroundColor: '#dc3545', 
                          color: 'white', 
                          border: 'none', 
                          padding: '0.5rem 1rem', 
                          borderRadius: '0.25rem', 
                          cursor: 'pointer'
                        }}
                      >
                        <FontAwesomeIcon icon={faTimes} style={{ marginRight: '0.5rem' }} />
                        Reject
                      </button>
                    </div>
                  )  : (
                    row[col.key]
                  )}
                </td>
              ))}            
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columns.length} className="text-center">
              <span>Total Pending Bookings: {data.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PendingBookings;
