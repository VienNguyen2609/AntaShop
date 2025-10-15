import React from "react";
import "./home.css";

export default function Lookbook() {
  const items = [
    { id: 1, title: "RUNNING", image: "https://via.placeholder.com/520x360?text=RUNNING" },
    { id: 2, title: "TRAINING", image: "https://via.placeholder.com/520x360?text=TRAINING" },
    { id: 3, title: "BASKETBALL", image: "https://via.placeholder.com/520x360?text=BASKETBALL" }
  ];
  return (
    <section className="lookbook">
      <div className="container lookbook-grid">
        {items.map((i) => (
          <div key={i.id} className="lookbook-card">
            <img src={i.image} alt={i.title} />
            <div className="lookbook-overlay"><h3>{i.title}</h3></div>
          </div>
        ))}
      </div>
    </section>
  );
}


