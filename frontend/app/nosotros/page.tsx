'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Heart, Syringe, Home, Sparkles, ChevronRight, GripVertical, MapPin, Users } from 'lucide-react';

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

      {/* --- SECTION: HISTORIA REAL (SLIDER) --- */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">El Alma de Amigos del Animal</h2>
          
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-pink-100 text-primary px-3 py-1 rounded-full text-sm font-bold mb-4">
                  Nuestra Historia
              </div>
              <h3 className="text-4xl font-bold mb-4 text-gray-900">
                <span className="text-primary">Ana Lia Quispe</span>: Un Compromiso de 40 Años
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Desde los 10 años, cuando su mamá y abuela le transmitieron el amor por los animales, Brenda no paró. Hoy es el alma de la <strong>Asociación Amigos del Animal</strong>, fundada en 1987.
                <br/><br/>
                <strong className="text-gray-900">Alberga a 215 perros en el refugio y 67 en su hogar personal.</strong> Más de 280 vidas rescatadas de las calles de Jujuy.
                <br/><br/>
                Sin subsidios estatales fijos, dependen de la solidaridad comunitaria. A veces cocinan a leña para economizar. Pero nunca se rinden.
              </p>
              <div className="bg-pink-50 border-l-4 border-primary p-6 rounded">
                <p className="text-gray-700 italic">
                  "Desde 1987 hay una mujer en Jujuy que no se rinde por quienes no tienen voz"
                </p>
                <p className="text-sm text-primary font-bold mt-2">- Canal 4 Jujuy</p>
              </div>
            </motion.div>
            
            {/* FOTO DE BRENDA Y ANA LÍA */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src="/Foto-perfil/perfil-1.jpg" 
                      alt="Brenda Córdoba y Ana Lia Quispe - Fundadoras de Amigos del Animal"
                      className="w-full h-full object-cover"
                    />
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION: NUESTRO PROCESO (TIMELINE) --- */}
      <section className="py-24 bg-pink-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900">Cómo Trabajamos en Jujuy</h2>
            <p className="text-gray-600 mt-2">Un ciclo de rescate, cuidado y esperanza sin fines de lucro.</p>
          </div>

          {/* Línea Central */}
          <div className="absolute left-1/2 top-32 bottom-32 w-0.5 bg-gradient-to-b from-pink-200 via-pink-400 to-pink-200 -translate-x-1/2 hidden md:block" />

          <div className="space-y-4">
            <TimelineItem 
              index={0}
              icon={Users}
              title="1. La Alerta Comunitaria"
              desc="Vecinos de Alto Comedero, el Centro y alrededores nos alertan. La red solidaria es el inicio de cada rescate."
            />
            <TimelineItem 
              index={1}
              icon={Sparkles}
              title="2. Rescate del Abandono"
              desc="Nuestro equipo acude con seguridad y empatía. A menudo encontramos perros desnutridos, con sarna o heridas graves."
            />
            <TimelineItem 
              index={2}
              icon={Syringe}
              title="3. Atención Veterinaria Integral"
              desc="Chequeo completo, vacunas, desparasitación y tratamientos especiales. Colaboramos con veterinarios locales. Es nuestro mayor gasto."
            />
            <TimelineItem 
              index={3}
              icon={Home}
              title="4. Rehabilitación en el Refugio"
              desc="Albergamos a +200 perros en el refugio de Brenda y 67 en su hogar personal. Aprenden a confiar nuevamente."
            />
            <TimelineItem 
              index={4}
              icon={Heart}
              title="5. Adopción Responsable"
              desc="Buscamos familias comprometidas. Hacemos entrevistas y seguimiento post-adopción. El amor es nuestro objetivo final."
            />
          </div>
        </div>
      </section>

      {/* --- SECTION: WALL OF LOVE (NOMBRES ARGENTINOS) --- */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-pink-500 uppercase tracking-widest">Nuestra Familia</p>
          <h2 className="text-3xl font-bold text-gray-900">Esperando por un abrazo</h2>
        </div>

        {/* Tira Infinita */}
        <div className="relative w-full flex overflow-hidden mask-linear-gradient">
           <motion.div 
             className="flex gap-6 whitespace-nowrap"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ repeat: Infinity, ease: "linear", duration: 30 }} // Más lento para apreciar
           >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-6">
                   {/* Nombres típicos de perros en Argentina/Jujuy */}
                   {['Negrito', 'Lola', 'Rocco', 'Canela', 'Tobi', 'Luna', 'Manchitas', 'Choco'].map((name, index) => (
                     <div key={index} className="w-64 h-80 relative rounded-2xl overflow-hidden group cursor-pointer shadow-md">
                        <img 
                          src={`/Foto-perritos/perrito${index + 1}.jpg`} 
                          alt={`Perrito ${name}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 flex items-end p-6">
                           <div>
                               <span className="text-white font-bold text-xl block">{name}</span>
                               <span className="text-pink-300 text-sm font-medium">En adopción</span>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
              ))}
           </motion.div>
        </div>
      </section>

      {/* --- CTA FINAL: CONTEXTO LOCAL --- */}
      <section className="py-32 bg-gray-900 text-center px-4 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
            <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Jujuy necesita tu ayuda.
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                No recibimos subsidios estatales fijos. <strong>La Asociación Amigos del Animal subsiste gracias a la solidaridad comunitaria.</strong> 
                <br/><br/>
                A veces cocinan a leña para economizar. Pero nunca se rinden. Porque Brenda y su equipo saben que cada vida rescatada es un mundo salvado.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-full px-12 py-8 text-xl h-auto shadow-lg shadow-pink-900/50">
                <Link href="/donar">Hacer una Donación</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full px-12 py-8 text-xl h-auto bg-transparent">
                <Link href="/adopcion">Quiero Adoptar</Link>
              </Button>
            </div>
        </motion.div>
      </section>

    </div>
  );
}