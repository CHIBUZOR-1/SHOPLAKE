import React from 'react'
import { usePass } from '../../Context/lakeContext'
import './Profile.css'

const Profile = () => {
    const {pass} = usePass();
  return (
    <div className='av'>
      <h2 className='acf'>ACCOUNT OVERVIEW</h2>
      <hr />
        <div className='acr'>
            <p>FIRST NAME: {pass.user.name}</p>
            <p>LAST NAME: {pass.user.lastname}</p>
            <p>EMAIL: {pass.user.email}</p>
            <p>Phone: {pass.user.phoneNumber}</p>
        </div>
    </div>
  )
}

export default Profile