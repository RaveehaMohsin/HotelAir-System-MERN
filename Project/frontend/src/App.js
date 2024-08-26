import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import authpage from './Components/AuthenticationPage/authpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Mainpage from './Components/maincontentpage/mainpage';
import MainpageGuest from './Components/maincontentpage/mainpageGuest';
import PrivateRoute from './Components/privateroute';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={authpage} />
        <PrivateRoute exact path="/guest" component={MainpageGuest} />
        <PrivateRoute exact path="/home" component={Mainpage} />

        <PrivateRoute path="/rooms/all" component={Mainpage} />
        <PrivateRoute path="/rooms/free" component={Mainpage} />
        <PrivateRoute path="/rooms/occupied" component={Mainpage} />
        <PrivateRoute path="/rooms/update/:id" component={Mainpage} />
        <PrivateRoute path="/employees" component={Mainpage} />
        <PrivateRoute path="/employee/update/:id" component={Mainpage} />
        <PrivateRoute path="/bookings/approved" component={Mainpage} />
        <PrivateRoute path="/bookings/pending" component={Mainpage} />
        <PrivateRoute path="/guestreviews" component={Mainpage} />
        <PrivateRoute path="/revenue" component={Mainpage} />
        
        <PrivateRoute path="/book-room" component={MainpageGuest} />
        <PrivateRoute path="/room-facilities" component={MainpageGuest} />
        <PrivateRoute path="/cab-facilities" component={MainpageGuest} />
        <PrivateRoute path="/personalized" component={MainpageGuest} />
        <PrivateRoute path="/notifications" component={MainpageGuest} />
        <PrivateRoute path="/contact" component={MainpageGuest} />
        <PrivateRoute path="/checkout" component={MainpageGuest} />
        <PrivateRoute path="/checkout/review" component={MainpageGuest} />
        <PrivateRoute path="/checkout/payment/:id" component={MainpageGuest} />
      </Switch>
    </Router>
  );
}

export default App;
