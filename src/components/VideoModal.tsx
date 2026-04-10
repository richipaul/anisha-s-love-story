import { useEffect, useRef, useState } from "react";

interface VideoModalProps {
  isOpen: boolean;
  videoSrc: string;
  onClose: () => void;
  onVideoEnd: () => void;
}

const VideoModal = ({ isOpen, videoSrc, onClose, onVideoEnd }: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setShowPrompt(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
        style={{ animation: "fadeZoomIn 0.4s ease-out" }}
      />

      {/* Modal */}
      <div
        className="relative z-10 glass rounded-2xl p-4 max-w-2xl w-[90vw] page-enter"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold hover:scale-110 transition-transform z-20"
        >
          ✕
        </button>

        {!showPrompt ? (
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full rounded-xl"
            controls
            onEnded={() => setShowPrompt(true)}
          />
        ) : (
          <div className="py-12 text-center page-enter">
            <p className="text-2xl font-script glow-text mb-8">
              Wanna go back? ❤️
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={onVideoEnd}
                className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform"
                style={{ animation: "pulse-glow 2s infinite" }}
              >
                Yes 💖
              </button>
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl glass text-foreground font-semibold hover:scale-105 transition-transform"
              >
                No, stay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
