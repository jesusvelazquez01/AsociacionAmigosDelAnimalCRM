'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { number: "+1200", label: "Rescates Realizados" },
    { number: "+500", label: "Adopciones Exitosas" },
    { number: "38", label: "Años de Trabajo" },
    { number: "+10", label: "Voluntarios Activos" },
];

const StatsSection = () => {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Elementos decorativos (Mismos que AdoptionCTA para consistencia) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full translate-x-1/3 -translate-y-1/2 opacity-40" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-50 rounded-full -translate-x-1/3 translate-y-1/3 opacity-40" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Número Grande */}
                            <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                                {stat.number}
                            </div>

                            {/* Línea decorativa pequeña */}
                            <div className="w-12 h-1 bg-pink-200 mx-auto mb-3 rounded-full" />

                            {/* Etiqueta */}
                            <div className="text-base md:text-lg font-medium text-gray-600">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
