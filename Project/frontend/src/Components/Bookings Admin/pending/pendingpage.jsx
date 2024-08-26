import React from 'react'
import PendingBookings from './pendingtable'

export default function Pendingpage() {
  return (
    <div>
      <div>
        <h5><span className="home-text">Home</span> / Pending </h5>
      </div>
      <div className='header'>
        <h3>Pending Approval</h3>
      </div>
      <PendingBookings />
    </div>
  )
}

