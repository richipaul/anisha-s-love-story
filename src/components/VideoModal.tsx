import { useEffect, useRef, useState } from "react";

interface VideoModalProps {
  isOpen: boolean;
  videoSrc: string;
  onClose: () => void;
  onVideoEnd: () => void;
  showPrompt?: boolean;
  onSingleVideoEnd?: () => void;
}

const VideoModal = ({ isOpen, videoSrc, onClose, onVideoEnd, showPrompt = false, onSingleVideoEnd }: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setEnded(false);
    }
  }, [isOpen, videoSrc]);

  if (!isOpen) return null;

  const handleEnded = () => {
    onSingleVideoEnd?.();
    if (showPrompt) {
      setEnded(true);
    } else {
      // Not all videos watched yet — just close and go back to choices
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
        style={{ animation: "fadeZoomIn 0.4s ease-out" }}
      />

      <div className="relative z-10 glass rounded-2xl p-4 max-w-2xl w-[90vw] page-enter">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold hover:scale-110 transition-transform z-20"
        >
          ✕
        </button>

        {!ended ? (
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full rounded-xl"
            controls
            onEnded={handleEnded}
          />
        ) : (
          <div className="py-12 text-center page-enter">
            <p className="text-2xl font-script glow-text mb-8">
              You've seen everything! Ready to go? ❤️
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
