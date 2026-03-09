'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';

export default function LlamadoAAccion() {
  return (
    <section className="furs-section overflow-hidden relative">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3" />

      <div className="furs-container relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-primary-foreground/10 rounded-[2rem] flex items-center justify-center mb-8 rotate-3 shadow-lg">
            <Heart size={36} className="text-primary-foreground drop-shadow-md" fill="currentColor" opacity={0.9} />
          </div>
          
          <h2 className="furs-title-xl mb-6 leading-tight">
            ¿Listo para ser<br />un <em className="italic opacity-90 text-secondary">Héroe</em>?
          </h2>
          
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-10 leading-relaxed max-w-2xl">
            Si tenés preguntas o querés formalizar tu apadrinamiento, contactanos hoy. Estamos para acompañarte en este hermoso camino.
          </p>
          
          <Link href="/contacto" className="btn-pill bg-background outline-none text-primary font-bold text-lg hover:bg-secondary hover:text-secondary-foreground shadow-xl lg:px-10 lg:py-4 flex items-center gap-3 group">
            Contactar al Refugio 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
