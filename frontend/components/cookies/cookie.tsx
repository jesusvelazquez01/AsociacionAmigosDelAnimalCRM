'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CookieConsentProps {
    demo?: boolean; // Para forzar visibilidad en desarrollo
}

export function CookieConsent({ demo = false }: CookieConsentProps) {
    const [isVisible, setIsVisible] = useState(demo);

    useEffect(() => {
        // En un caso real, verificaríamos localStorage aquí
        // Por ahora, mostramos después de un breve delay para simular
        if (!demo) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [demo]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.95 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-sm md:max-w-md"
                >
                    <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl p-6 relative overflow-hidden">

                        {/* Decoración de fondo sutil */}
                        <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-[-20%] left-[-10%] w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-start gap-4">
                                {/* Icono animado */}
                                <div className="bg-amber-100/80 p-3 rounded-2xl shrink-0 shadow-sm">
                                    <Cookie className="w-6 h-6 text-amber-600 animate-pulse-slow" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800 text-lg mb-1 flex items-center gap-2">
                                        Nos gustan las cookies 🍪
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                        Usamos cookies para mejorar tu experiencia y analizar el tráfico.
                                        ¿Aceptas invitarnos unas virtuales?
                                        <Link href="/legales/politica-privacidad" className="text-primary hover:underline ml-1 font-medium inline-flex items-center gap-0.5">
                                            Leer más
                                        </Link>
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            onClick={() => setIsVisible(false)}
                                            className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 shadow-lg hover:shadow-primary/25 transition-all text-sm font-bold flex-1"
                                        >
                                            ¡Claro que sí!
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsVisible(false)}
                                            className="border-gray-200 hover:bg-gray-50 text-gray-600 rounded-full px-4 py-2 text-sm font-medium"
                                        >
                                            Solo necesarias
                                        </Button>
                                    </div>
                                </div>

                                {/* Botón cerrar */}
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full -mr-2 -mt-2"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
