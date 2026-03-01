'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function SignificadoApadrinar() {
  return (
    <section className="ap-section ap-what-bg">
      <div className="ap-container">
        <div className="ap-what-grid">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="ap-section-tag" style={{ color: 'rgba(194,130,83,0.8)' }}>
              <span style={{ background: 'rgba(194,130,83,0.8)', display: 'inline-block', width: 24, height: 1.5 }} />
              ¿Qué es?
            </div>
            <h2 className="ap-title-display light" style={{ marginTop: 16 }}>
              ¿Qué significa <em>apadrinar</em>?
            </h2>
            <p className="ap-sub light" style={{ marginTop: 20 }}>
              Apadrinar es una forma especial de ayudar sin adoptar. Te convertís en el &quot;padrino&quot; de un animal específico, ayudando con sus gastos mientras encuentra su hogar definitivo.
            </p>
            <div className="ap-benefit-list">
              {['Recibís fotos y actualizaciones regulares', 'Podés visitarlo cuando quieras', 'Ayudás con alimentación y cuidados', 'No hay compromiso de tiempo mínimo'].map((b, i) => (
                <motion.div
                  key={i} className="ap-benefit-item"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="ap-benefit-dot" />
                  {b}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="ap-what-img-frame"
          >
            <div className="ap-what-img-inner">
              <Image
                src="/Foto-perritos/unnamed.jpg"
                alt="Amigos del Animal"
                width={500} height={420}
                className="w-full h-auto object-contain"
                style={{ display: 'block' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
