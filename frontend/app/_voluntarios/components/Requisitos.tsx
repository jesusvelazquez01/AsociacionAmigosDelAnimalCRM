'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

export default function Requisitos() {
  return (
    <section className="py-24 bg-pink-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900">¿Qué Necesitas?</h2>
          <p className="text-gray-600 mt-4">Los requisitos son simples, pero el impacto es enorme</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-lg"
          >
            <h3 className="text-3xl font-bold mb-8 text-pink-700">Requisitos</h3>
            <div className="space-y-6">
              {[
                "Ser mayor de 16 años (menores con autorización)",
                "Amor y respeto por los animales",
                "Compromiso y responsabilidad",
                "Disponibilidad de tiempo (flexible)",
                "Ganas de aprender y ayudar"
              ].map((req, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 text-lg">{req}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-pink-500 to-purple-600 p-8 rounded-3xl text-white shadow-lg"
          >
            <Users className="w-16 h-16 mb-6 opacity-80" />
            <h3 className="text-3xl font-bold mb-6">¿Listo para Empezar?</h3>
            <p className="text-pink-100 mb-8 text-lg leading-relaxed">
              Completa nuestro formulario y nos pondremos en contacto contigo para coordinar una charla informativa.
            </p>
            <Button asChild size="lg" className="w-full bg-white text-pink-600 hover:bg-pink-50 h-14 text-lg font-bold">
              <Link href="/contacto">
                Quiero Ser Voluntario
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
