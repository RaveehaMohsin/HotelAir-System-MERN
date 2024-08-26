import React from 'react';

const PersonalizedTable = () => {
  const data = [
    {
      id: 1,
      type: 'Jacuzzi',
      name: 'Luxury Jacuzzi',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8yfwqKfKlVzxGpE-y5Y3LGVlPVh6tSD7uZw&s',
      description: 'Relax in our state-of-the-art jacuzzi with soothing jets.',
    },
    {
      id: 2,
      type: 'Swimming Pool',
      name: 'Outdoor Swimming Pool',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSIPP1hAnIt_ySFnBEi13wyYITVoFpqdoOrA&s',
      description: 'Take a dip in our spacious outdoor pool with comfortable loungers.',
    },
    {
      id: 3,
      type: 'Spa',
      name: 'Full-Service Spa',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJX_LDBhWWooDUr9f9MMuQ1b19at8EdRDCNQ&s',
      description: 'Enjoy a range of treatments in our tranquil spa environment.',
    },
    {
      id: 4,
      type: 'Pedicure',
      name: 'Professional Pedicure',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS070DThEFejo9TAwguLPsINxbgxXnI29PXTQ&s',
      description: 'Pamper your feet with our luxurious pedicure services.',
    },
    {
      id: 5,
      type: 'Theatre',
      name: 'Private Theatre',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBO56Epbjh3jHTKFQOx0ROLv1_gFWn9GGMHA&s',
      description: 'Watch movies in our private theatre with the latest sound and projection systems.',
    },
    {
      id: 6,
      type: 'Banquet',
      name: 'Elegant Banquet Hall',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtSWLaMTP8i4Zdpvk7Q6pVlsIms6a7aCyJ2g&s',
      description: 'Host your events in our elegant banquet hall with customizable setups.',
    },
  ];

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'type', title: 'Amenity Type' },
    { key: 'name', title: 'Amenity Name' },
    { key: 'image', title: 'Image' },
    { key: 'description', title: 'Description' },
  ];

  return (
    <div className="mt-4 m-2">
      <table className="table table-dark table-striped table-hover align-middle caption-top table-responsive">
        <thead className="align-middle">
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ textAlign: 'center' }}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} style={{ textAlign: 'center' }}>
              {columns.map((col) => (
                <td key={col.key} style={{ padding: '2rem' }}>
                  {col.key === 'image' ? (
                    <img
                      src={row[col.key]}
                      alt={row.name}
                      style={{ width: '130px', height: 'auto' }}
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
              <span>Total Amenities: {data.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PersonalizedTable;
