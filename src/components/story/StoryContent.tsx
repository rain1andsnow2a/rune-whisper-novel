import { motion, AnimatePresence } from 'framer-motion';
import { StorySection } from '@/types/story.types';
import { getCharacterById } from '@/data/characters';
import { useState, useEffect, useRef, memo } from 'react';
import { useSound } from '@/hooks/useSound';

interface StoryContentProps {
  sections: StorySection[];
  enableTypewriter?: boolean;
  typewriterSpeed?: number;
  enableSound?: boolean;
  onSectionComplete?: (index: number) => void;
}

interface TypewriterTextProps {
  text: string;
  speed?: number;
  enableSound?: boolean;
  onComplete?: () => void;
  className?: string;
}

const TypewriterText = memo(({ text, speed = 50, enableSound = false, onComplete, className }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const { playTypewriterSound } = useSound();

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeText = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));

        // 播放打字音效（每8个字符播放一次，减少噪声）
        if (enableSound && currentIndex % 8 === 0) {
          playTypewriterSound();
        }

        currentIndex++;
        timeoutId = setTimeout(typeText, 110 - speed); // 修复速度逻辑：值越大速度越快
      } else {
        setIsComplete(true);
        onComplete?.();
      }
    };

    timeoutId = setTimeout(typeText, 100);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [text, speed, enableSound, playTypewriterSound, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-amber-400 ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
});

export function StoryContent({ 
  sections, 
  enableTypewriter = true, 
  typewriterSpeed = 50,
  enableSound = false,
  onSectionComplete 
}: StoryContentProps) {
  const [visibleSections, setVisibleSections] = useState<number>(enableTypewriter ? 1 : sections.length);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());

  const handleSectionComplete = (index: number) => {
    setCompletedSections(prev => new Set([...prev, index]));
    onSectionComplete?.(index);
    
    // 显示下一个段落
    if (enableTypewriter && index + 1 < sections.length) {
      setTimeout(() => {
        setVisibleSections(prev => prev + 1);
      }, 800);
    }
  };

  // 重置状态当章节改变时
  useEffect(() => {
    setVisibleSections(enableTypewriter ? 1 : sections.length);
    setCompletedSections(new Set());
  }, [sections, enableTypewriter]);

  return (
    <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
      <AnimatePresence>
        {sections.slice(0, visibleSections).map((section, index) => {
          // Get character info if available
          const character = section.characterId ? getCharacterById(section.characterId) : null;

          // Determine styling based on section type
          let contentClass = "mb-6";
          let textColor = "text-slate-300";

          switch (section.type) {
            case 'dialogue':
              contentClass = "mb-6 italic";
              textColor = character?.id === 'elian' ? 'text-purple-300' : 'text-blue-300';
              break;
            case 'action':
              contentClass = "mb-6 font-medium text-amber-300";
              break;
            case 'description':
              contentClass = "mb-6 text-slate-400";
              break;
            default:
              contentClass = "mb-6";
          }

          // Add custom class if provided
          if (section.className) {
            contentClass += ` ${section.className}`;
          }

          // 只有当前正在显示的段落（最新的一个）才应该有打字效果
          const shouldTypewrite = enableTypewriter && !completedSections.has(index) && index === visibleSections - 1;
          
          return (
            <motion.div
              key={`${index}-${section.content.substring(0, 20)}`} // 使用稳定的key
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={contentClass}
            >
              {section.type === 'dialogue' && character ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${
                      character.id === 'elian' ? 'bg-purple-400' : 
                      character.id === 'sia' ? 'bg-green-400' : 
                      character.id === 'kael' ? 'bg-amber-400' : 'bg-blue-400'
                    }`}></div>
                    <span className="text-sm font-bold" style={{ 
                      color: character.id === 'elian' ? '#a855f7' : 
                             character.id === 'sia' ? '#22c55e' : 
                             character.id === 'kael' ? '#f59e0b' : '#3b82f6'
                    }}>
                      {character.name}
                    </span>
                  </div>
                  <div className={`pl-4 border-l-2 ${
                    character.id === 'elian' ? 'border-purple-400/30' : 
                    character.id === 'sia' ? 'border-green-400/30' : 
                    character.id === 'kael' ? 'border-amber-400/30' : 'border-blue-400/30'
                  }`}>
                    {shouldTypewrite ? (
                      <TypewriterText
                        text={section.content}
                        speed={typewriterSpeed}
                        enableSound={enableSound}
                        onComplete={() => handleSectionComplete(index)}
                        className={textColor}
                      />
                    ) : (
                      <span className={textColor}>{section.content}</span>
                    )}
                  </div>
                </div>
              ) : (
                <p className={textColor}>
                  {shouldTypewrite ? (
                    <TypewriterText
                      text={section.content}
                      speed={typewriterSpeed}
                      enableSound={enableSound}
                      onComplete={() => handleSectionComplete(index)}
                    />
                  ) : (
                    section.content
                  )}
                </p>
              )}
              
              {/* Add interactive element indicator if needed */}
              {section.interactive && completedSections.has(index) && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg cursor-pointer hover:bg-purple-900/30 transition-colors"
                >
                  <div className="flex items-center text-purple-400 hover:text-purple-300">
                    <i className="fa-solid fa-hand-pointer mr-2"></i>
                    <span className="text-sm">{section.interactionPrompt || "点击探索更多"}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* 继续阅读提示 */}
      {enableTypewriter && visibleSections < sections.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
            <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
            <span>正在加载下一段...</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}