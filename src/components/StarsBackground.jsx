import { useState, useEffect } from "react";
import "../styles/StarsBackground.css";

export default function StarsBackground({ children }) {
  const [staticStars, setStaticStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    // Static stars
    const stars = Array.from({ length: 50 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setStaticStars(stars);

    // Shooting stars
    const shooting = Array.from({ length: 5 }, () => ({
      startTop: Math.random() * 100,
      startLeft: 110,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 5,
    }));
    setShootingStars(shooting);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Static Stars */}
      <div className="stars">
        {staticStars.map((star, index) => (
          <div
            key={index}
            className="star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              animationDelay: `${star.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Shooting Stars */}
      <div className="stars">
        {shootingStars.map((star, index) => (
          <div
            key={index}
            className="shooting-star"
            style={{
              top: `${star.startTop}%`,
              left: `${star.startLeft}%`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Children */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
