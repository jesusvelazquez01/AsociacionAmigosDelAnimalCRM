'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertCircle } from 'lucide-react';
import { StepProps } from '../types';

export default function StepAnimals({
    formData,
    onInputChange,
    hasError,
    getFieldError
}: StepProps) {
    return (
        <Card>
            <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">Otros Animales</h2>
                    <p className="text-gray-600">
                        Información sobre tus mascotas actuales o anteriores
                    </p>
                </div>

                {/* Tiene otros animales */}
                <div className="space-y-3">
                    <Label className="text-base font-semibold">
                        ¿Tenés otros animales? <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-sm text-gray-600">
                        Nos permite saber si el perrito es apto para tu hogar
                    </p>
                    <RadioGroup
                        value={formData.tiene_otros_animales}
                        onValueChange={(value) => onInputChange('tiene_otros_animales', value)}
                        className={hasError('tiene_otros_animales') ? 'border-2 border-red-500 rounded-lg p-2' : ''}
                        data-error={hasError('tiene_otros_animales')}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="si" id="otros-animales-si" />
                            <Label htmlFor="otros-animales-si" className="font-normal cursor-pointer">
                                Sí
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="otros-animales-no" />
                            <Label htmlFor="otros-animales-no" className="font-normal cursor-pointer">
                                No
                            </Label>
                        </div>
                    </RadioGroup>
                    {hasError('tiene_otros_animales') && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {getFieldError('tiene_otros_animales')?.message}
                        </p>
                    )}
                </div>

                {/* Cuántos animales */}
                <AnimatePresence>
                    {formData.tiene_otros_animales === 'si' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2"
                        >
                            <Label htmlFor="cuantos_animales" className="text-base font-semibold">
                                ¿Cuántos? ¿Nos cuentan un poco sobre ellos?
                            </Label>
                            <Textarea
                                id="cuantos_animales"
                                value={formData.cuantos_animales}
                                onChange={(e) => onInputChange('cuantos_animales', e.target.value)}
                                className="text-base min-h-[100px]"
                                placeholder="Ej: 2 perros (Firulais de 5 años y Luna de 2 años), 1 gato (Michi de 3 años)"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Animales castrados */}
                <AnimatePresence>
                    {formData.tiene_otros_animales === 'si' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3"
                        >
                            <Label className="text-base font-semibold">
                                ¿Están castrados? <span className="text-red-500">*</span>
                            </Label>
                            <RadioGroup
                                value={formData.animales_castrados}
                                onValueChange={(value) => onInputChange('animales_castrados', value)}
                                className={hasError('animales_castrados') ? 'border-2 border-red-500 rounded-lg p-2' : ''}
                                data-error={hasError('animales_castrados')}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="si" id="castrados-si" />
                                    <Label htmlFor="castrados-si" className="font-normal cursor-pointer">
                                        Sí
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="castrados-no" />
                                    <Label htmlFor="castrados-no" className="font-normal cursor-pointer">
                                        No
                                    </Label>
                                </div>
                            </RadioGroup>
                            {hasError('animales_castrados') && (
                                <p className="text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {getFieldError('animales_castrados')?.message}
                                </p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Motivo no castración */}
                <AnimatePresence>
                    {formData.animales_castrados === 'no' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2"
                        >
                            <Label htmlFor="motivo_no_castracion" className="text-base font-semibold">
                                Si no están castrados ¿cuál es el motivo?
                            </Label>
                            <Textarea
                                id="motivo_no_castracion"
                                value={formData.motivo_no_castracion}
                                onChange={(e) => onInputChange('motivo_no_castracion', e.target.value)}
                                className="text-base min-h-[80px]"
                                placeholder="Explica el motivo..."
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Animales vacunados */}
                <AnimatePresence>
                    {formData.tiene_otros_animales === 'si' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3"
                        >
                            <Label className="text-base font-semibold">
                                ¿Están vacunados? <span className="text-red-500">*</span>
                            </Label>
                            <RadioGroup
                                value={formData.animales_vacunados}
                                onValueChange={(value) => onInputChange('animales_vacunados', value)}
                                className={hasError('animales_vacunados') ? 'border-2 border-red-500 rounded-lg p-2' : ''}
                                data-error={hasError('animales_vacunados')}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="si" id="vacunados-si" />
                                    <Label htmlFor="vacunados-si" className="font-normal cursor-pointer">
                                        Sí
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="vacunados-no" />
                                    <Label htmlFor="vacunados-no" className="font-normal cursor-pointer">
                                        No
                                    </Label>
                                </div>
                            </RadioGroup>
                            {hasError('animales_vacunados') && (
                                <p className="text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {getFieldError('animales_vacunados')?.message}
                                </p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Animales anteriores */}
                <div className="space-y-2">
                    <Label htmlFor="animales_anteriores" className="text-base font-semibold">
                        ¿Tuviste otros animales? ¿Qué pasó con ellos?{' '}
                        <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                        id="animales_anteriores"
                        value={formData.animales_anteriores}
                        onChange={(e) => onInputChange('animales_anteriores', e.target.value)}
                        className={`text-base min-h-[100px] ${hasError('animales_anteriores') ? 'border-red-500' : ''}`}
                        placeholder="Cuéntanos sobre tus experiencias previas con animales..."
                        data-error={hasError('animales_anteriores')}
                    />
                    {hasError('animales_anteriores') && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {getFieldError('animales_anteriores')?.message}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
