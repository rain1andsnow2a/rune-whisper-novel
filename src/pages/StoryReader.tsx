import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { chapters, getChapterById, getNextChapterId, getPrevChapterId } from '@/data/storyChapters';
import { StoryContent } from '@/components/story/StoryContent';
import { ChapterNavigation } from '@/components/story/ChapterNavigation';
import { ReadingSettings } from '@/components/ReadingSettings';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useSound } from '@/hooks/useSound';


export default function StoryReader() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const { playBackgroundMusic, pauseBackgroundMusic, setBackgroundMusicVolume } = useSound();
  const [settings, setSettings] = useState({
    enableBackgroundMusic: true,
    backgroundMusicVolume: 50,
    enableTypewriter: true,
    typewriterSpeed: 50,
    enableSound: false, // 默认关闭打字音效
    fontSize: 16,
    darkMode: true
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // 从本地存储加载设置
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('readingSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({
          enableBackgroundMusic: parsedSettings.enableBackgroundMusic ?? true,
          backgroundMusicVolume: parsedSettings.backgroundMusicVolume ?? 50,
          enableTypewriter: parsedSettings.enableTypewriter ?? true,
          typewriterSpeed: parsedSettings.typewriterSpeed ?? 50,
          enableSound: parsedSettings.enableSound ?? false,
          fontSize: parsedSettings.fontSize ?? 16,
          darkMode: parsedSettings.darkMode ?? true
        });

        // 应用背景音乐设置
        setBackgroundMusicVolume(parsedSettings.backgroundMusicVolume / 100 || 0.5);
        if (parsedSettings.enableBackgroundMusic) {
          playBackgroundMusic(parsedSettings.backgroundMusicVolume / 100 || 0.5);
        }
      } else {
        // 默认播放背景音乐
        playBackgroundMusic(0.5);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }, [playBackgroundMusic, pauseBackgroundMusic, setBackgroundMusicVolume]);

  // 监听设置变化
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'readingSettings') {
        try {
          const parsedSettings = JSON.parse(e.newValue || '{}');
          setSettings({
            enableBackgroundMusic: parsedSettings.enableBackgroundMusic ?? true,
            backgroundMusicVolume: parsedSettings.backgroundMusicVolume ?? 50,
            enableTypewriter: parsedSettings.enableTypewriter ?? true,
            typewriterSpeed: parsedSettings.typewriterSpeed ?? 50,
            enableSound: parsedSettings.enableSound ?? false,
            fontSize: parsedSettings.fontSize ?? 16,
            darkMode: parsedSettings.darkMode ?? true
          });
          
          // 更新背景音乐
          setBackgroundMusicVolume(parsedSettings.backgroundMusicVolume / 100 || 0.5);
          if (parsedSettings.enableBackgroundMusic) {
            playBackgroundMusic(parsedSettings.backgroundMusicVolume / 100 || 0.5);
          } else {
            pauseBackgroundMusic();
          }
        } catch (error) {
          console.error('Failed to update settings:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [playBackgroundMusic, pauseBackgroundMusic, setBackgroundMusicVolume]);

  // 处理设置变更
  const handleSettingsChange = (newSettings: any) => {
    setSettings(newSettings);
    localStorage.setItem('readingSettings', JSON.stringify(newSettings));

    // 应用背景音乐设置
    setBackgroundMusicVolume(newSettings.backgroundMusicVolume / 100 || 0.5);
    if (newSettings.enableBackgroundMusic) {
      playBackgroundMusic(newSettings.backgroundMusicVolume / 100 || 0.5);
    } else {
      pauseBackgroundMusic();
    }
  };
  const numericChapterId = chapterId ? parseInt(chapterId) : 1;
  
  // Get chapter data
  const chapter = getChapterById(numericChapterId);
  const prevChapterId = getPrevChapterId(numericChapterId);
  const nextChapterId = getNextChapterId(numericChapterId);
  
  // Reading progress
  const { sectionIndex, updateSectionIndex } = useReadingProgress(numericChapterId);
  
  // Handle invalid chapter
  useEffect(() => {
    if (!chapter && chapterId) {
      navigate('/');
    }
  }, [chapter, chapterId, navigate]);
  
  // Handle scroll progress tracking
  const [hasScrolled, setHasScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Track if user has scrolled to update reading progress
      if (window.scrollY > 50) {
        setHasScrolled(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="inline-block p-4 rounded-full bg-slate-800 mb-4">
            <i className="fa-solid fa-exclamation-triangle text-amber-500 text-xl"></i>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">章节不存在</h2>
          <p className="text-slate-400 mb-6">请选择一个有效的章节进行阅读</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
          >
            返回主页
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=ancient+parchment+with+magic+symbols+background+old+paper+texture&sign=8a2d1ed9f5429aec49600b264ca8d6d3')] bg-cover bg-center opacity-5"></div>
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-blue-600/10 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-30 py-4 px-4 transition-all duration-300 ${
        hasScrolled ? 'bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50' : 'bg-transparent'
      }`}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-home"></i>
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              title="阅读设置"
            >
              <i className="fa-solid fa-cog"></i>
            </button>
            <button
              onClick={() => navigate('/characters')}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <i className="fa-solid fa-users"></i>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 pt-28 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={chapterId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Chapter navigation */}
            <ChapterNavigation 
              currentChapterId={numericChapterId}
              prevChapterId={prevChapterId}
              nextChapterId={nextChapterId}
              chapterTitle={chapter.title}
              chapterAct={chapter.actTitle}
            />
            
            {/* Story content with decorative elements */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="hidden md:block absolute -left-12 top-1/4 text-slate-700 text-3xl opacity-60">✧</div>
              <div className="hidden md:block absolute -right-12 top-2/3 text-slate-700 text-3xl opacity-40">✦</div>
              
              {/* Story text */}
              <StoryContent
                sections={chapter.content}
                enableTypewriter={settings.enableTypewriter}
                typewriterSpeed={settings.typewriterSpeed}
                enableSound={settings.enableSound}
              />
            </div>
            
            {/* Chapter navigation */}
            <ChapterNavigation 
              currentChapterId={numericChapterId}
              prevChapterId={prevChapterId}
              nextChapterId={nextChapterId}
              chapterTitle={chapter.title}
              chapterAct={chapter.actTitle}
            />
            
            {/* Chapter list dropdown for quick navigation */}
            <div className="mt-12 text-center">
              <details className="group">
                <summary className="cursor-pointer px-4 py-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors list-none flex items-center justify-center gap-2">
                  <span>章节列表</span>
                  <i className="fa-solid fa-chevron-down transition-transform group-open:rotate-180"></i>
                </summary>
                <div className="mt-2 p-4 bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-700/50 max-h-96 overflow-y-auto">
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {chapters.map(ch => (
                      <li key={ch.id}>
                        <button
                          onClick={() => navigate(`/story/${ch.id}`)}
                          className={`w-full text-sm px-3 py-2 rounded ${
                            ch.id === numericChapterId 
                              ? 'bg-purple-600/30 border border-purple-500/50 text-purple-300' 
                              : 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
                          } transition-colors`}
                        >
                          {ch.id}. {ch.title.substring(0, 6)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Reading progress indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-slate-800 z-40">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
          style={{ width: `${(numericChapterId / chapters.length) * 100}%` }}
        ></div>
      </div>

      {/* 阅读设置弹窗 */}
      <ReadingSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
}