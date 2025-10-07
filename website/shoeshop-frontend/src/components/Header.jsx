import React from 'react';
import './header.css';
import { useNavigate } from "react-router-dom";
const Headers = () => {
    const navigate = useNavigate();
  // Dữ liệu menu fix cứng
  const menuData = [
    { id: 1, name: "TRANG CHỦ", icon: "®" ,link:''}, 
    { id: 2, name: "UPTO 50%", icon: "" ,link :'/collections/san-pham-mega-sale'},
    { id: 3, name: "HÀNG MỚI", icon: "" ,link :''},
    { id: 4, name: "ĐỘC QUYỀN ONLINE", icon: "" ,link :''},
    { id: 5, name: "NAM", icon: "" ,link :''},
    { id: 6, name: "NỮ", icon: "",link :'' },
    { id: 7, name: "PHỤ KIỆN", icon: "" ,link :''},
    { id: 8, name: "KIDS", icon: "" ,link :''}
  ];
 
  const handlePushRouter = (link)=>{
    if(!link) return
    navigate(link)
  } 
  return (
    <div className="app">
      {/* Header với logo ANT */}
      <header className="header">
        <div className="logo">ANT</div>
        <nav className="navigation">
          {/* Map dữ liệu menu */}
          {menuData.map((item) => (
            <div key={item.id} className="nav-item">
              <span className="nav-text" onClick={()=>handlePushRouter(item.link)}>
                {item.name}
                {item.icon && <span className="icon">{item.icon}</span>}
              </span>
            </div>
          ))}
        </nav>
        <div>
            đăng nhập và giỏ hàng
        </div>
      </header>

      {/* Nội dung chính */}
      <main className="main-content">
        <div className="content-section">
        
        </div>
      </main>
    </div>
  );
};

export default Headers;