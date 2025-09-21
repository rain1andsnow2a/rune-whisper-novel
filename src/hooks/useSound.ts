import { useCallback, useRef, useState, useEffect } from 'react';

interface SoundOptions {
  volume?: number;
  loop?: boolean;
}

export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);

  // 初始化AudioContext
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // 设置背景音乐音量
  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  // 播放打字机音效
  const playTypewriterSound = useCallback(() => {
    try {
      const audioContext = initAudioContext();

      // 创建更真实的键盘音效
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      // 设置滤波器（模拟键盘的机械声音）
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, audioContext.currentTime);
      filter.Q.setValueAtTime(3, audioContext.currentTime);

      // 连接音频节点
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(filter);
      filter.connect(audioContext.destination);

      // 主频率（按键声音）
      oscillator1.frequency.setValueAtTime(1200, audioContext.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.02);

      // 副频率（增加机械感）
      oscillator2.frequency.setValueAtTime(300, audioContext.currentTime);
      oscillator2.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.03);

      // 音量包络（快速攻击，快速衰减）
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + 0.001);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);

      // 设置波形类型
      oscillator1.type = 'square';
      oscillator2.type = 'sawtooth';

      oscillator1.start(audioContext.currentTime);
      oscillator1.stop(audioContext.currentTime + 0.05);
      oscillator2.start(audioContext.currentTime);
      oscillator2.stop(audioContext.currentTime + 0.05);
    } catch (error) {
      console.warn('无法播放音效:', error);
    }
  }, [initAudioContext]);

  // 播放页面翻转音效
  const playPageTurnSound = useCallback(() => {
    try {
      const audioContext = initAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.warn('无法播放音效:', error);
    }
  }, [initAudioContext]);

  // 播放章节完成音效
  const playChapterCompleteSound = useCallback(() => {
    try {
      const audioContext = initAudioContext();
      
      // 创建和弦音效
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + index * 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1 + index * 0.1);

        oscillator.start(audioContext.currentTime + index * 0.1);
        oscillator.stop(audioContext.currentTime + 1 + index * 0.1);
      });
    } catch (error) {
      console.warn('无法播放音效:', error);
    }
  }, [initAudioContext]);

  // 播放背景音乐
  const playBackgroundMusic = useCallback((volume: number = 0.5) => {
    if (!backgroundMusicRef.current) {
      // 创建音频元素，使用本地音乐文件
      backgroundMusicRef.current = new Audio('/background-music.mp3');
      backgroundMusicRef.current.loop = true;
      backgroundMusicRef.current.volume = volume;
    }

    backgroundMusicRef.current.play()
      .then(() => {
        setIsMusicPlaying(true);
        setMusicVolume(volume);
      })
      .catch(error => {
        console.warn('无法播放背景音乐:', error);
      });
  }, []);

  // 暂停背景音乐
  const pauseBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      setIsMusicPlaying(false);
    }
  }, []);

  // 切换背景音乐播放状态
  const toggleBackgroundMusic = useCallback((volume?: number) => {
    if (isMusicPlaying) {
      pauseBackgroundMusic();
    } else {
      playBackgroundMusic(volume);
    }
  }, [isMusicPlaying, playBackgroundMusic, pauseBackgroundMusic]);

  // 调整背景音乐音量
  const setBackgroundMusicVolume = useCallback((volume: number) => {
    setMusicVolume(volume);
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = volume;
    }
  }, []);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    };
  }, []);

  return {
    playTypewriterSound,
    playPageTurnSound,
    playChapterCompleteSound,
    playBackgroundMusic,
    pauseBackgroundMusic,
    toggleBackgroundMusic,
    setBackgroundMusicVolume,
    isMusicPlaying,
    musicVolume
  };
}