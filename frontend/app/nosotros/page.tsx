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

      {/* Hero Section - Inicio Original */}
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

            <h1 className="text-4xl lg:text-6xl font-black leading-tight">
              Casi 40 <br />
              <span className="text-primary">Años de Amor</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Compromiso que se multiplica. La Asociación Amigos del Animal Jujuy es una organización sin fines de lucro que rescata y protege animales víctimas del abandono y el maltrato desde 1987. Hoy, esa historia continúa con una nueva generación que decidió no mirar para otro lado.
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
                className="w-full h-[400px] object-cover"
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

      {/* About Section - Sección Detallada de Brenda */}
      <section className="py-24 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-pink-100 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
                La Cara Visible Hoy
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                La <span className="text-primary">Historia de Brenda</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Cómo una adolescente heredó un legado y lo transformó en su propósito
              </p>
            </motion.div>
          </div>

          {/* Timeline de la Historia de Brenda */}
          <div className="space-y-24">
            {/* Etapa 1: Los Primeros Años */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                  Los Primeros Años
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Desde los 5 años, rescatando
                </h3>
                <p className="text-xl text-primary font-semibold mb-6">La infancia que cambió todo</p>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Brenda no tuvo una infancia típica. Mientras otros niños jugaban en parques, ella acompañaba a su madre Ana Lía en rescates de perros abandonados. Con solo 5 años, realizó su primer rescate, aprendiendo desde temprana edad que la vida animal merecía ser defendida.
                  </p>
                  <p>
                    Esa experiencia temprana le mostró la brutal realidad del abandono: perros desnutridos, con sarna, heridas graves, y un corazón roto esperando una segunda oportunidad. A una edad donde otros niños aún estaban jugando con juguetes, Brenda ya entendía la importancia de salvar vidas.
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
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/Foto-perfil/brenda-amigos-del-animal-1.webp"
                    alt="Brenda en rescates"
                    className="w-full h-[350px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg border-2 border-primary/30">
                  <p className="font-bold text-gray-900">Primer rescate</p>
                  <p className="text-sm text-primary">5 años de edad</p>
                </div>
              </motion.div>
            </div>

            {/* Etapa 2: Adolescencia Comprometida */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative order-2 md:order-1"
              >
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/Foto-perfil/brenda1.jpeg"
                    alt="Brenda activista"
                    className="w-full h-[350px] object-cover"
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
                <div className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                  La Transformación
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  A los 16 años, ya más de 100 vidas
                </h3>
                <p className="text-xl text-primary font-semibold mb-6">Cuando la adolescencia se convierte en propósito</p>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Mientras muchos adolescentes se preocupan por modas, redes sociales o entretenimiento, Brenda eligió un camino completamente diferente. Con solo 16 años, ya ha participado en el rescate de más de 100 animales, devolviéndoles la dignidad, el cuidado y la esperanza de un hogar.
                  </p>
                  <p>
                    Su juventud no es un obstáculo, sino una fortaleza. Brenda entiende que su generación tiene la responsabilidad de cambiar las cosas, de tomar conciencia, de actuar.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Etapa 3: La Voz Pública */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                  La Activista Digital
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Redes sociales como herramienta de lucha
                </h3>
                <p className="text-xl text-primary font-semibold mb-6">Educando a miles de personas</p>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Brenda no solo rescata animales; también educa. A través de sus redes sociales, logró poner a Amigos del Animal Jujuy en el centro de la escena, visibilizando la realidad brutal del abandono y el maltrato animal en nuestra provincia.
                  </p>
                  <p>
                    Sus publicaciones sobre castración responsable, adopción consciente y denuncias de maltrato han movilizado a miles de personas. Cada post, cada historia compartida, es un acto de activismo genuino.
                  </p>
                  <p>
                    Su forma de comunicar es auténtica, cruda, sin filtros. Muestra la realidad tal como es: el dolor, la esperanza, el trabajo real que implica rescatar y rehabilitar a un animal traumatizado por el abandono.
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
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}>
                  <img
                    src="/Foto-perfil/adoptame.jpeg"
                    alt="Brenda en redes sociales"
                    className="w-full h-[350px] object-cover"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border-2 border-primary/30">
                  <p className="font-bold text-gray-900">Impacto Digital</p>
                  <p className="text-sm text-primary">Miles de personas movilizadas</p>
                </div>
              </motion.div>
            </div>

            {/* Etapa 4: El Legado */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative order-2 md:order-1"
              >
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/Foto-perfil/analia.jpg"
                    alt="Ana Lía y Brenda"
                    className="w-full h-[350px] object-cover"
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
                <div className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                  El Futuro
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Continuidad del legado de Ana Lía
                </h3>
                <p className="text-xl text-primary font-semibold mb-6">La semilla que florece</p>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Ana Lía Quispe fundó Amigos del Animal hace casi 40 años con un sueño: rescatar y proteger a los animales más vulnerables. Sembró una semilla de amor que hoy florece con toda su fuerza en el corazón de su hija.
                  </p>
                  <p>
                    Brenda no es solo heredera de una asociación; es la guardia de un legado de sacrificio, dedicación y amor incondicional. Ella representa lo que su madre construyó, llevándolo a una nueva era con herramientas modernas y una voz joven que resuena más fuerte cada día.
                  </p>
                  <p className="pt-4">
                    La historia de Brenda es la historia de una generación que dice <strong>"no voy a mirar para otro lado"</strong>. Es el futuro de Amigos del Animal, y ese futuro es brillante.
                  </p>
                </div>
              </motion.div>
            </div>
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
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-20 blur-xl scale-150`} />

                      {/* Icon Container */}
                      <div className={`relative w-[100px] h-[100px] rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl border-4 border-white`}>
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
              <Button asChild variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full px-8 py-4 text-lg h-auto font-bold">
                <Link href="/adopcion">
                  Hogar temporal
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}