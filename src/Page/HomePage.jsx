import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Trang Chủ</h1>
      <Link to="/login" className="text-blue-500 hover:underline">
        Đến trang Đăng Nhập
      </Link>
    </div>
  );
};

export default HomePage;