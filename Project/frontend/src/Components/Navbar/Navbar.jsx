import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import image1 from '../../Assets/Mandala Royal Resort Logo Minimalist (2).png'

export default function Navbar1() {
  return (
    <div>
       <Navbar className='fixed-top' style={{backgroundColor: "rgb(35, 35, 35)"}}>  
          <Navbar.Brand href="#home" style={{color: "white" , marginLeft:"40px"}}>
            <img
              alt=""
              src={image1}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            HotelAir
          </Navbar.Brand>
       
      </Navbar>
    </div>
  )
}
