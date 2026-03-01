'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Copy, Check, Building2, Smartphone, CreditCard, Package, Utensils, Pill, Home, Sparkles } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

// Componente para copiar al portapapeles
const CopyButton = ({ text, label, trackField }: { text: string; label: string; trackField?: 'alias' | 'cbu' | 'paypal' }) => {
  const { trackAliasCopied } = useAnalytics();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    if (trackField) trackAliasCopied({ field: trackField });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between bg-secondary/30 rounded-2xl p-4 border border-border/50">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-mono font-semibold text-foreground">{text}</p>
      </div>
      <button
        onClick={handleCopy}
        className="btn-pill-primary p-3 !px-4"
        title="Copiar"
      >
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default function MetodosDonacion() {
  return (
    <section id="metodos-donacion" className="furs-section bg-card border-y border-border/30">
      <div className="furs-container">
        <div className="text-center mb-12">
          <span className="furs-badge bg-primary/10 text-primary border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Seguro y simple
          </span>
          <h2 className="furs-title-lg text-foreground mb-4">
            Elegí cómo <span className="text-primary">donar</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Transferencia Bancaria */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="furs-card bg-card border border-border/50 p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="furs-title-md text-foreground">Transferencia</h3>
                <p className="text-muted-foreground">MercadoPago / CBU / Alias</p>
              </div>
            </div>

            <div className="space-y-4">
              <CopyButton text="LUZ.GRUTA.FOCA" label="Alias" trackField="alias" />
              <CopyButton text="0000003100000000000000" label="CBU" trackField="cbu" />

              <div className="bg-secondary/20 rounded-2xl p-4 border border-border/30">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Titular:</strong> ANA LIA QUISPE
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  📧 Al donar, avisanos por <Link href="/contacto" className="text-primary hover:underline">contacto</Link> para emitir el comprobante.
                </p>
              </div>
            </div>
          </motion.div>

          {/* MercadoPago */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="furs-card bg-card border border-border/50 p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#009EE3]/10 rounded-2xl flex items-center justify-center">
                <Smartphone className="w-7 h-7 text-[#009EE3]" />
              </div>
              <div>
                <h3 className="furs-title-md text-foreground">MercadoPago</h3>
                <p className="text-muted-foreground">Rápido y seguro</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                Doná con tarjeta de crédito, débito o dinero en cuenta de MercadoPago.
              </p>

              <div className="grid grid-cols-3 gap-3">
                {["$500", "$1.000", "$2.500"].map((amount) => (
                  <a
                    key={amount}
                    href={`https://www.mercadopago.com.ar/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill bg-[#009EE3] text-white hover:bg-[#007DC3] text-center py-3 text-sm"
                  >
                    {amount}
                  </a>
                ))}
              </div>

              <a
                href="https://www.mercadopago.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-primary w-full text-center py-4 block"
              >
                Otro monto
              </a>
            </div>
          </motion.div>

          {/* PayPal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="furs-card bg-card border border-border/50 p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#003087]/10 rounded-2xl flex items-center justify-center">
                <CreditCard className="w-7 h-7 text-[#003087]" />
              </div>
              <div>
                <h3 className="furs-title-md text-foreground">PayPal</h3>
                <p className="text-muted-foreground">Donaciones internacionales</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                Ideal para donaciones en USD o desde el exterior.
              </p>

              <CopyButton text="paypal.me/Animal735" label="Link de PayPal" trackField="paypal" />

              <a
                href="https://www.paypal.com/paypalme/Animal735"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill w-full text-center py-4 block bg-[#003087] text-white hover:bg-[#001F5C]"
              >
                Ir a PayPal
              </a>
            </div>
          </motion.div>

          {/* Donación en especie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="furs-card bg-card border border-border/50 p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Package className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="furs-title-md text-foreground">En Especie</h3>
                <p className="text-muted-foreground">Ayuda material directa</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: Utensils, text: "Alimento balanceado de calidad" },
                { icon: Pill, text: "Medicamentos veterinarios" },
                { icon: Home, text: "Mantas, ropa y camas" },
                { icon: Package, text: "Insumos de limpieza" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3 text-muted-foreground">
                    <Icon className="w-5 h-5 text-primary" />
                    <span>{item.text}</span>
                  </div>
                );
              })}

              <Link
                href="/contacto"
                className="btn-pill-secondary w-full text-center py-4 block mt-4"
              >
                Coordinar entrega
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
