'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ChevronLeft, ChevronRight, Heart, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

// Importaciones internas
import { PasoMascotas } from '.components/adopcion-formulario/pasos/PasoMascotas';
import { PasoDatosPersonales } from '.components/adopcion-formulario/pasos/PasoDatosPersonales';
import { PasoOtrosAnimales } from '.components/adopcion-formulario/pasos/PasoOtrosAnimales';
import { PasoPlanesFuturos } from '.components/adopcion-formulario/pasos/PasoPlanesFuturos';
import { FormNavegar } from '.components/adopcion-formulario/FormNavegar';
import { Exito } from '.components/adopcion-formulario/Exito';
import { FormData, Pet, FieldError } from '.components/adopcion-formulario/types';
import { FORM_SECTIONS, INITIAL_FORM_DATA } from '.components/adopcion-formulario/constants';
import { StepPersonal } from './pasos/PasoDatosPersonales';

export default function AdoptionForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const petId = searchParams.get('petId');

    // Estados
    const [currentSection, setCurrentSection] = useState(0);
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [additionalPets, setAdditionalPets] = useState<number[]>([]);
    const [availablePets, setAvailablePets] = useState<Pet[]>([]); // Cargar mocks aquí
    const [errors, setErrors] = useState<FieldError[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [loading, setLoading] = useState(true);

    // Efectos de carga (localStorage y Mocks)
    useEffect(() => {
        // ... (Tu lógica existente de useEffect para cargar datos y localStorage)
        // Simulación de carga
        setTimeout(() => setLoading(false), 500);
    }, [petId]);

    // Manejadores
    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => prev.filter(error => error.field !== field));
    };

    // Lógica de Validación (Extraída para limpiar, podrías moverla a un utils/validation.ts)
    const validateCurrentSection = () => {
        const newErrors: FieldError[] = [];
        // ... (Tu switch de validación existente aquí)
        // switch (currentSection) { ... }
        return newErrors;
    };

    const handleNext = () => {
        const sectionErrors = validateCurrentSection();
        if (sectionErrors.length > 0) {
            setErrors(sectionErrors);
            return;
        }
        setErrors([]);
        setCurrentSection(prev => Math.min(prev + 1, FORM_SECTIONS.length - 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrev = () => {
        setErrors([]);
        setCurrentSection(prev => Math.max(prev - 1, 0));
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        // ... (Tu lógica de envío)
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
            setShowConfirmDialog(false);
        }, 1500);
    };

    // Renderizado Condicional del Paso Actual
    const renderStep = () => {
        const props = {
            formData,
            updateFormData: handleInputChange,
            errors,
            // Props adicionales para Pets
            selectedPet,
            additionalPets,
            availablePets,
            onSelectPet: setSelectedPet,
            onToggleAdditionalPet: (id: number) => {
                setAdditionalPets(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
            }
        };

        switch (currentSection) {
            case 0: return <StepPets {...props} />;
            case 1: return <StepPersonal {...props} />;
            case 2: return <StepHome {...props} />;
            case 3: return <StepAnimals {...props} />;
            case 4: return <StepPlans {...props} />;
            default: return null;
        }
    };

    if (loading) return <div className="flex justify-center h-screen items-center"><Loader2 className="animate-spin" /></div>;
    if (submitted) return <SuccessView />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white pb-20">
            {/* Header y Navegación */}
            <FormNavigation
                currentSection={currentSection}
                totalSections={FORM_SECTIONS.length}
                onNavigate={(idx) => setCurrentSection(idx)}
            />

            {/* Contenido Principal */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSection}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>

                {/* Botones de Navegación */}
                <div className="flex gap-4 mt-8">
                    {currentSection > 0 && (
                        <Button variant="outline" onClick={handlePrev} className="rounded-full px-8">
                            <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
                        </Button>
                    )}
                    {currentSection < FORM_SECTIONS.length - 1 ? (
                        <Button onClick={handleNext} className="flex-1 rounded-full bg-primary text-white">
                            Siguiente <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button onClick={() => setShowConfirmDialog(true)} className="flex-1 rounded-full bg-primary text-white">
                            Revisar y Enviar <Heart className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Diálogo de Confirmación */}
            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar Adopción</DialogTitle>
                        <DialogDescription>Revisa tus datos antes de enviar.</DialogDescription>
                    </DialogHeader>
                    {/* ... Resumen de datos ... */}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancelar</Button>
                        <Button onClick={handleSubmit} disabled={submitting}>
                            {submitting ? <Loader2 className="animate-spin mr-2" /> : <CheckCircle2 className="mr-2" />}
                            Confirmar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}