import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import anishaImg from "@/assets/anisha.jpg";
import FloatingHearts from "@/components/FloatingHearts";

const BirthdayPage = () => {
  const navigate = useNavigate();
  const fullText = "Happy Birthday Anisha ❤️";
  const [displayText, setDisplayText] = useState("");
  const [exiting, setExiting] = useState(false);

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Auto-transition after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => navigate("/choices"), 800);
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center relative ${exiting ? "page-exit" : "page-enter"}`}>
      <FloatingHearts />

      {/* Light rays behind image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[500px] h-[500px] opacity-15 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent, hsl(330 80% 60% / 0.5), transparent, hsl(270 60% 50% / 0.5), transparent, hsl(45 90% 55% / 0.3), transparent)",
            animation: "light-rays 15s linear infinite",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Circular image */}
        <div className="mx-auto w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden mb-8 ring-4 ring-primary/50"
             style={{ animation: "pulse-glow 3s infinite" }}>
          <img
            src={anishaImg}
            alt="Anisha"
            className="w-full h-full object-cover"
            style={{ animation: "zoom-in-slow 10s ease-out forwards" }}
          />
        </div>

        {/* Typing text */}
        <h1 className="text-3xl md:text-5xl font-script glow-text min-h-[3rem]">
          {displayText}
          <span className="inline-block w-0.5 h-8 bg-primary ml-1 align-middle" style={{ animation: "typing-cursor 1s infinite" }} />
        </h1>
      </div>
    </div>
  );
};

export default BirthdayPage;
