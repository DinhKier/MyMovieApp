// d:\Canhan\Spring_ReactApp\project\React\my-movie-app\src\components\LoginForm.jsx
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Bỏ comment nếu bạn muốn điều hướng sau khi đăng nhập/đăng ký thành công

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Quản lý chế độ đăng nhập/đăng ký
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '', // Chỉ dùng cho đăng ký
  });
  const [errors, setErrors] = useState({}); // State để lưu lỗi validation
  const [isLoading, setIsLoading] = useState(false); // State cho trạng thái loading
  // const navigate = useNavigate(); // Bỏ comment nếu dùng navigate

  // --- Validation Logic ---
  const validateForm = () => {
    const newErrors = {};
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Địa chỉ email không hợp lệ.';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
    }

    // Confirm Password validation (only for signup)
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc.';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Mật khẩu không khớp.';
      }
    }

    setErrors(newErrors);
    // Trả về true nếu không có lỗi (object errors rỗng)
    return Object.keys(newErrors).length === 0;
  };

  // --- Handle Input Change ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Xóa lỗi của trường đang được sửa
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // --- Placeholder API Functions (Thay thế bằng API thật) ---
  const simulateApiCall = (data) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Mô phỏng thành công hoặc thất bại ngẫu nhiên
        if (Math.random() > 0.3) { // 70% thành công
          resolve({ success: true, message: isLogin ? 'Đăng nhập thành công!' : 'Đăng ký thành công!' });
        } else {
          reject({ success: false, message: isLogin ? 'Email hoặc mật khẩu không đúng.' : 'Email đã tồn tại.' });
        }
      }, 1500); // Giả lập độ trễ mạng 1.5 giây
    });
  };

  // --- Handle Form Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset lỗi trước khi validate lại

    // Validate form trước khi gửi
    if (!validateForm()) {
      return; // Dừng lại nếu có lỗi validation
    }

    try {
      const apiData = { email: formData.email, password: formData.password };
      const result = await simulateApiCall(apiData);

      console.log(isLogin ? 'Đăng nhập thành công:' : 'Đăng ký thành công:', result);
      alert(result.message);
      // Reset form sau khi thành công
      setFormData({ email: '', password: '', confirmPassword: '' });
      // TODO: Lưu token/thông tin user vào state/context
      // TODO: Điều hướng người dùng (ví dụ: về trang chủ)
      // navigate('/'); // Bỏ comment nếu dùng navigate

    } catch (error) {
      console.error(isLogin ? 'Lỗi đăng nhập:' : 'Lỗi đăng ký:', error);
      // Hiển thị lỗi chung từ API (nếu có) hoặc lỗi cụ thể nếu API trả về
      setErrors({ api: error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.' });
    }
  };

  // --- Toggle between Login and Signup ---
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', confirmPassword: '' }); // Reset form khi chuyển mode
    setErrors({}); // Reset lỗi khi chuyển mode
    setIsLoading(false); // Reset loading state
  };

  return (
    // Thêm padding-top để không bị Header che khuất
    <div className="max-w-md mx-auto mt-10 mb-10 p-6 bg-white rounded-lg shadow-md pt-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
      </h2>
      <form onSubmit={handleSubmit} noValidate> {/* noValidate để tắt validation mặc định của trình duyệt */}
        {/* Hiển thị lỗi chung từ API */}
        {errors.api && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
            {errors.api}
          </div>
        )}

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6} // Thêm thuộc tính HTML5 để hỗ trợ validation cơ bản
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && <p id="password-error" className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password Input (Only for Signup) */}
        {!isLogin && (
          <div className="mb-6"> {/* Tăng margin-bottom cho trường cuối */}
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required={!isLogin} // Chỉ required khi đăng ký
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
            />
            {errors.confirmPassword && <p id="confirmPassword-error" className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading} // Vô hiệu hóa nút khi đang loading
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang xử lý...
            </>
          ) : (
            isLogin ? 'Đăng Nhập' : 'Đăng Ký'
          )}
        </button>
      </form>

      {/* Toggle Mode Link */}
      <p className="text-center text-gray-600 mt-6">
        {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
        <button
          onClick={toggleMode}
          disabled={isLoading} // Cũng vô hiệu hóa khi đang loading
          className="text-blue-500 hover:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLogin ? 'Đăng Ký ngay' : 'Đăng Nhập ngay'}
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
