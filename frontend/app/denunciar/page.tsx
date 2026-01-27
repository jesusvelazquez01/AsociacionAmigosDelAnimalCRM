'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, Phone, MessageCircle, Mail, Shield,
  ChevronDown, MapPin, FileText, Camera, Users,
  Scale, BookOpen, PawPrint, Heart, ExternalLink
} from 'lucide-react';

// Datos del acordeón de pasos
const stepsData = [
  {
    id: 1,
    title: "¿Dónde denunciar?",
    icon: MapPin,
    content: (
      <div className="space-y-4">
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <h4 className="font-bold text-foreground mb-2">En Jujuy</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>• <strong>Comisaría más cercana</strong> al lugar del hecho</li>
            <a href="https://policia.jujuy.gob.ar/unidades-regionales-de-la-policia-de-jujuy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Comisarías de Jujuy</a>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground">
          También podés comunicarte con nosotros y te ayudamos a realizar la denuncia.
        </p>
      </div>
    )
  },
  {
    id: 2,
    title: "Prepará los datos clave",
    icon: FileText,
    content: (
      <div className="space-y-3">
        <p className="text-muted-foreground mb-4">
          Antes de denunciar, reuní la siguiente información:
        </p>
        <div className="grid gap-2">
          {[
            "Fecha y hora del incidente",
            "Dirección exacta o referencias del lugar",
            "Datos del agresor (nombre, descripción, patente)",
            "Fotos y/o videos como evidencia",
            "Datos de testigos (si los hay)"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-3 bg-secondary/30 rounded-xl">
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Hacé la denuncia por escrito",
    icon: Scale,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Para que tu denuncia tenga validez legal:
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">✓</span>
            <span>Exigí que te entreguen una <strong>copia firmada y sellada</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">✓</span>
            <span>Anotá el <strong>número de expediente</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">✓</span>
            <span>Guardá todos los comprobantes</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 5,
    title: "Consejos extra",
    icon: BookOpen,
    content: (
      <div className="space-y-4">
        <div className="grid gap-3">
          {[
            { icon: "", text: "Llevá una copia de la Ley 14.346" },
            { icon: "", text: "Presentá tu DNI al momento de denunciar" },
            { icon: "", text: "Mantené tu teléfono cargado para documentar" },
            { icon: "", text: "Podés ir acompañado para mayor seguridad" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-xl">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-muted-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
];

// Componente Acordeón
const AccordionItem = ({ item, isOpen, onToggle }: {
  item: typeof stepsData[0];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const Icon = item.icon;

  return (
    <motion.div
      className="furs-card-sm bg-card border border-border/50 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <button
        onClick={onToggle}
        className={`w-full p-6 flex items-center justify-between gap-4 text-left transition-colors ${isOpen ? 'bg-primary/5' : 'hover:bg-secondary/30'
          }`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isOpen ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
            }`}>
            <Icon className="w-6 h-6" />
          </div>
          <span className={`font-semibold text-lg ${isOpen ? 'text-primary' : 'text-foreground'}`}>
            {item.title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 pt-2">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function DenunciarPage() {
  const [openStep, setOpenStep] = useState<number | null>(1);

  return (
    <div className="bg-background overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════════════════
          HERO SECTION - Estilo Furs + El Campito
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-red-50 via-background to-orange-50/30 overflow-hidden">
        {/* Decoración orgánica */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-red-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl" />

        <div className="furs-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido izquierda */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="furs-badge bg-red-100 text-red-600 border border-red-200 mb-6">
                <AlertTriangle className="w-4 h-4 mr-2" />
                El maltrato animal es un delito
              </span>

              <h1 className="furs-title-xl text-foreground mb-6">
                Sé la voz de<br />
                <span className="text-primary">los que no tienen</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                El maltrato animal está penado por la <strong>Ley 14.346</strong>.
                Involucrate y luchá por quienes no pueden defenderse.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#como-denunciar" className="btn-pill-primary text-lg px-8 py-4">
                  Conocé cómo denunciar
                </a>
              </div>
            </motion.div>

            {/* Imagen derecha */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="furs-card bg-card border border-border/50 p-4 shadow-xl">
                <img
                  src="/Foto-denuncia/denuncia-2.png"
                  alt="Protegé a los animales"
                  className="furs-image w-full h-80 object-cover"
                />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="furs-card-sm bg-white/95 backdrop-blur-sm p-4 shadow-lg">
                    <p className="text-sm text-muted-foreground text-center">
                      <strong className="text-foreground">Tu denuncia salva vidas.</strong> No seas cómplice del silencio.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════════════
          PASOS PARA DENUNCIAR - Acordeón estilo El Campito
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section id="como-denunciar" className="furs-section bg-card border-y border-border/30">
        <div className="furs-container">
          <div className="text-center mb-12">
            <span className="furs-badge bg-primary/10 text-primary border border-primary/20 mb-4">
              <PawPrint className="w-4 h-4 mr-2" />
              Guía paso a paso
            </span>
            <h2 className="furs-title-lg text-foreground mb-4">
              Pasos para <span className="text-primary">denunciar</span> maltrato animal
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seguí estos pasos para hacer una denuncia efectiva y ayudar a los animales.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {stepsData.map((step) => (
              <AccordionItem
                key={step.id}
                item={step}
                isOpen={openStep === step.id}
                onToggle={() => setOpenStep(openStep === step.id ? null : step.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
          LEY 14.346 - Información Legal
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section className="furs-section bg-gradient-to-br from-orange-50/50 via-background to-primary/5">
        <div className="furs-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="furs-badge bg-orange-100 text-orange-700 border border-orange-200 mb-4">
                <Scale className="w-4 h-4 mr-2" />
                Marco Legal
              </span>
              <h2 className="furs-title-lg text-foreground mb-6">
                Ley Nacional <span className="text-primary">14.346</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Argentina cuenta con una ley de protección animal que establece penas
                de <strong>15 días a 1 año de prisión</strong> para quienes maltraten o causen sufrimiento a los animales.
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="font-bold text-foreground">Actos penados por la ley:</h4>
                {[
                  "No alimentar adecuadamente a los animales",
                  "Hacerlos trabajar en exceso o maltratarlos",
                  "Abandonarlos en la vía pública",
                  "Lastimarlos o torturarlos intencionalmente",
                  "Organizar o participar en peleas de animales"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/150000-154999/153011/norma.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-secondary inline-flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Leer Ley completa
                <ExternalLink className="w-4 h-4" />
              </a>

              <p className="text-muted-foreground mt-6">
                También podés realizar tu denuncia de forma anónima vía web a través de{' '}
                <a
                  href="https://argentina.tupista.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  tupista.org
                </a>
                {' '}(Botón <span className="font-semibold">Denunciar</span> seleccionar <span className="font-semibold">Medio Ambiente</span>)
              </p>

            </motion.div>

            {/* Imagen ilustrativa */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="furs-card bg-card border border-border/50 p-6">
                <img
                  src="/Foto-perritos/perrito7.jpg"
                  alt="Protección animal"
                  className="furs-image w-full h-72 object-cover"
                />
                <div className="text-center mt-4">
                  <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">
                    Todos los animales merecen vivir sin sufrimiento
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
          CANALES DE CONTACTO
          ═══════════════════════════════════════════════════════════════════════════ */}


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
            <AlertTriangle className="w-14 h-14 text-primary mx-auto mb-6" />
            <h2 className="furs-title-lg text-foreground mb-4">
              Tu denuncia es su esperanza
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              No esperes. Cada minuto cuenta cuando se trata de salvar una vida.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contacto" className="btn-pill-secondary text-lg px-8 py-4">
                Más información
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}