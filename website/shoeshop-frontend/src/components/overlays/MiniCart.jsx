import React from "react";
import "./overlays.css";

export default function MiniCart({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="overlay-root" onClick={onClose}>
      <div className="drawer right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>Giỏ hàng</h3>
        </div>
        <div className="drawer-body">
          <p>Chưa có sản phẩm.</p>
        </div>
        <div className="drawer-footer">
          <button className="primary-btn" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
}


