'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Heart, Loader2, Dog, Cat, PawPrint, ChevronLeft, ChevronRight, Filter, X, MapPin, Search, Check, SlidersHorizontal } from 'lucide-react';
import api from '@/lib/axios';

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

  // Estados de filtros
  const [typeFilter, setTypeFilter] = useState<string>('Todos');
  const [genderFilter, setGenderFilter] = useState<string>('Todos');
  const [sizeFilter, setSizeFilter] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
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

  // Fetch con filtros y paginación
  const fetchPets = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());

      if (genderFilter !== 'Todos') {
        params.append('genero', genderFilter);
      }
      if (sizeFilter !== 'Todos') {
        params.append('tamaño', sizeFilter);
      }
      if (typeFilter !== 'Todos') {
        params.append('tipo', typeFilter);
      }

      const response = await api.get<ApiResponse>(`/rescataditos?${params.toString()}`);
      setPets(response.data.data);
      setMeta(response.data.meta);
      setError(null);
    } catch (err) {
      console.error("Error cargando rescataditos:", err);
      setError("No se pudieron cargar las mascotas. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, genderFilter, sizeFilter, typeFilter]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  // Reset page cuando cambian filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [genderFilter, sizeFilter, typeFilter]);

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

  // Checkbox component
  const FilterCheckbox = ({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) => (
    <label className="flex items-center gap-3 cursor-pointer group py-2">
      <div
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${checked
          ? 'bg-primary border-primary'
          : 'border-border group-hover:border-primary/50'
          }`}
        onClick={() => onChange(!checked)}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
    </label>
  );

  // Componente de filtros reutilizable
  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Búsqueda */}
      <div className="furs-card bg-card border border-border/50 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">Buscar</h3>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Nombre del rescatadito..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Filtros principales */}
      <div className="furs-card bg-card border border-border/50 p-6">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">Filtros</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="ml-auto text-xs text-muted-foreground hover:text-foreground p-1 h-auto"
            >
              <X className="w-3 h-3 mr-1" />
              Limpiar
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {/* Tipo */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Tipo de Animal</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full rounded-xl bg-background">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Perro">
                  <div className="flex items-center gap-2">
                    <Dog className="w-4 h-4" />
                    Perros
                  </div>
                </SelectItem>
                <SelectItem value="Gato">
                  <div className="flex items-center gap-2">
                    <Cat className="w-4 h-4" />
                    Gatos
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Género */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Género</label>
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger className="w-full rounded-xl bg-background">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Macho">Machitos</SelectItem>
                <SelectItem value="Hembra">Hembritas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tamaño */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Tamaño</label>
            <Select value={sizeFilter} onValueChange={setSizeFilter}>
              <SelectTrigger className="w-full rounded-xl bg-background">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Pequeño">Pequeño</SelectItem>
                <SelectItem value="Mediano">Mediano</SelectItem>
                <SelectItem value="Grande">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Filtros de comportamiento */}
      <div className="furs-card bg-card border border-border/50 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">Compatibilidad</h3>
        </div>

        <div className="space-y-1">
          <FilterCheckbox
            checked={goodWithCats}
            onChange={setGoodWithCats}
            label="Convive con gatos"
          />
          <FilterCheckbox
            checked={goodWithDogs}
            onChange={setGoodWithDogs}
            label="Convive con perros"
          />
        </div>
      </div>

      {/* Contador de resultados */}
      {meta && !loading && (
        <div className="furs-card-sm bg-primary/10 p-6 text-center">
          <p className="text-4xl font-bold text-primary mb-1">{meta.total}</p>
          <p className="text-sm text-muted-foreground">rescataditos encontrados</p>
        </div>
      )}

      {/* CTA Lateral */}
      <div className="furs-card bg-gradient-to-br from-primary to-primary/80 p-6 text-white text-center">
        <Heart className="w-10 h-10 mx-auto mb-3 opacity-90" />
        <h4 className="font-bold mb-2">¿No encontrás?</h4>
        <p className="text-sm text-white/80 mb-4">Contáctanos y te ayudamos</p>
        <Link
          href="/contacto"
          className="inline-block w-full bg-white text-primary font-semibold py-2 px-4 rounded-full hover:bg-white/90 transition-colors"
        >
          Contactar
        </Link>
      </div>
    </div>
  );

  return (
    <div className="bg-background overflow-hidden">
      {/* Barra de progreso de lectura */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[60]" style={{ scaleX }} />

      {/* --- HERO CURVADO ESTILO PAW --- */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-card overflow-hidden">
        {/* Fondo suave con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />

        {/* Decoración orgánica */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />

        <div className="relative z-10 text-center furs-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="furs-badge bg-primary/10 text-primary border border-primary/20 mb-8">
              <PawPrint className="w-4 h-4 mr-2" />
              Adopta, no compres
            </span>

            <h1 className="furs-title-xl text-foreground mb-6">
              Encuentra tu<br />
              <span className="text-primary">compañero ideal</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Todos nuestros animalitos están vacunados, desparasitados y esperando un hogar lleno de amor.
            </p>

            {meta && (
              <p className="text-lg text-primary font-medium">
                {meta.total} rescataditos disponibles para adopción
              </p>
            )}
          </motion.div>
        </div>
      </section>

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
                <FiltersContent />
              </div>
            </aside>

            {/* CONTENIDO PRINCIPAL - GRID DE MASCOTAS */}
            <main className="flex-1 min-w-0">
              {/* Barra superior con contador */}
              {meta && !loading && (
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <p className="text-sm text-muted-foreground">
                    Mostrando <span className="font-medium text-foreground">{meta.from || 0}-{meta.to || 0}</span> de{' '}
                    <span className="font-medium text-foreground">{meta.total}</span>
                  </p>

                  {hasActiveFilters && (
                    <Button
                      onClick={clearFilters}
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Limpiar todos los filtros
                    </Button>
                  )}
                </div>
              )}

              {/* Loading state */}
              {loading && (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Cargando rescataditos...</p>
                  </div>
                </div>
              )}

              {/* Error message */}
              {!loading && error && (
                <div className="text-center py-8">
                  <div className="furs-card-sm bg-destructive/10 p-8 max-w-md mx-auto">
                    <p className="text-destructive font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Empty state */}
              {!loading && !error && pets.length === 0 && (
                <div className="text-center py-16">
                  <div className="furs-card bg-secondary/30 p-12 max-w-md mx-auto">
                    <Heart className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-foreground text-lg font-medium mb-2">No hay mascotas con estos filtros</p>
                    <p className="text-muted-foreground mb-4">Probá con otros filtros o volvé pronto.</p>
                    {hasActiveFilters && (
                      <Button onClick={clearFilters} variant="outline" className="rounded-full">
                        <X className="w-4 h-4 mr-2" />
                        Limpiar filtros
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Grid de Mascotas - Estilo PAW */}
              {!loading && !error && pets.length > 0 && (
                <>
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {pets.map((pet, index) => (
                      <motion.div
                        key={pet.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <Link href={`/adopcion/${pet.slug}`} className="block group">
                          <div className="bg-card rounded-3xl border border-border/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            {/* Imagen con badges */}
                            <div className="relative overflow-hidden aspect-[4/3]">
                              <img
                                src={pet.image || '/Foto-perritos/placeholder.jpg'}
                                alt={`${pet.name} en adopción`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              {/* Badge tipo animal - arriba izquierda */}
                              <div className="absolute top-3 left-3">
                                <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-foreground shadow-sm px-3 py-1.5 rounded-full text-xs font-medium">
                                  {pet.type === 'Perro' ? <Dog className="w-3.5 h-3.5" /> : <Cat className="w-3.5 h-3.5" />}
                                  {pet.type}
                                </span>
                              </div>

                              {/* Logo refugio - arriba derecha */}
                              <div className="absolute top-3 right-3">
                                <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden">
                                  <Image
                                    src="/Asoc.jpg"
                                    alt="Amigos del Animal"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>

                              {/* Badge edad - abajo izquierda (ESTILO PAW) */}
                              <div className="absolute bottom-3 left-3">
                                <span className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg uppercase tracking-wide">
                                  {pet.age}
                                </span>
                              </div>

                              {/* Overlay gradiente */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Contenido */}
                            <div className="p-5">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                  {pet.name}
                                </h3>
                                <Heart className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:fill-primary/20 transition-colors" />
                              </div>

                              {/* Ubicación */}
                              <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">San Salvador de Jujuy</span>
                              </div>

                              {/* Badges de info */}
                              <div className="flex flex-wrap gap-2">
                                <Badge className="rounded-full bg-secondary text-secondary-foreground border-0 text-xs px-3">
                                  {pet.gender}
                                </Badge>
                                <Badge className="rounded-full bg-secondary text-secondary-foreground border-0 text-xs px-3">
                                  {pet.size}
                                </Badge>
                                {pet.breed && pet.breed !== 'Mestizo' && (
                                  <Badge className="rounded-full bg-primary/10 text-primary border-0 text-xs px-3">
                                    {pet.breed}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Paginación */}
                  {meta && meta.last_page > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-12">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="rounded-full"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Anterior
                      </Button>

                      <div className="flex items-center gap-2">
                        {Array.from({ length: Math.min(5, meta.last_page) }, (_, i) => {
                          let pageNum;
                          if (meta.last_page <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= meta.last_page - 2) {
                            pageNum = meta.last_page - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? "default" : "ghost"}
                              size="sm"
                              onClick={() => setCurrentPage(pageNum)}
                              className="rounded-full w-9 h-9 p-0"
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(meta.last_page, p + 1))}
                        disabled={currentPage === meta.last_page}
                        className="rounded-full"
                      >
                        Siguiente
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* --- CTA FINAL CON CURVA SUPERIOR --- */}
      <section className="furs-section bg-card border-t border-border/30">
        <div className="furs-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="furs-card bg-gradient-to-br from-primary/5 to-secondary/10 border border-border/50 p-12 max-w-3xl mx-auto"
          >
            <Heart className="w-14 h-14 text-primary mx-auto mb-6" />
            <h2 className="furs-title-lg text-foreground mb-4">
              Cambiá una vida hoy
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Cada adopción es un acto de amor. Al adoptar, no solo salvás una vida, también ganás un amigo incondicional.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contacto" className="btn-pill-primary text-lg px-8 py-4">
                Contactar al Refugio
              </Link>
              <Link href="/apadrinar" className="btn-pill-secondary text-lg px-8 py-4">
                Apadrinar
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}