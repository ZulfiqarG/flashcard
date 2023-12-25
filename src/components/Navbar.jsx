  // using router-dom 


import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {


  return (
    <>
      
      <div className='md:mt-10 px-5 2xl:px-44 xl:px-20 my-5 navbar'>
        <h1 className='font-bold lg:text-xl '>Create Flashcard</h1>
        <div className='my-5 md:text-base text-sm md:font-medium font-bold text-slate-500'>
          <NavLink to="/" className="nav mr-4 relative font-bold ...">Create New  </NavLink> {/*using navlink for specific path*/}
          <NavLink to="/card" className=" nav relative font-bold ..." >My Flash Card</NavLink>
          <hr className='border-slate-400' />
        </div>
      </div>
    </>
  )
}

export default Navbar