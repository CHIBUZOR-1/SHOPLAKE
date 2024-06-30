import React from 'react'
import { AiOutlineFacebook } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='footer'>
      <div className='fcontent'>
        <div className='fleft'>
          <h2>SHOPLAKE.</h2>
          <p>Lorem Ipsum is simply a dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text since the 1500s. When an unknown printer took a gallery of type and scrambled it to make a type specimen book.</p>
          <div className='social-icons'>
          <AiOutlineFacebook />
          <BsTwitterX />
          <FaLinkedin />
          </div>
        </div>
        <div className='fcenter'>
          <h2>COMPANY</h2>
          <ul>
            <li><Link style={{ textDecoration: 'none', color: 'inherit'}} to='/'>HOME</Link></li>
            <li><Link style={{ textDecoration: 'none', color: 'inherit'}} to='/About'>ABOUT US</Link></li>
            <li>DELIVERY</li>
            <li>PRIVACY POLICY</li>
          </ul>
        </div>
        <div className='fright'>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>(+234) 0709090090</li>
            <li>contact@shoplake.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='copyright'>Copyright 2024  &copy;  Shoplake.com - All Right Reserved</p>
    </div>
  )
}

export default Footer