import React, { useState , useEffect } from 'react'
import '../Room/All Rooms/allrooms.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import Employeeview from './employeeview';
import Employeeadd from './employeeadd';
import { useLocation , useHistory  } from 'react-router-dom';

export default function Employeepage({isSidebarOpen}) {
  const [isAddingEmployee , setIsAddingEmployee] = useState(); 
  const location = useLocation();
  const history = useHistory ();

  useEffect(() => {   
    if (location.pathname.includes('/update') || location.pathname.includes('/id')) {
      setIsAddingEmployee(true);
    }
  }, [location.pathname]);

  const handleAddclick =()=>
  {
    setIsAddingEmployee(true);
  }
  const handleCancel =()=>
  {
    setIsAddingEmployee(false);
    history.replace('/employees');
  }
  return (
    <div>
      <div>
        <h5><span className="home-text">Home</span> / Employees</h5>
      </div>
      <div className='header'>
        <h3>Team Roster</h3>
        <button onClick={handleAddclick} >
          <FontAwesomeIcon icon={faAdd} /> Add Employee
        </button>    
      </div>
      <Employeeview isSidebarOpen={isSidebarOpen}  />
      {isAddingEmployee && (
        <Employeeadd
          isOpen={isAddingEmployee}
          onCancel={handleCancel}
          isSidebarOpen={isSidebarOpen} 
        />
      )}
    </div>
  )
}
