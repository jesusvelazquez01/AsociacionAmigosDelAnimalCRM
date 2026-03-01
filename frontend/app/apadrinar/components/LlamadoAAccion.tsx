'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';

export default function LlamadoAAccion() {
  return (
    <section className="ap-cta-bg">
      <div className="ap-cta-inner">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="ap-cta-icon">
            <Heart size={30} color="#C28253" fill="rgba(194,130,83,0.4)" />
          </div>
          <h2 className="ap-cta-title">
            ¿Listo para ser<br />un <em>Héroe</em>?
          </h2>
          <p className="ap-cta-sub">
            Si tenés preguntas o querés formalizar tu apadrinamiento, contactanos hoy. Estamos para acompañarte.
          </p>
          <Link href="/contacto" className="ap-cta-btn">
            Contactar al Refugio <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
