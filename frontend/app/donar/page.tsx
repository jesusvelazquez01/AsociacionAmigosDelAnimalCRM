'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Import local components
import HeroDonar from './components/HeroDonar';
import Transparencia from './components/Transparencia';
import MontosMensuales from './components/MontosMensuales';
import MetodosDonacion from './components/MetodosDonacion';
import Impacto from './components/Impacto';
import LlamadoAAccion from './components/LlamadoAAccion';

export default function DonarPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-background overflow-hidden">
      {/* Barra de progreso */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[60]" style={{ scaleX }} />

      <HeroDonar />
      <Transparencia />
      <MontosMensuales />
      <MetodosDonacion />
      <Impacto />
      <LlamadoAAccion />
    </div>
  );
}