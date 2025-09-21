import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReadingSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    fontSize: number;
    typewriterSpeed: number;
    enableTypewriter: boolean;
    darkMode: boolean;
    enableSound: boolean;
    enableBackgroundMusic: boolean;
    backgroundMusicVolume: number;
  };
  onSettingsChange: (settings: any) => void;
}

export function ReadingSettings({ isOpen, onClose, settings, onSettingsChange }: ReadingSettingsProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  // 同步外部设置变化到本地状态
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* 设置面板 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl p-6 w-full max-w-md z-50"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">阅读设置</h3>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* 字体大小 */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  字体大小
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400">小</span>
                  <input
                    type="range"
                    min="14"
                    max="24"
                    value={localSettings.fontSize}
                    onChange={(e) => handleSettingChange('fontSize', parseInt(e.target.value))}
                    className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-sm text-slate-400">大</span>
                  <span className="text-sm text-white w-8 text-center">{localSettings.fontSize}</span>
                </div>
              </div>

              {/* 打字机效果 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">
                    打字机效果
                  </label>
                  <button
                    onClick={() => handleSettingChange('enableTypewriter', !localSettings.enableTypewriter)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      localSettings.enableTypewriter ? 'bg-purple-600' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        localSettings.enableTypewriter ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {localSettings.enableTypewriter && (
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">打字速度</label>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">慢</span>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={localSettings.typewriterSpeed}
                        onChange={(e) => handleSettingChange('typewriterSpeed', parseInt(e.target.value))}
                        className="flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xs text-slate-400">快</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 深色模式 */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">
                  深色模式
                </label>
                <button
                  onClick={() => handleSettingChange('darkMode', !localSettings.darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.darkMode ? 'bg-purple-600' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* 音效 */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">
                  音效
                </label>
                <button
                  onClick={() => handleSettingChange('enableSound', !localSettings.enableSound)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.enableSound ? 'bg-purple-600' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.enableSound ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              {/* 背景音乐 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">
                    背景音乐
                  </label>
                  <button
                    onClick={() => handleSettingChange('enableBackgroundMusic', !localSettings.enableBackgroundMusic)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      localSettings.enableBackgroundMusic ? 'bg-purple-600' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        localSettings.enableBackgroundMusic ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {localSettings.enableBackgroundMusic && (
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">音量</label>
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-volume-low text-slate-400"></i>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={localSettings.backgroundMusicVolume}
                        onChange={(e) => handleSettingChange('backgroundMusicVolume', parseInt(e.target.value))}
                        className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <i className="fa-solid fa-volume-high text-slate-400"></i>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 预设方案 */}
            <div className="mt-6 pt-4 border-t border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                预设方案
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    const preset = {
                      fontSize: 16,
                      typewriterSpeed: 50,
                      enableTypewriter: true,
                      darkMode: true,
                      enableSound: false, // 默认关闭打字音效
                      enableBackgroundMusic: true,
                      backgroundMusicVolume: 50
                    };
                    setLocalSettings(preset);
                    onSettingsChange(preset);
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
                >
                  沉浸模式
                </button>
                <button
                  onClick={() => {
                    const preset = {
                      fontSize: 18,
                      typewriterSpeed: 20,
                      enableTypewriter: false,
                      darkMode: true,
                      enableSound: false,
                      enableBackgroundMusic: false,
                      backgroundMusicVolume: 0
                    };
                    setLocalSettings(preset);
                    onSettingsChange(preset);
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
                >
                  快速阅读
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}