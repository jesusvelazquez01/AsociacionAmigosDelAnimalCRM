'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Home,
  Wallet,
  ShieldCheck,
  HeartHandshake,
  ArrowLeft,
  MessageCircle,
  PawPrint,
  FileCheck,
  Clock,
  Heart,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function RequisitosPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const requisitos = [
    {
      icon: Home,
      title: "Vivienda Propia",
      description: "Es requisito excluyente ser dueño de la vivienda (no inquilino) para asegurar la estabilidad del hogar y evitar devoluciones por mudanzas.",
      important: true
    },
    {
      icon: Wallet,
      title: "Solvencia Económica",
      description: "Poder cubrir alimento de calidad, vacunas anuales, desparasitaciones y atención veterinaria ante cualquier urgencia o enfermedad."
    },
    {
      icon: ShieldCheck,
      title: "Patio Seguro",
      description: "Poseer medianera alta, fondo y frente totalmente cerrados. Es fundamental para evitar que el animal se escape, se pierda o sufra accidentes."
    },
    {
      icon: HeartHandshake,
      title: "Compromiso Real",
      description: "Firmar contrato de adopción y permitir seguimiento. Entender que el animal NO es un objeto y requiere paciencia para su adaptación."
    },

    {
      icon: Clock,
      title: "Tiempo y Dedicación",
      description: "Disponer del tiempo necesario para atender las necesidades del animal: paseos, juegos, cariño y controles veterinarios."
    }
  ];

  const pasos = [
    { numero: "1", titulo: "Elegí tu compañero", descripcion: "Mirá nuestros animalitos disponibles y elegí el que más te llegue al corazón." },
    { numero: "2", titulo: "Contactanos", descripcion: "Escribinos por WhatsApp o email contándonos sobre vos y tu hogar." },
    { numero: "3", titulo: "Entrevista", descripcion: "Coordinaremos una charla para conocernos y responder tus dudas." },
    { numero: "4", titulo: "Visita al hogar", descripcion: "Visitamos tu casa para verificar que sea un lugar seguro." },
    { numero: "5", titulo: "¡Adopción!", descripcion: "Firmás el contrato y te llevás a tu nuevo compañero de vida." }
  ];

  return (
    <div className="bg-background overflow-hidden">
      {/* Barra de progreso */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[60]" style={{ scaleX }} />

      {/* ═══════════════════════════════════════════════════════════════════════════
          REQUISITOS GRID
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section className="furs-section bg-card border-y border-border/30">

        <div className="furs-container">
          <div className="text-center mb-12">
            <span className="furs-badge bg-primary/10 text-primary border border-primary/20 mb-4">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Lo que necesitás
            </span>
            <h2 className="furs-title-lg text-foreground mb-4">
              Requisitos para <span className="text-primary">adoptar</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estos son los requisitos que deberás cumplir para poder adoptar uno de nuestros rescataditos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requisitos.map((req, index) => {
              const Icon = req.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`furs-card bg-background border p-6 ${req.important
                    ? 'border-primary/30 ring-2 ring-primary/10'
                    : 'border-border/50'
                    }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${req.important
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary/10 text-primary'
                    }`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2 flex items-center gap-2">
                    {req.title}
                    {req.important && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                        Excluyente
                      </span>
                    )}
                  </h3>
                  <p className="text-muted-foreground">
                    {req.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
          PASOS DEL PROCESO
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section className="furs-section bg-background">
        <div className="furs-container">
          <div className="text-center mb-12">
            <span className="furs-badge bg-secondary text-foreground mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Proceso simple
            </span>
            <h2 className="furs-title-lg text-foreground mb-4">
              ¿Cómo es el <span className="text-primary">proceso</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              El proceso de adopción es sencillo y está pensado para encontrar el mejor match entre vos y tu futuro compañero.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Línea conectora */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

              <div className="space-y-6">
                {pasos.map((paso, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6 items-start"
                  >
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center font-bold text-2xl flex-shrink-0 relative z-10">
                      {paso.numero}
                    </div>
                    <div className="furs-card bg-card border border-border/50 p-6 flex-1">
                      <h3 className="font-bold text-lg text-foreground mb-2">
                        {paso.titulo}
                      </h3>
                      <p className="text-muted-foreground">
                        {paso.descripcion}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
          NOTA IMPORTANTE
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section className="furs-section bg-amber-50 border-y border-amber-100">
        <div className="furs-container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex gap-6 items-start"
            >
              <div className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-amber-900 mb-3">
                  Importante saber
                </h3>
                <ul className="space-y-2 text-amber-800">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    La adopción es <strong>gratuita</strong>, no cobramos por nuestros animalitos.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    Todos nuestros rescataditos están <strong>vacunados, desparasitados y castrados</strong>.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    Realizamos <strong>seguimiento post-adopción</strong> para asegurarnos del bienestar del animal.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    Si por algún motivo no podés quedarte con el animal, <strong>debés devolverlo a nosotros</strong>, no a terceros.
                  </li>
                </ul>
              </div>
            </motion.div>
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
              ¿Cumplís con los requisitos?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Si cumplís con los requisitos, no dudes en contactarnos para coordinar una visita y encontrar a tu compañero ideal.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/adopcion" className="btn-pill-secondary text-lg px-8 py-4">
                Ver animalitos disponibles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}