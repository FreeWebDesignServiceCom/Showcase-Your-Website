import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink, Pause, Play, LayoutGrid, Sparkles } from 'lucide-react';
import { websites } from './data';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [filter, setFilter] = useState<string>('All');
  const [direction, setDirection] = useState(0);

  const categories = ['All', ...new Set(websites.map(s => s.category))];
  const filteredWebsites = filter === 'All' 
    ? websites 
    : websites.filter(s => s.category === filter);

  // Wrap index for bounds
  const activeIndex = Math.abs(currentIndex) % (filteredWebsites.length || 1);
  const currentItem = filteredWebsites[activeIndex];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % filteredWebsites.length);
  }, [filteredWebsites.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + filteredWebsites.length) % filteredWebsites.length);
  }, [filteredWebsites.length]);

  useEffect(() => {
    if (!isPlaying || filteredWebsites.length <= 1) return;
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, handleNext, filteredWebsites.length]);

  // UI Variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-500/30 selection:text-indigo-200 bg-zinc-950 text-zinc-100 overflow-x-hidden">
      {/* Navigation Backdrop Blur */}
      <div className="fixed top-0 inset-x-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent pointer-events-none z-40" />

      {/* Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[min(90vw,1200px)] flex items-center justify-between px-6 py-3 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <LayoutGrid size={20} strokeWidth={2.5} />
          </div>
          <h1 className="font-display font-medium text-lg tracking-tight hidden sm:block">
            Showcase<span className="text-indigo-400">.</span>
          </h1>
        </div>

        <nav className="flex items-center gap-1 bg-black/20 p-1 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                filter === cat 
                  ? 'bg-zinc-100 text-zinc-950 shadow-lg' 
                  : 'text-zinc-500 hover:text-zinc-100 hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative h-screen flex items-center justify-center px-4 pt-20">
        <div className="relative w-full max-w-6xl aspect-[16/9] md:aspect-[21/9]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {currentItem && (
              <motion.div
                key={currentItem.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
                className="absolute inset-0 group"
                onMouseEnter={() => setIsPlaying(false)}
                onMouseLeave={() => setIsPlaying(true)}
              >
                {/* Website Badge */}
                {currentItem.isFeatured && (
                  <div className="absolute -top-3 -left-3 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                    <Sparkles size={12} fill="currentColor" />
                    Featured Today
                  </div>
                )}

                {/* Main Content Card */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/5 shadow-2xl flex flex-col md:flex-row bg-zinc-900/40">
                  {/* Image Side */}
                  <div className="relative w-full h-1/2 md:h-full md:w-2/3 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950 via-transparent to-transparent z-10 opacity-60 md:opacity-100" />
                    <img 
                      src={currentItem.image} 
                      alt={currentItem.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Text Side */}
                  <div className="relative w-full h-1/2 md:h-full md:w-1/3 p-8 flex flex-col justify-center bg-zinc-900 md:bg-transparent z-20">
                    <div className="space-y-4">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20">
                        {currentItem.category}
                      </span>
                      <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
                        {currentItem.name}
                      </h2>
                      <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-sm">
                        {currentItem.description}
                      </p>
                      
                      <div className="pt-6">
                        <a 
                          href={currentItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 text-zinc-950 rounded-xl font-bold text-sm hover:bg-white hover:-translate-y-0.5 transition-all active:scale-95 shadow-lg"
                        >
                          Visit Site
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          {filteredWebsites.length > 1 && (
            <>
              <div className="absolute inset-y-0 -left-6 md:-left-12 flex items-center pointer-events-none">
                <button 
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all pointer-events-auto shadow-2xl active:scale-90"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>
              <div className="absolute inset-y-0 -right-6 md:-right-12 flex items-center pointer-events-none">
                <button 
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all pointer-events-auto shadow-2xl active:scale-90"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Indicators Overlay */}
        <div className="absolute bottom-10 flex items-center gap-4 bg-zinc-900/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex gap-2">
            {filteredWebsites.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'w-8 bg-indigo-500' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>
          <div className="w-px h-4 bg-zinc-800 mx-1" />
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
          </button>
        </div>
      </main>

      {/* Background Gradients */}
      <div className="fixed top-0 -left-1/4 w-1/2 h-1/2 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 -right-1/4 w-1/2 h-1/2 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}
