import React from 'react'
import Reviewstable from './reviewstable'

export default function AdminDisplayReviews() {
  return (
    <div>
      <div>
        <h5><span className="home-text">Home</span> / Reviews</h5>
      </div>
      <div className='header'>
        <h4>Experiences Shared by Our Valued Guests</h4>
      </div>
      <Reviewstable />
    </div>
  )
}
