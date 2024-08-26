import React, { useState, useEffect } from 'react';
import './employee.css';
import { FaIdCard, FaPhoneAlt, FaEnvelope, FaMoneyCheckAlt, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom'; 

export default function EmployeeView({ isSidebarOpen }) {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [refetch, setRefetch] = useState(false); // Trigger for refetching data
    const history = useHistory();
  
    const fetchData = async () => {
        try {
            const response = await fetch('https://lavender-iron-azimuth.glitch.me/employee');
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
        history.push(path); 
    };

    const handleDelete = async (id) => {
    
        try {     
          await fetch(`https://lavender-iron-azimuth.glitch.me/employee/${id}`, {
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

    return (
        <div>
            <button onClick={handleRefetch} className="refetchbtn mb-1 mt-3">Refetch Data</button>
            <div className='employeesdiv'>
                {data.map(employee => (
                    <div key={employee.id} className={`card mb-3 mcard ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                        <div className="row g-0">
                            <div className="col-md-4 employee-img-container">
                                {/* <img
                                    src={employee.imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYN4scLAOk6JcRBGzBZrq9N4zSHo6oOB_aycIUGb6FlF48fK8XsTr1a6AJZgMuYrduBeY&usqp=CAU"} // Use a default image if none is provided
                                    className="img-fluid employee-img"
                                    alt="Employee"
                                /> */}

                                <img
                                    src={`https://lavender-iron-azimuth.glitch.me/employeeImages/${employee.employeeImage}`}
                                    className="img-fluid employee-img"
                                    alt="Employee"
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{employee.employeeName}</h5>
                                    <p className="card-text">
                                        <FaIdCard className="card-icon" /> {employee.employeeCNIC}
                                    </p>
                                    <p className="card-text">
                                        <FaPhoneAlt className="card-icon" /> {employee.employeeContact}
                                    </p>
                                    <p className="card-text">
                                        <FaEnvelope className="card-icon" /> {employee.employeeEmail}
                                    </p>
                                    <p className="card-text">
                                        <FaMoneyCheckAlt className="card-icon" /> {employee.employeeSalary}
                                    </p>
                                    <div className="card-buttons">
                                        <button className="btn btn-update" onClick={() => handleUpdation(`/employee/update/${employee._id}`)}>
                                            <FaEdit /> Update
                                        </button>
                                        <button className="btn btn-delete" onClick={() => handleDelete(employee._id)}>
                                            <FaTrashAlt /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
