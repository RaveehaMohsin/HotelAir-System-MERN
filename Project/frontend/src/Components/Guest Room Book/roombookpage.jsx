import React, { useState , useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import FilterDate from './filterDate';
import Viewrooms from './Viewrooms';
import { useLocation } from 'react-router-dom';
import BookingAdd from './addBooking'


export default function Roombookpage({isSidebarOpen}) {  
    const [isAddingFilter, setIsaddingFilter] = useState();
    const [viewRooms , setViewRooms] = useState(false);
    const location = useLocation();
    const [isAddingBooking , setIsaddingBooking] = useState(false);
    const [selectedRoomNo, setSelectedRoomNo] = useState(null);
  
    const addingfilter =()=>{
        setIsaddingFilter(true);
    }
    const handleCloseDialog =()=>{
        setIsaddingFilter(false);
    }

    const handleCancel=()=>
    {
      setIsaddingBooking(false);
      setSelectedRoomNo(null);
    }

    const handleBookNowClick = ({ isOpen, roomNo }) => {
      setSelectedRoomNo(roomNo); // Store the room number
      setIsaddingBooking(isOpen); // Open the booking modal
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const arrivalDate = queryParams.get('arrivaldate');
        const departureDate = queryParams.get('departuredate');

        if (arrivalDate && departureDate) {
            setViewRooms(true);
        } else {
            setViewRooms(false);
        }
    }, [location.search]);

  return (
    <div>
      <div>
        <h5><span className="home-text">Home</span> / Booking</h5>
      </div>
      <div className='header'>
        <h3>Reserve a Room</h3>
        <button onClick={addingfilter}>
          <FontAwesomeIcon icon={faFilter}  /> Add Filter
        </button>
      </div>   
      {isAddingFilter && (
        <FilterDate
          isOpen={isAddingFilter}
          onCancel={handleCloseDialog}
          isSidebarOpen={isSidebarOpen} 
        />
      )}
      <div>
            {viewRooms ? (
                <div>      
                    <Viewrooms  onBookNowClick={handleBookNowClick} isSidebarOpen={isSidebarOpen}/>
                </div>
            ) : (
                <div style={{textAlign:"center" ,padding:"20px" , color:"#d9534f" , fontSize:"1.2em"}}>
                    <h4>Please select arrival and departure dates.</h4>
                    <img src='https://hotelair-react.pixelwibes.in/htdocs_error/something-lost.png' 
                    width="500px"
                    height='auto'
                    />
                </div>
            )}
        </div>
        {isAddingBooking && (
        <BookingAdd
          isOpen={isAddingBooking}
          onCancel={handleCancel}
          isSidebarOpen={isSidebarOpen}
          roomNo={selectedRoomNo}
        />
      )}
    </div>
  )
}
