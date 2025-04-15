import React from 'react'
import { doctors } from '../assets/assets'

function TopDoctors() {
  return (
    <div className=''>
      <h1>Find Top Doctors for Your Health Needs</h1>
      <div>
        {doctors.slice(0, 3).map((item, index) => (
          <div key={index}>
            <div>
              <img src={item.image} alt="" />
            </div>
            <div>
              <p></p>
              <p>Available</p>
            </div>
            <p>{item.name}</p>
            <p>{item.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopDoctors
