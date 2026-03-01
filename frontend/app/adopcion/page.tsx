'use client';

import React, { useState, useEffect, useCallback } from 'react';
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

interface ApiResponse {
  data: Pet[];
  meta: PaginationMeta;
}

export default function AdopcionPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const { trackPetSearched } = useAnalytics();

  // Estados de filtros
  const [typeFilter, setTypeFilter] = useState<string>('Todos');
  const [genderFilter, setGenderFilter] = useState<string>('Todos');
  const [sizeFilter, setSizeFilter] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  // Estados de checkboxes de comportamiento
  const [goodWithKids, setGoodWithKids] = useState(false);
  const [goodWithCats, setGoodWithCats] = useState(false);
  const [goodWithDogs, setGoodWithDogs] = useState(false);
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [isSterilized, setIsSterilized] = useState(false);

  // Estado para mostrar/ocultar filtros en móvil
  const [showFilters, setShowFilters] = useState(false);

  // Estados de datos
  const [pets, setPets] = useState<Pet[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce del buscador (300ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch con filtros y paginación
  const fetchPets = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());

      if (genderFilter !== 'Todos') params.append('genero', genderFilter);
      if (sizeFilter !== 'Todos') params.append('tamaño', sizeFilter);
      if (typeFilter !== 'Todos') params.append('especie', typeFilter);
      if (debouncedSearch) params.append('buscar', debouncedSearch);

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
      const res = await fetch(`${API_URL}/rescataditos?${params.toString()}`, {
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);
      const response: ApiResponse = await res.json();

      setPets(response.data);
      setMeta(response.meta);
      setError(null);
    } catch (err) {
      console.error("Error cargando rescataditos:", err);
      setError("No se pudieron cargar las mascotas. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, genderFilter, sizeFilter, typeFilter, debouncedSearch]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  // Reset page cuando cambian filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [genderFilter, sizeFilter, typeFilter, debouncedSearch]);

  // Tracking de búsqueda (cuando el debounce termina)
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
      {/* Barra de progreso de lectura */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[60]" style={{ scaleX }} />

      <HeroAdopcion totalMascotas={meta?.total} />

      {/* --- LAYOUT PRINCIPAL: SIDEBAR + GRID --- */}
      <section className="furs-section bg-background">
        <div className="furs-container">
          {/* Botón de filtros para móvil */}
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
            {/* SIDEBAR DE FILTROS */}
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

            {/* CONTENIDO PRINCIPAL - GRID DE MASCOTAS */}
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