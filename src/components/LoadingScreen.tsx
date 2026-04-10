const LoadingScreen = () => (
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
    <div className="relative">
      <div className="w-16 h-16 rounded-full border-4 border-muted border-t-primary animate-spin" />
      <span className="absolute inset-0 flex items-center justify-center text-2xl">💖</span>
    </div>
    <p className="mt-6 text-lg text-muted-foreground animate-pulse">
      Loading love...
    </p>
  </div>
);

export default LoadingScreen;
