'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Heart, Utensils, Syringe, Stethoscope, Package,
  Copy, Check, CreditCard, Building2, Smartphone,
  PawPrint, Home, Pill, Sparkles
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

// Componente para copiar al portapapeles
const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
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

export default function DonarPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-background overflow-hidden">
      {/* Barra de progreso */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[60]" style={{ scaleX }} />

      {/* ═══════════════════════════════════════════════════════════════════════════
          HERO SECTION - Estilo Furs + El Campito
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 overflow-hidden">
        {/* Decoración orgánica */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />

        <div className="furs-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido izquierda */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="furs-badge bg-primary/10 text-primary border border-primary/20 mb-6">
                <Heart className="w-4 h-4 mr-2" />
                Tu ayuda transforma vidas
              </span>

              <h1 className="furs-title-xl text-foreground mb-6">
                Con tu donación,<br />
                <span className="text-primary">salvamos vidas</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Cada aporte se traduce directamente en rescates, tratamientos veterinarios y finales felices para nuestros rescataditos.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#metodos-donacion" className="btn-pill-primary text-lg px-8 py-4">
                  Donar ahora
                </a>
                <Link href="/apadrinar" className="btn-pill-secondary text-lg px-8 py-4">
                  Apadrinar
                </Link>
              </div>
            </motion.div>

            {/* Carousel de rescataditos - Arrastrable */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                  dragFree: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2">
                  {[
                    { src: "/Foto-antes-despues/lobita-antes.webp", label: "Antes", badge: "Rescatada" },
                    { src: "/Foto-antes-despues/lobita-despues.webp", label: "Después", badge: "¡Feliz!" },
                    { src: "/Foto-antes-despues/locrin-antes.webp", label: "Ahora", badge: "Rescatado" },
                    { src: "/Foto-antes-despues/locrin-despues.webp", label: "Ahora", badge: "¡Feliz!" },
                    { src: "/Foto-antes-despues/negrito-antes.webp", label: "Ahora", badge: "Rescatado" },
                    { src: "/Foto-antes-despues/negrito-despues.webp", label: "Ahora", badge: "¡Feliz!" },
                  ].map((item, index) => (
                    <CarouselItem key={index} className="pl-2 basis-1/2 md:basis-1/2">
                      <div className="furs-card bg-card border border-border/50 p-2 h-full">
                        <div className="relative">
                          <img
                            src={item.src}
                            alt={`Rescatadito ${index + 1}`}
                            className="furs-image w-full h-120 md:h-120 object-cover"
                          />
                          <span className={`absolute bottom-2 left-2 furs-badge text-xs ${item.label === "Antes"
                            ? "bg-white/90 text-foreground"
                            : "bg-primary text-primary-foreground"
                            }`}>
                            {item.badge}
                          </span>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-2 mt-4">
                  <CarouselPrevious className="static translate-y-0 bg-primary/10 border-primary/20 hover:bg-primary hover:text-primary-foreground" />
                  <CarouselNext className="static translate-y-0 bg-primary/10 border-primary/20 hover:bg-primary hover:text-primary-foreground" />
                </div>
              </Carousel>
              <p className="text-center text-muted-foreground mt-3 text-sm">
                Arrastrá para ver más <PawPrint className="w-4 h-4 inline" />
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
          SECCIÓN DE TRANSPARENCIA
          ═══════════════════════════════════════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════════════════════════════════════
          DONACIÓN RÁPIDA - Estilo Montecito (montos predefinidos)
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section className="furs-section bg-gradient-to-br from-primary/10 via-background to-secondary/5">
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

      {/* ═══════════════════════════════════════════════════════════════════════════
          MÉTODOS DE DONACIÓN
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section id="metodos-donacion" className="furs-section bg-background">
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
                <CopyButton text="LUZ.GRUTA.FOCA" label="Alias" />
                <CopyButton text="0000003100000000000000" label="CBU" />

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

                <CopyButton text="paypal.me/Animal735" label="Link de PayPal" />

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

      {/* ═══════════════════════════════════════════════════════════════════════════
          IMPACTO / ESTADÍSTICAS
          ═══════════════════════════════════════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════════════════════════════════════
          CTA FINAL
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section className="furs-section bg-card border-t border-border/30">
        <div className="furs-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="furs-card bg-gradient-to-br from-primary/5 to-secondary/10 border border-border/50 p-12 max-w-3xl mx-auto"
          >
            <Heart className="w-14 h-14 text-primary mx-auto mb-6" />
            <h2 className="furs-title-lg text-foreground mb-4">
              ¿Preferís involucrarte personalmente?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Si el dinero no es una opción, tu tiempo, talento y hogar temporal son invaluables para nosotros.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/voluntarios" className="btn-pill-primary text-lg px-8 py-4">
                Ser voluntario
              </Link>
              <Link href="/adopcion" className="btn-pill-secondary text-lg px-8 py-4">
                Hogar temporal
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}