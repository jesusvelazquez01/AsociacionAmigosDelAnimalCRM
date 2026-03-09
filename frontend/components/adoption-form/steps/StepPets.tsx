'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Dog, Cat, Plus, X, CheckCircle2, AlertTriangle, Search, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { StepPetsProps } from '../types';

export default function StepPets({
    selectedPet,
    additionalPets,
    availablePets,
    showAdditionalPets,
    onToggleAdditionalPets,
    onToggleAdditionalPet,
    hasError,
    getFieldError,
    searchQuery,
    onSearchChange,
    currentPage,
    totalPages,
    onPageChange,
    loadingPets
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
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                            {selectedPet.image ? (
                                <img
                                    src={selectedPet.image}
                                    alt={selectedPet.name}
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto sm:mx-0"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            ) : (
                                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto sm:mx-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center border-4 border-white shadow-lg flex-shrink-0">
                                    {selectedPet.type === 'Perro' ? (
                                        <Dog className="w-10 h-10 text-primary" />
                                    ) : (
                                        <Cat className="w-10 h-10 text-primary" />
                                    )}
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 flex justify-center sm:justify-start items-center gap-2">
                                    {selectedPet.type === 'Perro' ? (
                                        <Dog className="w-6 h-6 text-primary" />
                                    ) : (
                                        <Cat className="w-6 h-6 text-primary" />
                                    )}
                                    {selectedPet.name}
                                </h3>
                                <p className="text-gray-600 font-medium mt-1">{selectedPet.age} • {selectedPet.type}</p>
                                <Badge className="mt-3">Mascota Principal</Badge>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <Heart className="w-8 h-8 text-primary fill-primary animate-pulse" />
                            </div>
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
                                className="mt-6 space-y-4"
                            >
                                {/* Search Bar */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Buscar un rescatadito por nombre..."
                                        value={searchQuery}
                                        onChange={(e) => onSearchChange(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all"
                                    />
                                </div>

                                {/* Loading state */}
                                {loadingPets ? (
                                    <div className="flex justify-center items-center py-8">
                                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                    </div>
                                ) : (
                                    <>
                                        {availablePets.length === 0 ? (
                                            <div className="text-center py-8 text-gray-500">
                                                No se encontraron animalitos con ese nombre.
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
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
                                                            {pet.image ? (
                                                                <img
                                                                    src={pet.image}
                                                                    alt={pet.name}
                                                                    className="w-full h-24 object-cover"
                                                                    onError={(e) => {
                                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-24 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                                                                    {pet.type === 'Perro' ? (
                                                                        <Dog className="w-10 h-10 text-primary" />
                                                                    ) : (
                                                                        <Cat className="w-10 h-10 text-primary" />
                                                                    )}
                                                                </div>
                                                            )}
                                                            <div className="p-2 bg-white flex flex-col items-start text-left">
                                                                <p className="text-xs font-bold text-gray-900 w-full truncate">
                                                                    {pet.name}
                                                                </p>
                                                                <p className="text-xs text-gray-500">{pet.age}</p>
                                                            </div>
                                                            {additionalPets.includes(pet.id) && (
                                                                <div className="absolute top-2 right-2 bg-primary rounded-full p-1 shadow-md">
                                                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                                                </div>
                                                            )}
                                                        </button>
                                                    ))}
                                            </div>
                                        )}

                                        {/* Pagination */}
                                        {totalPages > 1 && (
                                            <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-100">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                                                    disabled={currentPage === 1}
                                                    className="rounded-full px-3 py-1 h-8"
                                                >
                                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                                    Ant.
                                                </Button>

                                                <div className="text-sm text-gray-600 font-medium px-2">
                                                    Página {currentPage} de {totalPages}
                                                </div>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                                                    disabled={currentPage === totalPages}
                                                    className="rounded-full px-3 py-1 h-8"
                                                >
                                                    Sig.
                                                    <ChevronRight className="w-4 h-4 ml-1" />
                                                </Button>
                                            </div>
                                        )}
                                    </>
                                )}
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
