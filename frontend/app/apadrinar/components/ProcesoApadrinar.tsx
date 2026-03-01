'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { num: "I", title: "Elegí tu Padrino", desc: "Conoce a los animales que más necesitan tu ayuda y elige el que te robe el corazón." },
  { num: "II", title: "Seleccioná el Plan", desc: "Elige el nivel de apoyo que mejor se adapte a tu generosidad." },
  { num: "III", title: "Confirma tu Ayuda", desc: "Formaliza tu compromiso mensual de forma segura y sencilla." },
  { num: "IV", title: "Recibe Novedades", desc: "Te enviaremos fotos y reportes periódicos del progreso de tu ahijado." },
];

export default function ProcesoApadrinar() {
  return (
    <section className="ap-section ap-steps-bg">
      <div className="ap-container">
        <div className="ap-steps-wrap">
          {/* Header sticky */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ position: 'sticky', top: 96 }}
          >
            <div className="ap-section-tag">El proceso</div>
            <h2 className="ap-title-display">4 pasos para <em>apadrinar</em></h2>
            <p className="ap-sub" style={{ marginTop: 16 }}>
              Comienza a cambiar una vida hoy mismo. Rápido, sencillo y con todo el amor.
            </p>
          </motion.div>

          {/* Steps list */}
          <div className="ap-steps-list">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="ap-step-item"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="ap-step-num">{step.num}</div>
                <div className="ap-step-body">
                  <div className="ap-step-title">{step.title}</div>
                  <div className="ap-step-desc">{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
