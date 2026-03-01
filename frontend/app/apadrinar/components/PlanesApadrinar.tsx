'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PawPrint, ShoppingBag, ShieldCheck } from 'lucide-react';

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
    <section id="planes" className="ap-section ap-planes-bg">
      <div className="ap-container">
        <div className="ap-planes-header">
          <div className="ap-section-tag">Planes de apoyo</div>
          <h2 className="ap-title-display">
            Elegí tu nivel de <em>compromiso</em>
          </h2>
          <p className="ap-sub center" style={{ marginTop: 12 }}>
            Cada contribución se traduce en días de alegría y bienestar.
          </p>
        </div>

        <div className="ap-planes-grid">
          {sponsorshipPlans.map((plan, index) => {
            const isFeatured = index === 1;
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                className={`ap-plan-card ${isFeatured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {isFeatured && <div className="ap-plan-badge">Popular</div>}

                <div className={`ap-plan-icon ${isFeatured ? 'featured' : 'normal'}`}>
                  <Icon size={22} color={isFeatured ? 'white' : '#C28253'} />
                </div>

                <div className={`ap-plan-name ${isFeatured ? 'light' : ''}`}>{plan.name}</div>
                <div className="ap-plan-price">{plan.amount}</div>
                <div className={`ap-plan-price-sub ${isFeatured ? 'light' : ''}`}>{plan.description}</div>

                <div className={`ap-plan-divider ${isFeatured ? 'light' : ''}`} />

                <ul className="ap-plan-features">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={`ap-plan-feature ${isFeatured ? 'light' : ''}`}>
                      <span className={`ap-plan-check ${isFeatured ? 'light' : ''}`}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`ap-plan-btn ${isFeatured ? 'featured-btn' : 'normal'}`}>
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
