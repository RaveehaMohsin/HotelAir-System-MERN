import React from 'react'
import RoomFacilityTable from './roomfacilitytable'

export default function roomfacilities() {
  return (
    <div>
        <div>
        <h5><span className="home-text">Home</span> / Room Facilites</h5>
      </div>
      <div className='header'>
        <h3>In-Room Comforts</h3>    
      </div>
      <RoomFacilityTable />
    </div>
  )
}
