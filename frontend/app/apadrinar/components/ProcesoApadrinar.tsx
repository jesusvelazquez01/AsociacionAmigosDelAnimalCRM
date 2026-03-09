'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { num: "I", title: "Elegí tu Ahijado/a", desc: "Conoce a los rescataditos que más necesitan tu ayuda y elegí el que te robe el corazón." },
  { num: "II", title: "Seleccioná el Plan", desc: "Elegí el nivel de apoyo que mejor se adapte a tu generosidad." },
  { num: "III", title: "Confirma tu Ayuda", desc: "Formalizá tu compromiso mensual de forma segura y sencilla." },
  { num: "IV", title: "Recibí Novedades", desc: "Te enviaremos fotos y reportes periódicos del progreso de tu ahijado." },
];

export default function ProcesoApadrinar() {
  return (
    <section className="furs-section bg-background">
      <div className="furs-container">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Header sticky */}
          <div className="lg:col-span-2 relative">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
              <div className="furs-badge bg-primary/10 text-primary mb-4">El proceso</div>
              <h2 className="furs-title-lg">4 pasos para <em className="italic text-primary">apadrinar</em></h2>
              <p className="text-lg text-muted-foreground mt-4">
                Comienza a cambiar una vida hoy mismo. Rápido, sencillo y con todo el amor.
              </p>
            </motion.div>
          </div>

          {/* Steps list */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="furs-card bg-secondary/5 border border-secondary/10 p-6 sm:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start hover:bg-secondary/10 transition-colors"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-black text-primary/30 shrink-0 w-12">{step.num}</div>
                <div>
                  <div className="text-xl font-bold text-foreground mb-2">{step.title}</div>
                  <div className="text-muted-foreground">{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
