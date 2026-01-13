'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-br from-pink-50 to-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <motion.span
                            className="inline-block bg-pink-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            San Salvador de Jujuy, Argentina
                        </motion.span>
                        <motion.h1
                            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Dale una <span className="text-transparent bg-clip-text bg-pink-300">Segunda Oportunidad</span>
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-600 mb-8 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            En la <strong>Asociación Amigos del Animal</strong> rescatamos, cuidamos y encontramos hogares llenos de amor para animales abandonados. Cada adopción transforma dos vidas: la tuya y la de ellos.
                        </motion.p>
                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href="/el-refugio"
                                className="bg-pink-300 text-white px-8 py-4 rounded-full text-lg font-semibold transition shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105"
                            >
                                Ver Refugio
                            </Link>
                            <Link
                                href="/contacto"
                                className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition border-2 border-gray-900 hover:scale-105"
                            >
                                Contactar
                            </Link>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <motion.img
                            src="/Foto-animada-perritos/foto-animada-1.png"
                            alt="Perros rescatados por Amigos del Animal"
                            className="rounded-3xl shadow-2xl w-full"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.div
                            className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-pink-100 p-4 rounded-full">
                                    <svg className="w-8 h-8 text-pink-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-gray-900">+350</div>
                                    <div className="text-sm text-gray-600">Adopciones Exitosas</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
