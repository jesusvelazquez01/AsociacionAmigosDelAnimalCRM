'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HistoriaBrenda() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-pink-50 text-pink-500 px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
              La Cara Visible Hoy
            </span>
            <h2 className="text-4xl font-bold mb-4 font-serif">
              La Historia de Brenda
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Cómo una adolescente heredó un legado y lo transformó en propósito
            </p>
          </motion.div>
        </div>

        {/* Zig-Zag Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          
          {/* Row 1 equivalent components */}
          {/* Col 1: Text 1 */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col gap-4">
            <span className="inline-block bg-pink-50 text-pink-500 px-3 py-1 rounded-full text-xs font-bold w-fit">Los Primeros Años</span>
            <h3 className="text-xl font-bold font-serif leading-tight">Desde los 5 años, rescatando</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Brenda no tuvo una infancia típica. Mientras otros niños de su edad jugaban en parques, ella acompañaba a su madre Ana Lía en rescates de animales, rescatando cachorros de la calle y comprendiendo el abandono desde temprana edad.
            </p>
          </motion.div>

          {/* Col 2: Image 1 */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Image src="/Foto-perfil/brenda-amigos-del-animal-1.webp" alt="Primer rescate" width={400} height={400} className="w-full aspect-[4/5] object-cover rounded-[2rem]" />
          </motion.div>

          {/* Col 3: Text 2 */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col gap-4">
            <span className="inline-block bg-pink-50 text-pink-500 px-3 py-1 rounded-full text-xs font-bold w-fit">La Transformación</span>
            <h3 className="text-xl font-bold font-serif leading-tight">A los 16 años, ya más de 100 vidas</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Mientras otros adolescentes se preocupan por moda o diversión, Brenda dedicaba sus fines de semana de forma completamente diferente. Con 16 años en sus hombros ella ha salvado a más de 100 mascotas que hoy viven en hogares con familias responsables.
            </p>
          </motion.div>

          {/* Col 4: Image 2 */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <Image src="/Foto-perfil/brenda1.jpeg" alt="A los 16 años" width={400} height={400} className="w-full aspect-[4/5] object-cover rounded-[2rem]" />
          </motion.div>

          {/* Row 2 equivalent components */}
          {/* Col 1: Image 3 */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 lg:mt-0">
            <Image src="/Foto-perfil/adoptame.jpeg" alt="Redes sociales" width={400} height={400} className="w-full aspect-[4/5] object-cover rounded-[2rem]" />
          </motion.div>

          {/* Col 2: Text 3 */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col gap-4 mt-8 lg:mt-0">
            <span className="inline-block bg-pink-50 text-pink-500 px-3 py-1 rounded-full text-xs font-bold w-fit">La Activista Digital</span>
            <h3 className="text-xl font-bold font-serif leading-tight">Redes sociales como herramienta de lucha</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Brenda no solo rescata animales: los visibiliza, educa y previene. Las redes sociales son su forma de llevar su mensaje a miles de personas, mostrando la realidad detrás de las denuncias de maltrato y generando una red de concientización como nunca antes en Jujuy.
            </p>
          </motion.div>

          {/* Col 3: Text 4 */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col gap-4 mt-8 lg:mt-0">
            <span className="inline-block bg-pink-50 text-pink-500 px-3 py-1 rounded-full text-xs font-bold w-fit">El Legado</span>
            <h3 className="text-xl font-bold font-serif leading-tight">Continuidad del legado de Ana Lía</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Ana Lía Quispe fundó &quot;Amigos del Animal&quot; en 1987 con un gran corazón que mantiene viva la llama. Su devoción por preservar vidas se contagió a su hija, quien no dudó en tomar la posta y honrar su trabajo demostrando que la sensibilidad no tiene edad, solo propósito.
            </p>
          </motion.div>

          {/* Col 4: Image 4 */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-8 lg:mt-0">
            <Image src="/Foto-perfil/analia.jpg" alt="Ana Lía y Brenda" width={400} height={400} className="w-full aspect-[4/5] object-cover rounded-[2rem]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
