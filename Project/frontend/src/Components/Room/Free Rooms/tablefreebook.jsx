import React, { useState, useEffect } from 'react';
import "../All Rooms/allrooms.css";

const FreeBookRoomTable = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [refetch, setRefetch] = useState(false); 

  const fetchData = async () => {
    try {
         
        const response = await fetch(`https://lavender-iron-azimuth.glitch.me/getAvailablerooms?arrivaldate=${date}&departuredate=${date}`);
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
    { key: 'roomType', title: 'Type' },
    { key: 'roomPricePerDay', title: 'Price/day' },
    { key: 'roomImage', title: 'Image' },
    { key: 'roomDescription', title: 'Description' },
    { key: 'availabilityStatus', title: 'Availability Status' },
    { key: 'roomServantName', title: 'Servant Name' },
    { key: 'servantContact', title: 'Servant Contact' },
  ];


  return (
    <div className="mt-4 m-2">
      <button  onClick={handleRefetch} className="refetchbtn mb-3">Refetch Data</button>
      <table className="table table-dark table-striped table-hover align-middle caption-top table-responsive">
        <caption className="text-light">
        <p style={{ textAlign: 'left', margin: '0', padding: '0' }}>
    <label htmlFor="currentdate">Enter Date</label>
    <input
      id="currentdate"
      name="currentdate"
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      style={{ width: '20%' }}
      required
    />
  </p>
        </caption>
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
              <span>Total Available Rooms: {data.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default FreeBookRoomTable;
