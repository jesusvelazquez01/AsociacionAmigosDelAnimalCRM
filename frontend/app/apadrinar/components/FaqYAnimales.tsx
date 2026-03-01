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
    <section className="ap-section" style={{ background: 'var(--cream)' }}>
      <div className="ap-container">
        <div className="ap-grid-two">

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="ap-section-tag">Preguntas frecuentes</div>
            <h2 className="ap-title-display" style={{ marginBottom: 32 }}>
              Dudas <em>comunes</em>
            </h2>

            <Accordion type="single" collapsible className="w-full">
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
                    className="ap-faq-item border-0"
                    style={{ marginBottom: 10 }}
                  >
                    <AccordionTrigger
                      className="hover:no-underline ap-faq-trigger"
                      style={{ padding: '18px 22px', fontWeight: 500, fontSize: 15, fontFamily: 'Outfit, sans-serif', color: '#2C1A0E' }}
                    >
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent
                      style={{ padding: '0 22px 18px', fontSize: 14, color: '#9A7A5A', lineHeight: 1.7 }}
                    >
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Carrusel */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginBottom: 40 }}
            >
              <div className="ap-section-tag">Conocelos</div>
              <h2 className="ap-title-display">
                Nuestros <em>ahijados</em>
              </h2>
              <p className="ap-sub" style={{ marginTop: 12 }}>
                Deslizá para conocer a quienes necesitan tu ayuda ahora mismo.
              </p>
            </motion.div>

            <div className="ap-carousel-wrap">
              <AnimatePresence mode="popLayout">
                <PetCard
                  key={petCards[currentIndex].id}
                  card={petCards[currentIndex]}
                  onDragEnd={handleDragEnd}
                />
              </AnimatePresence>
            </div>

            <div className="ap-carousel-nav">
              <button className="ap-nav-btn" onClick={handlePrev}>
                <ChevronLeft size={18} />
              </button>
              <span className="ap-counter">
                {currentIndex + 1} / {petCards.length}
              </span>
              <button className="ap-nav-btn" onClick={handleNext}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
