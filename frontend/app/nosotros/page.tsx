'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Import local components
import HeroNosotros from './components/HeroNosotros';
import HistoriaBrenda from './components/HistoriaBrenda';
import LineaDeTiempo from './components/LineaDeTiempo';
import LlamadoAAccion from './components/LlamadoAAccion';

export default function SobreNosotros() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-white overflow-hidden text-gray-900 font-sans">
      {/* Barra de progreso de lectura */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-pink-400 origin-left z-[60]" style={{ scaleX }} />

      <HeroNosotros />
      <HistoriaBrenda />
      <LineaDeTiempo />
      <LlamadoAAccion />
    </div>
  );
}