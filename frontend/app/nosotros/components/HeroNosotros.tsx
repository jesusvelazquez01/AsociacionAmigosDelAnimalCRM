'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

export default function HeroNosotros() {
  return (
    <section className="relative pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
      <div className="w-full lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <Image 
            src="/Foto-refugio/refugio-5.png"  
            alt="Protegé a los animales"
            width={800}
            height={600}
            className="w-full h-[400px] lg:h-[500px] object-cover rounded-[2rem] shadow-lg"
          />
        </motion.div>
      </div>
      <div className="w-full lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="text-pink-400 w-5 h-5" />
            <span className="text-pink-400 font-semibold uppercase tracking-wider text-sm">San Salvador de Jujuy, Jujuy</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight font-serif">
            CASI 40 AÑOS<br />
            <span className="text-gray-900">
              DE RESCATE
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 font-light leading-relaxed">
            Desde 1987, la Asociación Amigos del Animal Jujuy rescata y transforma familias. Casi 40 años de lucha, construida a pulmón y la convicción de Brenda y Ana.
          </p>
          <p className="text-lg text-gray-600 mb-10">
            Hoy albergamos a <strong>+280 vidas rescatadas</strong>. Tener horas nunca vislumbra la importancia de salvar vidas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full h-12 px-8 text-base bg-pink-400 hover:bg-pink-500 text-white transition-all shadow-md">
              <Link href="/adopcion">Conocer a la manada</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-8 text-base border-gray-900 text-gray-900 hover:bg-gray-100">
              <Link href="/voluntarios">Sumate como Voluntario</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
