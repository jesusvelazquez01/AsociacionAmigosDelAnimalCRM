'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowRight, Heart } from 'lucide-react';

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
        <section className="py-24 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
            {/* Decoraciones de fondo */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Carousel - Left side */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 6.0 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentIndex}
                                    src={images[currentIndex]}
                                    alt={`Perrito en adopción ${currentIndex + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 1.6 }}
                                />
                            </AnimatePresence>

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />



                            {/* Dots indicator */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-2 rounded-full transition-all ${index === currentIndex
                                            ? 'bg-primary w-6'
                                            : 'bg-white/50 w-2 hover:bg-white/80'
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
                        {/* Badge */}
                        <motion.span
                            className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            Dale una segunda oportunidad
                        </motion.span>

                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            Adoptá un <span className="text-primary">Asoc</span> y cambiá sus vidas.
                        </motion.h2>

                        <motion.div
                            className="space-y-4 text-lg text-muted-foreground leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <p>
                                Adoptar es más que sumar un perro a tu hogar: es abrirle la puerta a una{' '}
                                <strong className="text-foreground">nueva vida llena de amor, cuidados y segundas oportunidades</strong>.
                                En <span className="text-primary font-semibold">Amigos del Animal</span>, cada angelito tiene una historia,
                                un pasado que dejó atrás y un corazón enorme esperando ser parte de una familia.
                            </p>
                            <p>
                                Cuando elegís adoptar, también estás{' '}
                                <strong className="text-foreground">liberando un lugar en el refugio</strong> para que otro
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
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-8 py-6 text-lg h-auto">
                                <Link href="/adopcion">
                                    Enteráte cómo
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full px-8 py-6 text-lg h-auto font-bold">
                                <Link href="/donar">Quiero ayudar</Link>
                            </Button>
                        </motion.div>

                        {/* Stats decorativos */}
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
