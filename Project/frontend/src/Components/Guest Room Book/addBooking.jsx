import React, { useState  } from 'react'
import '../Room/All Rooms/modal.css'
import { CalendarIcon } from '@heroicons/react/solid';
import { useLocation , useHistory } from 'react-router-dom';

export default function BookingAdd({isOpen , onCancel , isSidebarOpen , roomNo}) {

    const history = useHistory();
   const user = JSON.parse(localStorage.getItem('CurrentUser'));
   const location = useLocation();
   const pname = user.firstName + ' ' + user.lastName;
   const pemail = user.Email;
   const pcontact = user.Contact;
   const queryParams = new URLSearchParams(location.search);
   const arrivalDate = queryParams.get('arrivaldate');
   const departureDate = queryParams.get('departuredate');

  const currentuser = user.Username;
  const [personname , setpersonname] = useState(pname);
  const [personemail , setpersonemail] = useState(pemail);
  const [personcontact , setpersoncontact] = useState(pcontact);
  const [noofchildren , setnoofchildren] = useState(0);
  const [noofadults , setnoofadults] = useState(1);
  const [arrivalTime , setarrivaltime] = useState();
  const [departuretime , setdeparturetime] = useState();

  const [alertMessage, setAlertMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBookingSubmission = async (e) => {
    e.preventDefault();

    const bookingData = {
        roomNo: roomNo,
        user: currentuser,
        personName: personname,
        personEmail: personemail,
        personContact: personcontact,
        numberofChildren: noofchildren,
        numberofAdults: noofadults,
        arrivalDate: arrivalDate,
        arrivalTime: arrivalTime,
        departureDate: departureDate,
        departureTime: departuretime,
        statusofBooking: 'Pending'
    };


    const url = `https://lavender-iron-azimuth.glitch.me/addbooking`
    const method = 'POST' ;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.status === 201 || response.status === 200) {
        setAlertMessage(`Booking Added Successfully!`);
        setIsSuccess(true);
        history.push('/book-room');
      } else {
        setAlertMessage(`Failed to Add Booking. Please try again.`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An error occurred while saving the Booking.');
      setIsSuccess(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div>
       <div className="backdrop" onClick={onCancel}></div>
      
      <dialog open className={`room-dialog ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <h2>
         Booking Details <CalendarIcon className="icon" />
        </h2>
        {alertMessage && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleBookingSubmission}>
        <p>
            <label htmlFor="personname">Your Name</label>
            <input
              type="text"
              id="personname"
              name="personname"
              required
              value={personname}
              onChange={(e) => setpersonname(e.target.value)}
            />
          </p>

            <p>
              <label htmlFor="personemail">Your Email</label>
              <input
                type="email"
                id="personemail"
                name="personemail"
                required
                value={personemail}
                onChange={(e) => setpersonemail(e.target.value)}
              />
            </p> 
          

          <p>
            <label htmlFor="personcontact">Your Contact</label>
            <input
              id="personcontact"
              name="personcontact"
              type="number"
              value={personcontact}
              required
              onChange={(e) => setpersoncontact(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="noofchildren">No. of Children</label>
            <input
              id="noofchildren"
              name="noofchildren"
              type="number"
              value={noofchildren}
              required
              onChange={(e) => setnoofchildren(e.target.value)}
            />
          </p>

          <p>
            <label htmlFor="noofadults">No. of Adults</label>
            <input
              type="number"
              id="noofadults"
              name="noofadults"
              required
              value={noofadults}
              onChange={(e) => setnoofadults(e.target.value)}
            />
          </p>
         

          <p>
            <label htmlFor="arrivaldate">Arrival Date</label>
            <input
              id="arrivaldate"
              name="arrivaldate"
              type="date"
              readOnly
              value={arrivalDate}            
            />
          </p>

          <p>
            <label htmlFor="arrivaldate">Arrival Time</label>
            <input
              id="arrivaltime"
              name="arrivaltime"
              type="time"
              required
              value={arrivalTime}
              onChange={(e) => setarrivaltime(e.target.value)}         
            />
          </p>

          <p>
            <label htmlFor="departuredate">Departure Date</label>
            <input
              id="departuredate"
              name="departuredate"
              type="date"
              readOnly
              value={departureDate}          
            />
          </p>

          <p>
            <label htmlFor="departuretime">Departure Time</label>
            <input
              id="departuretime"
              name="departuretime"
              type="time"
              required
              value={departuretime}
              onChange={(e) => setdeparturetime(e.target.value)} 
              
            />
          </p>

          <p className="actions">
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit">Confirm Booking</button>
          </p>
        </form>
      </dialog>
    </div>
  )
}
