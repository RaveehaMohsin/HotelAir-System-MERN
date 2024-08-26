import React from 'react'
import ApprovedbookingsCheckout from './approvedbookings'

export default function Checkoutpage() {
  return (
    <div>
      <div>
        <h5><span className="home-text">Home</span> / CheckOut</h5>
      </div>
      <div className='header'>
        <h4>Time to Complete Your Purchase!</h4>
      </div>
      <ApprovedbookingsCheckout />
    </div>
  )
}
