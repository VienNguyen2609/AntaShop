import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./AuthForm.css";

export default function AuthForm({ type }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const url =
        type === "register"
          ? `${baseUrl}/api/auth/register`
          : `${baseUrl}/api/auth/login`;

      const payload =
        type === "register"
          ? formData
          : { username: formData.username, password: formData.password };

      const res = await axios.post(url, payload);

      if (type === "register") {
        alert("Đăng ký thành công, vui lòng đăng nhập!");
        navigate("/login");
      } else {
        const token = res.data.token; // 👈 lấy token từ BE
        localStorage.setItem("token", token); // lưu token vào localStorage

        // 🔍 Giải mã token để lấy thông tin user
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);

        // 👇 Nếu token có field 'role' thì điều hướng theo quyền
        if (decoded.role === "ADMIN") {
          alert("Login thành công! Chào admin!");
          navigate("/admin");
        } else {
          alert("Login thành công! Chào user!");
          navigate("/home");
        }
      }
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{type === "register" ? "Register" : "Login"}</h2>

        {type === "register" && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </>
        )}

        {type === "login" && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {type === "register" ? "Sign Up" : "Login"}
        </button>

        {type === "login" && (
          <p>
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
        )}

        <p>
          {type === "register" ? (
            <>
              Already have an account? <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              Don’t have an account? <Link to="/register">Register</Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
