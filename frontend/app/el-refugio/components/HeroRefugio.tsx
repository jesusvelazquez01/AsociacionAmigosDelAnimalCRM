'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroRefugio() {
  return (
    <section className="relative pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
      <div className="w-full lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight font-serif text-gray-900">
            Historias de<br />Esperanza
          </h1>
          <p className="text-lg text-gray-600 max-w-lg leading-relaxed font-light">
            Con pasión y compromiso, transformamos vidas. Descubrí cómo cada rescate cuenta.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="rounded-full h-12 px-8 text-base bg-pink-400 hover:bg-pink-500 text-white transition-all shadow-md">
              <Link href="#programas">Conocé Nuestros Programas</Link>
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="w-full lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <Image
            src="/Foto-refugio/refugio-1.png"
            alt="Refugio"
            width={800}
            height={600}
            className="w-full h-[350px] lg:h-[450px] object-cover rounded-[2rem] shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
