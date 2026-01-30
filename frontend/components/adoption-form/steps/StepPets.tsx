'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Dog, Cat, Plus, X, CheckCircle2, AlertTriangle } from 'lucide-react';
import { StepPetsProps } from '../types';

export default function StepPets({
    selectedPet,
    additionalPets,
    availablePets,
    showAdditionalPets,
    onToggleAdditionalPets,
    onToggleAdditionalPet,
    hasError,
    getFieldError
}: StepPetsProps) {
    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Selecciona tu futuro compañero
                </h2>
                <p className="text-gray-600">
                    Puedes elegir más de una mascota si lo deseas
                </p>
            </div>

            {/* Selected Pet */}
            {selectedPet && (
                <Card className="overflow-hidden border-2 border-primary">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <img
                                src={selectedPet.image || '/Foto-perritos/placeholder.jpg'}
                                alt={selectedPet.name}
                                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    {selectedPet.type === 'Perro' ? (
                                        <Dog className="w-6 h-6 text-primary" />
                                    ) : (
                                        <Cat className="w-6 h-6 text-primary" />
                                    )}
                                    {selectedPet.name}
                                </h3>
                                <p className="text-gray-600">{selectedPet.age} • {selectedPet.type}</p>
                                <Badge className="mt-2">Mascota Principal</Badge>
                            </div>
                            <Heart className="w-8 h-8 text-primary fill-primary" />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Additional Pets */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">
                                ¿Quieres adoptar más perritos?
                            </h3>
                            <p className="text-sm text-gray-600">
                                Puedes seleccionar varias mascotas
                            </p>
                        </div>
                        <Button
                            onClick={onToggleAdditionalPets}
                            variant="outline"
                            className="rounded-full"
                        >
                            {showAdditionalPets ? (
                                <>
                                    <X className="w-4 h-4 mr-2" />
                                    Cerrar
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Ver Perritos
                                </>
                            )}
                        </Button>
                    </div>

                    <AnimatePresence>
                        {showAdditionalPets && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4"
                            >
                                {availablePets
                                    .filter(pet => pet.id !== selectedPet?.id)
                                    .map(pet => (
                                        <button
                                            key={pet.id}
                                            onClick={() => onToggleAdditionalPet(pet.id)}
                                            className={`relative rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${additionalPets.includes(pet.id)
                                                ? 'border-primary ring-2 ring-primary ring-offset-2'
                                                : 'border-gray-200 hover:border-primary/50'
                                                }`}
                                        >
                                            <img
                                                src={pet.image || '/Foto-perritos/placeholder.jpg'}
                                                alt={pet.name}
                                                className="w-full h-24 object-cover"
                                            />
                                            <div className="p-2 bg-white">
                                                <p className="text-xs font-bold text-gray-900 truncate">
                                                    {pet.name}
                                                </p>
                                                <p className="text-xs text-gray-500">{pet.age}</p>
                                            </div>
                                            {additionalPets.includes(pet.id) && (
                                                <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {additionalPets.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-3 bg-primary/10 rounded-lg"
                        >
                            <p className="text-sm font-medium text-primary">
                                {additionalPets.length} perrito{additionalPets.length > 1 ? 's' : ''} adicional
                                {additionalPets.length > 1 ? 'es' : ''} seleccionado
                                {additionalPets.length > 1 ? 's' : ''}
                            </p>
                        </motion.div>
                    )}
                </CardContent>
            </Card>

            {hasError('selectedPet') && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4" data-error="true">
                    <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700">
                            {getFieldError('selectedPet')?.message}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
