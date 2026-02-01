'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATOS DE ACTIVIDADES ---
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
    title: "Rescate y Protección Animal",
    description: " Rescatamos animales en situación de abandono, maltrato o peligro. Trabajamos en estrecha colaboración con autoridades locales y organizaciones para garantizar su seguridad y bienestar.",
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

export default function AppStoreActivities() {
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
            className="relative h-[450px] rounded-[32px] overflow-hidden cursor-pointer shadow-xl bg-white group"
            whileHover={{ y: -10 }}
          >
            <motion.img layoutId={`image-${activity.id}`} src={activity.image} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-8 w-full">
              <motion.h3 layoutId={`title-${activity.id}`} className="text-2xl font-black text-white mb-2 leading-tight">{activity.title}</motion.h3>
              <p className="text-white/70 text-sm">Toca para más información</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedActivity && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center p-4 pt-24 md:pt-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedId(null)} />
            <motion.div layoutId={`card-${selectedActivity.id}`} className="relative w-full max-w-2xl bg-white rounded-[20px] md:rounded-[40px] overflow-hidden shadow-2xl flex flex-col max-h-[80vh] md:max-h-[75vh] mt-4 md:mt-8">
              <div className="relative w-full h-48 md:h-64 flex-shrink-0">
                <motion.img layoutId={`image-${selectedActivity.id}`} src={selectedActivity.image} className="w-full h-full object-cover" />
              </div>
              <div className="w-full p-4 md:p-6 lg:p-8 overflow-y-auto flex-1">
                <motion.h3 layoutId={`title-${selectedActivity.id}`} className="text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4 leading-tight">{selectedActivity.title}</motion.h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 md:mb-6">{selectedActivity.description}</p>
                <Button onClick={() => setSelectedId(null)} className="w-full h-10 md:h-12 rounded-xl md:rounded-2xl text-white font-bold text-sm md:text-base" style={{ backgroundColor: selectedActivity.color }}>Cerrar</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}