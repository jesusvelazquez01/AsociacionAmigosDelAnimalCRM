'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PawPrint, Check } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function MontosMensuales() {
  const { trackDonationClicked } = useAnalytics();

  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 overflow-hidden">
      <div className="furs-container">
        <div className="text-center mb-12">
          <span className="furs-badge bg-primary/10 text-primary border border-primary/20 mb-4">
            <PawPrint className="w-4 h-4 mr-2" />
            Donación mensual
          </span>
          <h2 className="furs-title-lg text-foreground mb-4">
            Elegí tu <span className="text-primary">aporte mensual</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Con una donación mensual nos ayudás a planificar mejor el cuidado de nuestros rescataditos.
          </p>
        </div>

        {/* Grid de montos - Estilo Montecito */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {[
            { amount: "$500", highlighted: false },
            { amount: "$1.000", highlighted: true },
            { amount: "$2.500", highlighted: false },
            { amount: "$5.000", highlighted: true },
            { amount: "$10.000", highlighted: false },
            { amount: "Otro", highlighted: true, isCustom: true },
          ].map((item, index) => (
            <motion.a
              key={index}
              href="https://www.mercadopago.com.ar/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDonationClicked({ amount: item.amount, method: 'mercadopago' })}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`furs-card-sm p-6 text-center cursor-pointer transition-all ${item.highlighted
                ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                : 'bg-card text-foreground border border-border/50 hover:border-primary/50'
                }`}
            >
              {/* Icono de patita */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 ${item.highlighted ? 'bg-white/20' : 'bg-primary/10'
                }`}>
                <PawPrint className={`w-5 h-5 ${item.highlighted ? 'text-white' : 'text-primary'}`} />
              </div>

              {/* Monto */}
              <div className={`text-2xl font-bold mb-2 ${item.highlighted ? '' : 'text-primary'}`}>
                {item.amount}
              </div>

              {/* Texto mensual */}
              <p className={`text-xs ${item.highlighted ? 'text-white/80' : 'text-muted-foreground'}`}>
                {item.isCustom ? 'Elegí' : 'mensual'}
              </p>

              {/* Badge MercadoPago */}
              <div className={`flex items-center justify-center gap-1 mt-3 text-xs ${item.highlighted ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                <Check className="w-3 h-3" />
                <span>MercadoPago</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Nota de cancelación */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          💡 <strong>Sin preocupaciones:</strong> Podés cancelar cuando lo desees desde tu cuenta de MercadoPago.
        </p>
      </div>
    </section>
  );
}
