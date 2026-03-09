'use client';

import React from 'react';

// Import local components
import HeroApadrinar from './components/HeroApadrinar';
import PlanesApadrinar from './components/PlanesApadrinar';
import ProcesoApadrinar from './components/ProcesoApadrinar';
import SignificadoApadrinar from './components/SignificadoApadrinar';
import FaqYAnimales from './components/FaqYAnimales';
import LlamadoAAccion from './components/LlamadoAAccion';

// ─── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────
export default function ApadrinarPage() {
  return (
    <>
      <main className="min-h-screen bg-background">
        <HeroApadrinar />
        <PlanesApadrinar />
        <ProcesoApadrinar />
        <SignificadoApadrinar />
        <FaqYAnimales />
        
      </main>
    </>
  );
}