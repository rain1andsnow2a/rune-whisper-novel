import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-green-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=fantasy+forest+background+with+subtle+magic+runestones+ancient+temple+ruins+mystical+atmosphere&sign=ba8213f0248cc9ea8d47e8619e80265e')] bg-cover bg-center opacity-20"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-300 to-green-400">
            符文的低语
          </h1>
          <p className="text-xl md:text-2xl italic text-slate-300 mb-10">
            The Whisper of Runes
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12 text-slate-300 leading-relaxed"
        >
          <p className="mb-4">
            在一个魔法被严格垄断和教条化的王国里，一个出身平凡、求知欲旺盛的年轻人，为了拯救家人，被迫走上了一条与正统魔法相悖的"异端"之路。
          </p>
          <p>
            他的冒险将不仅是学习强大的法术，更是揭开被权力者掩盖的魔法真相，挑战整个世界的既有认知。
          </p>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link 
              to="/story/1" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg hover:shadow-purple-500/50 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 text-white font-medium text-lg"
            >
              开始阅读
              <i className="fa-solid fa-book-open ml-2"></i>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link 
              to="/characters" 
              className="inline-block px-8 py-4 bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-lg hover:bg-slate-700/70 transition-all duration-300 transform hover:-translate-y-1 text-white font-medium text-lg"
            >
              人物介绍
              <i className="fa-solid fa-users ml-2"></i>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative runes */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6 text-slate-600 text-2xl">
        <span className="opacity-60">✧</span>
        <span className="opacity-40">✦</span>
        <span className="opacity-80">✧</span>
        <span className="opacity-50">✦</span>
        <span className="opacity-70">✧</span>
      </div>
    </div>
  );
}