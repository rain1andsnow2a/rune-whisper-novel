import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StorySegment } from '../types/story';

interface StoryViewerProps {
  className?: string;
}

export function StoryViewer({ className }: StoryViewerProps) {
  // Game context is not available
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);

  useEffect(() => {
    if (!currentStory) return;

    setIsTyping(true);
    setShowChoices(false);
    setDisplayedText('');

    // 打字机效果
    const text = currentStory.content;
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
          setTimeout(typeText, 30); // 恒定速度
      } else {
        setIsTyping(false);
        setTimeout(() => setShowChoices(true), 500);
      }
    };

    setTimeout(typeText, 500);
  }, [currentStory]);

  if (!currentStory) {
    return (
      <div className="flex items-center justify-center h-full text-amber-300">
        加载中...
      </div>
    );
  }

  const getChoiceStyle = (choice: Choice) => {
    const baseClasses = "w-full p-4 rounded-lg text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg";

    switch (choice.style) {
      case 'danger':
        return `${baseClasses} bg-red-900/50 border border-red-700 hover:bg-red-800/60 text-red-100`;
      case 'magic':
        return `${baseClasses} bg-purple-900/50 border border-purple-700 hover:bg-purple-800/60 text-purple-100`;
      case 'wisdom':
        return `${baseClasses} bg-blue-900/50 border border-blue-700 hover:bg-blue-800/60 text-blue-100`;
      default:
        return `${baseClasses} bg-amber-900/30 border border-amber-700 hover:bg-amber-800/40 text-amber-100`;
    }
  };

  const canSelectChoice = (choice: Choice) => {
    if (!choice.requirements) return true;

    const { items, knowledge, traits, relationships } = choice.requirements;

    if (items && !items.every(item => gameState.inventory.includes(item))) {
      return false;
    }
    if (knowledge && !knowledge.every(k => gameState.knowledge.includes(k))) {
      return false;
    }
    if (traits && !traits.every(trait => gameState.traits.includes(trait))) {
      return false;
    }
    if (relationships) {
      for (const [character, requiredValue] of Object.entries(relationships)) {
        if ((gameState.relationships[character] || 0) < requiredValue) {
          return false;
        }
      }
    }

    return true;
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* 故事标题 */}
      {currentStory.title && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold text-amber-300 font-serif">
            {currentStory.title}
          </h2>
        </motion.div>
      )}

      {/* 故事内容区域 */}
      <div className="flex-1 mb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black/30 backdrop-blur-sm border border-amber-700/50 rounded-lg p-6"
        >
          <div className="text-amber-100 leading-relaxed text-lg font-serif whitespace-pre-wrap">
            {displayedText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-amber-400"
              >
                |
              </motion.span>
            )}
          </div>

          {/* 效果指示器 */}
          {currentStory.effects && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 flex items-center gap-2"
            >
              <div className={`w-3 h-3 rounded-full animate-pulse ${
                currentStory.effects.type === 'magic' ? 'bg-purple-400' :
                currentStory.effects.type === 'danger' ? 'bg-red-400' :
                currentStory.effects.type === 'discovery' ? 'bg-blue-400' :
                'bg-yellow-400'
              }`} />
              <span className="text-sm text-amber-300 italic">
                {currentStory.effects.type === 'magic' && '魔法能量涌动...'}
                {currentStory.effects.type === 'danger' && '危险逼近...'}
                {currentStory.effects.type === 'discovery' && '新的发现...'}
                {currentStory.effects.type === 'emotion' && '情感波动...'}
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* 选择区域 */}
      <AnimatePresence>
        {showChoices && currentStory.choices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="space-y-3"
          >
            {currentStory.choices.map((choice, index) => {
              const canSelect = canSelectChoice(choice);

              return (
                <motion.button
                  key={choice.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${getChoiceStyle(choice)} ${
                    !canSelect ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  onClick={() => canSelect && makeChoice(choice)}
                  disabled={!canSelect}
                  whileHover={canSelect ? { scale: 1.02 } : {}}
                  whileTap={canSelect ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-700 text-amber-100 text-sm flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span className="text-left">{choice.text}</span>
                  </div>

                  {/* 需求提示 */}
                  {!canSelect && choice.requirements && (
                    <div className="mt-2 text-xs text-red-300 opacity-75">
                      需要: {
                        choice.requirements.items?.join(', ') ||
                        choice.requirements.knowledge?.join(', ') ||
                        choice.requirements.traits?.join(', ') ||
                        '特定条件'
                      }
                    </div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 自动推进提示 */}
      {currentStory.autoAdvance && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-amber-400 text-sm mt-4 italic"
        >
          故事将在 {Math.ceil(currentStory.autoAdvance.delay / 1000)} 秒后自动继续...
        </motion.div>
      )}
    </div>
  );
}