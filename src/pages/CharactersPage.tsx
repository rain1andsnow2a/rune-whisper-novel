import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { characters } from '@/data/characters';

export default function CharactersPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=ancient+stone+wall+with+magic+runes+carved+into+it+mystical+atmosphere&sign=d2973d73463be4391d5088c6c9a17e71')] bg-cover bg-center opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-600/10 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 py-6 px-4 border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/70">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
            <i className="fa-solid fa-arrow-left"></i>
            <span>返回主页</span>
          </Link>
          <h1 className="text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300">
            《符文的低语》人物介绍
          </h1>
          <div className="w-12"></div> {/* Placeholder for spacing */}
        </div>
      </header>
      
      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Elian Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="group"
          >
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all duration-300 h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                   src="https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=anime%20style%20young%20man%20with%20curious%20eyes%20holding%20ancient%20book%20herbalist%20apprentice%20simple%20clothes%20serious%20expression&sign=3b6f9a014a9e6d2a6da9279eb11e482e" 
                  alt={characters[0].name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold">{characters[0].name}</h2>
                  <p className="text-slate-300 italic">{characters[0].englishName}</p>
                  <div className="mt-1 inline-block px-3 py-1 bg-purple-600/80 rounded-full text-xs font-medium">
                    {characters[0].role}
                  </div>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold mb-2 text-purple-400">背景</h3>
                <p className="text-slate-300 mb-4 text-sm leading-relaxed">{characters[0].background}</p>
                
                <h3 className="text-lg font-semibold mb-2 text-purple-400">性格</h3>
                <p className="text-slate-300 mb-4 text-sm leading-relaxed">{characters[0].personality}</p>
                
                <h3 className="text-lg font-semibold mb-2 text-purple-400">外貌</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{characters[0].appearance}</p>
              </div>
              <div className="px-6 pb-6">
                <div className="flex gap-2 text-sm text-slate-400">
                  <span className="flex items-center"><i className="fa-solid fa-book mr-1"></i> 求知者</span>
                  <span className="flex items-center"><i className="fa-solid fa-flask mr-1"></i> 草药师</span>
                  <span className="flex items-center"><i className="fa-solid fa-feather mr-1"></i> 探索者</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Sia Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group"
          >
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-green-500/50 transition-all duration-300 h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                   src="https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=anime%20style%20wise%20elder%20woman%20forest%20dweller%20natural%20magician%20with%20plants%20and%20crystals%20sharp%20eyes%20wild%20hair&sign=ad1f974008f195f28ab403e76f538225" 
                  alt={characters[1].name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold">{characters[1].name}</h2>
                  <p className="text-slate-300 italic">{characters[1].englishName}</p>
                  <div className="mt-1 inline-block px-3 py-1 bg-green-600/80 rounded-full text-xs font-medium">
                    {characters[1].role}
                  </div>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold mb-2 text-green-400">背景</h3>
                <p className="text-slate-300 mb-4 text-sm leading-relaxed">{characters[1].background}</p>
                
                <h3 className="text-lg font-semibold mb-2 text-green-400">性格</h3>
                <p className="text-slate-300 mb-4 text-sm leading-relaxed">{characters[1].personality}</p>
                
                <h3 className="text-lg font-semibold mb-2 text-green-400">外貌</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{characters[1].appearance}</p>
              </div>
              <div className="px-6 pb-6">
                <div className="flex gap-2 text-sm text-slate-400">
                  <span className="flex items-center"><i className="fa-solid fa-tree mr-1"></i> 自然法师</span>
                  <span className="flex items-center"><i className="fa-solid fa-university mr-1"></i> 前导师</span>
                  <span className="flex items-center"><i className="fa-solid fa-user-secret mr-1"></i> 隐士</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Lina Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group"
          >
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-green-500/50 transition-all duration-300 h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                   src="https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=anime%20style%20young%20girl%20with%20gentle%20eyes%20pale%20complexion%20golden%20hair%20plant-like%20markings%20on%20skin%20fragile%20but%20determined&sign=fcf837021aecb4820ace46bfa1559dac" 
                  alt={characters[2].name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold">{characters[2].name}</h2>
                  <p className="text-slate-300 italic">{characters[2].englishName}</p>
                  <div className="mt-1 inline-block px-3 py-1 bg-green-600/80 rounded-full text-xs font-medium">
                    {characters[2].role}
                  </div>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold mb-2 text-green-400">背景</h3>
                <p className="text-slate-300 mb-4 text-sm leading-relaxed">{characters[2].background}</p>
                
                <h3 className="text-lg font-semibold mb-2 text-green-400">性格</h3>
                <p className="text-slate-300 mb-4 text-sm leading-relaxed">{characters[2].personality}</p>
                
                <h3 className="text-lg font-semibold mb-2 text-green-400">外貌</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{characters[2].appearance}</p>
              </div>
              <div className="px-6 pb-6">
                <div className="flex gap-2 text-sm text-slate-400">
                  <span className="flex items-center"><i className="fa-solid fa-heart mr-1"></i> 妹妹</span>
                  <span className="flex items-center"><i className="fa-solid fa-leaf mr-1"></i> 生命力</span>
                  <span className="flex items-center"><i className="fa-solid fa-star mr-1"></i> 希望</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Kael Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group"
          >
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-amber-500/50 transition-all duration-300 h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                   src="https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=anime%20style%20tough%20ex-soldier%20mercenary%20with%20scar%20on%20face%20practical%20armor%20wary%20expression%20reliable%20appearance&sign=b441a842638b720dd5921963cbea1cf3" 
                   alt={characters[3].name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                   <h2 className="text-2xl font-bold">{characters[3].name}</h2>
                   <p className="text-slate-300 italic">{characters[3].englishName}</p>
                  <div className="mt-1 inline-block px-3 py-1 bg-amber-600/80 rounded-full text-xs font-medium">
                     {characters[3].role}
                  </div>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold mb-2 text-amber-400">背景</h3>
                 <p className="text-slate-300 mb-4 text-sm leading-relaxed">{characters[3].background}</p>
                
                <h3 className="text-lg font-semibold mb-2 text-amber-400">性格</h3>
                 <p className="text-slate-300 mb-4 text-sm leading-relaxed">{characters[3].personality}</p>
                
                <h3 className="text-lg font-semibold mb-2 text-amber-400">外貌</h3>
                 <p className="text-slate-300 text-sm leading-relaxed">{characters[3].appearance}</p>
              </div>
              <div className="px-6 pb-6">
                <div className="flex gap-2 text-sm text-slate-400">
                  <span className="flex items-center"><i className="fa-solid fa-shield mr-1"></i> 护卫</span>
                  <span className="flex items-center"><i className="fa-solid fa-sword mr-1"></i> 战士</span>
                  <span className="flex items-center"><i className="fa-solid fa-comment-slash mr-1"></i> 务实者</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Valerius Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group"
          >
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                   src="https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=anime%20style%20magister%20inquisitor%20with%20authoritative%20presence%20blue%20and%20gold%20robes%20silver%20hair%20serious%20expression%20holding%20staff%20with%20crystal&sign=889d24f146bf9fb27b04490ae263fec4" 
                   alt={characters[4].name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                   <h2 className="text-2xl font-bold">{characters[4].name}</h2>
                   <p className="text-slate-300 italic">{characters[4].englishName}</p>
                  <div className="mt-1 inline-block px-3 py-1 bg-blue-600/80 rounded-full text-xs font-medium">
                     {characters[4].role}
                  </div>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold mb-2 text-blue-400">背景</h3>
                 <p className="text-slate-300 mb-4 text-sm leading-relaxed">{characters[4].background}</p>
                
                <h3 className="text-lg font-semibold mb-2 text-blue-400">性格</h3>
                 <p className="text-slate-300 mb-4 text-sm leading-relaxed">{characters[4].personality}</p>
                
                <h3 className="text-lg font-semibold mb-2 text-blue-400">外貌</h3>
                 <p className="text-slate-300 text-sm leading-relaxed">{characters[4].appearance}</p>
              </div>
              <div className="px-6 pb-6">
                <div className="flex gap-2 text-sm text-slate-400">
                  <span className="flex items-center"><i className="fa-solid fa-balance-scale mr-1"></i> 审判者</span>
                  <span className="flex items-center"><i className="fa-solid fa-crown mr-1"></i> 议会成员</span>
                  <span className="flex items-center"><i className="fa-solid fa-shield-alt mr-1"></i> 秩序捍卫者</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/story/1" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg hover:shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-white font-medium"
          >
            开始阅读故事 <i className="fa-solid fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 mt-16 py-6 px-4 border-t border-slate-700/50 backdrop-blur-sm bg-slate-900/70 text-center text-slate-500 text-sm">
        <p>《符文的低语》- 一个关于探索、真理与成长的奇幻故事</p>
      </footer>
    </div>
  );
}