import { useEffect, useState } from 'react';
import { ReadingProgress } from '@/types/story.types';

export function useReadingProgress(chapterId: number) {
  const [progress, setProgress] = useState<ReadingProgress>({
    chapterId,
    sectionIndex: 0,
    lastRead: new Date()
  });
  
  // Load saved progress on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('readingProgress');
      if (savedProgress) {
        const parsedProgress: ReadingProgress = JSON.parse(savedProgress);
        if (parsedProgress.chapterId === chapterId) {
          setProgress(parsedProgress);
        }
      }
    } catch (error) {
      console.error('Failed to load reading progress:', error);
    }
  }, [chapterId]);
  
  // Save progress when it changes
  useEffect(() => {
    try {
      const updatedProgress = {
        ...progress,
        lastRead: new Date()
      };
      localStorage.setItem('readingProgress', JSON.stringify(updatedProgress));
    } catch (error) {
      console.error('Failed to save reading progress:', error);
    }
  }, [progress]);
  
  // Update section index
  const updateSectionIndex = (index: number) => {
    setProgress(prev => ({
      ...prev,
      sectionIndex: index
    }));
  };
  
  return {
    sectionIndex: progress.sectionIndex,
    updateSectionIndex
  };
}