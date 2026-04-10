import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import VideoModal from "@/components/VideoModal";

const cards = [
  { emoji: "🎉", label: "Guests Wishes", video: "/videos/guest.mp4" },
  { emoji: "❤️", label: "From Me", video: "/videos/guest.mp4" },
  { emoji: "🎁", label: "A Surprise", video: "/videos/surprise.mp4" },
];

const ChoicesPage = () => {
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative page-enter px-6">
      <FloatingHearts />

      <div className="relative z-10 text-center w-full max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-script glow-text-gold mb-12">
          Choose something special 💫
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cards.map((card) => (
            <button
              key={card.label}
              onClick={() => setActiveVideo(card.video)}
              className="glass rounded-2xl p-8 flex flex-col items-center gap-4
                         hover:scale-105 active:scale-95 transition-all duration-300
                         hover:shadow-[0_0_30px_hsl(330_80%_60%/0.3)]
                         cursor-pointer group"
            >
              <span className="text-5xl group-hover:scale-125 transition-transform duration-300">
                {card.emoji}
              </span>
              <span className="text-lg font-semibold text-foreground">
                {card.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <VideoModal
        isOpen={!!activeVideo}
        videoSrc={activeVideo || ""}
        onClose={() => setActiveVideo(null)}
        onVideoEnd={() => navigate("/final")}
      />
    </div>
  );
};

export default ChoicesPage;
