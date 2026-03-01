'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Import local components
import HeroRefugio from './components/HeroRefugio';
import ProgramasRefugio from './components/ProgramasRefugio';

export default function ElRefugioPageCreative() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-gray-900 font-sans overflow-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-pink-400 origin-left z-[110]" style={{ scaleX }} />

      <HeroRefugio />
      <ProgramasRefugio />
     
      {/* Bottom spacing before footer */}
      <div className="h-24" />
    </div>
  );
}