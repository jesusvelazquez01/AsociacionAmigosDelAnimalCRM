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

// Props comunes para los componentes de cada paso
export interface StepProps {
    formData: FormData;
    updateFormData: (field: keyof FormData, value: string) => void;
    errors: FieldError[];
    // Props específicas para el paso de mascotas
    selectedPet?: Pet | null;
    additionalPets?: number[];
    availablePets?: Pet[];
    onSelectPet?: (pet: Pet) => void;
    onToggleAdditionalPet?: (id: number) => void;
}