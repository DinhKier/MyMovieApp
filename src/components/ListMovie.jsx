// d:\Canhan\Spring_ReactApp\project\React\my-movie-app\src\components\ListMovie.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Nhận prop 'movies' thay vì 'data' (hoặc bạn có thể giữ 'data' nếu muốn)
const ListMovie = ({ movies }) => {

  // Cấu hình cơ bản cho slider
  const settings = {
    dots: false, // Ẩn dots nếu không cần
    infinite: movies.length > 4, // Chỉ infinite nếu có đủ phim để cuộn vô hạn
    speed: 500,
    slidesToShow: 5, // Tăng số lượng hiển thị nếu muốn
    slidesToScroll: 1,
    autoplay: true,        // Tự động chạy
    autoplaySpeed: 3000,   // Tốc độ tự động chạy (3 giây)
    pauseOnHover: true,    // Tạm dừng khi hover chuột
    responsive: [ // Cấu hình responsive cho các kích thước màn hình khác nhau
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 4,
          infinite: movies.length > 4,
        }
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 3,
          infinite: movies.length > 3,
        }
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 2,
          infinite: movies.length > 2,
        }
      }
    ]
  };

  // Xử lý trường hợp đang tải hoặc không có phim
  if (!movies || movies.length === 0) {
    // Có thể hiển thị một thông báo loading hoặc trả về null
    return <div className='bg-slate-800 p-4 text-white text-center'>Đang tải danh sách phim...</div>;
  }

  // Base URL cho ảnh từ TMDB (nên lấy kích thước phù hợp, ví dụ w500)
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className='bg-slate-800 p-4 text-white'>
      {/* Xóa các nút tab vì chúng ta chỉ hiển thị một danh sách */}
      <h2 className="text-2xl font-bold mb-4">Phim Phổ Biến</h2> {/* Thêm tiêu đề cho danh sách */}
      <Slider {...settings}>
        {/* Lặp qua mảng 'movies' nhận được từ props */}
        {movies.map((movie) => (
          // Sử dụng movie.id làm key vì nó là duy nhất
          <div key={movie.id} className='p-2 outline-none focus:outline-none'>
            <div className='bg-gray-900 rounded overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer'>
              {/* Kiểm tra xem poster_path có tồn tại không */}
              {movie.poster_path ? (
                <img
                  src={`${imageBaseUrl}${movie.poster_path}`}
                  alt={movie.title}
                  className='w-full h-auto object-cover' // Đảm bảo ảnh hiển thị đúng tỷ lệ
                />
              ) : (
                // Placeholder nếu không có ảnh
                <div className="w-full h-[300px] bg-gray-700 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <div className='p-3'>
                {/* Sử dụng movie.title */}
                <h3 className='text-md font-semibold truncate' title={movie.title}>{movie.title}</h3>
                 {/* Có thể thêm thông tin khác như điểm đánh giá */}
                 <p className="text-sm text-gray-400">Đánh giá: {movie.vote_average.toFixed(1)}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Định nghĩa PropTypes để kiểm tra kiểu dữ liệu của prop 'movies'
ListMovie.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string, // poster_path có thể null
    vote_average: PropTypes.number,
    // Thêm các prop khác bạn muốn sử dụng nếu cần
  }))
};

// Cung cấp giá trị mặc định phòng trường hợp prop không được truyền xuống
ListMovie.defaultProps = {
  movies: [],
};


export default ListMovie;
