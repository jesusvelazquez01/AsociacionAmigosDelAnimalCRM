'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PawPrint, ShoppingBag, ShieldCheck, Check } from 'lucide-react';

const sponsorshipPlans = [
  {
    name: "Básico", amount: "$3.000", description: "Alimentación mensual y lo esencial.",
    features: ["Comida diaria", "Agua fresca", "Reporte mensual por Whatsapp"], icon: PawPrint
  },
  {
    name: "Completo", amount: "$5.000", description: "Alimentación, cuidados y extras.",
    features: ["Todo lo básico", "Higiene y aseo", "Juguetes y enriquecimiento", "Fotos semanales"], icon: ShoppingBag
  },
  {
    name: "Premium", amount: "$8.000", description: "Cuidado integral incluyendo veterinario.",
    features: ["Todo lo completo", "Atención veterinaria preventiva", "Medicamentos especiales", "Visitas ilimitadas al refugio"], icon: ShieldCheck
  },
];

export default function PlanesApadrinar() {
  return (
    <section id="planes" className="furs-section bg-muted/30">
      <div className="furs-container">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="furs-badge bg-primary/10 text-primary mb-4">Planes de apoyo</div>
          <h2 className="furs-title-lg mb-4">
            Elegí tu nivel de <em className="italic text-primary">compromiso</em>
          </h2>
          <p className="text-lg text-muted-foreground">
            Cada contribución se traduce en días de alegría y bienestar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          {sponsorshipPlans.map((plan, index) => {
            const isFeatured = index === 1;
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                className={`furs-card flex flex-col p-8 relative border ${isFeatured ? 'bg-primary text-primary-foreground border-primary shadow-xl md:scale-105 z-10' : 'bg-background border-border hover:border-primary/50'}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isFeatured ? 'bg-primary-foreground/20' : 'bg-primary/10 text-primary'}`}>
                  <Icon size={24} />
                </div>

                <div className="font-bold text-xl mb-2">{plan.name}</div>
                <div className="font-bold text-4xl md:text-5xl mb-3">{plan.amount}</div>
                <div className={`text-sm mb-6 ${isFeatured ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>{plan.description}</div>

                <div className={`h-px w-full mb-6 ${isFeatured ? 'bg-primary-foreground/20' : 'bg-border'}`} />

                <ul className="flex flex-col gap-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={`flex items-start gap-3 text-sm ${isFeatured ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                      <Check size={18} className={`shrink-0 mt-0.5 ${isFeatured ? 'text-secondary' : 'text-primary'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3.5 rounded-full font-bold transition-all duration-300 ${isFeatured ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' : 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground'}`}>
                  Elegir Plan {plan.name}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
