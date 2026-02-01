'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  Heart, Syringe, Home, Sparkles, GripVertical,
  Users, BookOpen, Activity, Stethoscope, X, PawPrint, MapPin
} from 'lucide-react';
import AppStoreActivities from '@/components/AppStoreActivities';

// --- DATOS DEL TIMELINE ---
const timelineSteps = [
  {
    title: "Rescate",
    desc: "Recibimos animales abandonados, heridos o en situación de calle en nuestra sede de Jujuy.",
    icon: Heart,
    color: "bg-primary"
  },
  {
    title: "Atención Médica",
    desc: "Evaluación veterinaria completa, tratamientos y cirugías necesarias para su recuperación.",
    icon: Syringe,
    color: "bg-primary"
  },
  {
    title: "Rehabilitación",
    desc: "Cuidados especializados, alimentación nutritiva y terapia emocional en un ambiente seguro.",
    icon: Activity,
    color: "bg-primary"
  },
  {
    title: "Socialización",
    desc: "Trabajo de comportamiento y socialización para prepararlos para su nueva familia.",
    icon: Users,
    color: "bg-primary"
  },
  {
    title: "Adopción",
    desc: "Búsqueda de hogares responsables y seguimiento post-adopción para garantizar su bienestar.",
    icon: Home,
    color: "bg-primary"
  }
];

// --- COMPONENTE: SLIDER ANTES/DESPUÉS ---
const BeforeAfterSlider = ({ beforeImage, afterImage }: { beforeImage: string, afterImage: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden cursor-ew-resize shadow-2xl border-4 border-white select-none group"
      onMouseDown={() => isDragging.current = true}
      onMouseUp={() => isDragging.current = false}
      onMouseMove={handleMouseMove}
      onTouchStart={() => isDragging.current = true}
      onTouchEnd={() => isDragging.current = false}
      onTouchMove={handleMouseMove}
    >
      <Image src={afterImage} alt="Después" fill className="absolute inset-0 object-cover" draggable={false} />
      <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Ahora</div>
      <div className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-white" style={{ width: `${sliderPosition}%` }}>
        <Image src={beforeImage} alt="Antes" fill className="absolute inset-0 object-cover" draggable={false} />
        <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Antes</div>
      </div>
      <div className="absolute top-0 bottom-0 w-1 bg-white flex items-center justify-center" style={{ left: `${sliderPosition}%` }}>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-pink-500"><GripVertical size={20} /></div>
      </div>
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---
export default function ElRefugioPageCreative() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-background overflow-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-[110]" style={{ scaleX }} />

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-80 h-80 bg-primary/30 rounded-full opacity-80" />
        <div className="absolute top-40 right-40 w-60 h-60 bg-gray-300 rounded-full opacity-60" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-300/50 rounded-full opacity-70" />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-gray-400 rounded-full opacity-50" />

        {/* Additional Organic Shapes */}
        <div className="absolute top-32 left-16 w-80 h-80 bg-primary/15" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} />
        <div className="absolute bottom-32 right-1/3 w-96 h-96 bg-pink-200/20 blur-lg" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }} />
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-pink-300/25 rounded-full blur-sm" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary/10" style={{ borderRadius: '80% 20% 60% 40% / 50% 70% 30% 50%' }} />

        {/* Animal Paw Prints with Lucide Icons */}
        <PawPrint className="absolute top-24 left-1/3 w-32 h-32 text-primary/20 transform rotate-12" />
        <PawPrint className="absolute bottom-40 right-1/4 w-28 h-28 text-pink-300/30 transform -rotate-45" />
        <PawPrint className="absolute top-1/2 left-20 w-24 h-24 text-primary/15 transform rotate-45" />
        <PawPrint className="absolute bottom-20 left-1/2 w-28 h-28 text-pink-200/25 transform -rotate-12" />
        <PawPrint className="absolute top-16 right-1/3 w-20 h-20 text-primary/18 transform rotate-75" />

        {/* Dotted Pattern */}
        <div className="absolute top-1/3 right-1/3 grid grid-cols-4 gap-2 opacity-40">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-gray-600 rounded-full" />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="inline-block bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm">
                HOGAR TEMPORAL DE AMOR
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black leading-tight text-gray-900">
              EL REFUGIO<br />
              <span className="text-primary">DEL AMOR</span>
            </h1>

            <p className="text-base text-gray-600 leading-relaxed max-w-lg">
              Un hogar temporal donde cada alma herida encuentra sanación, amor y una segunda oportunidad. Rescatamos, curamos y preparamos a nuestros rescataditos para una vida llena de felicidad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-8 py-4 text-base h-auto">
                <Link href="/adopcion">Conocé a nuestros rescatados</Link>
              </Button>
              <Button asChild variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full px-8 py-4 text-base h-auto font-bold">
                <Link href="/donar">
                  <Heart className="w-5 h-5 mr-2" />
                  Ayudar
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full" />
                <div className="w-3 h-3 bg-gray-600 rounded-full" />
                <div className="w-3 h-3 bg-gray-800 rounded-full" />
                <div className="w-3 h-3 bg-primary rounded-full" />
              </div>
              <span className="text-sm text-gray-600">+200 animales bajo cuidado</span>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-3">
              <Image
                src="/Foto-refugio/refugio-1.png"
                alt="El Refugio del Amor"
                width={800}
                height={600}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Compromiso</p>
                  <p className="text-sm text-gray-600">Rescate & Amor</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NUESTRA MISIÓN & HISTORIA BENITO */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 right-16 w-80 h-80 bg-pink-100/60 rounded-full" />
          <div className="absolute bottom-20 left-16 w-96 h-96 bg-primary/8 blur-xl" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }} />
          <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-pink-200/25" style={{ borderRadius: '50% 20% 80% 40% / 10% 40% 80% 90%' }} />
          <div className="absolute bottom-1/2 right-20 w-64 h-64 bg-primary/10 rounded-full blur-sm" />
          <div className="absolute top-20 left-20 w-60 h-60 bg-pink-300/15" style={{ borderRadius: '70% 30% 40% 60% / 30% 70% 60% 40%' }} />
          <div className="absolute bottom-32 right-1/2 w-56 h-56 bg-primary/12 rounded-full blur-md" />
          <div className="absolute top-1/2 right-1/3 w-88 h-88 bg-pink-100/30" style={{ borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%' }} />
          <div className="absolute top-40 right-40 w-60 h-60 bg-gray-300 rounded-full opacity-60" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-pink-300/50 rounded-full opacity-70" />

          {/* Scattered Paw Prints with Lucide Icons */}
          <PawPrint className="absolute top-32 right-1/4 w-40 h-40 text-primary/12 transform -rotate-12" />
          <PawPrint className="absolute bottom-1/3 left-1/4 w-36 h-36 text-primary/20 transform rotate-30" />
          <PawPrint className="absolute top-2/3 right-20 w-32 h-32 text-primary/15 transform -rotate-60" />
          <PawPrint className="absolute bottom-40 right-1/2 w-36 h-36 text-primary/25 transform rotate-15" />
          <PawPrint className="absolute top-1/4 left-16 w-28 h-28 text-primary/10 transform rotate-75" />
          <PawPrint className="absolute bottom-1/4 left-1/2 w-32 h-32 text-primary/18 transform -rotate-20" />
          <PawPrint className="absolute top-3/4 left-1/3 w-36 h-36 text-primary/14 transform rotate-50" />
          <PawPrint className="absolute top-10 right-1/2 w-28 h-28 text-primary/22 transform -rotate-80" />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Un Lugar de Esperanza</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-6">
              <h3 className="text-5xl font-bold text-gray-900">Nuestra Misión</h3>
              <p className="text-lg text-gray-600 leading-relaxed">Dedicados al rescate, cuidado y rehabilitación de animales abandonados en San Salvador de Jujuy. Cada animal recibe atención veterinaria completa y amor incondicional.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="relative h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image src="/Foto-actividad-refugio/brenda-amigos-del-animal.webp" alt="Refugio" fill className="object-cover" />
            </motion.div>
          </div>

          {/* Slider Benito */}
          <div className="bg-primary/10 rounded-[40px] p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <BeforeAfterSlider beforeImage="/Foto-perritos/perrito12.jpg" afterImage="/Foto-perritos/perrito13.jpg" />
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">La Transformación de Almita</h3>
                <p className="text-lg text-gray-600">Llegó temblando y herida. Con meses de tratamiento y paciencia, hoy Almita es una perrita sana y feliz. Tu ayuda hace posibles estos milagros.</p>
                <Button asChild className="bg-primary rounded-full">
                  <Link href="/donar">Quiero ayudar</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVIDADES ESTILO APP STORE */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl" />

          {/* Scattered Paw Prints */}
          <PawPrint className="absolute top-32 right-1/4 w-40 h-40 text-primary/12 transform -rotate-12" />
          <PawPrint className="absolute bottom-1/3 left-1/4 w-36 h-36 text-primary/20 transform rotate-30" />
          <PawPrint className="absolute top-2/3 right-20 w-32 h-32 text-primary/15 transform -rotate-60" />
          <PawPrint className="absolute bottom-40 right-1/2 w-36 h-36 text-primary/25 transform rotate-15" />
          <PawPrint className="absolute top-1/4 left-16 w-28 h-28 text-primary/10 transform rotate-75" />
          <PawPrint className="absolute bottom-1/4 left-1/2 w-32 h-32 text-primary/18 transform -rotate-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Lo que hacemos</span>
            <h2 className="text-5xl font-bold text-gray-900 mt-4">Nuestros Programas</h2>
          </div>
          <AppStoreActivities />
        </div>
      </section>

       {/* --- SECTION: NUESTRO PROCESO (TIMELINE WAVE/DIAGONAL) --- */}
            <section className="py-24 bg-gradient-to-b from-pink-50 via-white to-pink-50 relative overflow-hidden">
              {/* Decoración de fondo */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl" />
              </div>
      
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-20"
                >
                  <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
                    Nuestro Proceso
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Cómo Trabajamos en Jujuy
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Un ciclo de rescate, cuidado y esperanza sin fines de lucro.
                  </p>
                </motion.div>
      
                {/* Timeline Wave Container */}
                <div className="relative">
                  {/* SVG Wave Line - Desktop (color sólido sin gradiente) */}
                  <svg
                    className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-64 hidden lg:block"
                    viewBox="0 0 1200 200"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,100 C150,180 300,20 450,100 C600,180 750,20 900,100 C1050,180 1200,100 1200,100"
                      fill="none"
                      stroke="#f3b7ca"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
      
                  {/* Steps Grid - Alternating positions */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                    {timelineSteps.map((step, index) => {
                      const isTop = index % 2 === 0;
                      const IconComponent = step.icon;
      
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: isTop ? -50 : 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.15 }}
                          className={`flex flex-col items-center ${isTop ? 'lg:mb-32' : 'lg:mt-32'}`}
                        >
                          {/* Contenido TOP para elementos pares */}
                          {isTop && (
                            <div className="text-center mb-6 lg:mb-8">
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {step.title}
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed max-w-[200px] mx-auto">
                                {step.desc}
                              </p>
                            </div>
                          )}
      
                          {/* Ícono Lucide grande - Centro */}
                          <div className="relative">
                            {/* Circle background blur */}
                            <div className={`absolute inset-0 rounded-full ${step.color} opacity-20 blur-xl scale-150`} />
      
                            {/* Icon Container */}
                            <div className={`relative w-[100px] h-[100px] rounded-full ${step.color} flex items-center justify-center shadow-xl border-4 border-white`}>
                              <IconComponent className="w-12 h-12 text-white" />
                            </div>
                          </div>
      
                          {/* Contenido BOTTOM para elementos impares */}
                          {!isTop && (
                            <div className="text-center mt-6 lg:mt-8">
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {step.title}
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed max-w-[200px] mx-auto">
                                {step.desc}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
      
              </div>
            </section>


      {/* --- CTA FINAL CON CUADRO --- */}
      <section className="relative py-32 bg-background text-center px-4 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl" />

          {/* Scattered Paw Prints */}
          <PawPrint className="absolute top-32 right-1/4 w-40 h-40 text-primary/12 transform -rotate-12" />
          <PawPrint className="absolute bottom-1/3 left-1/4 w-36 h-36 text-primary/20 transform rotate-30" />
          <PawPrint className="absolute top-2/3 right-20 w-32 h-32 text-primary/15 transform -rotate-60" />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/5 to-secondary/10 border border-border/50 p-12 max-w-3xl mx-auto rounded-3xl"
          >
            <Heart className="w-14 h-14 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Cambiá una vida hoy
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Tu apoyo—ya sea una donación, voluntariado o simplemente compartiendo nuestra misión—
              cambia directamente la vida de los animales en nuestro refugio.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contacto" className="btn-pill-primary text-lg px-8 py-4">
                Contactar al Refugio
              </Link>
              <Button asChild variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full px-8 py-4 text-lg h-auto font-bold">
                <Link href="/apadrinar">
                  Apadrinar
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}