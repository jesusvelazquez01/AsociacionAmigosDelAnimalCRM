'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Syringe, Stethoscope, Home } from 'lucide-react';

export default function Transparencia() {
  return (
    <section className="furs-section bg-card border-y border-border/30">
      <div className="furs-container">
        <div className="text-center mb-12">
          <span className="furs-badge bg-primary/10 text-primary border border-primary/20 mb-4">
            100% transparente
          </span>
          <h2 className="furs-title-lg text-foreground mb-4">
            ¿En qué invertimos tu <span className="text-primary">ayuda</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada peso que donás se destina directamente al bienestar de nuestros rescataditos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Utensils, title: "Alimentación", desc: "Comida de calidad para +100 animales", color: "text-orange-500", bg: "bg-orange-100" },
            { icon: Syringe, title: "Vacunas", desc: "Plan de vacunación completo", color: "text-blue-500", bg: "bg-blue-100" },
            { icon: Stethoscope, title: "Veterinaria", desc: "Cirugías y tratamientos", color: "text-green-500", bg: "bg-green-100" },
            { icon: Home, title: "Refugio", desc: "Mantenimiento e infraestructura", color: "text-purple-500", bg: "bg-purple-100" },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="furs-card-sm bg-background border border-border/50 p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
