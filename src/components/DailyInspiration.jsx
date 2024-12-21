import React, { useState } from "react";
import BackButton from "./BackButton";
import "../styles/DailyInspiration.css";

export default function DailyInspiration() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();
    setQuote(`${data.quote} - ${data.author}`);
    setLoading(false);
  };

  return (
    <div className="daily-inspiration-page">
      <BackButton />
      <div className="content">
        <h1 className="gradient-text">🌟 Daily Inspiration 🌟</h1>
        <p className="gradient-text-secondary">
          Discover your inner strength and motivation through inspiring quotes.
        </p>
        <button
          className="btn daily-button"
          onClick={fetchQuote}
          disabled={loading}
        >
          {loading ? "Loading..." : "Generate Quote"}
        </button>
        {quote && <blockquote className="quote">{quote}</blockquote>}
      </div>
    </div>
  );
}
