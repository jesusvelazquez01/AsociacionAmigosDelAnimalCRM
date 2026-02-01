'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Info } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { StepProps } from '../types';

export default function StepPlans({
    formData,
    onInputChange,
    hasError,
    getFieldError
}: StepProps) {
    return (
        <Card>
            <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">Planes Futuros</h2>
                    <p className="text-gray-600">
                        La adopción es un compromiso a largo plazo. Ayúdanos a entender cómo planeas
                        manejar diferentes situaciones
                    </p>
                </div>

                {/* Plan vacaciones */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="plan_vacaciones" className="text-base font-semibold">
                            ¿Han pensado qué harán en vacaciones? <span className="text-red-500">*</span>
                        </Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                                <p>
                                    Queremos saber si has pensado en cómo cuidarás de tu mascota cuando
                                    vayas de vacaciones
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Textarea
                        id="plan_vacaciones"
                        value={formData.plan_vacaciones}
                        onChange={(e) => onInputChange('plan_vacaciones', e.target.value)}
                        className={`text-base min-h-[100px] ${hasError('plan_vacaciones') ? 'border-red-500' : ''}`}
                        placeholder="Ej: Lo llevaremos con nosotros / Se quedará con familiares / Contrataremos un cuidador..."
                        data-error={hasError('plan_vacaciones')}
                    />
                    {hasError('plan_vacaciones') && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {getFieldError('plan_vacaciones')?.message}
                        </p>
                    )}
                </div>

                {/* Plan embarazo/bebé */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="plan_embarazo_bebe" className="text-base font-semibold">
                            ¿Han pensado qué harán si hay un embarazo o llega un bebé?{' '}
                            <span className="text-red-500">*</span>
                        </Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                                <p>
                                    Es importante planificar cómo integrar a tu mascota con un nuevo bebé
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Textarea
                        id="plan_embarazo_bebe"
                        value={formData.plan_embarazo_bebe}
                        onChange={(e) => onInputChange('plan_embarazo_bebe', e.target.value)}
                        className={`text-base min-h-[100px] ${hasError('plan_embarazo_bebe') ? 'border-red-500' : ''}`}
                        placeholder="Explica cómo manejarías esta situación..."
                        data-error={hasError('plan_embarazo_bebe')}
                    />
                    {hasError('plan_embarazo_bebe') && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {getFieldError('plan_embarazo_bebe')?.message}
                        </p>
                    )}
                </div>

                {/* Plan alergia */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="plan_alergia" className="text-base font-semibold">
                            ¿Han pensado qué harán si alguien desarrolla alergia?{' '}
                            <span className="text-red-500">*</span>
                        </Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                                <p>
                                    Queremos asegurarnos de que has pensado en todas las posibilidades
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Textarea
                        id="plan_alergia"
                        value={formData.plan_alergia}
                        onChange={(e) => onInputChange('plan_alergia', e.target.value)}
                        className={`text-base min-h-[100px] ${hasError('plan_alergia') ? 'border-red-500' : ''}`}
                        placeholder="Explica cómo manejarías esta situación..."
                        data-error={hasError('plan_alergia')}
                    />
                    {hasError('plan_alergia') && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {getFieldError('plan_alergia')?.message}
                        </p>
                    )}
                </div>

                {/* Info Alert */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-blue-900 font-medium mb-1">Importante</p>
                            <p className="text-sm text-blue-700">
                                Toda la información proporcionada será verificada. La adopción es un
                                compromiso de por vida.
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
