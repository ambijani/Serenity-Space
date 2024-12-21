import React, { useState } from "react";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import "../styles/MoodTracker.css";

export default function MoodTracker() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();
  const name = sessionStorage.getItem("userName") || "Guest";

  const handleInputSubmit = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    setResponse("");
  
    try {
      const prompt = `
      You are a kind, empathetic, and supportive assistant helping users based on their mood. 
      The user is feeling, either a word or phrase: "${userInput}". 
  
      Your goal is to provide 3 actionable, comforting, and encouraging suggestions that can help improve their mood. 
      Make sure the suggestions are a mix of:
      1. Calming activities (e.g., meditation, journaling, deep breathing)
      2. Encouraging mindset tips or positive affirmations
      3. Enjoyable options like listening to music, spending time with loved ones, or creative hobbies.
  
      Make the tone gentle, understanding, and warm. Be direct but never overly formal.
  
      If the mood is unclear, gently offer general tips for stress relief and mental well-being.
  
      Format your response in a clean list format:
      1. Suggestion 1
      2. Suggestion 2
      3. Suggestion 3
      `;
  
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // Replace with your API Key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a kind and supportive assistant." },
            { role: "user", content: prompt },
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      });
  
      const data = await res.json();
      const aiResponse = data.choices[0].message.content;
      setResponse(aiResponse);
    } catch (error) {
      console.error("Error fetching suggestions: ", error);
      setResponse(
        "Sorry, I couldn't generate suggestions right now. Please try again or explore other options."
      );
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="mood-tracker">
      <BackButton />
      <h1>{`Hey ${name}, Glad to see you here!`}</h1>
      <h2>How are you feeling today?</h2>

      {/* Input Section */}
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your mood here..."
        />
        <button onClick={handleInputSubmit}>Submit</button>
      </div>

      {/* AI Response */}
      {response && (
        <>
          <div className="response-container">
            <h3 className="suggestions-title">Suggestions:</h3>
            <ul>
              {response.split(/\d\./).filter(Boolean).map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </div>
          <div className="options-container">
            <h3 className="explore-title">Explore Options:</h3>
            <button onClick={() => navigate("/meditate")}>Meditate</button>
            <button onClick={() => navigate("/daily-inspiration")}>
              Daily Inspiration
            </button>
            <button onClick={() => navigate(`/spotify-playlist?mood=${encodeURIComponent(userInput)}`)}> Spotify Playlist</button>
          </div>
        </>
      )}
    </div>
  );
}