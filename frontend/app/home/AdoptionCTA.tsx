'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const images = [
    '/Foto-perritos/perrito1.jpg',
    '/Foto-perritos/perrito2.jpg',
    '/Foto-perritos/perrito3.jpg',
    '/Foto-perritos/perrito4.jpg',
    '/Foto-perritos/perrito5.jpg',
    '/Foto-perritos/perrito6.jpg',
    '/Foto-perritos/perrito7.jpg',
    '/Foto-perritos/perrito8.jpg',
    '/Foto-perritos/perrito9.jpg',
];

const AdoptionCTA = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-pink-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-50 rounded-full translate-x-1/2 translate-y-1/2 opacity-50" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Carousel - Left side */}
                    <motion.div 
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentIndex}
                                    src={images[currentIndex]}
                                    alt={`Perrito en adopción ${currentIndex + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </AnimatePresence>
                            
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            
                            {/* Navigation arrows */}
                            <button 
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110"
                            >
                                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button 
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110"
                            >
                                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Dots indicator */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            index === currentIndex 
                                                ? 'bg-white w-6' 
                                                : 'bg-white/50 hover:bg-white/80'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        
                    </motion.div>

                    {/* Content - Right side */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {/* Paw prints decoration */}
                        <motion.div 
                            className="flex gap-3 mb-6"
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                        </motion.div>

                        <motion.h2 
                            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            Adoptá un <span className="text-transparent bg-clip-text bg-primary">Asoc</span> y cambiá sus vidas.
                        </motion.h2>

                        <motion.div 
                            className="space-y-4 text-lg text-gray-600 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <p>
                                Adoptar es más que sumar un perro a tu hogar: es abrirle la puerta a una{' '}
                                <strong className="text-gray-900">nueva vida llena de amor, cuidados y segundas oportunidades</strong>. 
                                En <span className="text-primary font-semibold">Amigos del Animal</span>, cada angelito tiene una historia, 
                                un pasado que dejó atrás y un corazón enorme esperando ser parte de una familia.
                            </p>
                            <p>
                                Cuando elegís adoptar, también estás{' '}
                                <strong className="text-gray-900">liberando un lugar en el refugio</strong> para que otro 
                                animalito pueda ser rescatado de la calle.
                            </p>
                        </motion.div>

                        <motion.div 
                            className="mt-8 flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                                <Button asChild className="flex items-center gap-2">
                                    <Link href="/adopcion" className="flex items-center gap-2">
                                        Enteráte cómo
                                        <svg 
                                            className="w-5 h-5" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href="/voluntariado">Quiero ayudar</Link>
                                </Button>
                        </motion.div>

                        {/* Mini stats */}
                        <motion.div 
                            className="mt-10 flex gap-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            viewport={{ once: true }}
                        >
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AdoptionCTA;
