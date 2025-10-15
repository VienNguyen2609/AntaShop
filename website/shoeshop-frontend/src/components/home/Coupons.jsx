import React from "react";
import "./home.css";

const COUPONS = [
  { code: "CAMP50_2", desc: "Giảm 50,000 ₫ Cho đơn hàng từ 999.000đ" },
  { code: "CAMP100_2", desc: "Giảm 100.000 ₫ Cho đơn hàng từ 1.599.000 đ" },
  { code: "CAMP250_2", desc: "Giảm 250.000 ₫ Cho đơn hàng từ 2.999.000 đ" }
];

export default function Coupons() {
  const handleCopy = (code) => {
    try { navigator.clipboard.writeText(code); } catch {}
    alert(`Đã sao chép mã ${code}`);
  };

  return (
    <section className="coupons">
      <div className="container coupons-grid">
        {COUPONS.map((c) => (
          <div key={c.code} className="coupon-card">
            <h4 className="coupon-code">NHẬP MÃ: {c.code}</h4>
            <p className="coupon-desc">{c.desc}</p>
            <button className="secondary-btn" onClick={() => handleCopy(c.code)}>Sao chép</button>
          </div>
        ))}
      </div>
    </section>
  );
}


