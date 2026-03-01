'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function LlamadoAAccion() {
  const { trackSponsorClicked } = useAnalytics();

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
            ¿Preferís involucrarte personalmente?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Si el dinero no es una opción, tu tiempo, talento y hogar temporal son invaluables para nosotros.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/voluntarios" className="btn-pill-primary text-lg px-8 py-4" onClick={trackSponsorClicked}>
              Ser voluntario
            </Link>
            <Link href="/adopcion" className="btn-pill-secondary text-lg px-8 py-4">
              Hogar temporal
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
