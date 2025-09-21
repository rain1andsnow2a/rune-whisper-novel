import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import StoryReader from "@/pages/StoryReader";
import CharactersPage from "@/pages/CharactersPage";
import { motion } from "framer-motion";

export default function App() {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story/:chapterId" element={<StoryReader />} />
        <Route path="/characters" element={<CharactersPage />} />
      </Routes>
    </motion.div>
  );
}
