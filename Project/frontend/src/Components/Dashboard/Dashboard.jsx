import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBed, faUsers, faCalendarAlt, faComments, faDollarSign , faSignOutAlt , faCheckCircle  , faHourglassHalf  } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom'; // Import useHistory
 import './Dashboard.css'; 
import image from '../../Assets/pngtree-beautiful-admin-roles-line-vector-icon-png-image_2035379.jpg';

export default function Dashboard() {
    const history = useHistory(); // Initialize useHistory hook

    const handleNavigation = (path) => {
        history.push(path); // Navigate to the specified path
    };

    const logoutSession = ()=>
    {
        localStorage.setItem("CurrentUser" , "");
        history.push('/');
    }
    const user = JSON.parse(localStorage.getItem('CurrentUser'));

    return (
        <div className='dashboard'>
            <div className='sidebar'>
                <div className='profile'>
                    <img
                        src={image} 
                        alt='Profile'
                        className='profile-img'
                    />
                    <div className='profile-info'>
                        <h3 className='profile-name'>{user.firstName} {user.lastName} </h3>
                        <p className='profile-role'>Admin</p>
                    </div>
                </div>
                <ul className='nav-list'>
                    <li className='nav-item' onClick={() => handleNavigation('/home')}>
                        <FontAwesomeIcon icon={faTachometerAlt} className='nav-icon' />
                        Dashboard
                    </li>
                    <li className='nav-item'>
                        <FontAwesomeIcon icon={faBed} className='nav-icon' />
                        Rooms
                        <ul className='sub-list'>
                            <li onClick={() => handleNavigation('/rooms/all')}>All Rooms</li>
                            <li onClick={() => handleNavigation('/rooms/free')}>Free Rooms</li>
                            <li onClick={() => handleNavigation('/rooms/occupied')}>Occupied Rooms</li>
                        </ul>
                    </li>
                    <li className='nav-item' onClick={() => handleNavigation('/employees')}>
                        <FontAwesomeIcon icon={faUsers} className='nav-icon' />
                        Employees
                    </li>
                    <li className='nav-item'>
                        <FontAwesomeIcon icon={faCalendarAlt} className='nav-icon' />
                        Bookings
                        <ul className='sub-list'>
                            <li onClick={() => handleNavigation('/bookings/approved')}><FontAwesomeIcon icon={faCheckCircle} className='nav-icon' />Approved</li>
                            <li onClick={() => handleNavigation('/bookings/pending')}><FontAwesomeIcon icon={faHourglassHalf} className='nav-icon' />Pending</li>
                        </ul>
                    </li>
                    <li className='nav-item'onClick={() => handleNavigation('/guestreviews')} >
                        <FontAwesomeIcon icon={faComments} className='nav-icon' />
                        Guest Reviews
                    </li>
                    <li className='nav-item' onClick={() => handleNavigation('/revenue')}>
                        <FontAwesomeIcon icon={faDollarSign} className='nav-icon' />
                         Revenue
                    </li>
                    <li className='nav-item' onClick={() => logoutSession()}>
                        <FontAwesomeIcon icon={faSignOutAlt} className='nav-icon' />
                        Logout
                    </li>
                </ul>
            </div>
        </div>
    );
}
