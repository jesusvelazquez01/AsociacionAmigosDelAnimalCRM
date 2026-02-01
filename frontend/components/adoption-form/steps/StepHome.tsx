'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertCircle, Info } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { StepProps } from '../types';

export default function StepHome({
    formData,
    onInputChange,
    hasError,
    getFieldError
}: StepProps) {
    return (
        <Card>
            <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">Información del Hogar</h2>
                    <p className="text-gray-600">
                        Queremos asegurarnos de que tu hogar sea perfecto para tu nueva mascota
                    </p>
                </div>

                {/* Personas en casa */}
                <div className="space-y-2">
                    <Label htmlFor="personas_en_casa" className="text-base font-semibold">
                        ¿Cuántas personas viven en la casa? <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="personas_en_casa"
                        type="number"
                        value={formData.personas_en_casa}
                        onChange={(e) => onInputChange('personas_en_casa', e.target.value)}
                        className={`text-base ${hasError('personas_en_casa') ? 'border-red-500' : ''}`}
                        placeholder="Ej: 4"
                        data-error={hasError('personas_en_casa')}
                    />
                    {hasError('personas_en_casa') && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {getFieldError('personas_en_casa')?.message}
                        </p>
                    )}
                </div>

                {/* Todos de acuerdo */}
                <div className="space-y-3">
                    <Label className="text-base font-semibold">
                        ¿Están todos de acuerdo en adoptar? <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                        value={formData.todos_de_acuerdo}
                        onValueChange={(value) => onInputChange('todos_de_acuerdo', value)}
                        className={hasError('todos_de_acuerdo') ? 'border-2 border-red-500 rounded-lg p-2' : ''}
                        data-error={hasError('todos_de_acuerdo')}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="si" id="acuerdo-si" />
                            <Label htmlFor="acuerdo-si" className="font-normal cursor-pointer">
                                Sí
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="acuerdo-no" />
                            <Label htmlFor="acuerdo-no" className="font-normal cursor-pointer">
                                No
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="tal_vez" id="acuerdo-tal-vez" />
                            <Label htmlFor="acuerdo-tal-vez" className="font-normal cursor-pointer">
                                Tal vez
                            </Label>
                        </div>
                    </RadioGroup>
                    {hasError('todos_de_acuerdo') && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {getFieldError('todos_de_acuerdo')?.message}
                        </p>
                    )}
                </div>

                {/* Composición familiar */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="composicion_familiar" className="text-base font-semibold">
                            Composición del núcleo familiar <span className="text-red-500">*</span>
                        </Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                                <p>
                                    Describe quiénes viven en tu casa y sus edades. Esto nos ayuda a
                                    encontrar la mascota perfecta para tu familia.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <p className="text-sm text-gray-600">
                        Relación y edades de las personas que viven en la casa
                    </p>
                    <Textarea
                        id="composicion_familiar"
                        value={formData.composicion_familiar}
                        onChange={(e) => onInputChange('composicion_familiar', e.target.value)}
                        className={`text-base min-h-[100px] ${hasError('composicion_familiar') ? 'border-red-500' : ''}`}
                        placeholder="Ej: Pareja (35 y 32 años), 2 hijos (8 y 5 años)"
                        data-error={hasError('composicion_familiar')}
                    />
                    {hasError('composicion_familiar') && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {getFieldError('composicion_familiar')?.message}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
