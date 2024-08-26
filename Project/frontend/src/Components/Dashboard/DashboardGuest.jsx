import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBed, faBell, faCalendarCheck, faEnvelope, faSignOutAlt, faHomeUser} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import './Dashboard.css'; 
import image from '../../Assets/pngtree-beautiful-admin-roles-line-vector-icon-png-image_2035379.jpg';

export default function DashboardGuest() {
    const history = useHistory();

    const handleNavigation = (path) => {
        history.push(path);
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
                        <h3 className='profile-name'>{user.firstName} {user.lastName}</h3>
                        <p className='profile-role'>Guest</p>
                    </div>
                </div>
                <ul className='nav-list'>

                    <li className='nav-item'>
                        <FontAwesomeIcon icon={faHomeUser} className='nav-icon' />
                        Explore Us
                        <ul className='sub-list'>
                            <li onClick={() => handleNavigation('/room-facilities')}>Room Facilities</li>
                            <li onClick={() => handleNavigation('/cab-facilities')}>Cab Facility</li>
                            <li onClick={() => handleNavigation('/personalized')}>Personalized</li>
                        </ul>
                    </li>

                    <li className='nav-item' onClick={() => handleNavigation('/book-room')}>
                        <FontAwesomeIcon icon={faBed} className='nav-icon' />
                        Book a Room
                    </li>

                    <li className='nav-item' onClick={() => handleNavigation('/notifications')}>
                        <FontAwesomeIcon icon={faBell} className='nav-icon' />
                        Notifications
                    </li>

                    <li className='nav-item'>
                        <FontAwesomeIcon icon={faCalendarCheck} className='nav-icon' />
                        Check-Out
                        <ul className='sub-list'>
                            <li onClick={() => handleNavigation('/checkout')}>Online Payment</li>
                            <li onClick={() => handleNavigation('/checkout/review')}>Review Us</li>
                        </ul>
                    </li>

                    <li className='nav-item' onClick={() => handleNavigation('/contact')}>
                        <FontAwesomeIcon icon={faEnvelope} className='nav-icon' />
                        Contact Us
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
