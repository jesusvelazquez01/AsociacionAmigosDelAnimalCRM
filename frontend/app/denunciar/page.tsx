'use client';

import React from 'react';

// Import local components
import HeroDenunciar from './components/HeroDenunciar';
import PasosDenunciar from './components/PasosDenunciar';
import LeyNacional from './components/LeyNacional';
import LlamadoAAccion from './components/LlamadoAAccion';

export default function DenunciarPage() {
  return (
    <div className="bg-background overflow-hidden">
      <HeroDenunciar />
      <PasosDenunciar />
      <LeyNacional />
      <LlamadoAAccion />
    </div>
  );
}