'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function HeroVoluntarios() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0a0a0a] text-white overflow-hidden">
      {/* Fondo de Imagen Oscura */}
      <div className="absolute inset-0 opacity-40">
        <Image src="/Foto-refugio/refugio-2.png" fill className="object-cover grayscale" alt="Fondo" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

      <div className="relative z-10 text-center max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="inline-block py-1 px-3 rounded-full border border-pink-500/50 text-pink-400 text-sm mb-6 uppercase tracking-[0.2em] bg-pink-500/10 backdrop-blur-md">
            Únete al Cambio
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
            SÉ EL<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 animate-gradient-xy">
              CAMBIO
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-light">
            Tu tiempo y dedicación pueden transform vidas. Únete a nuestro equipo de héroes.
          </p>

          <Button asChild size="lg" className="rounded-full h-16 px-10 text-lg bg-white text-black hover:bg-pink-50 transition-all hover:scale-105">
            <Link href="/contacto">Quiero Ser Voluntario</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
