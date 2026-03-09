import { Metadata } from 'next';
import AdopcionClient from './AdopcionClient';
import { apiFetch } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Adopciones | Asociación Amigos del Animal',
  description: 'Conoce a nuestros perritos que están buscando un hogar lleno de amor. ¡Adopta, no compres!',
};

interface Pet {
    id: number;
    name: string;
    slug: string;
    age: string;
    description: string;
    gender: string;
    size: string;
    type: string;
    breed: string;
    color: string;
    status: string;
    image: string | null;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

interface ApiResponse {
    data: Pet[];
    meta: PaginationMeta;
}

export default async function AdopcionPage(
  props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
    const searchParams = await props.searchParams;
    let initialPets: Pet[] = [];
    let initialMeta: PaginationMeta | null = null;
    let serverError: string | null = null;

    try {
        const params = new URLSearchParams();
        
        if (searchParams?.page) params.append('page', String(searchParams.page));
        if (searchParams?.genero) params.append('genero', String(searchParams.genero));
        if (searchParams?.tamaño) params.append('tamaño', String(searchParams.tamaño));
        if (searchParams?.especie) params.append('especie', String(searchParams.especie));
        if (searchParams?.buscar) params.append('buscar', String(searchParams.buscar));

        // Fetching data with basic no-store (always fresh) or specific revalidation
        const response: ApiResponse = await apiFetch(`/rescataditos?${params.toString()}`, {
            cache: 'no-store'
        });

        initialPets = response.data || [];
        initialMeta = response.meta || null;
    } catch (error) {
        console.error("Error cargando rescataditos en servidor:", error);
        serverError = "No se pudieron cargar los rescataditos. Intenta más tarde.";
    }

    return (
        <AdopcionClient 
            initialPets={initialPets} 
            initialMeta={initialMeta} 
            serverError={serverError} 
        />
    );
}