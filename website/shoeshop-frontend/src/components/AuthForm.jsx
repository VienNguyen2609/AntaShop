import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
      const url =
        type === "register"
          ? "http://localhost:8080/api/auth/register"
          : "http://localhost:8080/api/auth/login";

      // Payload cho register & login
      const payload =
        type === "register"
          ? formData
          : { username: formData.username, password: formData.password };

      const res = await axios.post(url, payload);
      navigate("/login");
      // alert(`${type} success: ` + JSON.stringify(res.data));

      if (type === "register") navigate("/login");
      else window.location.href = "https://www.facebook.com/";
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{type === "register" ? "Register" : "Login"}</h2>

        {/* Register cần username + email */}
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

        {/* Login chỉ cần username */}
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

        {/* Link forgot password chỉ hiển thị ở trang Login */}
        {type === "login" && (
          <p>
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
        )}

        <p>
          {type === "register" ? (
            <>
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <Link to="/register">Register</Link>
            </>
          )}
        </p>

      </form>
    </div>
  );
}
