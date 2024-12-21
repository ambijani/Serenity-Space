import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";

export default function Landing() {
  const [name, setName] = useState(() => {
    const storedName = sessionStorage.getItem("userName");
    if (storedName) {
      return storedName;
    } else {
      const userName = prompt("How should we call you?");
      sessionStorage.setItem("userName", userName);
      return userName;
    }
  });

  return (
    <section className="full-page">
      <h1 className="gradient-text text-5xl font-bold">
        {name}, Welcome to Serenity Space
      </h1>
      <p className="gradient-text-secondary mt-4">
        Your mental health matters. Explore our resources, find inspiration, and take steps toward a more peaceful mind.
      </p>
      <div className="flex gap-6 mt-10">
        <Link to="/about" className="btn about-btn">About Us</Link>
        <Link to="/mood-tracker" className="btn">Mood Tracker</Link>
        <Link to="/daily-inspiration" className="btn">Daily Inspiration</Link>
        <Link to="/meditate" className="btn">Meditate</Link>
      </div>
    </section>
  );
}
