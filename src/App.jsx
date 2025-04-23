// d:\Canhan\Spring_ReactApp\project\React\my-movie-app\src\App.jsx
import { useState, useEffect } from "react";
import React from "react";
import Header from "./components/header";
import Banner from "./components/Banner";
import ListMovie from "./components/ListMovie";

function App() {
  const [movie, setMovie] = useState([]);

  // console.log("API Key:", import.meta.env.VITE_API_KEY); // Bỏ comment để kiểm tra key nếu cần

  useEffect(() => {
    const fetchMovie = async () => {
      // Kiểm tra xem API Key có tồn tại không trước khi fetch
      const apiKey = import.meta.env.VITE_API_KEY;
      if (!apiKey) {
        console.error("API Key is missing. Make sure VITE_API_KEY is set in your .env file.");
        return; // Dừng fetch nếu không có key
      }

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` // Sử dụng biến apiKey đã kiểm tra
        }
      };
      // Sử dụng URL bạn đã cung cấp
      const url = 'https://api.themoviedb.org/3/movie/popular?language=vi&page=1';
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          // Ném lỗi nếu response không thành công (ví dụ: 401 Unauthorized, 404 Not Found)
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Kiểm tra xem data.results có phải là mảng không
        if (Array.isArray(data.results)) {
          setMovie(data.results);
          console.log("Fetched movies:", data.results); // Log dữ liệu đã fetch
        } else {
          console.error("API response 'results' is not an array:", data);
          setMovie([]); // Đặt lại thành mảng rỗng nếu dữ liệu không đúng định dạng
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setMovie([]); // Đặt lại thành mảng rỗng khi có lỗi
      }
    };

    fetchMovie();
  }, []); // Mảng dependency rỗng đảm bảo useEffect chỉ chạy một lần sau khi component mount

  return (
    <main>
      <Header />
      <Banner />
      {/* Truyền state 'movie' vào ListMovie qua prop 'movies' */}
      <ListMovie movies={movie} />
    </main>
  );
}

export default App;
