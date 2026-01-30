'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PawPrint, Heart, ShoppingBag, ShieldCheck, Mail, ArrowRight, DollarSign } from 'lucide-react';

// --- DATA ---
const sponsorshipPlans = [
  {
    name: "Básico",
    amount: "$3.000",
    description: "Alimentación mensual y lo esencial.",
    features: ["Comida diaria", "Agua fresca", "Reporte mensual por email"],
    icon: PawPrint
  },
  {
    name: "Completo",
    amount: "$5.000",
    description: "Alimentación, cuidados y extras.",
    features: ["Todo lo básico", "Higiene y aseo", "Juguetes y enriquecimiento", "Fotos semanales"],
    icon: ShoppingBag
  },
  {
    name: "Premium",
    amount: "$8.000",
    description: "Cuidado integral incluyendo veterinario.",
    features: ["Todo lo completo", "Atención veterinaria preventiva", "Medicamentos especiales", "Visitas ilimitadas al refugio"],
    icon: ShieldCheck
  },
];

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

const steps = [
  { emoji: "", title: "1. Elegí tu Padrino", desc: "Conoce a los animales que más necesitan tu ayuda y elige el que te robe el corazón." },
  { emoji: "", title: "2. Seleccioná el Plan", desc: "Elige el nivel de apoyo (Básico, Completo o Premium) que mejor se adapte a tu generosidad." },
  { emoji: "", title: "3. Confirma tu Ayuda", desc: "Formaliza tu compromiso mensual de forma segura y sencilla." },
  { emoji: "", title: "4. Recibe Novedades", desc: "Te enviaremos fotos y reportes periódicos del progreso de tu ahijado." },
];

// --- COMPONENTES REUTILIZABLES ---

// Componente para el carrusel de mascotas arrastrable
function PetCard({ card, onDragEnd }: { card: any, onDragEnd: any }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }} // Limita el arrastre para solo detectar el final
      dragElastic={0.5}
      style={{ x, rotate, opacity }}
      onDragEnd={(event, info) => onDragEnd(event, info)}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}
      className="absolute w-full h-full bg-white rounded-3xl shadow-2xl cursor-grab active:cursor-grabbing overflow-hidden border-4 border-white"
    >
      <Image
        src={card.image}
        alt={card.name}
        width={400}
        height={360}
        className="w-full h-3/4 object-cover"
      />
      <div className="p-6 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-1">{card.name}</h3>
        <div className="flex justify-center gap-3">
          <Badge variant="secondary">{card.species}</Badge>
          <Badge variant="outline" className="text-primary border-primary">{card.age}</Badge>
        </div>
        <p className="text-sm text-gray-500 mt-3">Desliza o haz clic para ver más</p>
      </div>
    </motion.div>
  );
}

// Componente principal de la página
export default function ApadrinarPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;

    if (Math.abs(offset) > 50) {
      if (offset > 0) {
        // Deslizar a la derecha - imagen anterior
        setCurrentIndex((prev) => prev === 0 ? petCards.length - 1 : prev - 1);
      } else {
        // Deslizar a la izquierda - siguiente imagen
        setCurrentIndex((prev) => (prev + 1) % petCards.length);
      }
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % petCards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev === 0 ? petCards.length - 1 : prev - 1);
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* --- HERO: ALTO IMPACTO --- */}
      <section className="relative min-h-[80vh] flex items-center bg-[#0a0a0a] text-white">
        {/* Fondo con imagen oscura y tinte */}
        <div className="absolute inset-0">
          <Image
            src="/Foto-refugio/refugio-4.jpg"
            fill
            className="object-cover opacity-40"
            alt="Fondo Refugio"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <span className="inline-block py-1 px-3 rounded-full border border-primary text-primary text-sm mb-6 uppercase tracking-[0.2em] bg-primary/10 backdrop-blur-md">
              Apadrinamiento
            </span>
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              Sé su <span className="text-primary">Héroe</span> Mensual.
            </h1>
            <p className="text-xl text-gray-300 mb-10 font-light">
              Conviértete en el padrino o madrina de un animal. Tu ayuda sostenida garantiza su comida, salud y felicidad mientras espera una familia.
            </p>
            <Link href="#planes">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full">
                Elegir mi Plan <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION: PLANES DE APADRINAMIENTO --- */}
      <section id="planes" className="py-24 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <DollarSign className="w-10 h-10 text-primary mx-auto mb-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Elige tu <span className="text-primary">Nivel de Apoyo</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">Cada contribución se traduce en días de alegría y bienestar.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {sponsorshipPlans.map((plan, index) => {
              const isFeatured = index === 1;
              const Icon = plan.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, y: isFeatured ? -15 : -10 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className={`h-full flex flex-col justify-between p-6 ${isFeatured ? 'border-4 border-primary shadow-2xl shadow-pink-200' : 'border border-gray-200'}`}>
                    <CardHeader className="text-center p-0 mb-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${isFeatured ? 'bg-primary' : 'bg-primary/10'}`}>
                        <Icon className={`w-6 h-6 ${isFeatured ? 'text-white' : 'text-primary'}`} />
                      </div>
                      <CardTitle className="text-3xl font-bold text-gray-900">{plan.name}</CardTitle>
                      <p className="text-5xl font-extrabold text-primary mt-2">{plan.amount}</p>
                      <p className="text-gray-500 mt-1">{plan.description}</p>
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col justify-between flex-grow">
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-primary mt-1">✓</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full mt-auto"
                        size="lg"
                        variant={isFeatured ? "default" : "outline"}
                      >
                        Elegir Plan {plan.name}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- SECTION: CÓMO FUNCIONA (Timeline simplificado) --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">4 Pasos para Apadrinar</h2>
            <p className="text-lg text-gray-600">Comienza a cambiar una vida hoy mismo.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                className="text-center relative group"
              >
                <div className="relative w-full mb-6">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-3xl font-bold shadow-lg transform group-hover:scale-110 transition-transform">
                    {step.emoji}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-[calc(50%+32px)] w-[calc(100%+16px)] h-0.5 bg-primary/30 -translate-y-1/2"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION: QUÉ SIGNIFICA APADRINAR E IMAGEN --- */}
      <section className="py-20 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">¿Qué significa apadrinar?</h2>
              <p className="text-lg text-gray-600 mb-6">
                Apadrinar es una forma especial de ayudar sin adoptar. Te conviertes en el "padrino" o "madrina" de un animal específico,
                ayudando con sus gastos mensuales mientras encuentra su hogar definitivo.
              </p>
              <div className="space-y-4">
                {['Recibes fotos y actualizaciones regulares', 'Puedes visitarlo cuando quieras', 'Ayudas con alimentación y cuidados', 'No hay compromiso de tiempo mínimo'].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-primary text-xl">•</span>
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <div className="rounded-xl overflow-hidden">
                  <Image
                    src="/Foto-perritos/unnamed.jpg"
                    alt="Amigos del Animal"
                    width={500}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION: ANIMALES Y FAQ --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* FAQ */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Dudas Comunes</h2>
                <p className="text-xl text-gray-600">Todo lo que necesitas saber antes de empezar.</p>
              </motion.div>

              <Accordion type="single" collapsible className="space-y-4 w-full">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AccordionItem value={`item-${index}`} className="bg-pink-50/50 rounded-xl shadow-sm px-4 border-b-0 hover:bg-pink-50 transition-colors">
                      <AccordionTrigger className="hover:no-underline font-semibold text-gray-900 py-4">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4 pr-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>

            {/* Conoce a nuestros animales (Carrusel) */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-center lg:text-left w-full"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Ahijados</h2>
                <p className="text-lg text-gray-600">Desliza para conocer a quienes necesitan tu ayuda ahora.</p>
              </motion.div>

              <div className="relative w-full max-w-sm h-[480px] z-10">
                <AnimatePresence mode="popLayout">
                  <PetCard
                    key={petCards[currentIndex].id}
                    card={petCards[currentIndex]}
                    onDragEnd={handleDragEnd}
                  />
                </AnimatePresence>
              </div>

              {/* Controles de navegación */}
              <div className="flex gap-4 mt-8">
                <Button variant="outline" size="icon" onClick={handlePrev}>
                  <ArrowRight className="w-5 h-5 transform rotate-180" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNext}>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Animal {currentIndex + 1} de {petCards.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA FINAL: BARRA DE CONTACTO --- */}
      <section className="py-32 bg-gray-900 text-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4"
        >
          <Heart className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            ¿Listo para ser un Héroe?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Si tienes preguntas o quieres formalizar tu apadrinamiento, contáctanos hoy.
          </p>
          <Link href="/contacto">
            <Button size="lg" className="bg-primary text-white rounded-full px-12 py-8 text-xl h-auto hover:scale-105 transition-all">
              Contactar al Refugio
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}