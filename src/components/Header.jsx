// d:\Canhan\Spring_ReactApp\project\React\my-movie-app\src\components\header.jsx
import React from 'react';
// 1. Import Link từ react-router-dom
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='bg-gray-900 p-4 flex z-[9999] items-center sticky top-0 text-white'> {/* Thêm text-white ở đây để các Link kế thừa màu chữ */}
      <div className='flex items-center space-x-4'>
        {/* 2. Sử dụng Link cho logo/tên trang để về trang chủ */}
        <Link to="/" className='text-2xl text-white font-bold'>My Movie</Link>
        <nav className='flex space-x-4 ml-0'>
          {/* 3. Sử dụng Link cho các mục điều hướng (nếu cần) */}
          {/* Ví dụ: <Link to="/" className='hover:text-red-400 transition-colors duration-300'>Home</Link> */}
          {/* Giữ lại thẻ <a> nếu chúng chưa trỏ đến route nào trong ứng dụng */}
          <a href="#" className='hover:text-red-400 transition-colors duration-300'>Home</a>
          <a href="#" className='hover:text-red-400 transition-colors duration-300'>About</a>
          <a href="#" className='hover:text-red-400 transition-colors duration-300'>Contact</a>
        </nav>
      </div>
      <div className='flex items-center ml-auto space-x-4'>
        <input type="text" placeholder="Search movies..." className='px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500' /> {/* Thêm focus style */}
        <div className='flex space-x-4'>
          {/* 4. Thay thế button Login bằng Link */}
          <Link
            to="/login" // Đường dẫn đến trang đăng nhập
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 inline-block text-center' // Giữ nguyên class và thêm inline-block/text-center nếu cần căn chỉnh
          >
            Login
          </Link>
          {/* 5. Tương tự, bạn có thể thay đổi nút Sign Up nếu muốn nó điều hướng đến trang đăng ký (có thể là cùng trang /login) */}
          <Link
             to="/login" // Hoặc một route khác nếu có trang đăng ký riêng, ví dụ /register
             // Có thể thêm state để phân biệt là muốn đăng ký khi đến trang login
             // state={{ isSigningUp: true }}
             className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 inline-block text-center'
          >
            Sign Up
          </Link>
          {/* Hoặc giữ lại button nếu nó có chức năng khác */}
          {/* <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300'>Sign Up</button> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
