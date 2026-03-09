'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Import local components
import HeroVoluntarios from './components/HeroVoluntarios';
import AreasVoluntariado from './components/AreasVoluntariado';
import Requisitos from './components/Requisitos';
import LlamadoAAccion from './components/LlamadoAAccion';

export default function VoluntariosPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-white overflow-hidden">
      {/* Barra de progreso de lectura superior */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-[60]" style={{ scaleX }} />

      <HeroVoluntarios />
      <AreasVoluntariado />
      <Requisitos />
      <LlamadoAAccion />
    </div>
  );
}