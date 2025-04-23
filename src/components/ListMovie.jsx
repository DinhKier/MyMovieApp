import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ListMovie = () => {
  const [activeTab, setActiveTab] = useState('trending');

  const renderMovies = (category) => {
    const movies = {
      trending: [
        { title: 'When Life Gives You Tangerines', image: 'image1.jpg' },
        { title: '404', image: 'image2.jpg' },
        { title: '3MAI', image: 'image3.jpg' },
        { title: 'The Trauma Code', image: 'image4.jpg' },
        { title: 'Karma', image: 'image5.jpg' },
        { title: 'Another Movie', image: 'image6.jpg' },
      ],
      list: ['Movie 7', 'Movie 8', 'Movie 9', 'Movie 10', 'Movie 11', 'Movie 12'],
      new: ['Movie 13', 'Movie 14', 'Movie 15', 'Movie 16', 'Movie 17', 'Movie 18'],
    };

    return movies[category].map((movie, index) => (
      <div key={index} className='p-2'>
        <div className='bg-gray-800 rounded overflow-hidden'>
          <img src={movie.image} alt={movie.title} className='w-full' />
          <div className='p-2 text-white'>
            <h3 className='text-lg'>{movie.title}</h3>
          </div>
        </div>
      </div>
    ));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className='bg-slate-800 p-4 text-white'>
      <div className='flex space-x-4 mb-4'>
        <button onClick={() => setActiveTab('trending')} className={`px-4 py-2 ${activeTab === 'trending' ? 'bg-red-500' : 'bg-gray-700'} rounded`}>
          Trending
        </button>
        <button onClick={() => setActiveTab('list')} className={`px-4 py-2 ${activeTab === 'list' ? 'bg-red-500' : 'bg-gray-700'} rounded`}>
          Danh sách
        </button>
        <button onClick={() => setActiveTab('new')} className={`px-4 py-2 ${activeTab === 'new' ? 'bg-red-500' : 'bg-gray-700'} rounded`}>
          Mới cập nhật
        </button>
      </div>
      <Slider {...settings}>
        {renderMovies(activeTab)}
      </Slider>
    </div>
  );
};

export default ListMovie;
