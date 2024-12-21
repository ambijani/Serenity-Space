import React, { useState, useRef, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import "../styles/Meditation.css";
import "../styles/global.css";
import BackButton from "./BackButton";

export default function Meditation() {
  const [seconds, setSeconds] = useState(0);
  const [tens, setTens] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [breathingText, setBreathingText] = useState("");
  const audioRef = useRef();

  const startTimer = () => {
    if (intervalId) return;

    const id = setInterval(() => {
      setTens((prevTens) => {
        if (prevTens + 1 === 100) {
          setSeconds((prevSeconds) => prevSeconds + 1);
          return 0;
        }
        return prevTens + 1;
      });
    }, 10);

    setIntervalId(id);
    setIsModalOpen(true);
    audioRef.current.play();
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setIsModalOpen(false);
    audioRef.current.pause();
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setSeconds(0);
    setTens(0);
    setIsModalOpen(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  useEffect(() => {
    if (isModalOpen) {
      let step = 0;
      const breathingCycle = [
        { text: "Breathe in", duration: 4000 }, // 4 seconds
        { text: "Hold your breath", duration: 7000 }, // 7 seconds
        { text: "Breathe out", duration: 8000 }, // 8 seconds
      ];

      const updateBreathingText = () => {
        setBreathingText(breathingCycle[step].text);
        setTimeout(() => {
          step = (step + 1) % breathingCycle.length;
          updateBreathingText();
        }, breathingCycle[step].duration);
      };

      updateBreathingText();
    } else {
      setBreathingText("");
    }
  }, [isModalOpen]);

  return (
    <div className="meditation-page">
      <BackButton/>
      <audio ref={audioRef} src={`audio.mp3`} loop hidden></audio>
      
      <h2 className="meditation-title">
        Take a deep breath, relax, and let the flow of time begin
      </h2>
      <div className="timer-container">
        <p className="timer-display">
          {`${String(seconds).padStart(2, "0")} : ${String(tens).padStart(2, "0")}`}
        </p>
        <div className="button-group">
          <button className="start-button" onClick={startTimer}>
            Start
          </button>
          <button className="stop-button" onClick={stopTimer}>
            Stop
          </button>
          <button className="reset-button" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="dialog-overlay">
          <div className="dialog-content">
            {/* Close Button */}
            <button
              className="close-button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close Modal"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-center mb-4">
              Breathing Exercise
            </h3>
            <p className="text-lg text-center">{breathingText}</p>
          </div>
        </div>
      </Dialog>
    </div>
  );
}