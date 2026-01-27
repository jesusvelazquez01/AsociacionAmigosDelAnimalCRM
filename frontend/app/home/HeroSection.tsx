'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight, MapPin } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-br from-secondary/30 via-background to-background py-24 relative overflow-hidden">
            {/* Decoraciones de fondo */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Contenido - Izquierda */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        {/* Badge de ubicación */}
                        <motion.span
                            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6"
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <MapPin className="w-4 h-4" />
                            San Salvador de Jujuy, Argentina
                        </motion.span>

                        {/* Título principal */}
                        <motion.h1
                            className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Dale una <span className="text-primary">Segunda Oportunidad</span>
                        </motion.h1>

                        {/* Descripción */}
                        <motion.p
                            className="text-xl text-muted-foreground mb-8 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            En la <strong className="text-foreground">Asociación Amigos del Animal</strong> rescatamos, cuidamos y encontramos hogares llenos de amor para animales abandonados. Cada adopción transforma dos vidas: la tuya y la de ellos.
                        </motion.p>

                        {/* Botones CTA */}
                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                                <Link href="/el-refugio">
                                    Ver Refugio
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-primary text-primary hover:bg-primary/10">
                                <Link href="/contacto">
                                    Contactar
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Imagen - Derecha */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            <motion.img
                                src="/Foto-refugio/refugio-9.jpg"
                                alt="Perros rescatados por Amigos del Animal"
                                className="rounded-3xl shadow-2xl w-full object-cover border border-border/50"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            />

                            {/* Overlay decorativo */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>

                        {/* Card flotante de estadísticas */}
                        <motion.div
                            className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-border/50"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-4 rounded-2xl">
                                    <Heart className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-foreground">+350</div>
                                    <div className="text-sm text-muted-foreground">Adopciones Exitosas</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card flotante adicional */}
                        <motion.div
                            className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-full shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-sm font-bold"> Adopta, no compres</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
