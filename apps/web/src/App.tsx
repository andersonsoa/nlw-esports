import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { Ad } from "./pages/Ad";
import { Home } from "./pages/Home";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/:gameId" element={<Ad />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
