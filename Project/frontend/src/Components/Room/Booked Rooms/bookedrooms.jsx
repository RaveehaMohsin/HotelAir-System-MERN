import React from 'react'
import '../All Rooms/allrooms.css'
import BookedRoomsTable from './tablebookedrooms'

export default function bookedrooms() {
  return (
    <div>
        <div>
        <h5><span className="home-text">Home</span> / Booked Rooms</h5>
      </div>
      <div className='header'>
        <h3>Rooms Under Reservation</h3>
      </div>
      <BookedRoomsTable  />
    </div>
  )
}
