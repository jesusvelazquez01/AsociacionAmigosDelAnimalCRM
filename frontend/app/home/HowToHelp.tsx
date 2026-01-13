'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button'; // Asumo que tienes este componente

const helpOptions = [
    {
        title: "Adopta",
        description: "Dale un hogar a uno de nuestros animalitos rescatados y cambia una vida para siempre.",
        icon: (
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        link: "/adopcion",
        buttonText: "Ver Mascotas",
        delay: 0.2
    },
    {
        title: "Sé Voluntario",
        description: "Únete a nuestro equipo de voluntarios y ayúdanos en el cuidado y paseo de los animales.",
        icon: (
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
        ),
        link: "/voluntarios",
        buttonText: "Quiero Ayudar",
        delay: 0.3
    },
    {
        title: "Dona",
        description: "Tu donación nos ayuda a cubrir gastos veterinarios, alimentación y refugio para los animales.",
        icon: (
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        link: "/donar",
        buttonText: "Hacer Donación",
        delay: 0.4
    }
];

const HowToHelp = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Elementos decorativos de fondo (Blobs) */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-pink-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-40 blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header de la sección */}
                <div className="text-center mb-16">
                    <motion.span
                        className="inline-block bg-pink-50 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-pink-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Tu ayuda hace la diferencia
                    </motion.span>

                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        ¿Cómo puedes <span className="text-transparent bg-clip-text bg-primary">Colaborar</span>?
                    </motion.h2>

                    <motion.p
                        className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Hay muchas formas de ser parte del cambio. Elige la que más resuene con vos y ayudanos a seguir salvando vidas.
                    </motion.p>
                </div>

                {/* Grid de Tarjetas */}
                <div className="grid md:grid-cols-3 gap-8">
                    {helpOptions.map((option, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-pink-100/20 text-center hover:shadow-2xl hover:shadow-pink-100/40 transition-all duration-300 group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: option.delay }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                        >
                            {/* Círculo del ícono */}
                            <div className="w-20 h-20 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-pink-100 transition-all duration-300">
                                {option.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{option.title}</h3>

                            <p className="text-gray-600 mb-8 leading-relaxed">
                                {option.description}
                            </p>

                            <Button asChild className="w-full rounded-xl text-md py-6 shadow-lg shadow-pink-200 hover:shadow-pink-300 transition-all">
                                <Link href={option.link}>
                                    {option.buttonText}
                                </Link>
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowToHelp;
