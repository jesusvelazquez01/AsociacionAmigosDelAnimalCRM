// Server Component: obtiene los datos en el servidor con fetch nativo de Next.js (sin Axios)
import { notFound } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import DetalleAnimalClient, { Pet, RelatedPet } from './DetalleAnimalClient';

interface ApiListResponse {
    data: RelatedPet[];
}

export default async function AnimalDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // Fetch paralelo con Promise.allSettled: si uno falla, el otro no se bloquea
    const [mascotaResult, listadoResult] = await Promise.allSettled([
        apiFetch<Pet>(`/rescataditos/${slug}`, { cache: 'no-store' }),
        apiFetch<ApiListResponse | RelatedPet[]>('/rescataditos', { cache: 'no-store' }),
    ]);

    // Si no se pudo cargar la mascota principal → 404
    if (mascotaResult.status === 'rejected') {
        notFound();
    }

    const pet = mascotaResult.value;

    // Mascotas relacionadas (sin la actual, máximo 4)
    const todosResult = listadoResult.status === 'fulfilled' ? listadoResult.value : null;
    const todos: RelatedPet[] = todosResult
        ? Array.isArray(todosResult) ? todosResult : (todosResult as ApiListResponse).data || []
        : [];
    const relatedPets = todos.filter((p) => p.slug !== slug).slice(0, 4);

    // Construir URLs de galería
    const galleryImages: string[] = pet.gallery && pet.gallery.length > 0
        ? pet.gallery.map((img) => img.webp || img.original)
        : pet.image
            ? [pet.image]
            : ['/Foto-perritos/placeholder.jpg'];

    return (
        <DetalleAnimalClient
            pet={pet}
            relatedPets={relatedPets}
            galleryImages={galleryImages}
        />
    );
}