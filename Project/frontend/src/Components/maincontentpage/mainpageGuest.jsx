import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardGuest from '../Dashboard/DashboardGuest';
import Navbar1 from '../Navbar/Navbar';
import './mainpage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import image from "../../Assets/new.png";
import image2 from '../../Assets/pngtree-beautiful-admin-roles-line-vector-icon-png-image_2035379.jpg';
import Roombookpage from '../Guest Room Book/roombookpage';
import Roomfacilities from '../Explore Us/roomfacilities';
import CabFacilities from '../Explore Us/cabfacilities';
import Personalized from '../Explore Us/personalized';
import Notification from '../notificationGuest/notification';
import ContactForm from '../ContactUs/contactus';
import ReviewGuest from '../CheckOut/Review/review';
import Checkoutpage from '../CheckOut/OnlinePayment/checkoutpage';
import OnlinePayment from '../CheckOut/OnlinePayment/payment';
import Guestwelcomepage from '../Home Admin/guestwelcomepage';

export default function MainpageGuest() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const user = JSON.parse(localStorage.getItem('CurrentUser'));

    return (
        <div>
            <Navbar1 />
            <div className={`main-content ${isSidebarOpen ? 'with-sidebar' : ''}`}>
                <DashboardGuest />
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
                                path="/guest"
                                render={(props) => (
                                    <Guestwelcomepage {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />

                          <Route
                                exact
                                path="/book-room"
                                render={(props) => (
                                    <Roombookpage {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />
                             <Route
                                exact
                                path="/room-facilities"
                                render={(props) => (
                                    <Roomfacilities {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />
                             <Route
                                exact
                                path="/cab-facilities"
                                render={(props) => (
                                    <CabFacilities {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />
                             <Route
                                exact
                                path="/personalized"
                                render={(props) => (
                                    <Personalized {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />
                              <Route
                                exact
                                path="/notifications"
                                render={(props) => (
                                    <Notification {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />

                                <Route
                                exact
                                path="/contact"
                                render={(props) => (
                                    <ContactForm {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />

                             <Route
                                exact
                                path="/checkout/review"
                                render={(props) => (
                                    <ReviewGuest {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />

                           <Route
                                exact
                                path="/checkout"
                                render={(props) => (
                                    <Checkoutpage {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />
                               <Route
                                exact
                                path="/checkout/payment/:id"
                                render={(props) => (
                                    <OnlinePayment {...props} isSidebarOpen={isSidebarOpen} />
                                )}
                            />
                            
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}
