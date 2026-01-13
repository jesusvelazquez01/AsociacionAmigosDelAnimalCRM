 'use client';



import React, { useRef, useState, useEffect } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

import { Heart, Syringe, Home, Sparkles, ChevronRight, GripVertical } from 'lucide-react';



// --- COMPONENTE 1: SLIDER ANTES / DESPUÉS ---

const BeforeAfterSlider = ({ beforeImage, afterImage }: { beforeImage: string, afterImage: string }) => {

  const [sliderPosition, setSliderPosition] = useState(50);

  const containerRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);



  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {

    if (!isDragging.current || !containerRef.current) return;

   

    // Calcular posición del mouse/dedo relativa al contenedor

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

      {/* Imagen "Después" (Fondo completo) */}

      <img src={afterImage} alt="Despues" className="absolute inset-0 w-full h-full object-cover" draggable={false} />

      <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">

        Ahora (Feliz)

      </div>



      {/* Imagen "Antes" (Recortada) */}

      <div

        className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-white"

        style={{ width: `${sliderPosition}%` }}

      >

        <img src={beforeImage} alt="Antes" className="absolute inset-0 w-full h-full object-cover" draggable={false} />

        <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">

          Antes (Rescate)

        </div>

      </div>



      {/* Manija del Slider */}

      <div

        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]"

        style={{ left: `${sliderPosition}%` }}

      >

        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transform active:scale-95 transition-transform text-pink-500">

          <GripVertical size={20} />

        </div>

      </div>

     

      {/* Hint para el usuario */}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm">

        Desliza para ver el cambio

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



export default function ElRefugioPageCreative() {

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });



  return (

    <div className="bg-white overflow-hidden">

     

      {/* Barra de progreso de lectura superior */}

      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-[60]" style={{ scaleX }} />



      {/* --- HERO: VISUAL IMPACT --- */}

      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0a0a0a] text-white overflow-hidden">

        {/* Fondo de Video o Imagen Oscura */}

        <div className="absolute inset-0 opacity-40">
           <img src="/Foto-refugio/refugio-4.jpg" className="w-full h-full object-cover " alt="Fondo" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />



        <div className="relative z-10 text-center max-w-4xl px-4">

          <motion.div

            initial={{ opacity: 0, y: 30 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 1 }}

          >
            <span className="inline-block py-1 px-3 rounded-full border border-primary text-primary text-sm mb-6 uppercase tracking-[0.2em] bg-pink-500/10 backdrop-blur-md">
              Amigos del Animal

            </span>

            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">

              SALVAMOS<br />

              <span className="text-transparent bg-clip-text bg-primary/80 animate-gradient-xy">

                ALMAS

              </span>

            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-light">

              No solo cambiamos su mundo. Ellos cambian el nuestro para siempre.

            </p>

           

            <Button asChild size="lg" className="rounded-full h-16 px-10 text-lg bg-white text-black hover:bg-pink-50 transition-all hover:scale-105">

                <Link href="/adopcion">Ver a los protagonistas</Link>

            </Button>

          </motion.div>

        </div>

      </section>



      {/* --- SECTION: THE TRANSFORMATION (SLIDER) --- */}

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">El Poder del Amor</h2>
            <p className="text-gray-500">Deslizá para ver lo que logramos juntos.</p>

          </div>



          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-4">La historia de <span className="text-primary">Benito</span></h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">

                Lo encontramos temblando bajo la lluvia, con sarna y desnutrición severa. Tenía miedo de su propia sombra.

                <br/><br/>

                3 meses después, Benito es el rey de las pelotas de tenis y ama dormir en el sillón.

                <strong className="block mt-4 text-gray-900">Esta transformación solo es posible gracias a las donaciones.</strong>

              </p>
              <Button variant="link" className="text-primary p-0 font-bold text-lg">
                Conocé más historias como la de Benito <ChevronRight className="w-5 h-5 ml-1" />

              </Button>
            </motion.div>
            
            {/* SLIDER ANTES/DESPUÉS */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <BeforeAfterSlider 
                beforeImage="/Foto-perritos/perrito12.jpg"
                afterImage="/Foto-perritos/perrito13.jpg"
              />
            </motion.div>
          </div>

        </div>

      </section>



      {/* --- SECTION: THE JOURNEY (VERTICAL TIMELINE) --- */}

      <section className="py-24 bg-pink-50 relative overflow-hidden">

        <div className="max-w-4xl mx-auto px-4 relative">

          <div className="text-center mb-20">

            <h2 className="text-4xl font-bold text-gray-900">El Camino del Rescate</h2>

          </div>



          {/* Línea Central Vertical */}

          <div className="absolute left-1/2 top-32 bottom-32 w-0.5 bg-primary -translate-x-1/2 hidden md:block" />



          <div className="space-y-4">

            <TimelineItem

              index={0}

              icon={Sparkles}

              title="1. El Rescate"

              desc="Recibimos el alerta. Nuestro equipo acude al lugar, evalúa la situación y asegura al animal con calma y seguridad."

            />

            <TimelineItem

              index={1}

              icon={Syringe}

              title="2. Atención Veterinaria"

              desc="Chequeo completo, vacunas, desparasitación y tratamiento de cualquier herida o enfermedad preexistente."

            />

            <TimelineItem

              index={2}

              icon={Home}

              title="3. Rehabilitación"

              desc="El paso más importante. Aprenden a confiar de nuevo, socializan con otros animales y reciben mimos infinitos."

            />

            <TimelineItem

              index={3}

              icon={Heart}

              title="4. Adopción Responsable"

              desc="Encontramos a la familia perfecta. Hacemos entrevistas y seguimiento para asegurar un final feliz."

            />

          </div>

        </div>

      </section>



      {/* --- SECTION: MARQUESINA INFINITA (WALL OF LOVE) --- */}

      <section className="py-20 bg-white overflow-hidden">

        <div className="text-center mb-10">
          <p className="text-sm font-bold text-primary uppercase tracking-widest">Nuestros Angelitos</p>
          <h2 className="text-3xl font-bold text-gray-900">Esperando por vos</h2>

        </div>



        {/* Tira Infinita */}

        <div className="relative w-full flex overflow-hidden mask-linear-gradient">

           {/* Contenedor que se mueve */}

           <motion.div

             className="flex gap-6 whitespace-nowrap"

             animate={{ x: ["0%", "-50%"] }}

             transition={{ repeat: Infinity, ease: "linear", duration: 20 }}

           >

              {/* Duplicamos las imágenes para el efecto infinito */}

              {[...Array(2)].map((_, i) => (

                <div key={i} className="flex gap-6">

                   {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (

                     <div key={num} className="w-64 h-80 relative rounded-2xl overflow-hidden group cursor-pointer">

                        <img

                          src={`/Foto-perritos/perrito${num}.jpg`} // Asegúrate de tener estas fotos o usa placeholders

                          alt={`Perrito ${num}`}

                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"

                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">

                           <span className="text-white font-bold text-xl">Nombre {num}</span>

                        </div>

                     </div>

                   ))}

                </div>

              ))}

           </motion.div>

        </div>

      </section>



      {/* --- CTA FINAL: MINIMALISTA --- */}

      <section className="py-32 bg-gray-900 text-center px-4">

        <motion.div

          initial={{ scale: 0.9, opacity: 0 }}

          whileInView={{ scale: 1, opacity: 1 }}

          transition={{ duration: 0.5 }}

        >

            <Heart className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">

              Tu ayuda es su futuro.

            </h2>

            <div className="flex flex-col sm:flex-row justify-center gap-4">

              <Button asChild className="bg-primary text-white rounded-full px-12 py-8 text-xl h-auto">

                <Link href="/donar">Donar Ahora</Link>

              </Button>

            </div>

        </motion.div>

      </section>



    </div>

  );

}