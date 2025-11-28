
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const outline = outlineRef.current;

    if (!cursor || !outline) return;

    // Initial setup: Center anchor point and hide initially
    gsap.set([cursor, outline], { xPercent: -50, yPercent: -50, opacity: 0 });

    // Create quickTo instances for high performance (no garbage collection on every frame)
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    const xToOutline = gsap.quickTo(outline, "x", { duration: 0.3, ease: "power3" });
    const yToOutline = gsap.quickTo(outline, "y", { duration: 0.3, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      // Fade in on first movement
      if (parseFloat(cursor.style.opacity || '0') === 0) {
          gsap.to([cursor, outline], { opacity: 1, duration: 0.3 });
      }
      
      xTo(e.clientX);
      yTo(e.clientY);
      xToOutline(e.clientX);
      yToOutline(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-indigo-500 rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_#6366f1] hidden md:block" 
      />
      <div 
        ref={outlineRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-indigo-500/50 rounded-full pointer-events-none z-[9999] hidden md:block" 
      />
    </>
  );
};

export default Cursor;
