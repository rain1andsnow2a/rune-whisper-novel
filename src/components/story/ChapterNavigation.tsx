import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ChapterNavigationProps {
  currentChapterId: number;
  prevChapterId: number | null;
  nextChapterId: number | null;
  chapterTitle: string;
  chapterAct: string;
}

export function ChapterNavigation({ 
  currentChapterId, 
  prevChapterId, 
  nextChapterId,
  chapterTitle,
  chapterAct
}: ChapterNavigationProps) {
  return (
    <div className="w-full">
      {/* Chapter header */}
      <div className="mb-8 text-center">
        <h2 className="text-sm text-slate-500 uppercase tracking-wider mb-1">{chapterAct}</h2>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">{chapterTitle}</h1>
        <div className="flex items-center justify-center gap-2 mt-2 text-slate-500">
          <span>第 {currentChapterId} 章</span>
          <span>•</span>
          <span className="text-sm">《符文的低语》</span>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-700/50">
        {prevChapterId ? (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link 
              to={`/story/${prevChapterId}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/70 hover:bg-slate-700/70 transition-colors text-white"
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span>上一章</span>
            </Link>
          </motion.div>
        ) : (
          <div className="w-24"></div> // Placeholder for alignment
        )}
        
        <Link 
          to="/"
          className="px-4 py-2 rounded-lg bg-slate-800/70 hover:bg-slate-700/70 transition-colors text-white"
        >
          返回主页
        </Link>
        
        {nextChapterId ? (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link 
              to={`/story/${nextChapterId}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/70 hover:bg-slate-700/70 transition-colors text-white ml-auto"
            >
              <span>下一章</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </motion.div>
        ) : (
          <div className="w-24"></div> // Placeholder for alignment
        )}
      </div>
    </div>
  );
}