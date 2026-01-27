'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, UserPlus, HandCoins, ArrowRight } from 'lucide-react';

const helpOptions = [
    {
        title: "Adopta",
        description: "Dale un hogar a uno de nuestros animalitos rescatados y cambia una vida para siempre.",
        icon: Heart,
        link: "/adopcion",
        buttonText: "Ver Animalitos",
    },
    {
        title: "Sé Voluntario",
        description: "Únete a nuestro equipo de voluntarios y ayúdanos en el cuidado y paseo de los animales.",
        icon: UserPlus,
        link: "/voluntarios",
        buttonText: "Quiero Ayudar",
    },
    {
        title: "Dona",
        description: "Tu donación nos ayuda a cubrir gastos veterinarios, alimentación y refugio para los animales.",
        icon: HandCoins,
        link: "/donar",
        buttonText: "Hacer Donación",
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const HowToHelp = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
            {/* Decoraciones de fondo */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header de la sección */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <motion.span
                        className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Tu ayuda hace la diferencia
                    </motion.span>

                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        ¿Cómo puedes <span className="text-primary">Colaborar</span>?
                    </h2>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Hay muchas formas de ser parte del cambio. Elige la que más resuene con vos y ayudanos a seguir salvando vidas.
                    </p>
                </motion.div>

                {/* Grid de Tarjetas */}
                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {helpOptions.map((option, index) => {
                        const Icon = option.icon;

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group"
                            >
                                <div className="relative h-full bg-white rounded-3xl border border-border/50 p-8 text-center transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden">
                                    {/* Decoración de fondo */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors" />

                                    {/* Ícono con estilo Furs */}
                                    <div className="relative w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-primary group-hover:scale-105">
                                        <Icon className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                                    </div>

                                    {/* Título */}
                                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                        {option.title}
                                    </h3>

                                    {/* Descripción */}
                                    <p className="text-muted-foreground mb-8 leading-relaxed">
                                        {option.description}
                                    </p>

                                    {/* Botón */}
                                    <Button asChild className="w-full rounded-full bg-primary hover:bg-primary/90 py-6 text-base">
                                        <Link href={option.link}>
                                            {option.buttonText}
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Link>
                                    </Button>

                                    {/* Línea decorativa inferior */}
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default HowToHelp;
