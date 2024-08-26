import React, { useState , useEffect } from 'react'
import '../Room/All Rooms/modal.css'
import { UserIcon } from '@heroicons/react/solid';
import { useParams, useLocation } from 'react-router-dom';

export default function Employeeadd({isOpen , onCancel , isSidebarOpen}) {
  const { id } = useParams();
  const location = useLocation(); 
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const [employeename , setemployeename] = useState();
  const [employeeimage , setEmployeeimage] = useState(null);
  const [employeeCNIC , setEmployeeCNIC] = useState();
  const [employeeContact , setEmployeeContact] = useState();
  const [employeeEmail , setEmpoyeeEmail] = useState();
  const [employeeSalary , setEmployeeSalary] = useState();

  const [alertMessage, setAlertMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('/update/') && id) {
      setIsUpdateMode(true);
      fetchRoomDetails(id);
    } else {
      setIsUpdateMode(false);

    }
  }, [location, id]);

  const fetchRoomDetails = async (employeeId) => {
    try {
      const response = await fetch(`https://lavender-iron-azimuth.glitch.me/employee/${employeeId}`);      
      const employeeData = await response.json();
      setemployeename(employeeData.employeeName);
      setEmployeeCNIC(employeeData.employeeCNIC);
      setEmployeeContact(employeeData.employeeContact);
      setEmpoyeeEmail(employeeData.employeeEmail);
      setEmployeeSalary(employeeData.employeeSalary);
    } catch (error) {
      console.error('Error fetching room details:', error);  
    }
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('employeename', employeename);
    if (!isUpdateMode && employeeimage) {
      formData.append('employeeimage', employeeimage);
    }
    formData.append('employeecnic', employeeCNIC);
    formData.append('employeecontact', employeeContact);
    formData.append('employeeemail', employeeEmail);
    formData.append('employeesalary', employeeSalary);

    const url =  'https://lavender-iron-azimuth.glitch.me/employeeadd';
    const method = 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (response.status === 201 || response.status === 200) {
        setAlertMessage('Employee Added Successfully');
        setIsSuccess(true);
      } else {
        setAlertMessage('Failed to Add Employee. Please try again.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An error occurred while saving the employee.');
      setIsSuccess(false);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    const employeeData = {
      employeename: employeename,
      employeeimage: employeeimage,
      employeecnic: employeeCNIC,
      employeecontact: employeeContact,
      employeeemail: employeeEmail,
      employeesalary: employeeSalary,
    };

    const url = `https://lavender-iron-azimuth.glitch.me/employee/update/${id}`
    const method = 'PUT' ;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (response.status === 201 || response.status === 200) {
        setAlertMessage(`Employee Updated Successfully!`);
        setIsSuccess(true);
      } else {
        setAlertMessage(`Failed to Update employee. Please try again.`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An error occurred while saving the room.');
      setIsSuccess(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div>
       <div className="backdrop" onClick={onCancel}></div>
      
      <dialog open className={`room-dialog ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <h2>
          {isUpdateMode ? 'Update Employee' : 'Add Employee'} <UserIcon className="icon" />
        </h2>
        {alertMessage && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
            {alertMessage}
          </div>
        )}
        <form onSubmit={isUpdateMode ? handleSubmitUpdate : handleSubmitAdd} encType="multipart/form-data">
        <p>
            <label htmlFor="employeename">Employee Name</label>
            <input
              type="text"
              id="employeename"
              name="employeename"
              required
              value={employeename}
              onChange={(e) => setemployeename(e.target.value)}
            />
          </p>
          {isUpdateMode ?  '' : <p>
              <label htmlFor="employeeimage">Employee Image</label>
              <input
                type="file"
                id="employeeimage"
                name="employeeimage"
                required
                accept="image/*"
                onChange={(e) => setEmployeeimage(e.target.files[0])}
              />
            </p> }
          

          <p>
            <label htmlFor="employeecnic">Employee CNIC</label>
            <input
              id="employeecnic"
              name="employeecnic"
              type="number"
              value={employeeCNIC}
              required
              onChange={(e) => setEmployeeCNIC(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="employeecontact">Employee Contact</label>
            <input
              id="employeecontact"
              name="employeecontact"
              type="number"
              value={employeeContact}
              required
              onChange={(e) => setEmployeeContact(e.target.value)}
            />
          </p>

          <p>
            <label htmlFor="employeeemail">Employee Email</label>
            <input
              type="email"
              id="employeeemail"
              name="employeeemail"
              required
              value={employeeEmail}
              onChange={(e) => setEmpoyeeEmail(e.target.value)}
            />
          </p>
         

          <p>
            <label htmlFor="employeesalary">Employee Salary</label>
            <input
              id="employeesalary"
              name="employeesalary"
              type="number"
              required
              value={employeeSalary}
              onChange={(e) => setEmployeeSalary(e.target.value)}
            />
          </p>

          <p className="actions">
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit">{isUpdateMode ? 'Update Employee' : 'Add Employee'}</button>
          </p>
        </form>
      </dialog>
    </div>
  )
}
