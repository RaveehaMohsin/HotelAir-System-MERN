import React from 'react'
import ApprovedBookings from './approvedtable'

export default function Approvedpage() {
  return (
    <div>
      <div>
        <h5><span className="home-text">Home</span> / Approved </h5>
      </div>
      <div className='header'>
        <h3>Guaranteed Stays</h3>
      </div>
      <ApprovedBookings />
    </div>
  )
}
