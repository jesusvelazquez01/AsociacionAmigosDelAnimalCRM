'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Heart,
    ArrowLeft,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Plus,
    X,
    Dog,
    Cat,
    ChevronRight,
    ChevronLeft,
    Info,
    Check,
    AlertTriangle
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Pet {
    id: number;
    name: string;
    slug: string;
    age: string;
    type: string;
    image: string | null;
}

interface FormData {
    edad: string;
    domicilio: string;
    localidad: string;
    telefono: string;
    personas_en_casa: string;
    todos_de_acuerdo: string;
    composicion_familiar: string;
    tiene_otros_animales: string;
    cuantos_animales: string;
    animales_castrados: string;
    motivo_no_castracion: string;
    animales_vacunados: string;
    animales_anteriores: string;
    plan_vacaciones: string;
    plan_embarazo_bebe: string;
    plan_alergia: string;
}

interface FieldError {
    field: string;
    message: string;
}

const FORM_SECTIONS = [
    {
        id: 'pets',
        title: 'Selección de Mascotas',
        icon: Heart,
        description: 'Elige tu futuro compañero'
    },
    {
        id: 'personal',
        title: 'Información Personal',
        icon: CheckCircle2,
        description: 'Cuéntanos sobre ti'
    },
    {
        id: 'hogar',
        title: 'Tu Hogar',
        icon: CheckCircle2,
        description: 'Información de tu familia'
    },
    {
        id: 'animales',
        title: 'Otros Animales',
        icon: CheckCircle2,
        description: 'Tus mascotas actuales'
    },
    {
        id: 'planes',
        title: 'Planes Futuros',
        icon: CheckCircle2,
        description: 'Preparación a largo plazo'
    }
];

export default function AdoptionFormImproved() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const petId = searchParams.get('petId');

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

    const [formData, setFormData] = useState<FormData>({
        edad: '',
        domicilio: '',
        localidad: '',
        telefono: '',
        personas_en_casa: '',
        todos_de_acuerdo: '',
        composicion_familiar: '',
        tiene_otros_animales: '',
        cuantos_animales: '',
        animales_castrados: '',
        motivo_no_castracion: '',
        animales_vacunados: '',
        animales_anteriores: '',
        plan_vacaciones: '',
        plan_embarazo_bebe: '',
        plan_alergia: ''
    });

    // Cargar datos guardados al inicio
    useEffect(() => {
        const savedData = localStorage.getItem('adoptionFormDraft');
        const savedPets = localStorage.getItem('adoptionSelectedPets');
        const savedAdditionalPets = localStorage.getItem('adoptionAdditionalPets');

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

        // Mock data
        const mockPets: Pet[] = [
            {
                id: 1,
                name: 'Max',
                slug: 'max',
                age: '3 años',
                type: 'Perro',
                image: '/Foto-perritos/placeholder.jpg'
            },
            {
                id: 2,
                name: 'Luna',
                slug: 'luna',
                age: '2 años',
                type: 'Perro',
                image: '/Foto-perritos/placeholder.jpg'
            },
            {
                id: 3,
                name: 'Rocky',
                slug: 'rocky',
                age: '4 años',
                type: 'Perro',
                image: '/Foto-perritos/placeholder.jpg'
            },
            {
                id: 4,
                name: 'Bella',
                slug: 'bella',
                age: '1 año',
                type: 'Perro',
                image: '/Foto-perritos/placeholder.jpg'
            }
        ];

        setAvailablePets(mockPets);

        if (petId) {
            const pet = mockPets.find((p: Pet) => p.id === parseInt(petId));
            if (pet) {
                setSelectedPet(pet);
            }
        } else if (savedPets) {
            try {
                const parsed = JSON.parse(savedPets);
                const pet = mockPets.find((p: Pet) => p.id === parsed.id);
                if (pet) setSelectedPet(pet);
            } catch (e) {
                console.error('Error parsing saved pet:', e);
            }
        }

        setLoading(false);
    }, [petId]);

    // Guardar automáticamente
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('adoptionFormDraft', JSON.stringify(formData));
        }
    }, [formData, loading]);

    useEffect(() => {
        if (!loading && selectedPet) {
            localStorage.setItem('adoptionSelectedPets', JSON.stringify(selectedPet));
        }
    }, [selectedPet, loading]);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem('adoptionAdditionalPets', JSON.stringify(additionalPets));
        }
    }, [additionalPets, loading]);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setTouchedFields(prev => new Set(prev).add(field));

        // Limpiar errores del campo cuando el usuario empieza a escribir
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
                // No contar campos condicionales que no aplican
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
            // Scroll al primer error
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

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        // Validar todas las secciones
        let allErrors: FieldError[] = [];
        for (let i = 0; i < FORM_SECTIONS.length; i++) {
            const sectionErrors = validateSection(i);
            allErrors = [...allErrors, ...sectionErrors];
        }

        if (allErrors.length > 0) {
            setErrors(allErrors);
            // Ir a la primera sección con errores
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
            localStorage.removeItem('adoptionFormDraft');
            localStorage.removeItem('adoptionSelectedPets');
            localStorage.removeItem('adoptionAdditionalPets');

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
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-white px-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-center"
                >
                    <div className="bg-green-100 rounded-full p-6 inline-block mb-6">
                        <CheckCircle2 className="w-16 h-16 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        ¡Formulario Enviado!
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-md">
                        Gracias por tu interés en adoptar. Nos pondremos en contacto contigo muy pronto.
                    </p>
                    <Button asChild className="bg-primary hover:bg-primary/90 rounded-full px-8 py-6 text-lg">
                        <Link href="/adopcion">
                            <Heart className="w-5 h-5 mr-2" />
                            Volver a Adopción
                        </Link>
                    </Button>
                </motion.div>
            </div>
        );
    }

    const progress = calculateProgress();

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
                {/* Header */}
                <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between mb-4">
                            <Button
                                asChild
                                variant="ghost"
                                className="text-gray-600 hover:text-primary"
                            >
                                <Link href="/adopcion">
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Volver
                                </Link>
                            </Button>
                            <h1 className="text-xl font-bold text-gray-900">Formulario de Adopción</h1>
                            <Badge variant="secondary" className="hidden sm:flex">
                                {progress}% Completado
                            </Badge>
                        </div>

                        {/* Progress bar */}
                        <div className="space-y-2">
                            <Progress value={progress} className="h-2" />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Progreso del formulario</span>
                                <span>{progress}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Navigation */}
                <div className="bg-white border-b">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex overflow-x-auto py-4 gap-2">
                            {FORM_SECTIONS.map((section, index) => {
                                const sectionErrors = validateSection(index);
                                const isCompleted = sectionErrors.length === 0 && (
                                    index < currentSection ||
                                    (index === currentSection && progress === 100)
                                );
                                const isCurrent = index === currentSection;

                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => {
                                            if (index < currentSection || validateSection(currentSection).length === 0) {
                                                setCurrentSection(index);
                                                setErrors([]);
                                            }
                                        }}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${isCurrent
                                                ? 'bg-primary text-white shadow-md'
                                                : isCompleted
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {isCompleted ? (
                                            <Check className="w-4 h-4" />
                                        ) : (
                                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                                                {index + 1}
                                            </span>
                                        )}
                                        <span className="text-sm font-medium hidden sm:inline">
                                            {section.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" ref={formRef}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSection}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Section: Mascotas */}
                            {currentSection === 0 && (
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
                                                    onClick={() => setShowAdditionalPets(!showAdditionalPets)}
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
                                                                    onClick={() => toggleAdditionalPet(pet.id)}
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
                            )}

                            {/* Section: Personal */}
                            {currentSection === 1 && (
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
                                                onChange={(e) => handleInputChange('edad', e.target.value)}
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
                                                onChange={(e) => handleInputChange('domicilio', e.target.value)}
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
                                                onChange={(e) => handleInputChange('localidad', e.target.value)}
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
                                                onChange={(e) => handleInputChange('telefono', e.target.value)}
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
                            )}

                            {/* Section: Hogar */}
                            {currentSection === 2 && (
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
                                                onChange={(e) => handleInputChange('personas_en_casa', e.target.value)}
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
                                                onValueChange={(value) => handleInputChange('todos_de_acuerdo', value)}
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
                                                onChange={(e) => handleInputChange('composicion_familiar', e.target.value)}
                                                className={`text-base min-h-[100px] ${hasError('composicion_familiar') ? 'border-red-500' : ''
                                                    }`}
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
                            )}

                            {/* Section: Otros Animales */}
                            {currentSection === 3 && (
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
                                                onValueChange={(value) => handleInputChange('tiene_otros_animales', value)}
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
                                                        onChange={(e) => handleInputChange('cuantos_animales', e.target.value)}
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
                                                        onValueChange={(value) =>
                                                            handleInputChange('animales_castrados', value)
                                                        }
                                                        className={
                                                            hasError('animales_castrados')
                                                                ? 'border-2 border-red-500 rounded-lg p-2'
                                                                : ''
                                                        }
                                                        data-error={hasError('animales_castrados')}
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="si" id="castrados-si" />
                                                            <Label
                                                                htmlFor="castrados-si"
                                                                className="font-normal cursor-pointer"
                                                            >
                                                                Sí
                                                            </Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="no" id="castrados-no" />
                                                            <Label
                                                                htmlFor="castrados-no"
                                                                className="font-normal cursor-pointer"
                                                            >
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
                                                        onChange={(e) =>
                                                            handleInputChange('motivo_no_castracion', e.target.value)
                                                        }
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
                                                        onValueChange={(value) =>
                                                            handleInputChange('animales_vacunados', value)
                                                        }
                                                        className={
                                                            hasError('animales_vacunados')
                                                                ? 'border-2 border-red-500 rounded-lg p-2'
                                                                : ''
                                                        }
                                                        data-error={hasError('animales_vacunados')}
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="si" id="vacunados-si" />
                                                            <Label
                                                                htmlFor="vacunados-si"
                                                                className="font-normal cursor-pointer"
                                                            >
                                                                Sí
                                                            </Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="no" id="vacunados-no" />
                                                            <Label
                                                                htmlFor="vacunados-no"
                                                                className="font-normal cursor-pointer"
                                                            >
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
                                                onChange={(e) => handleInputChange('animales_anteriores', e.target.value)}
                                                className={`text-base min-h-[100px] ${hasError('animales_anteriores') ? 'border-red-500' : ''
                                                    }`}
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
                            )}

                            {/* Section: Planes Futuros */}
                            {currentSection === 4 && (
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
                                                onChange={(e) => handleInputChange('plan_vacaciones', e.target.value)}
                                                className={`text-base min-h-[100px] ${hasError('plan_vacaciones') ? 'border-red-500' : ''
                                                    }`}
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
                                                onChange={(e) => handleInputChange('plan_embarazo_bebe', e.target.value)}
                                                className={`text-base min-h-[100px] ${hasError('plan_embarazo_bebe') ? 'border-red-500' : ''
                                                    }`}
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
                                                onChange={(e) => handleInputChange('plan_alergia', e.target.value)}
                                                className={`text-base min-h-[100px] ${hasError('plan_alergia') ? 'border-red-500' : ''
                                                    }`}
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
                                className="border-2 border-gray-300 hover:border-primary rounded-full px-8 py-6 text-lg"
                            >
                                <ChevronLeft className="w-5 h-5 mr-2" />
                                Anterior
                            </Button>
                        )}

                        {currentSection < FORM_SECTIONS.length - 1 ? (
                            <Button
                                type="button"
                                onClick={handleNextSection}
                                className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                            >
                                Siguiente
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                onClick={() => handleSubmit()}
                                disabled={submitting}
                                className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
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
                            className="mt-6 bg-red-50 border-2 border-red-200 rounded-lg p-4"
                        >
                            <div className="flex gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm text-red-900 font-medium mb-2">
                                        Por favor completa los siguientes campos:
                                    </p>
                                    <ul className="text-sm text-red-700 space-y-1">
                                        {errors.map((error, index) => (
                                            <li key={index}>• {error.message}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    )}
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