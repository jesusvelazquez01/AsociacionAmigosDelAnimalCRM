'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Syringe, Home, Car, Users } from 'lucide-react';

const timelineSteps = [
  {
    icon: Users,
    title: 'La Alerta Comunitaria',
    desc: 'Vecinos de Alto Comedero, el Centro y alrededores nos alertan. La red solidaria es el inicio de cada rescate.',
    color: 'bg-primary',
  },
  {
    icon: Car,
    title: 'Rescate del Abandono',
    desc: 'Nuestro equipo acude con seguridad y empatía. A menudo encontramos perros desnutridos, con sarna o heridas graves.',
    color: 'bg-primary',
  },
  {
    icon: Syringe,
    title: 'Atención Veterinaria',
    desc: 'Chequeo completo, vacunas, desparasitación y tratamientos especiales. Colaboramos con veterinarios locales.',
    color: 'bg-primary',
  },
  {
    icon: Home,
    title: 'Rehabilitación',
    desc: 'Albergamos a +200 perros en el refugio y 67 en su hogar personal. Aprenden a confiar nuevamente.',
    color: 'bg-primary',
  },
  {
    icon: Heart,
    title: 'Adopción Responsable',
    desc: 'Buscamos familias comprometidas. Hacemos entrevistas y seguimiento post-adopción. El amor es el objetivo.',
    color: 'bg-primary',
  },
];

export default function LineaDeTiempo() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="inline-block bg-pink-50 text-pink-500 px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
            Nuestro Proceso
          </span>
          <h2 className="text-4xl font-bold mb-4 font-serif">
            Cómo Trabajamos en Jujuy
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Un ciclo de rescate, cuidado y aprendizaje en todo el territorio.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Línea recta rosa */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-pink-200 hidden lg:block" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {timelineSteps.map((step, index) => {
              const isTop = index % 2 === 0;
              const IconComponent = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col items-center relative ${isTop ? 'lg:-translate-y-8' : 'lg:translate-y-8'}`}
                >
                  {/* Contenido TOP */}
                  {isTop && (
                    <div className="text-center mb-6 lg:mb-12 px-2 hidden lg:block h-24">
                      <h3 className="text-base font-bold text-gray-900 mb-2 font-serif">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  )}

                  {/* Ícono pink circle */}
                  <div className={`relative w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center border-4 border-white shadow-sm z-10 my-4 lg:my-0`}>
                    <IconComponent className="w-7 h-7 text-pink-500" />
                  </div>

                  {/* Contenido BOTTOM / Mobile */}
                  {(!isTop || true) && (
                    <div className={`text-center mt-6 lg:mt-12 px-2 h-24 ${isTop ? 'lg:hidden' : 'lg:block'}`}>
                      <h3 className="text-base font-bold text-gray-900 mb-2 font-serif">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
