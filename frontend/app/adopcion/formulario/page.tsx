import { Suspense } from 'react';
import { AdoptionForm } from '@/components/adoption-form';
import PatitosCaminando from '@/components/ui/PatitosCaminando';

// Metadata para SEO
export const metadata = {
    title: 'Formulario de Adopción | Asociación Amigos del Animal',
    description: 'Completa el formulario para adoptar una mascota de nuestro refugio. Ayúdanos a encontrar un hogar para nuestros perritos.',
};

// Componente de loading para Suspense
function FormLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <PatitosCaminando mensaje="Preparando el formulario..." size="lg" />
        </div>
    );
}

// Server Component - Solo se encarga de servir el Client Component
export default async function AdoptionFormPage({
    searchParams,
}: {
    searchParams: Promise<{ petId?: string }>;
}) {
    const params = await searchParams;
    const petId = params.petId || null;

    return (
        <Suspense fallback={<FormLoading />}>
            <AdoptionForm initialPetId={petId} />
        </Suspense>
    );
}