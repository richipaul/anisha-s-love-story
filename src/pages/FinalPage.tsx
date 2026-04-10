import { useState, useEffect } from "react";
import FloatingHearts from "@/components/FloatingHearts";

const FinalPage = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative page-enter">
      <FloatingHearts />

      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/guest.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      <div className="relative z-10 text-center px-6">
        <h1 className="text-3xl md:text-5xl font-script glow-text mb-8 page-enter">
          One last thing... 💖
        </h1>

        {showMessage && (
          <div className="page-enter">
            <p className="text-4xl md:text-6xl font-script glow-text-gold mt-8">
              Happy Birthday Dear ❤️
            </p>
            <p className="text-muted-foreground mt-6 text-lg">
              You make the world brighter just by being you ✨
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalPage;
