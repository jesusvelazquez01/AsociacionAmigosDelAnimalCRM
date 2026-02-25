'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, Car, Calendar, Share2, FileText, Home, Sparkles } from 'lucide-react';

const volunteerAreas = [
  { title: "Cuidado Directo", icon: Heart, description: "Alimentación, limpieza y cuidado básico de los animales" },
  { title: "Transporte", icon: Car, description: "Traslados a veterinarios, eventos de adopción y rescates" },
  { title: "Eventos", icon: Calendar, description: "Organización de ferias de adopción y eventos de recaudación" },
  { title: "Redes Sociales", icon: Share2, description: "Difusión en redes, fotografía y creación de contenido" },
  { title: "Administración", icon: FileText, description: "Tareas administrativas, contabilidad y gestión" },
  { title: "Hogar Temporal", icon: Home, description: "Cuidado temporal de animales en recuperación" },
];

export default function VoluntariosPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-white overflow-hidden">
      {/* Barra de progreso de lectura superior */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-[60]" style={{ scaleX }} />

      {/* --- HERO: VISUAL IMPACT --- */}
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
              Tu tiempo y dedicación pueden transformar vidas. Únete a nuestro equipo de héroes.
            </p>

            <Button asChild size="lg" className="rounded-full h-16 px-10 text-lg bg-white text-black hover:bg-pink-50 transition-all hover:scale-105">
              <Link href="/contacto">Quiero Ser Voluntario</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION: ÁREAS DE VOLUNTARIADO --- */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Encuentra Tu Lugar</h2>
            <p className="text-gray-500">Hay muchas formas de ayudar. Encuentra la que mejor se adapte a ti.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {volunteerAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{area.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{area.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- SECTION: REQUISITOS Y PROCESO --- */}
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

      {/* --- CTA FINAL: MINIMALISTA --- */}
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
    </div>
  );
}