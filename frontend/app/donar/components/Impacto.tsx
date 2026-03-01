'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';

export default function Impacto() {
  return (
    <section className="furs-section bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="furs-container">
        <div className="text-center mb-12">
          <span className="furs-badge bg-primary/10 text-primary border border-primary/20 mb-4">
            <PawPrint className="w-4 h-4 mr-2" />
            Gracias a vos
          </span>
          <h2 className="furs-title-lg text-foreground mb-4">
            Nuestro <span className="text-primary">impacto</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { number: "+1.200", label: "Animales rescatados" },
            { number: "+500", label: "Castraciones realizadas" },
            { number: "+350", label: "Adopciones exitosas" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="furs-card bg-card border border-border/50 p-8 text-center"
            >
              <div className="text-5xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="w-12 h-1 bg-primary/30 mx-auto mb-3 rounded-full" />
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
