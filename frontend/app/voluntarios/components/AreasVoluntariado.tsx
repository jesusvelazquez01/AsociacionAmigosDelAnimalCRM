'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Car, Calendar, Share2, FileText, Home } from 'lucide-react';

const volunteerAreas = [
  { title: "Cuidado Directo", icon: Heart, description: "Alimentación, limpieza y cuidado básico de los animales" },
  { title: "Transporte", icon: Car, description: "Traslados a veterinarios, eventos de adopción y rescates" },
  { title: "Eventos", icon: Calendar, description: "Organización de ferias de adopción y eventos de recaudación" },
  { title: "Redes Sociales", icon: Share2, description: "Difusión en redes, fotografía y creación de contenido" },
  { title: "Administración", icon: FileText, description: "Tareas administrativas, contabilidad y gestión" },
  { title: "Hogar Temporal", icon: Home, description: "Cuidado temporal de animales en recuperación" },
];

export default function AreasVoluntariado() {
  return (
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
  );
}
