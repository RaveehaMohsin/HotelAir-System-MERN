import React from 'react';
import image from '../../Assets/download.png'
import image2 from '../../Assets/d2.png'
import image3 from '../../Assets/d3.png'
import image4 from '../../Assets/d4.png'

const RoomFacilityTable = () => {
  const data = [
    {
      id: 1,
      type: 'WiFi',
      name: 'High-Speed Internet',
      image: 'https://cdn-icons-png.flaticon.com/512/93/93158.png',
      description: 'Unlimited high-speed Wi-Fi access in all rooms.',
    },
    {
      id: 2,
      type: 'Lighting',
      name: 'Adjustable LED Lighting',
      image: image,
      description: 'Energy-efficient LED lighting with adjustable brightness.',
    },
    {
      id: 3,
      type: 'Air Conditioning',
      name: 'Central Air Conditioning',
      image: image2,
      description: 'Climate-controlled air conditioning with remote control.',
    },
    {
        id: 4,
        type: 'Mini Bar',
        name: 'Complimentary Mini Bar',
        image: image4,
        description: 'A selection of beverages and snacks available for free.',
    },
    {
      id: 5,
      type: 'Television',
      name: 'Smart TV with Cable',
      image: image3,
      description: '42-inch smart TV with access to cable channels and streaming services.',
    },    
    {
      id: 6,
      type: 'Safe Box',
      name: 'In-Room Safe',
      image: 'https://cdn-icons-png.flaticon.com/512/2649/2649047.png',
      description: 'Secure safe for storing valuables.',
    },
    {
      id: 7,
      type: 'Room Service',
      name: '24/7 Room Service',
      image: 'https://cdn-icons-png.flaticon.com/512/1569/1569695.png',
      description: 'Round-the-clock room service for food and beverages.',
    },
    {
      id: 8,
      type: 'Workspace',
      name: 'Dedicated Workspace',
      image: 'https://cdn-icons-png.flaticon.com/512/301/301811.png',
      description: 'Comfortable desk and chair for work or study.',
    },
  ];

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'type', title: 'Facility Type' },
    { key: 'name', title: 'Facility Name' },
    { key: 'image', title: 'Image' },
    { key: 'description', title: 'Description' },
  ];

  return (
    <div className="mt-4 m-2">
      <table className="table table-dark table-striped table-hover align-middle caption-top table-responsive">
        <thead className="align-middle">
          <tr >
            {columns.map((col) => (
              <th style={{ textAlign: 'center' }} key={col.key}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} style={{ padding: '1rem' , textAlign:"center" }}>
              {columns.map((col) => (
                <td key={col.key} style={{ padding: '2.3rem' }}>
                  {col.key === 'image' ? (
                    <img
                      src={row[col.key]}
                      alt="Facility"
                      style={{ width: '100px', height: 'auto' }}
                    />
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
              <span>Total Facilities: {data.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default RoomFacilityTable;
