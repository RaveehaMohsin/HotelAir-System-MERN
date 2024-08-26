import React, { useState, useEffect } from 'react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import "./allrooms.css";
import { useHistory } from 'react-router-dom'; 

const RoomTable = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [refetch, setRefetch] = useState(false); 
  const history = useHistory();


  const fetchData = async () => {
    try {
    const response = await fetch('https://lavender-iron-azimuth.glitch.me/room');
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

  const handleUpdation = (path) => {
    history.push(path); // Navigate to the specified path
};

  const handleDelete = async (id) => {
    
    try {     
      await fetch(`https://lavender-iron-azimuth.glitch.me/room/${id}`, {
        method: 'DELETE',
      });
      handleRefetch(); // Refetch data after deletion
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const columns = [
    { key: 'roomNo', title: 'Room No' },
    { key: 'roomType', title: 'Type' },
    { key: 'roomPricePerDay', title: 'Price/day' },
    { key: 'roomImage', title: 'Image' },
    { key: 'roomDescription', title: 'Description' },
    { key: 'roomServantName', title: 'Servant Name' },
    { key: 'servantContact', title: 'Servant Contact' },
    { key: 'action', title: 'Action' },
  ];

  return (
    <div className="mt-4 m-2">
      <button  onClick={handleRefetch} className="refetchbtn mb-3">Refetch Data</button>
      <table className="table table-dark table-striped table-hover align-middle caption-top table-responsive">
      <caption className="text-light">List of Rooms</caption>
        <thead className='align-middle'>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (   
                
            <tr key={row._id} style={{ padding: '1rem' }}>             
              {columns.map((col) => (
                <td key={col.key} style={{ padding: '1rem' }}>
                  {col.key === 'roomImage' ? (
                    <img
                      src={row[col.key]}
                      alt="Room"
                      style={{ width: '100px', height: 'auto' }}
                    />
                  ) : col.key === 'action' ? (
                    <div style={{ display: 'flex' }}>
                      <button className="custom-btn edit-btn me-2" onClick={() => handleUpdation(`/rooms/update/${row._id}`)}  >
                        <PencilAltIcon className="icon" />
                      </button>
                      <button className="custom-btn delete-btn" onClick={() => handleDelete(row._id)}>
                        <TrashIcon className="icon" />
                      </button>
                    </div>
                  ) : col.key === 'availabilityStatus' ? (
                    <span
                      style={{
                        backgroundColor: row[col.key] === 'Available' ? '#175718' : '#c2bd36d5',
                        color: 'white',
                        padding: '0.3rem',
                        borderRadius: '5px',
                      }}
                    >
                      {row[col.key]}
                    </span>
                  ) : col.key === 'roomPricePerDay' ? (
                    `$${row[col.key].$numberDecimal}`
                  ) : (
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
              <span>Total Rooms: {data.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default RoomTable;
