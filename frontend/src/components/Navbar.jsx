import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false)
  const [token, setToken] = useState(true)

  return (
    <div className='flex justify-between items-center px-10 py-4 border-b bg-white shadow-sm'>

      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img className="w-12" src={assets.logo} alt="logo" />
        <div>
          <h1 className="text-lg font-bold text-primary">Doctor Sathi</h1>
          <p className="text-xs text-cyan-500">Always Caring | Always Here</p>
        </div>
      </div>

      {/* Center: Nav Links */}
      <div className='flex-1 flex justify-center'>
        <ul className='flex items-center gap-10 font-medium text-gray-700'>
          <NavLink to='/'><li className='py-1'>Home</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>
          <NavLink to='/doctors'><li className='py-1'>All Doctors</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>
          <NavLink to='/about'><li className='py-1'>About</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>
          <NavLink to='/contact'><li className='py-1'>Contact Us</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>
        </ul>
      </div>

      {/* Right: Button */}
      <div className='flex items-center gap'>
        {
          token
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 h-8 rounded-full object-cover' src={assets.profile_pic} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />

              <div className='absolute top-0 right-0 mt-2 w-48 pt-14 text-base font-medium text-gray-600 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('my-appointment')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={() => setToken(false)} className='hover:text-black cursor-pointer'>My Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-primary text-white px-4 py-1 rounded font-light hidden md:block'>
              Register
            </button>
        }
      </div>

    </div>
  );
};



export default Navbar
