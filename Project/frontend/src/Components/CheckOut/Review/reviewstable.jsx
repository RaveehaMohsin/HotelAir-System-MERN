import React, { useState, useEffect } from 'react';

const ReviewsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('https://lavender-iron-azimuth.glitch.me/reviews'); // Fetching data from the backend API
      const result = await response.json();
      setData(result); // Set the fetched data into the state
      setLoading(false); // Turn off the loading state
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Turn off the loading state even if there's an error
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component is mounted
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message if the data is still being fetched
  }


  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'experience', title: 'Experience' },
    { key: 'rating', title: 'Rating' },
    { key: 'feedback', title: 'Feedback' },
    { key: 'recommendation', title: 'Recommendation' },
    { key: 'futureIntent', title: 'Future Intent' },
  ];

  const renderStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.min(rating, totalStars);

    return (
      <>
        {Array.from({ length: fullStars }).map((_, index) => (
          <span key={index} style={{ color: 'goldenrod', fontSize: '1.5rem' }}>
            ★
          </span>
        ))}
        {Array.from({ length: totalStars - fullStars }).map((_, index) => (
          <span key={index + fullStars} style={{ color: '#ccc', fontSize: '1.5rem' }}>
            ★
          </span>
        ))}
      </>
    );
  };

  return (

    <div className="mt-4 m-2">
      <table className="table table-dark table-striped table-hover align-middle caption-top table-responsive">
        <thead className="align-middle">
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
                  {col.key === 'rating' ? (
                    <span >{renderStars(row[col.key])}</span>
                  ): col.key === 'recommendation' ? (
                    <span
                    style={{
                      backgroundImage: row[col.key] === 'Yes' 
                        ? 'linear-gradient(45deg, #175718, #4caf50)'  
                        : 'linear-gradient(45deg, #d32f2f, #e57373)', 
                      color: 'white',
                      paddingTop: '0.5rem',
                      paddingBottom: '0.5rem',
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      borderRadius: '5px',
                      display: 'inline-block', // Ensures the gradient is applied correctly
                    }}
                  >
                    {row[col.key]}
                  </span>
                  ) : col.key === 'futureIntent' ? (
                    <span
                    style={{
                      backgroundImage: row[col.key] === 'Yes' 
                        ? 'linear-gradient(45deg, #175718, #4caf50)'  
                        : 'linear-gradient(45deg, #d32f2f, #e57373)', 
                      color: 'white',
                      paddingTop: '0.5rem',
                      paddingBottom: '0.5rem',
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      borderRadius: '5px',
                      display: 'inline-block', 
                    }}
                  >
                    {row[col.key]}
                  </span>
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
              <span>Total Reviews: {data.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ReviewsTable;
