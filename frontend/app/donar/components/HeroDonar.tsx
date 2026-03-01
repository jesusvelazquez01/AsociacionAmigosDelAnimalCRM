'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

export default function HeroDonar() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 overflow-hidden">
      {/* Decoración orgánica */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />

      <div className="furs-container relative z-10 mt-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="furs-title-xl text-foreground mb-6">
              Con tu donación,<br />
              <span className="text-primary">salvamos vidas</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Cada aporte se traduce directamente en rescates, tratamientos veterinarios y finales felices para nuestros rescataditos.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#metodos-donacion" className="bg-primary hover:bg-primary/80 text-white font-bold rounded-full px-8 py-6 text-lg h-auto">
                Donar ahora
              </a>
              <Link href="/apadrinar" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full px-8 py-6 text-lg h-auto font-bold">
                <PawPrint className="w-5 h-5 mr-2 " />Apadrinar
              </Link>
            </div>
          </motion.div>

          {/* Carousel de rescataditos - Arrastrable */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {[
                  { src: "/Foto-antes-despues/lobita-antes.webp", label: "Antes", badge: "Rescatada" },
                  { src: "/Foto-antes-despues/lobita-despues.webp", label: "Después", badge: "¡Feliz!" },
                  { src: "/Foto-antes-despues/locrin-antes.webp", label: "Ahora", badge: "Rescatado" },
                  { src: "/Foto-antes-despues/locrin-despues.webp", label: "Ahora", badge: "¡Feliz!" },
                  { src: "/Foto-antes-despues/negrito-antes.webp", label: "Ahora", badge: "Rescatado" },
                  { src: "/Foto-antes-despues/negrito-despues.webp", label: "Ahora", badge: "¡Feliz!" },
                ].map((item, index) => (
                  <CarouselItem key={index} className="pl-2 basis-1/2 md:basis-1/2">
                    <div className="furs-card bg-card border border-border/50 p-2 h-full">
                      <div className="relative">
                        <Image
                          src={item.src}
                          alt={`Rescatadito ${index + 1}`}
                          width={400}
                          height={480}
                          className="furs-image w-full h-120 md:h-120 object-cover"
                        />
                        <span className={`absolute bottom-2 left-2 furs-badge text-xs ${item.label === "Antes"
                          ? "bg-white/90 text-foreground"
                          : "bg-primary text-primary-foreground"
                          }`}>
                          {item.badge}
                        </span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-4">
                <CarouselPrevious className="static translate-y-0 bg-primary/10 border-primary/20 hover:bg-primary hover:text-primary-foreground" />
                <CarouselNext className="static translate-y-0 bg-primary/10 border-primary/20 hover:bg-primary hover:text-primary-foreground" />
              </div>
            </Carousel>
            <p className="text-center text-muted-foreground mt-3 text-sm">
              Arrastrá para ver más <PawPrint className="w-4 h-4 inline" />
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
