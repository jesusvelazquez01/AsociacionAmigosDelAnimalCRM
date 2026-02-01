// types.ts - Tipos e interfaces para el formulario de adopción

import { LucideIcon } from 'lucide-react';

export interface Pet {
    id: number;
    name: string;
    slug: string;
    age: string;
    type: string;
    image: string | null;
}

export interface FormData {
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

export interface FieldError {
    field: string;
    message: string;
}

export interface FormSection {
    id: string;
    title: string;
    icon: LucideIcon;
    description: string;
}

export interface AdoptionFormProps {
    initialPetId?: string | null;
}

export interface StepProps {
    formData: FormData;
    onInputChange: (field: keyof FormData, value: string) => void;
    hasError: (field: string) => boolean;
    getFieldError: (field: string) => FieldError | undefined;
}

export interface StepPetsProps {
    selectedPet: Pet | null;
    additionalPets: number[];
    availablePets: Pet[];
    showAdditionalPets: boolean;
    onToggleAdditionalPets: () => void;
    onToggleAdditionalPet: (id: number) => void;
    hasError: (field: string) => boolean;
    getFieldError: (field: string) => FieldError | undefined;
}

export interface FormNavigationProps {
    sections: FormSection[];
    currentSection: number;
    onSectionChange: (index: number) => void;
    validateSection: (index: number) => FieldError[];
    progress: number;
}

export interface SuccessViewProps {
    onNavigateToAdoption?: () => void;
}
