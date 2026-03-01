'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const activitiesData = [
  {
    id: "atencion-vet",
    title: "Atención Veterinaria Integral",
    description: "Chequeos médicos completos, vacunaciones, desparasitación, cirugías y tratamientos especializados. Contamos con veterinarios voluntarios disponibles 24/7 para emergencias y cuidados intensivos.",
    color: "#EC4899",
    image: "/Foto-actividad-refugio/atencionvet.jpeg"
  },
  {
    id: "rehabilitacion",
    title: "Rehabilitación y Cuidados",
    description: "Proporcionamos un ambiente seguro, cómodo y amoroso. Cada animal recibe atención personalizada, alimentación nutritiva y las medicinas necesarias para su pronta recuperación física y emocional.",
    color: "#F97316",
    image: "/Foto-perritos/perrito2.jpg"
  },
  {
    id: "socializacion",
    title: "Socialización y Adiestramiento",
    description: "Trabajamos en la confianza y comportamiento de los animales. Les enseñamos comandos básicos y los ayudamos a superar miedos para que estén listos para convivir en armonía con su futura familia.",
    color: "#EF4444",
    image: "/Foto-perritos/perrito3.jpg"
  },
  {
    id: "adopcion",
    title: "Adopción Responsable",
    description: "No solo entregamos animales, buscamos hogares. Realizamos entrevistas exhaustivas, estudios de hogar y seguimiento post-adopción para asegurar que el vínculo sea para toda la vida.",
    color: "#3B82F6",
    image: "/Foto-actividad-refugio/adopcion.jpg"
  },
  {
    id: "bienestar",
    title: "Enriquecimiento y Bienestar",
    description: "Actividades recreativas, juegos, interacción social y paseos al aire libre. Estimulamos su mente y cuerpo para que su estancia en el refugio sea lo más feliz y activa posible.",
    color: "#10B981",
    image: "/Foto-actividad-refugio/entretenimiento.jpg"
  },
  {
    id: "educacion",
    title: "Educación Comunitaria",
    description: "Talleres y charlas sobre tenencia responsable. Creemos que la educación es la base para prevenir el maltrato animal y fomentar una sociedad más empática con los seres sintientes.",
    color: "#8B5CF6",
    image: "/Foto-actividad-refugio/educacion.jpg"
  }
];

const AppStoreActivities = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedId) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [selectedId]);

  const selectedActivity = activitiesData.find(item => item.id === selectedId);

  return (
    <div className="relative px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {activitiesData.map((activity) => (
          <motion.div
            key={activity.id}
            layoutId={`card-${activity.id}`}
            onClick={() => setSelectedId(activity.id)}
            className="flex flex-col rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow bg-white border border-gray-100 group h-full"
            whileHover={{ y: -5 }}
          >
            <div className="w-full h-56 relative overflow-hidden">
              <motion.img 
                layoutId={`image-${activity.id}`} 
                src={activity.image} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-grow bg-white">
              <motion.h3 
                layoutId={`title-${activity.id}`} 
                className="text-xl font-bold font-serif text-gray-900 mb-2"
              >
                {activity.title}
              </motion.h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                {activity.description}
              </p>
              <p className="text-gray-400 text-xs mt-auto">Toca para más información.</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedActivity && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedId(null)} />
            <motion.div layoutId={`card-${selectedActivity.id}`} className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh]">
              <div className="relative w-full md:w-1/2 h-48 md:h-auto">
                <motion.img layoutId={`image-${selectedActivity.id}`} src={selectedActivity.image} className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col">
                <motion.h3 layoutId={`title-${selectedActivity.id}`} className="text-2xl font-bold font-serif text-gray-900 mb-4">{selectedActivity.title}</motion.h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">{selectedActivity.description}</p>
                <Button onClick={() => setSelectedId(null)} className="w-full h-12 rounded-full text-white font-bold bg-pink-400 hover:bg-pink-500 mt-auto">
                  Cerrar
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProgramasRefugio() {
  return (
    <>
      <div className="flex items-center justify-center max-w-7xl mx-auto px-6 py-12" id="programas">
        <div className="h-px bg-gray-300 flex-grow" />
        <h2 className="px-6 text-3xl font-bold font-serif text-gray-900">Nuestros Programas</h2>
        <div className="h-px bg-gray-300 flex-grow" />
      </div>

      {/* Nuestros Programas */}
      <section className="pb-24 pt-8">
        <AppStoreActivities />
      </section>
    </>
  );
}
