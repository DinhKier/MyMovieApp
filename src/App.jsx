// d:\Canhan\Spring_ReactApp\project\React\my-movie-app\src\App.jsx
import React, { useState, useEffect } from "react"; // Import React ở đầu
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/header"; // Đảm bảo đường dẫn đúng
import Banner from "./components/Banner";   // Đảm bảo đường dẫn đúng
import ListMovie from "./components/ListMovie"; // Đảm bảo đường dẫn đúng
import LoginForm from "./components/LoginForm"; // Đảm bảo đường dẫn đúng
// import HomePage from './components/HomePage'; // Bạn có thể tạo component này nếu muốn

function App() {
  const [movies, setMovies] = useState([]); // Đổi tên thành movies cho nhất quán

  // console.log("API Key:", import.meta.env.VITE_API_KEY);

  useEffect(() => {
    const fetchMovies = async () => { // Đổi tên hàm fetch
      const apiKey = import.meta.env.VITE_API_KEY;
      if (!apiKey) {
        console.error("API Key is missing. Make sure VITE_API_KEY is set in your .env file.");
        return;
      }

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          // Quan trọng: Đảm bảo có khoảng trắng sau Bearer
          Authorization: `Bearer ${apiKey}`
        }
      };
      const url = 'https://api.themoviedb.org/3/movie/popular?language=vi&page=1';
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          // Log thêm thông tin lỗi từ API nếu có
          const errorData = await response.json().catch(() => ({})); // Cố gắng parse lỗi JSON
          console.error(`HTTP error! status: ${response.status}`, errorData);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data.results)) {
          setMovies(data.results);
          // console.log("Fetched movies:", data.results); // Bỏ comment nếu cần debug
        } else {
          console.error("API response 'results' is not an array:", data);
          setMovies([]);
        }
      } catch (error) {
        // Log lỗi chi tiết hơn
        console.error("Failed to fetch movies:", error.message, error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, []); // Dependency array rỗng là đúng để chỉ chạy 1 lần

  // Component con để hiển thị trang chủ (ví dụ)
  const HomePageLayout = () => (
    <>
      <Banner />
      {/* Truyền danh sách phim xuống ListMovie */}
      <ListMovie movies={movies} />
      {/* Bạn có thể thêm các section khác của trang chủ ở đây */}
    </>
  );

  return (
    // Router bao bọc toàn bộ ứng dụng
    <Router>
      {/* Header hiển thị trên tất cả các trang */}
      <Header />
      {/* Phần nội dung chính thay đổi theo route */}
      <main> {/* Có thể thêm thẻ main ở đây để nhóm nội dung */}
        <Routes>
          {/* Route cho trang chủ */}
          <Route path="/" element={<HomePageLayout />} />

          {/* Route cho trang đăng nhập */}
          <Route path="/login" element={<LoginForm />} />

          {/* Thêm các Route khác nếu cần */}
          {/* Ví dụ: <Route path="/about" element={<AboutPage />} /> */}
        </Routes>
      </main>
      {/* Footer có thể đặt ở đây nếu muốn hiển thị trên mọi trang */}
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
