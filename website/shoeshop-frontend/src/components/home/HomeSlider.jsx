import React from "react";
import "./home.css";

export default function HomeSlider() {
  // Placeholder slides; replace with dynamic data later
  const slides = [
    { id: 1, title: "Running mega", subtitle: "UP TO 50%", image: "https://via.placeholder.com/1400x500?text=SLIDE+1" },
    { id: 2, title: "Training", subtitle: "NEW ARRIVALS", image: "https://via.placeholder.com/1400x500?text=SLIDE+2" },
    { id: 3, title: "Hélà Chief Crown Jewel", subtitle: "LIMITED", image: "https://via.placeholder.com/1400x500?text=SLIDE+3" }
  ];

  return (
    <section className="home-slider">
      <div className="slider-track">
        {slides.map((s) => (
          <div key={s.id} className="slide" style={{ backgroundImage: `url(${s.image})` }}>
            <div className="slide-overlay" />
            <div className="slide-content">
              <h2>{s.title}</h2>
              <p>{s.subtitle}</p>
              <button className="primary-btn">MUA NGAY</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


