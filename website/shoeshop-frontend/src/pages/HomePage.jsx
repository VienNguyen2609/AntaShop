import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



export default function HomePage() {
  const navigate = useNavigate();

  // Kiểm tra nếu chưa login thì điều hướng về trang login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Bạn đã đăng xuất!");
    navigate("/login");
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Arial",
      }}
    >
      <h1>🎉 Welcome Home!</h1>
      <p>Bạn đã đăng nhập thành công.</p>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          borderRadius: "6px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
