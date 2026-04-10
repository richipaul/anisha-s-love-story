import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";

const EntryPage = () => {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
    setExiting(true);
    setTimeout(() => navigate("/birthday"), 800);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center relative ${exiting ? "page-exit" : "page-enter"}`}>
      <FloatingHearts />

      {/* Light rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 opacity-10 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent, hsl(330 80% 60% / 0.3), transparent, hsl(270 60% 50% / 0.3), transparent)",
            animation: "light-rays 20s linear infinite",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-script glow-text mb-12">
          Are you Anisha? 💖
        </h1>

        <button
          onClick={handleClick}
          className="relative overflow-hidden px-10 py-4 rounded-2xl bg-primary text-primary-foreground text-lg font-semibold
                     hover:scale-110 active:scale-95 transition-all duration-300"
          style={{ animation: "pulse-glow 2s infinite" }}
        >
          Yes, it's me ✨
          {ripple && (
            <span
              className="absolute rounded-full bg-foreground/30 pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 10,
                height: 10,
                transform: "translate(-50%, -50%)",
                animation: "ripple 0.6s ease-out forwards",
              }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default EntryPage;
