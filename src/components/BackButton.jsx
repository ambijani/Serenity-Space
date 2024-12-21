import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BackButton.css";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      <i className="fa fa-arrow-left"></i> Back
    </button>
  );
}
