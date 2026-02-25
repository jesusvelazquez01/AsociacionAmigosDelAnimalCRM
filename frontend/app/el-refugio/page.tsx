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

// --- DATOS DE ACTIVIDADES ---
const activitiesData = [
  {
    id: "atencion-vet",
    title: "Atención Veterinaria Integral",
    description: "Chequeos médicos completos, vacunaciones, desparasitación, cirugías y tratamientos especializados. Contamos con veterinarios voluntarios disponibles 24/7 para emergencias y cuidados intensivos.",
    color: "#EC4899",
    image: "/Foto-actividad-refugio/atencionvet.jpeg"
  },
  {
    id: "rehabilitacion",
    title: "Rehabilitación y Cuidados",
    description: "Proporcionamos un ambiente seguro, cómodo y amoroso. Cada animal recibe atención personalizada, alimentación nutritiva y las medicinas necesarias para su pronta recuperación física y emocional.",
    color: "#F97316",
    image: "/Foto-perritos/perrito2.jpg"
  },
  {
    id: "socializacion",
    title: "Socialización y Adiestramiento",
    description: "Trabajamos en la confianza y comportamiento de los animales. Les enseñamos comandos básicos y los ayudamos a superar miedos para que estén listos para convivir en armonía con su futura familia.",
    color: "#EF4444",
    image: "/Foto-perritos/perrito3.jpg"
  },
  {
    id: "adopcion",
    title: "Adopción Responsable",
    description: "No solo entregamos animales, buscamos hogares. Realizamos entrevistas exhaustivas, estudios de hogar y seguimiento post-adopción para asegurar que el vínculo sea para toda la vida.",
    color: "#3B82F6",
    image: "/Foto-actividad-refugio/adopcion.jpg"
  },
  {
    id: "bienestar",

    title: "Enriquecimiento y Bienestar",
    description: "Actividades recreativas, juegos, interacción social y paseos al aire libre. Estimulamos su mente y cuerpo para que su estancia en el refugio sea lo más feliz y activa posible.",
    color: "#10B981",
    image: "/Foto-actividad-refugio/entretenimiento.jpg"
  },
  {
    id: "educacion",
    title: "Educación Comunitaria",
    description: "Talleres y charlas sobre tenencia responsable. Creemos que la educación es la base para prevenir el maltrato animal y fomentar una sociedad más empática con los seres sintientes.",
    color: "#8B5CF6",
    image: "/Foto-actividad-refugio/educacion.jpg"
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

// --- COMPONENTE: ACTIVIDADES APP STORE ---
const AppStoreActivities = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedId) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [selectedId]);

  const selectedActivity = activitiesData.find(item => item.id === selectedId);

  return (
    <div className="relative px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {activitiesData.map((activity) => (
          <motion.div
            key={activity.id}
            layoutId={`card-${activity.id}`}
            onClick={() => setSelectedId(activity.id)}
            className="relative h-[450px] rounded-[32px] overflow-hidden cursor-pointer shadow-xl bg-white group"
            whileHover={{ y: -10 }}
          >
            <motion.img layoutId={`image-${activity.id}`} src={activity.image} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-8 w-full">

              <motion.h3 layoutId={`title-${activity.id}`} className="text-2xl font-black text-white mb-2 leading-tight">{activity.title}</motion.h3>
              <p className="text-white/70 text-sm">Toca para más información</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedActivity && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedId(null)} />
            <motion.div layoutId={`card-${selectedActivity.id}`} className="relative w-full max-w-2xl bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh]">
              <div className="relative w-full md:w-1/2 h-48 md:h-auto">
                <motion.img layoutId={`image-${selectedActivity.id}`} src={selectedActivity.image} className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
                <motion.h3 layoutId={`title-${selectedActivity.id}`} className="text-2xl font-black text-gray-900 mb-4 leading-tight">{selectedActivity.title}</motion.h3>
                <p className="text-gray-600 text-base leading-relaxed mb-6">{selectedActivity.description}</p>
                <Button onClick={() => setSelectedId(null)} className="w-full h-12 rounded-2xl text-white font-bold" style={{ backgroundColor: selectedActivity.color }}>Cerrar</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
// --- COMPONENTE 2: TIMELINE ANIMADO ---

const TimelineItem = ({ icon: Icon, title, desc, index }: any) => {

  return (

    <motion.div

      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}

      whileInView={{ opacity: 1, x: 0 }}

      viewport={{ once: true, margin: "-100px" }}

      transition={{ duration: 0.6, delay: index * 0.2 }}

      className={`flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse text-right'}`}

    >

      <div className={`w-1/2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

        <p className="text-gray-600">{desc}</p>

      </div>



      <div className="relative z-10 flex-shrink-0">

        <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-pink-200 border-4 border-white">

          <Icon className="w-6 h-6 text-white" />

        </div>

      </div>



      <div className="w-1/2" />

    </motion.div>

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
                className="w-full h-[280px] sm:h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
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
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6">Un Lugar de Esperanza</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-6">
              <h3 className="text-3xl sm:text-5xl font-bold text-gray-900">Nuestra Misión</h3>
              <p className="text-lg text-gray-600 leading-relaxed">Dedicados al rescate, cuidado y rehabilitación de animales abandonados en San Salvador de Jujuy. Cada animal recibe atención veterinaria completa y amor incondicional.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="relative h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image src="/Foto-actividad-refugio/brenda-amigos-del-animal.webp" alt="Refugio" fill className="object-cover" />
            </motion.div>
          </div>

          {/* Slider Benito */}
          <div className="bg-primary/10 rounded-[40px] p-4 sm:p-8 md:p-12">
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

      {/* --- SECTION: THE JOURNEY (ENHANCED CARDS STYLE) --- */}

      <section className="py-32 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
        {/* Enhanced Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient orbs */}
          <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-gradient-to-tr from-accent/15 via-primary/15 to-secondary/15 rounded-full blur-3xl" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-2xl" />

          {/* Organic shapes */}
          <div className="absolute top-32 left-16 w-80 h-80 bg-primary/8" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} />
          <div className="absolute bottom-32 right-1/3 w-96 h-96 bg-secondary/15 blur-lg" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }} />

          {/* Scattered Paw Prints with varied opacity */}
          <PawPrint className="absolute top-32 right-1/4 w-40 h-40 text-primary/8 transform -rotate-12" />
          <PawPrint className="absolute bottom-1/3 left-1/4 w-36 h-36 text-primary/12 transform rotate-30" />
          <PawPrint className="absolute top-2/3 right-20 w-32 h-32 text-primary/10 transform -rotate-60" />
          <PawPrint className="absolute bottom-40 right-1/2 w-36 h-36 text-primary/15 transform rotate-15" />
          <PawPrint className="absolute top-1/4 left-16 w-28 h-28 text-primary/7 transform rotate-75" />
          <PawPrint className="absolute bottom-1/4 left-1/2 w-32 h-32 text-primary/11 transform -rotate-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 text-primary px-6 py-3 rounded-full text-sm font-bold border border-primary/20 shadow-lg">
                <Sparkles className="w-4 h-4" />
                Nuestro Proceso de Transformación
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                El Camino del <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Rescate</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Cada rescate es una historia de esperanza. Desde el momento del rescate hasta encontrar un hogar amoroso, acompañamos a cada animalito en su transformación.
              </p>
            </motion.div>
          </div>

          {/* Enhanced Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                index: 0,
                step: "01",
                icon: Sparkles,
                title: "El Rescate",
                desc: "Recibimos el alerta y nuestro equipo acude inmediatamente. Evaluamos la situación y aseguramos al animal con calma, paciencia y seguridad.",
                color: "from-primary to-primary/80",
                bgColor: "bg-primary/5",
                iconBg: "bg-gradient-to-br from-primary to-primary/90",
                shadowColor: "shadow-primary/20"
              },
              {
                index: 1,
                step: "02",
                icon: Syringe,
                title: "Atención Veterinaria",
                desc: "Chequeo médico completo, vacunas, desparasitación y tratamiento especializado de cualquier herida o enfermedad preexistente.",
                color: "from-secondary to-secondary/80",
                bgColor: "bg-secondary/5",
                iconBg: "bg-gradient-to-br from-secondary to-secondary/90",
                shadowColor: "shadow-secondary/20"
              },
              {
                index: 2,
                step: "03",
                icon: Home,
                title: "Rehabilitación",
                desc: "El paso más importante. Aprenden a confiar de nuevo, socializan con otros animales y reciben todo el amor y mimos que merecen.",
                color: "from-accent to-accent/80",
                bgColor: "bg-accent/5",
                iconBg: "bg-gradient-to-br from-accent to-accent/90",
                shadowColor: "shadow-accent/20"
              },
              {
                index: 3,
                step: "04",
                icon: Heart,
                title: "Adopción Responsable",
                desc: "Encontramos a la familia perfecta. Realizamos entrevistas exhaustivas y seguimiento post-adopción para asegurar un final feliz.",
                color: "from-primary/90 to-secondary",
                bgColor: "bg-primary/5",
                iconBg: "bg-gradient-to-br from-primary/90 to-secondary",
                shadowColor: "shadow-primary/20"
              }
            ].map((step) => {
              const IconComponent = step.icon;

              return (
                <motion.div
                  key={step.index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: step.index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative"
                >
                  {/* Card Container */}
                  <div className={`relative h-full bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-primary/30 overflow-hidden ${step.bgColor}/30`}>
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    {/* Step number badge */}
                    <div className="absolute top-6 right-6">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg ${step.shadowColor} transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                        <span className="text-white font-black text-sm">{step.step}</span>
                      </div>
                    </div>

                    {/* Icon Container */}
                    <div className="relative mb-6">
                      {/* Animated glow effect */}
                      <div className={`absolute inset-0 rounded-2xl ${step.iconBg} opacity-20 blur-xl scale-150 group-hover:scale-175 transition-transform duration-500`} />

                      <div className={`relative w-20 h-20 rounded-2xl ${step.iconBg} flex items-center justify-center shadow-xl ${step.shadowColor} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative space-y-4">
                      <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base">
                        {step.desc}
                      </p>
                    </div>

                    {/* Animated progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-100 overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: step.index * 0.2 }}
                        viewport={{ once: true }}
                        className={`h-full bg-gradient-to-r ${step.color}`}
                      />
                    </div>
                  </div>

                  {/* Connecting arrow (hidden on mobile) */}
                  {step.index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: step.index * 0.2 + 0.3 }}
                        viewport={{ once: true }}
                        className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}
                      >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Enhanced Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >

          </motion.div>
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