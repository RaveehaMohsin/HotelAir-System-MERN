import React from 'react'
import '../All Rooms/allrooms.css'
import FreeBookRoomTable from './tablefreebook'

export default function freerooms() {
  return (
    <div>
        <div>
        <h5><span className="home-text">Home</span> / Free Rooms</h5>
      </div>
      <div className='header'>
        <h3>Available Rooms Showcase</h3>
      </div>
      <FreeBookRoomTable />
    </div>
  )
}
