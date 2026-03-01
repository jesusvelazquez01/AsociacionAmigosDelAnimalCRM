'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export default function LlamadoAAccion() {
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
          <AlertTriangle className="w-14 h-14 text-primary mx-auto mb-6" />
          <h2 className="furs-title-lg text-foreground mb-4">
            Tu denuncia es su esperanza
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            No esperes. Cada minuto cuenta cuando se trata de salvar una vida.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contacto" className="btn-pill-secondary text-lg px-8 py-4">
              Más información
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
