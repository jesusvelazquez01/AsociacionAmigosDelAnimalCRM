'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Heart, Syringe, Home, ChevronRight, MapPin, Users, Car, PawPrint } from 'lucide-react';

// --- COMPONENTE 2: TIMELINE MEJORADO ---
const timelineSteps = [
  {
    icon: Users,
    title: 'La Alerta Comunitaria',
    desc: 'Vecinos de Alto Comedero, el Centro y alrededores nos alertan. La red solidaria es el inicio de cada rescate.',
    color: 'bg-primary',
  },
  {
    icon: Car,
    title: 'Rescate del Abandono',
    desc: 'Nuestro equipo acude con seguridad y empatía. A menudo encontramos perros desnutridos, con sarna o heridas graves.',
    color: 'bg-primary',
  },
  {
    icon: Syringe,
    title: 'Atención Veterinaria',
    desc: 'Chequeo completo, vacunas, desparasitación y tratamientos especiales. Colaboramos con veterinarios locales.',
    color: 'bg-primary',
  },
  {
    icon: Home,
    title: 'Rehabilitación',
    desc: 'Albergamos a +200 perros en el refugio y 67 en su hogar personal. Aprenden a confiar nuevamente.',
    color: 'bg-primary',
  },
  {
    icon: Heart,
    title: 'Adopción Responsable',
    desc: 'Buscamos familias comprometidas. Hacemos entrevistas y seguimiento post-adopción. El amor es el objetivo.',
    color: 'bg-primary',
  },
];

export default function SobreNosotros() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-pink-50 overflow-hidden">
      {/* Barra de progreso de lectura */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-[60]" style={{ scaleX }} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-pink-50 to-white">
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

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-600 uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>San Salvador de Jujuy, Argentina</span>
              </div>
              <div className="bg-primary text-white px-4 py-2 rounded-lg inline-block font-bold text-sm">
                DESDE 1987 RESCATANDO VIDAS
              </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black  leading-tight">
              Casi 40 Años<br />
              <span className="text-primary">de Amor</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              La Asociación Amigos del Animal Jujuy rescata, protege y transforma vidas. Sin fines de lucro, solo con el corazón de personas como Ana Lía Quispe y Brenda Córdoba.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-pink-300 hover:bg-pink-400 text-white font-bold rounded-full px-8 py-6 text-lg h-auto">
                <Link href="/adopcion">Conocer Historias</Link>
              </Button>
              <Button asChild variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full px-8 py-6 text-lg h-auto font-bold">
                <Link href="/donar">
                  <Heart className="w-5 h-5 mr-2" />
                  Ayudar
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-8">
              <div className="flex -space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full" />
                <div className="w-3 h-3 bg-gray-600 rounded-full" />
                <div className="w-3 h-3 bg-gray-800 rounded-full" />
                <div className="w-3 h-3 bg-primary rounded-full" />
              </div>
              <span className="text-sm text-gray-500">+280 vidas rescatadas</span>
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
              <img
                src="/Foto-perfil/perfil-1.jpg"
                alt="Ana Lía Quispe y Brenda Córdoba - Fundadoras"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <PawPrint className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Fundadoras</p>
                  <p className="text-sm text-gray-600">Ana Lía & Brenda</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 right-16 w-80 h-80 bg-pink-100/60 rounded-full" />
          <div className="absolute bottom-20 left-16 w-96 h-96 bg-primary/8 blur-xl" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }} />
          <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-pink-200/25" style={{ borderRadius: '50% 20% 80% 40% / 10% 40% 80% 90%' }} />
          <div className="absolute bottom-1/2 right-20 w-64 h-64 bg-primary/10 rounded-full blur-sm" />
          <div className="absolute top-20 left-20 w-60 h-60 bg-pink-300/15" style={{ borderRadius: '70% 30% 40% 60% / 30% 70% 60% 40%' }} />
          <div className="absolute bottom-32 right-1/2 w-56 h-56 bg-primary/12 rounded-full blur-md" />
          <div className="absolute top-1/2 right-1/3 w-88 h-88 bg-pink-100/30" style={{ borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%' }} />

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
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-pink-100 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
                Nuestra Historia
              </span>
              <h2 className="text-4xl md:text-5xl font-bold  mb-4">
                Sobre <span className="text-primary">Nosotros</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Nuestro refugio es el resultado de una historia de amor, lucha y compromiso real con los animales.
              </p>
            </motion.div>
          </div>

          {/* Ana Lía Section */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                Fundadora
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Ana Lía Quispe
              </h3>
              <p className="text-xl text-primary font-semibold mb-6">40 años defendiendo vidas</p>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Ana Lía Quispe lleva más de 40 años rescatando perritos, incluso en los momentos más duros, cuando todo parecía estar en contra. Con una fuerza admirable y un amor incondicional, jamás abandonó su camino.
                </p>
                <p>
                  Es una defensora incansable de los derechos de los animales, y su ejemplo trascendió generaciones. Ana Lía supo transmitir su amor por los animales a sus hijos, y hoy una de ellas continúa su legado.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/Foto-perfil/analia.jpg"
                  alt="Ana Lía Quispe"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Brenda Section */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-2 md:order-1"
            >
              <div className="relative overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}>
                <img
                  src="/Foto-perfil/brenda.jpg"
                  alt="Brenda Córdoba"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                Co-Fundadora
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Brenda Córdoba
              </h3>
              <p className="text-xl text-primary font-semibold mb-6">Pasión que mueve montañas</p>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Desde los 10 años, Brenda comenzó a rescatar perros de la calle, y desde entonces nunca paró. Lo que empezó como un acto de amor se transformó en una misión de vida.
                </p>
                <p>
                  Hoy en día, Brenda es el alma de la Asociación Amigos del Animal. A través de sus redes sociales, logró poner al refugio en el mapa, visibilizando la realidad de los animales abandonados.
                </p>
              </div>
            </motion.div>
          </div>
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
            <h2 className="text-4xl md:text-5xl font-bold  mb-4">
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
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
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
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-20 blur-xl scale-150`} />

                      {/* Icon Container */}
                      <div className={`relative w-[100px] h-[100px] rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl border-4 border-white`}>
                        <IconComponent className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    {/* Contenido BOTTOM para elementos impares */}
                    {!isTop && (
                      <div className="text-center mt-6 lg:mt-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
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