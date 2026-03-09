'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PetCard from './PetCard';

const petCards = [
  { id: 1, image: '/Foto-perritos/perrito1.jpg', name: 'Luna', species: 'Perro', age: '2 años' },
  { id: 2, image: '/Foto-perritos/perrito2.jpg', name: 'Max', species: 'Perro', age: '5 meses' },
  { id: 3, image: '/Foto-perritos/perrito3.jpg', name: 'Bella', species: 'Gato', age: '1 año' },
  { id: 4, image: '/Foto-perritos/perrito4.jpg', name: 'Rocky', species: 'Perro', age: '7 años' },
  { id: 5, image: '/Foto-perritos/perrito5.jpg', name: 'Mia', species: 'Gato', age: '3 años' },
  { id: 6, image: '/Foto-perritos/perrito6.jpg', name: 'Bruno', species: 'Perro', age: '1 año' },
];

const faqs = [
  { q: "¿Qué significa apadrinar?", a: "Apadrinar significa comprometerte a ayudar económicamente con los gastos mensuales de un animal específico mientras permanece en nuestro refugio, proporcionándole sustento y cuidados." },
  { q: "¿Puedo conocer a mi ahijado?", a: "¡Por supuesto! Dependiendo de tu plan de apadrinamiento, puedes visitarlo cuando quieras (Plan Premium) o recibirás fotos y actualizaciones regulares de su progreso." },
  { q: "¿Por cuánto tiempo debo apadrinar?", a: "No hay un tiempo mínimo. Puedes apadrinar por el tiempo que desees y cancelar cuando lo necesites. Cada mes cuenta enormemente para su bienestar." },
  { q: "¿Qué pasa si mi ahijado es adoptado?", a: "Te notificaremos inmediatamente y podrás elegir apadrinar a otro animal necesitado o finalizar tu apadrinamiento. ¡Celebramos cada adopción!" },
  { q: "¿A dónde va mi dinero?", a: "Tu contribución se destina directamente a cubrir los gastos de alimentación, atención veterinaria, medicamentos y mantenimiento del espacio que ocupa tu animal apadrinado." },
];

export default function FaqYAnimales() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    if (Math.abs(offset) > 50) {
      if (offset > 0) setCurrentIndex((prev) => prev === 0 ? petCards.length - 1 : prev - 1);
      else setCurrentIndex((prev) => (prev + 1) % petCards.length);
    }
  };
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % petCards.length);
  const handlePrev = () => setCurrentIndex((prev) => prev === 0 ? petCards.length - 1 : prev - 1);

  return (
    <section className="furs-section bg-secondary/10">
      <div className="furs-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="furs-badge bg-primary/10 text-primary mb-4">Preguntas frecuentes</div>
            <h2 className="furs-title-lg mb-8">
              Dudas <em className="italic text-primary">comunes</em>
            </h2>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.07 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="furs-card rounded-[1.5rem] bg-background px-6 border border-border shadow-sm border-0"
                  >
                    <AccordionTrigger
                      className="hover:no-underline py-5 text-[15px] font-semibold text-foreground text-left"
                    >
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent
                      className="pb-5 text-[14px] text-muted-foreground leading-relaxed"
                    >
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Carrusel */}
          <div className="flex flex-col items-center lg:items-start w-full max-w-[400px] mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 text-center lg:text-left w-full"
            >
              <div className="furs-badge bg-primary/10 text-primary mb-4">Conocelos</div>
              <h2 className="furs-title-lg">
                Nuestros <em className="italic text-primary">ahijados</em>
              </h2>
              <p className="text-lg text-muted-foreground mt-4">
                Deslizá para conocer a quienes necesitan tu ayuda ahora mismo.
              </p>
            </motion.div>

            <div className="relative w-full aspect-[4/5] mx-auto">
              <AnimatePresence mode="popLayout">
                <PetCard
                  key={petCards[currentIndex].id}
                  card={petCards[currentIndex]}
                  onDragEnd={handleDragEnd}
                />
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-6 mt-10 w-full">
              <button 
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-secondary-foreground transition-all cursor-pointer bg-background z-10 text-foreground" 
                onClick={handlePrev}
                aria-label="Anterior animal"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="font-bold text-muted-foreground w-12 text-center tracking-wide">
                {currentIndex + 1} / {petCards.length}
              </span>
              <button 
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-secondary-foreground transition-all cursor-pointer bg-background z-10 text-foreground" 
                onClick={handleNext}
                aria-label="Siguiente animal"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
