// constants.ts - Constantes para el formulario de adopción

import { Heart, CheckCircle2 } from 'lucide-react';
import { FormSection, FormData, Pet } from './types';

export const FORM_SECTIONS: FormSection[] = [
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

export const INITIAL_FORM_DATA: FormData = {
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

// Mock data para desarrollo - En producción esto vendría de la API
export const MOCK_PETS: Pet[] = [
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

export const STORAGE_KEYS = {
    FORM_DRAFT: 'adoptionFormDraft',
    SELECTED_PETS: 'adoptionSelectedPets',
    ADDITIONAL_PETS: 'adoptionAdditionalPets'
} as const;
