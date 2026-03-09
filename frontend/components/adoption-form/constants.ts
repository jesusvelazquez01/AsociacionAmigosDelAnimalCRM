// constants.ts - Constantes para el formulario de adopción

import { Heart, CheckCircle2 } from 'lucide-react';
import { FormSection, FormData, Pet } from './types';

export const FORM_SECTIONS: FormSection[] = [
    {
        id: 'pets',
        title: 'Selección de Rescataditos',
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

export const INITIAL_FORM_DATA: FormData = {
    nombre_completo: '',
    email: '',
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
};



export const STORAGE_KEYS = {
    FORM_DRAFT: 'adoptionFormDraft',
    SELECTED_PETS: 'adoptionSelectedPets',
    ADDITIONAL_PETS: 'adoptionAdditionalPets'
} as const;
