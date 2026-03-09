'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function LlamadoAAccion() {
  return (
    <section className="py-32 bg-gray-900 text-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Sparkles className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-pulse" />
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Cada minuto cuenta.
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          No importa cuánto tiempo puedas dedicar, siempre hay una forma de ayudar que se adapte a ti.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-12 py-8 text-xl h-auto">
            <Link href="/contacto">Únete Ahora</Link>
          </Button>
          <Button asChild variant="outline" className="border-white text-white hover:!bg-white hover:!text-pink-600 hover:!border-pink-600 rounded-full px-12 py-8 text-xl h-auto">
            <Link href="/el-refugio">Conoce Nuestro Refugio</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
