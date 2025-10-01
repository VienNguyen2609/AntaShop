import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState("email"); // email | verify
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  // Gửi code về email
  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/forgot-password", { email });
      setMessage(res.data);
      setStep("verify"); // sang bước verify
    } catch (err) {
      setMessage(err.response?.data || "Error sending reset code");
    }
  };

  // Xác minh code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/verify-reset-code", { email, code });
      setMessage(res.data);

      // Lưu email để ResetPassword.jsx dùng
      localStorage.setItem("resetEmail", email);

      // Nếu thành công → chuyển sang reset-password
      setTimeout(() => navigate("/reset-password"), 1000);
    } catch (err) {
      setMessage(err.response?.data || "Invalid code");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={step === "email" ? handleSendCode : handleVerifyCode}>
        <h2>Forgot Password</h2>

        {step === "email" && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Code</button>
          </>
        )}

        {step === "verify" && (
          <>
            <p>Reset code sent to {email}. Please check your email.</p>
            <input
              type="text"
              placeholder="Enter reset code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button type="submit">Verify Code</button>
          </>
        )}

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
