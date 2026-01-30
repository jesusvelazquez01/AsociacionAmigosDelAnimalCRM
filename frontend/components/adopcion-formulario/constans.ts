import { Heart, CheckCircle2 } from 'lucide-react';

export const FORM_SECTIONS = [
    { id: 'pets', title: 'Selección de Mascotas', icon: Heart, description: 'Elige tu futuro compañero' },
    { id: 'personal', title: 'Información Personal', icon: CheckCircle2, description: 'Cuéntanos sobre ti' },
    { id: 'hogar', title: 'Tu Hogar', icon: CheckCircle2, description: 'Información de tu familia' },
    { id: 'animales', title: 'Otros Animales', icon: CheckCircle2, description: 'Tus mascotas actuales' },
    { id: 'planes', title: 'Planes Futuros', icon: CheckCircle2, description: 'Preparación a largo plazo' }
];

export const INITIAL_FORM_DATA = {
    edad: '', domicilio: '', localidad: '', telefono: '',
    personas_en_casa: '', todos_de_acuerdo: '', composicion_familiar: '',
    tiene_otros_animales: '', cuantos_animales: '', animales_castrados: '',
    motivo_no_castracion: '', animales_vacunados: '', animales_anteriores: '',
    plan_vacaciones: '', plan_embarazo_bebe: '', plan_alergia: ''
};