import React from "react";
import "./home.css";

export default function BlogTeasers() {
  const posts = [
    { id: 1, title: "ANTA KAI HÉLÀ STYLE 'ROOTS' ...", date: "14/10/2025", image: "https://via.placeholder.com/360x220?text=BLOG+1" },
    { id: 2, title: "X3 ƯU ĐÃI PG7 TRONG THÁNG 10", date: "13/10/2025", image: "https://via.placeholder.com/360x220?text=BLOG+2" },
    { id: 3, title: "Vợt Cầu Lông Anta – Trợ Thủ ...", date: "12/10/2025", image: "https://via.placeholder.com/360x220?text=BLOG+3" }
  ];
  return (
    <section className="blog-teasers">
      <div className="container blog-grid">
        {posts.map((p) => (
          <article key={p.id} className="blog-card">
            <img src={p.image} alt={p.title} />
            <div className="blog-body">
              <p className="blog-date">{p.date}</p>
              <h3 className="blog-title">{p.title}</h3>
              <button className="link-btn">Đọc tiếp</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


