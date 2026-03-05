'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';

// Import local components
import HeroAdopcion from './components/HeroAdopcion';
import FiltrosAdopcion from './components/FiltrosAdopcion';
import GrillaMascotas from './components/GrillaMascotas';
import LlamadoAAccion from './components/LlamadoAAccion';

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

interface AdopcionClientProps {
  initialPets: Pet[];
  initialMeta: PaginationMeta | null;
  serverError: string | null;
}

export default function AdopcionClient({ initialPets, initialMeta, serverError }: AdopcionClientProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const { trackPetSearched } = useAnalytics();
  
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estados de filtros iniciados desde la URL
  const [typeFilter, setTypeFilter] = useState<string>(searchParams.get('especie') || 'Todos');
  const [genderFilter, setGenderFilter] = useState<string>(searchParams.get('genero') || 'Todos');
  const [sizeFilter, setSizeFilter] = useState<string>(searchParams.get('tamaño') || 'Todos');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('buscar') || '');
  const [debouncedSearch, setDebouncedSearch] = useState<string>(searchQuery);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10));

  // Estados de checkboxes de comportamiento (siguen siendo locales por ahora)
  const [goodWithKids, setGoodWithKids] = useState(false);
  const [goodWithCats, setGoodWithCats] = useState(false);
  const [goodWithDogs, setGoodWithDogs] = useState(false);
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [isSterilized, setIsSterilized] = useState(false);

  // Estado para mostrar/ocultar filtros en móvil
  const [showFilters, setShowFilters] = useState(false);

  // Estados de datos locales para mantener la UI
  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [meta, setMeta] = useState<PaginationMeta | null>(initialMeta);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(serverError);

  // Si cambian los props desde el servidor (por la navegación), actualizamos el estado local
  useEffect(() => {
    setPets(initialPets);
    setMeta(initialMeta);
    setError(serverError);
    setLoading(false);
  }, [initialPets, initialMeta, serverError]);

  // Debounce del buscador (300ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page cuando cambian filtros principales (no provocados por URL inicialmente)
  useEffect(() => {
      // Prevenimos reset si no estamos cambiando parámetros activamente para evitar loop infinito al montar
      // Esta lógica se maneja ya que si un filtro cambia, currentPage debería ser 1
  }, [genderFilter, sizeFilter, typeFilter, debouncedSearch]);

  const handleFilterChange = useCallback(() => {
      // Usamos un pequeño loading ficticio para mostrar transición mientras el SSR ocurre
      setLoading(true);

      const params = new URLSearchParams(searchParams.toString());
      
      if (genderFilter !== 'Todos') params.set('genero', genderFilter); else params.delete('genero');
      if (sizeFilter !== 'Todos') params.set('tamaño', sizeFilter); else params.delete('tamaño');
      if (typeFilter !== 'Todos') params.set('especie', typeFilter); else params.delete('especie');
      if (debouncedSearch) params.set('buscar', debouncedSearch); else params.delete('buscar');
      if (currentPage > 1) params.set('page', currentPage.toString()); else params.delete('page');

      const path = `/adopcion${params.toString() ? `?${params.toString()}` : ''}`;
      // Usamos scroll false para evitar saltos en la UI mientras filtra
      router.push(path, { scroll: false });
  }, [genderFilter, sizeFilter, typeFilter, debouncedSearch, currentPage, searchParams, router]);

  // Disparar actualización de ruta cuando los filtros cambian
  useEffect(() => {
      // Para evitar disparar de inmediato en el montaje inicial si la URL ya tiene los parámetros
      const currentGenero = searchParams.get('genero') || 'Todos';
      const currentSize = searchParams.get('tamaño') || 'Todos';
      const currentType = searchParams.get('especie') || 'Todos';
      const currentQuery = searchParams.get('buscar') || '';
      const currentPg = parseInt(searchParams.get('page') || '1', 10);

      // Solo push si hay una diferencia (usuario interagió con el estado local)
      if (
          genderFilter !== currentGenero ||
          sizeFilter !== currentSize ||
          typeFilter !== currentType ||
          debouncedSearch !== currentQuery ||
          currentPage !== currentPg
      ) {
          handleFilterChange();
      }
  }, [genderFilter, sizeFilter, typeFilter, debouncedSearch, currentPage, searchParams, handleFilterChange]);
  
  // Tracking de búsqueda
  useEffect(() => {
    if (debouncedSearch) trackPetSearched({ search_term: debouncedSearch });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Limpiar filtros
  const clearFilters = () => {
    setTypeFilter('Todos');
    setGenderFilter('Todos');
    setSizeFilter('Todos');
    setSearchQuery('');
    setGoodWithKids(false);
    setGoodWithCats(false);
    setGoodWithDogs(false);
    setIsVaccinated(false);
    setIsSterilized(false);
    setCurrentPage(1);
  };

  const hasActiveFilters = genderFilter !== 'Todos' || sizeFilter !== 'Todos' || typeFilter !== 'Todos' ||
    goodWithKids || goodWithCats || goodWithDogs || isVaccinated || isSterilized || searchQuery !== '';

  return (
    <div className="bg-background overflow-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[60]" style={{ scaleX }} />

      <HeroAdopcion totalMascotas={meta?.total} />

      <section className="furs-section bg-background">
        <div className="furs-container">
          <div className="lg:hidden mb-6">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full rounded-xl py-6 text-base font-medium"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
              {hasActiveFilters && (
                <Badge className="ml-2 bg-primary text-white rounded-full">
                  {[genderFilter !== 'Todos', sizeFilter !== 'Todos', typeFilter !== 'Todos', goodWithCats, goodWithDogs, searchQuery !== ''].filter(Boolean).length}
                </Badge>
              )}
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className={`lg:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="lg:sticky lg:top-24">
                <FiltrosAdopcion
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  typeFilter={typeFilter}
                  setTypeFilter={setTypeFilter}
                  genderFilter={genderFilter}
                  setGenderFilter={setGenderFilter}
                  sizeFilter={sizeFilter}
                  setSizeFilter={setSizeFilter}
                  hasActiveFilters={hasActiveFilters}
                  clearFilters={clearFilters}
                  totalMascotas={meta?.total}
                  loading={loading}
                />
              </div>
            </aside>

            <GrillaMascotas
              pets={pets}
              meta={meta}
              loading={loading}
              error={error}
              hasActiveFilters={hasActiveFilters}
              clearFilters={clearFilters}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </section>
      
      <LlamadoAAccion />
    </div>
  );
}
