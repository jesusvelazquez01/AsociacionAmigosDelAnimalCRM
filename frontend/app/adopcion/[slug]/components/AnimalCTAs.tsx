'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, PawPrint, CheckCircle2 } from 'lucide-react';

interface AnimalCTAsProps {
    petName: string;
    onAdoptClick: () => void;
}

export function AnimalCTAs({ petName, onAdoptClick }: AnimalCTAsProps) {
    return (
        <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                    size="lg"
                    onClick={onAdoptClick}
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                    <Heart className="w-6 h-6 mr-3" />
                    ¡Quiero adoptar!
                </Button>
            </motion.div>
            <div className="grid grid-cols-2 gap-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild variant="outline" size="lg" className="w-full border-2 border-border hover:border-primary hover:bg-primary/5 rounded-full py-4">
                        <Link href="/apadrinar" className="flex flex-col items-center gap-1">
                            <PawPrint className="w-5 h-5 text-primary" />
                            <span className="text-xs">Apadrinar</span>
                        </Link>
                    </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild variant="outline" size="lg" className="w-full border-2 border-border hover:border-primary hover:bg-primary/5 rounded-full py-4">
                        <Link href="/adopcion/requisitos" className="flex flex-col items-center gap-1">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            <span className="text-xs">Requisitos</span>
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
