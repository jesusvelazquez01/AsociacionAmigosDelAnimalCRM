'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function LlamadoAAccion() {
  const { trackContactFromAdoption } = useAnalytics();

  return (
    <section className="furs-section bg-card border-t border-border/30">
      <div className="furs-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="furs-card bg-gradient-to-br from-primary/5 to-secondary/10 border border-border/50 p-12 max-w-3xl mx-auto"
        >
          <Heart className="w-14 h-14 text-primary mx-auto mb-6" />
          <h2 className="furs-title-lg text-foreground mb-4">
            Cambiá una vida hoy
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Cada adopción es un acto de amor. Al adoptar, no solo salvás una vida, también ganás un amigo incondicional.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="https://wa.me/5493884219759?text=Hola Asoc. Amigos del Animal, %20quiero%20adoptar%20un%20animal" className="btn-pill-primary text-lg px-8 py-4" onClick={trackContactFromAdoption}>
              Contactar al Refugio
            </Link>
            <Link href="/apadrinar" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full px-8 py-4 text-lg h-auto font-bold">
              Apadrinar
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
