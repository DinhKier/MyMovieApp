import React from 'react'

const Header = () => {
  return (
   <div className='bg-gray-900 p-4 flex z-[9999] items-center sticky top-0'>
     <div className='flex items-center space-x-4'>
        <h1 className='text-2xl text-white font-bold'>My Movie</h1>
        <nav className='flex space-x-4 ml-0'>
            <a href="#" className='hover:text-red-400 transition-colors duration-300'>Home</a>
            <a href="#" className='hover:text-red-400 transition-colors duration-300'>About</a>
            <a href="#" className='hover:text-red-400 transition-colors duration-300'>Contact</a>
        </nav>
     </div>
    <div className='flex items-center ml-auto space-x-4'>
        <input type="text" placeholder="Search movies..." className='px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400' />
        <div className='flex space-x-4'>
            <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300'>Login</button>
            <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300'>Sign Up</button>
        </div>
    </div>
   </div>

  )
}

export default Header
