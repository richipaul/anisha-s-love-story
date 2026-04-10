import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EntryPage from "./pages/EntryPage";
import BirthdayPage from "./pages/BirthdayPage";
import ChoicesPage from "./pages/ChoicesPage";
import FinalPage from "./pages/FinalPage";
import LoadingScreen from "./components/LoadingScreen";
import NotFound from "./pages/NotFound";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/birthday" element={<BirthdayPage />} />
        <Route path="/choices" element={<ChoicesPage />} />
        <Route path="/final" element={<FinalPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
