'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroDenunciar() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 overflow-hidden">
      {/* Decoración orgánica */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-red-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl" />

      <div className="furs-container relative mt-1">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="furs-title-xl text-foreground mb-6">
              Sé la voz de<br />
              <span className="text-primary">los que no tienen</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              El maltrato animal está penado por la <strong>Ley 14.346</strong>.
              Involucrate y luchá por quienes no pueden defenderse.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#como-denunciar" className="btn-pill-primary text-lg px-8 py-4">
                Conocé cómo denunciar
              </a>
            </div>
          </motion.div>

          {/* Imagen derecha */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="furs-card bg-card border border-border/50 p-4 shadow-xl">
              <Image
                src="/Foto-denuncia/denuncia-2.png"
                alt="Protegé a los animales"
                width={500}
                height={400}
                className="furs-image w-full h-100 object-cover"
              />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="furs-card-sm bg-white/95 backdrop-blur-sm p-4 shadow-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    <strong className="text-foreground">Tu denuncia salva vidas.</strong> No seas cómplice del silencio.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
