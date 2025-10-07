import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Headers from "../components/Header";



export default function HomePage() {
  // const navigate = useNavigate();

  // // Kiểm tra nếu chưa login thì điều hướng về trang login
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   alert("Bạn đã đăng xuất!");
  //   navigate("/login");
  // };

  return (
    <div

    >
      <Headers />
    </div>
  );
}
