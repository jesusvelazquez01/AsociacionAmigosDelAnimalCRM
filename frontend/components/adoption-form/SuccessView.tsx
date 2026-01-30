'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SuccessViewProps } from './types';

export default function SuccessView({ onNavigateToAdoption }: SuccessViewProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-white px-4">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="text-center"
            >
                <div className="bg-green-100 rounded-full p-6 inline-block mb-6">
                    <CheckCircle2 className="w-16 h-16 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    ¡Formulario Enviado!
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-md">
                    Gracias por tu interés en adoptar. Nos pondremos en contacto contigo muy pronto.
                </p>
                <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 rounded-full px-8 py-6 text-lg"
                    onClick={onNavigateToAdoption}
                >
                    <Link href="/adopcion">
                        <Heart className="w-5 h-5 mr-2" />
                        Volver a Adopción
                    </Link>
                </Button>
            </motion.div>
        </div>
    );
}
