import React from "react";
import BackButton from "./BackButton";
import "../styles/AboutUs.css";

const About = () => {
    return (
        <div>
            <BackButton />

            <div className="about-page">
                <h1>About Serenity Space</h1>
                <p>
                    Serenity Space is your haven for mental well-being. Our goal is to provide
                    resources, tools, and inspiration to help you lead a balanced and peaceful life.
                </p>
                <h2>Features</h2>
                <ul>
                    <li>Track and improve your mood</li>
                    <li>Inspire your day with motivational quotes</li>
                    <li>Relax and meditate with guided timers and sounds</li>
                </ul>
                <h2>Our Vision</h2>
                <p>
                    We believe that everyone deserves mental clarity and serenity. Join us as we
                    build a community dedicated to mental health and self-improvement.
                </p>
            </div>
        </div>
    );
};

export default About;
