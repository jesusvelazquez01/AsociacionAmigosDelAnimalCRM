'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Heart,
    Loader2,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    AlertTriangle
} from 'lucide-react';
import {
    TooltipProvider,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Pet, FormData, FieldError, AdoptionFormProps } from './types';
import { FORM_SECTIONS, INITIAL_FORM_DATA, MOCK_PETS, STORAGE_KEYS } from './constants';
import FormNavigation, { MobileNavigation } from './FormNavigation';
import SuccessView from './SuccessView';
import StepPets from './steps/StepPets';
import StepPersonal from './steps/StepPersonal';
import StepHome from './steps/StepHome';
import StepAnimals from './steps/StepAnimals';
import StepPlans from './steps/StepPlans';

export default function AdoptionForm({ initialPetId }: AdoptionFormProps) {
    const router = useRouter();

    const [currentSection, setCurrentSection] = useState(0);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [additionalPets, setAdditionalPets] = useState<number[]>([]);
    const [availablePets, setAvailablePets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showAdditionalPets, setShowAdditionalPets] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [errors, setErrors] = useState<FieldError[]>([]);
    const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
    const formRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

    // Cargar datos guardados al inicio
    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEYS.FORM_DRAFT);
        const savedPets = localStorage.getItem(STORAGE_KEYS.SELECTED_PETS);
        const savedAdditionalPets = localStorage.getItem(STORAGE_KEYS.ADDITIONAL_PETS);

        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setFormData(parsed);
            } catch (e) {
                console.error('Error parsing saved data:', e);
            }
        }

        if (savedAdditionalPets) {
            try {
                const parsed = JSON.parse(savedAdditionalPets);
                setAdditionalPets(parsed);
            } catch (e) {
                console.error('Error parsing saved pets:', e);
            }
        }

        // TODO: Reemplazar mock data con datos de API
        setAvailablePets(MOCK_PETS);

        if (initialPetId) {
            const pet = MOCK_PETS.find((p: Pet) => p.id === parseInt(initialPetId));
            if (pet) {
                setSelectedPet(pet);
            }
        } else if (savedPets) {
            try {
                const parsed = JSON.parse(savedPets);
                const pet = MOCK_PETS.find((p: Pet) => p.id === parsed.id);
                if (pet) setSelectedPet(pet);
            } catch (e) {
                console.error('Error parsing saved pet:', e);
            }
        }

        setLoading(false);
    }, [initialPetId]);

    // Guardar automáticamente
    useEffect(() => {
        if (!loading) {
            localStorage.setItem(STORAGE_KEYS.FORM_DRAFT, JSON.stringify(formData));
        }
    }, [formData, loading]);

    useEffect(() => {
        if (!loading && selectedPet) {
            localStorage.setItem(STORAGE_KEYS.SELECTED_PETS, JSON.stringify(selectedPet));
        }
    }, [selectedPet, loading]);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem(STORAGE_KEYS.ADDITIONAL_PETS, JSON.stringify(additionalPets));
        }
    }, [additionalPets, loading]);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setTouchedFields(prev => new Set(prev).add(field));
        setErrors(prev => prev.filter(error => error.field !== field));
    };

    const toggleAdditionalPet = (id: number) => {
        setAdditionalPets(prev =>
            prev.includes(id) ? prev.filter(petId => petId !== id) : [...prev, id]
        );
    };

    // Validación de sección
    const validateSection = (section: number): FieldError[] => {
        const newErrors: FieldError[] = [];

        switch (section) {
            case 0: // Mascotas
                if (!selectedPet && additionalPets.length === 0) {
                    newErrors.push({
                        field: 'selectedPet',
                        message: 'Debes seleccionar al menos una mascota para adoptar'
                    });
                }
                break;

            case 1: // Personal
                if (!formData.edad) {
                    newErrors.push({ field: 'edad', message: 'La edad es requerida' });
                } else if (parseInt(formData.edad) < 18) {
                    newErrors.push({ field: 'edad', message: 'Debes ser mayor de 18 años para adoptar' });
                }
                if (!formData.domicilio) {
                    newErrors.push({ field: 'domicilio', message: 'El domicilio es requerido' });
                }
                if (!formData.localidad) {
                    newErrors.push({ field: 'localidad', message: 'La localidad es requerida' });
                }
                if (!formData.telefono) {
                    newErrors.push({ field: 'telefono', message: 'El teléfono es requerido' });
                }
                break;

            case 2: // Hogar
                if (!formData.personas_en_casa) {
                    newErrors.push({ field: 'personas_en_casa', message: 'Este campo es requerido' });
                }
                if (!formData.todos_de_acuerdo) {
                    newErrors.push({ field: 'todos_de_acuerdo', message: 'Este campo es requerido' });
                }
                if (!formData.composicion_familiar) {
                    newErrors.push({ field: 'composicion_familiar', message: 'Este campo es requerido' });
                }
                break;

            case 3: // Animales
                if (!formData.tiene_otros_animales) {
                    newErrors.push({ field: 'tiene_otros_animales', message: 'Este campo es requerido' });
                }
                if (formData.tiene_otros_animales === 'si') {
                    if (!formData.animales_castrados) {
                        newErrors.push({ field: 'animales_castrados', message: 'Este campo es requerido' });
                    }
                    if (!formData.animales_vacunados) {
                        newErrors.push({ field: 'animales_vacunados', message: 'Este campo es requerido' });
                    }
                }
                if (!formData.animales_anteriores) {
                    newErrors.push({ field: 'animales_anteriores', message: 'Este campo es requerido' });
                }
                break;

            case 4: // Planes
                if (!formData.plan_vacaciones) {
                    newErrors.push({ field: 'plan_vacaciones', message: 'Este campo es requerido' });
                }
                if (!formData.plan_embarazo_bebe) {
                    newErrors.push({ field: 'plan_embarazo_bebe', message: 'Este campo es requerido' });
                }
                if (!formData.plan_alergia) {
                    newErrors.push({ field: 'plan_alergia', message: 'Este campo es requerido' });
                }
                break;
        }

        return newErrors;
    };

    // Calcular progreso
    const calculateProgress = () => {
        const totalFields = 16;
        let filledFields = 0;

        if (selectedPet || additionalPets.length > 0) filledFields++;
        Object.entries(formData).forEach(([key, value]) => {
            if (value && value.trim() !== '') {
                if (key === 'cuantos_animales' && formData.tiene_otros_animales !== 'si') return;
                if (key === 'animales_castrados' && formData.tiene_otros_animales !== 'si') return;
                if (key === 'motivo_no_castracion' && formData.animales_castrados !== 'no') return;
                if (key === 'animales_vacunados' && formData.tiene_otros_animales !== 'si') return;

                filledFields++;
            }
        });

        return Math.round((filledFields / totalFields) * 100);
    };

    const handleNextSection = () => {
        const sectionErrors = validateSection(currentSection);

        if (sectionErrors.length > 0) {
            setErrors(sectionErrors);
            setTimeout(() => {
                const firstErrorElement = document.querySelector('[data-error="true"]');
                if (firstErrorElement) {
                    firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
            return;
        }

        setErrors([]);
        if (currentSection < FORM_SECTIONS.length - 1) {
            setCurrentSection(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrevSection = () => {
        setErrors([]);
        if (currentSection > 0) {
            setCurrentSection(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSectionChange = (index: number) => {
        setCurrentSection(index);
        setErrors([]);
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        let allErrors: FieldError[] = [];
        for (let i = 0; i < FORM_SECTIONS.length; i++) {
            const sectionErrors = validateSection(i);
            allErrors = [...allErrors, ...sectionErrors];
        }

        if (allErrors.length > 0) {
            setErrors(allErrors);
            const firstErrorSection = FORM_SECTIONS.findIndex((_, index) =>
                validateSection(index).length > 0
            );
            if (firstErrorSection !== -1) {
                setCurrentSection(firstErrorSection);
            }
            return;
        }

        setShowConfirmDialog(true);
    };

    const confirmSubmit = async () => {
        setShowConfirmDialog(false);
        setSubmitting(true);

        try {
            const allPetIds = selectedPet ? [selectedPet.id, ...additionalPets] : additionalPets;

            const payload = {
                ...formData,
                pet_ids: allPetIds,
                primary_pet_id: selectedPet?.id
            };

            console.log('Formulario enviado (simulado):', payload);
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Limpiar localStorage
            localStorage.removeItem(STORAGE_KEYS.FORM_DRAFT);
            localStorage.removeItem(STORAGE_KEYS.SELECTED_PETS);
            localStorage.removeItem(STORAGE_KEYS.ADDITIONAL_PETS);

            setSubmitted(true);

            setTimeout(() => {
                router.push('/adopcion');
            }, 3000);
        } catch (error) {
            console.error('Error enviando formulario:', error);
            alert('Hubo un error al enviar el formulario. Por favor intenta nuevamente.');
        } finally {
            setSubmitting(false);
        }
    };

    const getFieldError = (field: string) => {
        return errors.find(error => error.field === field);
    };

    const hasError = (field: string) => {
        return !!getFieldError(field);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (submitted) {
        return <SuccessView />;
    }

    const progress = calculateProgress();

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-background flex">
                {/* Sidebar Navigation - Desktop */}
                <FormNavigation
                    sections={FORM_SECTIONS}
                    currentSection={currentSection}
                    onSectionChange={handleSectionChange}
                    validateSection={validateSection}
                    progress={progress}
                />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-h-screen">
                    {/* Mobile Navigation - Header */}
                    <MobileNavigation
                        sections={FORM_SECTIONS}
                        currentSection={currentSection}
                        onSectionChange={handleSectionChange}
                        validateSection={validateSection}
                        progress={progress}
                    />

                    {/* Form Content */}
                    <main className="flex-1 bg-gradient-to-br from-secondary/20 via-background to-primary/5">
                        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12" ref={formRef}>
                            {/* Section Header */}
                            <div className="mb-8">
                                <motion.div
                                    key={`header-${currentSection}`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="hidden lg:block"
                                >
                                    <span className="text-sm font-medium text-primary">
                                        Paso {currentSection + 1} de {FORM_SECTIONS.length}
                                    </span>
                                    <h2 className="text-3xl font-bold text-foreground mt-1">
                                        {FORM_SECTIONS[currentSection].title}
                                    </h2>
                                    <p className="text-muted-foreground mt-2">
                                        {FORM_SECTIONS[currentSection].description}
                                    </p>
                                </motion.div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSection}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {currentSection === 0 && (
                                        <StepPets
                                            selectedPet={selectedPet}
                                            additionalPets={additionalPets}
                                            availablePets={availablePets}
                                            showAdditionalPets={showAdditionalPets}
                                            onToggleAdditionalPets={() => setShowAdditionalPets(!showAdditionalPets)}
                                            onToggleAdditionalPet={toggleAdditionalPet}
                                            hasError={hasError}
                                            getFieldError={getFieldError}
                                        />
                                    )}

                                    {currentSection === 1 && (
                                        <StepPersonal
                                            formData={formData}
                                            onInputChange={handleInputChange}
                                            hasError={hasError}
                                            getFieldError={getFieldError}
                                        />
                                    )}

                                    {currentSection === 2 && (
                                        <StepHome
                                            formData={formData}
                                            onInputChange={handleInputChange}
                                            hasError={hasError}
                                            getFieldError={getFieldError}
                                        />
                                    )}

                                    {currentSection === 3 && (
                                        <StepAnimals
                                            formData={formData}
                                            onInputChange={handleInputChange}
                                            hasError={hasError}
                                            getFieldError={getFieldError}
                                        />
                                    )}

                                    {currentSection === 4 && (
                                        <StepPlans
                                            formData={formData}
                                            onInputChange={handleInputChange}
                                            hasError={hasError}
                                            getFieldError={getFieldError}
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                {currentSection > 0 && (
                                    <Button
                                        type="button"
                                        onClick={handlePrevSection}
                                        variant="outline"
                                        className="border-2 border-border hover:border-primary rounded-xl px-6 py-6 text-base"
                                    >
                                        <ChevronLeft className="w-5 h-5 mr-2" />
                                        Anterior
                                    </Button>
                                )}

                                {currentSection < FORM_SECTIONS.length - 1 ? (
                                    <Button
                                        type="button"
                                        onClick={handleNextSection}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-6 text-base font-bold shadow-lg shadow-primary/25 hover:shadow-xl transition-all"
                                    >
                                        Siguiente
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        onClick={() => handleSubmit()}
                                        disabled={submitting}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-6 text-base font-bold shadow-lg shadow-primary/25 hover:shadow-xl transition-all"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                <Heart className="w-5 h-5 mr-2" />
                                                Enviar Solicitud
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>

                            {/* Errors Summary */}
                            {errors.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 bg-destructive/10 border border-destructive/30 rounded-xl p-4"
                                >
                                    <div className="flex gap-3">
                                        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-sm text-destructive font-medium mb-2">
                                                Por favor completa los siguientes campos:
                                            </p>
                                            <ul className="text-sm text-destructive/80 space-y-1">
                                                {errors.map((error, index) => (
                                                    <li key={index}>• {error.message}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </main>
                </div>

                {/* Confirmation Dialog */}
                <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl flex items-center gap-2">
                                <Heart className="w-6 h-6 text-primary" />
                                Confirmar Solicitud de Adopción
                            </DialogTitle>
                            <DialogDescription className="text-base pt-4">
                                Por favor revisa tu información antes de enviar
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 max-h-[60vh] overflow-y-auto py-4">
                            {/* Mascotas seleccionadas */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Mascotas seleccionadas:</h4>
                                <div className="space-y-2">
                                    {selectedPet && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Badge>Principal</Badge>
                                            <span>{selectedPet.name}</span>
                                        </div>
                                    )}
                                    {additionalPets.map(petId => {
                                        const pet = availablePets.find(p => p.id === petId);
                                        return pet ? (
                                            <div key={pet.id} className="flex items-center gap-2 text-sm">
                                                <Badge variant="secondary">Adicional</Badge>
                                                <span>{pet.name}</span>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            </div>

                            {/* Información personal */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Información Personal:</h4>
                                <div className="text-sm space-y-1 text-gray-600">
                                    <p>Edad: {formData.edad} años</p>
                                    <p>Domicilio: {formData.domicilio}</p>
                                    <p>Localidad: {formData.localidad}</p>
                                    <p>Teléfono: {formData.telefono}</p>
                                </div>
                            </div>

                            {/* Información del hogar */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Información del Hogar:</h4>
                                <div className="text-sm space-y-1 text-gray-600">
                                    <p>Personas en casa: {formData.personas_en_casa}</p>
                                    <p>Todos de acuerdo: {formData.todos_de_acuerdo}</p>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="flex-col sm:flex-row gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowConfirmDialog(false)}
                                className="w-full sm:w-auto"
                            >
                                Revisar
                            </Button>
                            <Button
                                type="button"
                                onClick={confirmSubmit}
                                disabled={submitting}
                                className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                        Confirmar y Enviar
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </TooltipProvider>
    );
}
