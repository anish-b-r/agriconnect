import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ArrowScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  scrollAmount?: number;
  darkTheme?: boolean;
  showScrollHintFade?: boolean;
}

export const ArrowScrollContainer: React.FC<ArrowScrollContainerProps> = ({
  children,
  className = '',
  scrollAmount = 160,
  darkTheme = false,
  showScrollHintFade = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const hasOverflow = el.scrollWidth > el.clientWidth + 2;
    setIsOverflowing(hasOverflow);

    if (hasOverflow) {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScroll();

    // Check after layout/render settles
    const timer = setTimeout(checkScroll, 100);

    const handleResize = () => checkScroll();
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(() => {
      checkScroll();
    });
    observer.observe(el);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [checkScroll, children]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;

    const distance = direction === 'left' ? -scrollAmount : scrollAmount;
    el.scrollBy({ left: distance, behavior: 'smooth' });
    setTimeout(checkScroll, 320);
  };

  return (
    <div className={`relative flex items-center w-full min-w-0 ${className}`}>
      {/* Left Arrow Button */}
      {isOverflowing && (
        <button
          type="button"
          onClick={() => handleScroll('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
          className={`shrink-0 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer mr-1.5 select-none ${
            canScrollLeft
              ? darkTheme
                ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 shadow-xs active:scale-95'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 shadow-xs active:scale-95'
              : darkTheme
              ? 'opacity-25 bg-stone-900/60 text-stone-500 border border-stone-800 cursor-not-allowed'
              : 'opacity-25 bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Main Scrollable Viewport with optional subtle edge fades */}
      <div className="relative flex-1 min-w-0 overflow-hidden">
        {/* Left Fade Hint */}
        {showScrollHintFade && isOverflowing && canScrollLeft && (
          <div
            className={`pointer-events-none absolute left-0 top-0 bottom-0 w-4 z-5 bg-gradient-to-r ${
              darkTheme ? 'from-stone-900 to-transparent' : 'from-white/90 to-transparent'
            }`}
          />
        )}

        <div
          ref={containerRef}
          onScroll={checkScroll}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth w-full py-0.5"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {children}
        </div>

        {/* Right Fade Hint */}
        {showScrollHintFade && isOverflowing && canScrollRight && (
          <div
            className={`pointer-events-none absolute right-0 top-0 bottom-0 w-4 z-5 bg-gradient-to-l ${
              darkTheme ? 'from-stone-900 to-transparent' : 'from-white/90 to-transparent'
            }`}
          />
        )}
      </div>

      {/* Right Arrow Button */}
      {isOverflowing && (
        <button
          type="button"
          onClick={() => handleScroll('right')}
          disabled={!canScrollRight}
          aria-label="Scroll right"
          className={`shrink-0 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ml-1.5 select-none ${
            canScrollRight
              ? darkTheme
                ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 shadow-xs active:scale-95'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 shadow-xs active:scale-95'
              : darkTheme
              ? 'opacity-25 bg-stone-900/60 text-stone-500 border border-stone-800 cursor-not-allowed'
              : 'opacity-25 bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
