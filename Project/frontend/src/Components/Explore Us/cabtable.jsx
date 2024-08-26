import React from 'react';
import image1 from '../../Assets/c1.png'
import image2 from '../../Assets/c2.png'
import image3 from '../../Assets/c3.png'
import image4 from '../../Assets/c4.png'
import image5 from '../../Assets/c5.png'
import image6 from '../../Assets/c6.png'

const CabFacilityTable = () => {
  const data = [
    {
      id: 1,
      carType: 'Sedan',
      carName: 'Toyota Corolla',
      seatCapacity: 4,
      image: image1,
      pricePerDay: { $numberDecimal: '50.00' },
      driverName: 'John Doe',
      contact: '+1 123-456-7890',
    },
    {
      id: 2,
      carType: 'SUV',
      carName: 'Ford Explorer',
      seatCapacity: 7,
      image: image2,
      pricePerDay: { $numberDecimal: '80.00' },
      driverName: 'Jane Smith',
      contact: '+1 987-654-3210',
    },
    {
      id: 3,
      carType: 'Luxury',
      carName: 'BMW 7 Series',
      seatCapacity: 5,
      image: image3,
      pricePerDay: { $numberDecimal: '150.00' },
      driverName: 'Michael Johnson',
      contact: '+1 456-789-0123',
    },
    {
      id: 4,
      carType: 'Van',
      carName: 'Mercedes-Benz Sprinter',
      seatCapacity: 12,
      image: image4,
      pricePerDay: { $numberDecimal: '100.00' },
      driverName: 'Emily Davis',
      contact: '+1 321-654-9870',
    },
    {
      id: 5,
      carType: 'Convertible',
      carName: 'Mazda MX-5',
      seatCapacity: 2,
      image: image5,
      pricePerDay: { $numberDecimal: '120.00' },
      driverName: 'Chris Lee',
      contact: '+1 654-123-0987',
    },
    {
      id: 6,
      carType: 'Hatchback',
      carName: 'Honda Fit',
      seatCapacity: 4,
      image: image6,
      pricePerDay: { $numberDecimal: '40.00' },
      driverName: 'Sarah Brown',
      contact: '+1 234-567-8901',
    },
  ];

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'carType', title: 'Car Type' },
    { key: 'carName', title: 'Car Name' },
    { key: 'seatCapacity', title: 'Seat Capacity' },
    { key: 'image', title: 'Image' },
    { key: 'pricePerDay', title: 'Price Per Day' },
    { key: 'driverName', title: 'Driver Name' },
    { key: 'contact', title: 'Contact' },
  ];

  return (
    <div className="mt-4 m-2">
      <table className="table table-dark table-striped table-hover align-middle caption-top table-responsive">
        <thead className="align-middle">
          <tr>
            {columns.map((col) => (
              <th style={{ textAlign: 'center' }} key={col.key}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} style={{ padding: '1rem', textAlign: "center" }}>
              {columns.map((col) => (
                <td key={col.key} style={{ padding: '2.3rem' }}>
                  {col.key === 'image' ? (
                    <img
                      src={row[col.key]}
                      alt="Car"
                      style={{ width: '150px', height: 'auto' }}
                    />
                  ) : col.key === 'pricePerDay' ? (
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
              <span>Total Cars: {data.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CabFacilityTable;
