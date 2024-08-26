import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Navbar1 from '../Navbar/Navbar';
import './mainpage.css';
import AllRooms from '../Room/All Rooms/allrooms';
import FreeRooms from '../Room/Free Rooms/freerooms';
import BookedRooms from '../Room/Booked Rooms/bookedrooms';
import Employeepage from '../Employee/employeepage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import image from "../../Assets/new.png";
import image2 from '../../Assets/pngtree-beautiful-admin-roles-line-vector-icon-png-image_2035379.jpg';
import Pendingpage from '../Bookings Admin/pending/pendingpage';
import Approvedpage from '../Bookings Admin/approved/approvedpage';
import Homeadmin from '../Home Admin/homeadmin';
import AdminDisplayReviews from '../CheckOut/Review/AdminDisplayReviews';
import Revenue from '../Revenue/Revenue';

export default function Mainpage() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const user = JSON.parse(localStorage.getItem('CurrentUser'));
    return (
        <div>
            <Navbar1 />
            <div className={`main-content ${isSidebarOpen ? 'with-sidebar' : ''}`}>
                <Dashboard />
                <div className='content-area'>
                    <div className="custom-header">
                        <button className="back-button" onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faArrowCircleLeft} />
                        </button>
                        <img src={image} alt="Logo" className="hotel-logo" />
                        <span className="hotel-title">HotelAir</span>
                        <div className="user-info">
                            <img src={image2} alt="User" className="img-user" />
                            <span className="user-name">{user.firstName} {user.lastName}</span>
                        </div>
                    </div>
                    <div style={{ padding: "20px" }}>
                        <Switch>
                        <Route
                                exact
                                path="/home"
                                render={(props) => (
                                    <Homeadmin {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />
                          <Route
                                exact
                                path="/rooms/all"
                                render={(props) => (
                                    <AllRooms {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />
                             <Route
                                exact
                                path="/rooms/update/:id"
                                render={(props) => (
                                    <AllRooms {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />
                            <Route
                                exact
                                path="/rooms/free"
                                render={(props) => (
                                    <FreeRooms {...props} isSidebarOpen={isSidebarOpen} />
                            )}
                            />
                            <Route
                                exact
                                path="/rooms/occupied"
                                render={(props) => (
                                    <BookedRooms {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />
                            <Route
                                exact
                                path="/employees"
                                render={(props) => (
                                <Employeepage {...props} isSidebarOpen={isSidebarOpen} />
                            )}
                            />
                             <Route
                                exact
                                path="/employee/update/:id"
                                render={(props) => (
                                    <Employeepage {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />
                             <Route
                                exact
                                path="/bookings/approved"
                                render={(props) => (
                                    <Approvedpage {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />
                             <Route
                                exact
                                path="/bookings/pending"
                                render={(props) => (
                                    <Pendingpage {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />
                             <Route
                                exact
                                path="/guestreviews"
                                render={(props) => (
                                    <AdminDisplayReviews {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />

                                <Route
                                exact
                                path="/revenue"
                                render={(props) => (
                                    <Revenue {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}
