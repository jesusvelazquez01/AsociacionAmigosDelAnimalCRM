'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Heart, AlertCircle, Info } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { StepProps } from '../types';

export default function StepPersonal({
    formData,
    onInputChange,
    hasError,
    getFieldError
}: StepProps) {
    return (
        <Card>
            <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Heart className="w-6 h-6 text-primary" />
                        Información Personal
                    </h2>
                    <p className="text-gray-600">
                        Necesitamos conocerte mejor para asegurar una adopción responsable
                    </p>
                </div>

                {/* Edad */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="edad" className="text-base font-semibold">
                            Edad <span className="text-red-500">*</span>
                        </Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Debes ser mayor de 18 años para adoptar</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Input
                        id="edad"
                        type="number"
                        value={formData.edad}
                        onChange={(e) => onInputChange('edad', e.target.value)}
                        className={`text-base ${hasError('edad') ? 'border-red-500' : ''}`}
                        placeholder="Ej: 25"
                        data-error={hasError('edad')}
                    />
                    {hasError('edad') && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {getFieldError('edad')?.message}
                        </p>
                    )}
                </div>

                {/* Domicilio */}
                <div className="space-y-2">
                    <Label htmlFor="domicilio" className="text-base font-semibold">
                        Domicilio <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="domicilio"
                        value={formData.domicilio}
                        onChange={(e) => onInputChange('domicilio', e.target.value)}
                        className={`text-base ${hasError('domicilio') ? 'border-red-500' : ''}`}
                        placeholder="Calle y número"
                        data-error={hasError('domicilio')}
                    />
                    {hasError('domicilio') && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {getFieldError('domicilio')?.message}
                        </p>
                    )}
                </div>

                {/* Localidad */}
                <div className="space-y-2">
                    <Label htmlFor="localidad" className="text-base font-semibold">
                        Localidad <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="localidad"
                        value={formData.localidad}
                        onChange={(e) => onInputChange('localidad', e.target.value)}
                        className={`text-base ${hasError('localidad') ? 'border-red-500' : ''}`}
                        placeholder="Ciudad, Provincia"
                        data-error={hasError('localidad')}
                    />
                    {hasError('localidad') && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {getFieldError('localidad')?.message}
                        </p>
                    )}
                </div>

                {/* Teléfono */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="telefono" className="text-base font-semibold">
                            Teléfono <span className="text-red-500">*</span>
                        </Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Lo usaremos para contactarte sobre la adopción</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Input
                        id="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => onInputChange('telefono', e.target.value)}
                        className={`text-base ${hasError('telefono') ? 'border-red-500' : ''}`}
                        placeholder="Ej: +54 388 123 4567"
                        data-error={hasError('telefono')}
                    />
                    {hasError('telefono') && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {getFieldError('telefono')?.message}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
