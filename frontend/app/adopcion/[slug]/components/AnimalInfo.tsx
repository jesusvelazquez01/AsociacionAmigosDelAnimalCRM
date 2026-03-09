'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
    Calendar,
    Ruler,
    Heart,
    PawPrint,
    Syringe,
    Stethoscope,
    CheckCircle2,
    Sparkles,
    Dog,
    Cat,
    BookOpen,
    MapPin
} from 'lucide-react';
import { Pet } from '../DetalleAnimalClient';

interface AnimalInfoProps {
    pet: Pet;
}

export function AnimalInfo({ pet }: AnimalInfoProps) {
    const getTypeEmoji = () => pet.type === 'Perro' ? <Dog className="w-8 h-8" /> : <Cat className="w-8 h-8" />;

    return (
        <div className="bg-card rounded-3xl border border-border/50 p-5 md:p-8 shadow-lg space-y-5 md:space-y-6">
            {/* Nombre */}
            <div>
                <div className="flex items-center gap-3">
                    <span className="text-primary">{getTypeEmoji()}</span>
                    <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">{pet.name}</h1>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mt-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Jujuy, Argentina</span>
                </div>
            </div>

            <div className="border-t border-border/50" />

            {/* Características */}
            <div>
                <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-wide">Características</h3>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { icon: <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />, label: 'Edad', value: pet.age },
                        { icon: <PawPrint className="w-5 h-5 mx-auto mb-1 text-primary" />, label: 'Sexo', value: pet.gender },
                        { icon: <Ruler className="w-5 h-5 mx-auto mb-1 text-primary" />, label: 'Tamaño', value: pet.size },
                    ].map((item) => (
                        <motion.div key={item.label} whileHover={{ scale: 1.05 }} className="bg-muted/50 rounded-2xl p-3 text-center cursor-default">
                            {item.icon}
                            <p className="text-xs text-muted-foreground">{item.label}</p>
                            <p className="font-bold text-foreground text-sm">{item.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="border-t border-border/50" />

            {/* Estado de salud */}
            <div>
                <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-wide">Estado de salud</h3>
                <div className="flex flex-wrap gap-2">
                    {pet.vaccinated && (
                        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
                            <Syringe className="w-4 h-4" /><span className="font-medium text-sm">Vacunado</span>
                        </motion.div>
                    )}
                    {pet.in_treatment && (
                        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full">
                            <Stethoscope className="w-4 h-4" /><span className="font-medium text-sm">En tratamiento</span>
                        </motion.div>
                    )}
                    {!pet.vaccinated && !pet.in_treatment && (
                        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
                            <CheckCircle2 className="w-4 h-4" /><span className="font-medium text-sm">Desparasitado</span>
                        </motion.div>
                    )}
                </div>
            </div>

            {pet.health && pet.health.length > 0 && (
                <div className="pt-2">
                     <div className="flex flex-wrap gap-2">
                        {pet.health.map((status: string, i: number) => (
                            <Badge key={i} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 py-1 px-3 sm:py-1.5 sm:px-4 text-[11px] sm:text-sm transition-colors rounded-full font-bold">{status}</Badge>
                        ))}
                    </div>
                </div>
            )}


            <div className="border-t border-border/50" />

            {/* Personalidad */}
            <div>
                <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-wide">Personalidad</h3>
                <div className="flex flex-wrap gap-2">
                    {(pet.personality && pet.personality.length > 0 ? pet.personality : ['Bueno con niños', 'Amigable con gatos', 'Sociable']).map((trait, index) => (
                        <motion.div key={trait} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05 }}>
                            <Badge className="bg-primary/10 text-primary border-0 rounded-full px-3 py-1.5">
                                <CheckCircle2 className="w-3 h-3 mr-1.5" />
                                {trait}
                            </Badge>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="border-t border-border/50" />

            {/* Mi historia */}
            <div>
                <h3 className="text-xl font-black text-foreground mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Mi historia
                </h3>
                <div
                    className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: pet.history || pet.description || 'Este animalito está buscando un hogar lleno de amor. ¡Podría ser el tuyo!' }}
                />
            </div>
        </div>
    );
}
