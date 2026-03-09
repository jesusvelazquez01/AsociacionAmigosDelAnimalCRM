'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function SignificadoApadrinar() {
  return (
    <section className="furs-section text-secondary-foreground">
      <div className="furs-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-1 bg-secondary-foreground/40 rounded-full" />
              <span className="text-primary font-medium tracking-wide uppercase text-sm">¿Qué es?</span>
            </div>
            
            <h2 className="furs-title-lg text-secondary-foreground mb-6">
              ¿Qué significa <em className="text-primary">apadrinar</em>?
            </h2>
            
            <p className="text-lg md:text-xl text-secondary-foreground/80 leading-relaxed mb-8">
              Apadrinar es una forma especial de ayudar sin adoptar. Te convertís en el &quot;padrino&quot; de un animal específico, ayudando con sus gastos mientras encuentra su hogar definitivo.
            </p>
            
            <div className="flex flex-col gap-4">
              {['Recibís fotos y actualizaciones regulares', 'Podés visitarlo cuando quieras', 'Ayudás con alimentación y cuidados', 'No hay compromiso de tiempo mínimo'].map((b, i) => (
                <motion.div
                  key={i} 
                  className="flex items-center gap-3 text-secondary-foreground/90 font-medium"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Check size={14} className="text-white" />
                  </div>
                  {b}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image
                src="/Foto-perritos/unnamed.jpg"
                alt="Amigos del Animal"
                fill
                className="furs-image z-10"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
