'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PawPrint, ArrowRight } from 'lucide-react';

export default function HeroApadrinar() {
  return (
    <section className="ap-hero">
      <motion.div
        className="ap-hero-left"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="ap-hero-eyebrow">
          <PawPrint size={12} />
          Apadrinamiento
        </div>
        <h1 className="ap-hero-title">
          Sé su<br />
          <em>Héroe</em><br />
          Mensual.
        </h1>
        <p className="ap-hero-sub">
          Conviértete en el padrino de un animal. Tu ayuda sostenida garantiza su comida, salud y felicidad mientras espera una familia.
        </p>
        <Link href="#planes" className="ap-hero-cta">
          Elegir mi Plan <ArrowRight size={18} />
        </Link>
        <div className="ap-hero-num">♥</div>
      </motion.div>

      <div className="ap-hero-right">
        <Image
          src="/Foto-refugio/refugio-4.jpg"
          fill
          className="object-cover"
          alt="Fondo Refugio"
        />
      </div>
    </section>
  );
}
