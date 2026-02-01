'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Heart, Syringe, Home, Sparkles, ChevronRight, GripVertical, MapPin, Users, Car, PawPrint } from 'lucide-react';
import Image from 'next/image';

// --- COMPONENTE 1: SLIDER ANTES / DESPUÉS (Mismo código funcional) ---
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
      className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-ew-resize shadow-2xl border-4 border-white select-none group"
      onMouseDown={() => isDragging.current = true}
      onMouseUp={() => isDragging.current = false}
      onMouseLeave={() => isDragging.current = false}
      onMouseMove={handleMouseMove}
      onTouchStart={() => isDragging.current = true}
      onTouchEnd={() => isDragging.current = false}
      onTouchMove={handleMouseMove}
    >
      <img src={afterImage} alt="Despues" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
        Hoy (En Casa)
      </div>

      <div
        className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-white"
        style={{ width: `${sliderPosition}%` }}
      >
        <img src={beforeImage} alt="Antes" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          El Rescate
        </div>
      </div>

      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transform active:scale-95 transition-transform text-pink-500">
          <GripVertical size={20} />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm">
        Desliza para ver la recuperación
      </div>
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

// --- TIMELINE STEPS (Original) ---
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
    <div className="bg-white overflow-hidden">

      {/* Barra de progreso de lectura */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-[60]" style={{ scaleX }} />

      {/* --- HERO: JUJUY CONTEXT --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0a0a0a] text-white overflow-hidden">
        {/* Usar una foto real del refugio en Jujuy o un paisaje de la zona con perros */}
        <div className="absolute inset-0 opacity-40">
          <img src="/Foto-refugio/refugio-5.png" className="w-full h-full object-cover" alt="Fondo Refugio Jujuy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

        <div className="relative z-10 text-center max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <MapPin className="text-primary w-5 h-5" />
              <span className="text-pink-300 font-bold uppercase tracking-widest text-sm">San Salvador de Jujuy, Argentina</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-none">
              CASI 40 AÑOS<br />
              <span className="text-transparent bg-clip-text bg-primary">
                DE RESCATE
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-6 font-light leading-relaxed">
              Desde 1987, la Asociación Amigos del Animal Jujuy rescata, protege y transforma vidas. Sin fines de lucro, solo con el corazón de personas como <strong>Ana Lia Quispe</strong> y <strong>Brenda Cordóba</strong>.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Hoy albergamos a <strong>+280 vidas rescatadas</strong>. Cada uno tiene una historia de sufrimiento que se convirtió en esperanza.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-primary text-white transition-all hover:scale-105">
                <Link href="/adopcion">Conocer a la manada</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg border-primary text-primary  ">
                <Link href="/voluntariado">Sumate como Voluntario</Link>
              </Button>
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
                  <Image
                    src="/Foto-perfil/brenda-amigos-del-animal-1.webp"
                    alt="Brenda en rescates"
                    width={500}
                    height={350}
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
                  <Image
                    src="/Foto-perfil/brenda1.jpeg"
                    alt="Brenda activista"
                    width={500}
                    height={350}
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
                  <Image
                    src="/Foto-perfil/adoptame.jpeg"
                    alt="Brenda en redes sociales"
                    width={500}
                    height={350}
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
                  <Image
                    src="/Foto-perfil/analia.jpg"
                    alt="Ana Lía y Brenda"
                    width={500}
                    height={350}
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