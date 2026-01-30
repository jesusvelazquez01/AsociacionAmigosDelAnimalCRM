import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Heart, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StepProps } from '../types';

export const StepPersonal: React.FC<StepProps> = ({ formData, updateFormData, errors }) => {

    const getFieldError = (field: string) => errors.find(e => e.field === field);
    const hasError = (field: string) => !!getFieldError(field);

    return (
        <Card>
            <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Heart className="w-6 h-6 text-primary" /> Información Personal
                    </h2>
                    <p className="text-gray-600">Necesitamos conocerte mejor.</p>
                </div>

                {/* Campo Edad */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="edad">Edad <span className="text-red-500">*</span></Label>
                    </div>
                    <Input
                        id="edad"
                        type="number"
                        value={formData.edad}
                        onChange={(e) => updateFormData('edad', e.target.value)}
                        className={hasError('edad') ? 'border-red-500' : ''}
                        placeholder="Ej: 25"
                    />
                    {hasError('edad') && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" /> {getFieldError('edad')?.message}
                        </p>
                    )}
                </div>

                {/* Repetir para Domicilio, Localidad, Teléfono... */}
            </CardContent>
        </Card>
    );
};