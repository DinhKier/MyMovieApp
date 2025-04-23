import React from 'react'

const Banner = () => {
  return (
    
         <div className='bg-banner h-[700px] w-[100%] bg-cover bg-center bg-no-repeat relative'>
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <div className='absolute inset-0 flex items-center justify-center flex-col text-white z-10'>
                <h1 className='text-6xl font-bold'>Welcome to My Movie</h1>
                <p className='mt-4 text-lg'>Discover the latest movies and shows</p>
                <button className='mt-6 bg-red-500 text-white px-4 py-2 rounded'>Get Started</button>

            </div>
        </div>
  )
}

export default Banner
