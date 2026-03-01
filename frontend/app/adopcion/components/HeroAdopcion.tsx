'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';

interface HeroAdopcionProps {
  totalMascotas?: number;
}

export default function HeroAdopcion({ totalMascotas }: HeroAdopcionProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-card overflow-hidden">
      {/* Fondo suave con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />

      {/* Decoración orgánica */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />

      <div className="relative z-10 text-center furs-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="furs-badge bg-primary/10 text-primary border border-primary/20 mb-8">
            <PawPrint className="w-4 h-4 mr-2" />
            Adopta, no compres
          </span>

          <h1 className="furs-title-xl text-foreground mb-6">
            Encuentra tu<br />
            <span className="text-primary">compañero ideal</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Todos nuestros animalitos están vacunados, desparasitados y esperando un hogar lleno de amor.
          </p>

          {totalMascotas !== undefined && (
            <p className="text-lg text-primary font-medium">
              {totalMascotas} rescataditos disponibles para adopción
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
