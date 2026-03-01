'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, FileText, Scale, BookOpen, ChevronDown, PawPrint } from 'lucide-react';

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

const AccordionItem = ({ item, isOpen, onToggle }: { item: typeof stepsData[0]; isOpen: boolean; onToggle: () => void; }) => {
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
        className={`w-full p-6 flex items-center justify-between gap-4 text-left transition-colors ${isOpen ? 'bg-primary/5' : 'hover:bg-secondary/30'}`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isOpen ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
            <Icon className="w-6 h-6" />
          </div>
          <span className={`font-semibold text-lg ${isOpen ? 'text-primary' : 'text-foreground'}`}>
            {item.title}
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
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

export default function PasosDenunciar() {
  const [openStep, setOpenStep] = useState<number | null>(1);

  return (
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
  );
}
