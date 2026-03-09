'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PawPrint, ArrowRight } from 'lucide-react';

export default function HeroApadrinar() {
  return (
    <section className="furs-section bg-secondary/5 overflow-hidden">
      <div className="furs-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-start relative z-10"
          >
            <div className="furs-badge bg-primary/10 text-primary mb-6 gap-2">
              <PawPrint size={14} />
              <span>Apadrinamiento</span>
            </div>
            
            <h1 className="furs-title-xl text-foreground">
              Sé su<br />
              <em className="text-primary italic">Héroe</em><br />
              Mensual.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-lg leading-relaxed">
              Conviértete en el padrino de un animal. Tu ayuda sostenida garantiza su comida, salud y felicidad mientras espera una familia.
            </p>
            
            <Link href="#planes" className="btn-pill-primary flex items-center gap-2 mt-10">
              Elegir mi Plan <ArrowRight size={18} />
            </Link>
            
            {/* Elemento decorativo */}
            <motion.div 
              className="absolute -z-10 text-primary/5 select-none animate-float"
              style={{ fontSize: '15rem', top: '-2rem', right: '-4rem', lineHeight: 1 }}
            >
              ♥
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative lg:h-[600px] h-[400px] w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-secondary/20 rounded-[2.5rem] transform rotate-3 scale-105 transition-transform" />
            <Image
              src="/Foto-refugio/refugio-4.jpg"
              fill
              className="furs-image shadow-xl z-10"
              alt="Fondo Refugio donde viven los animales"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
