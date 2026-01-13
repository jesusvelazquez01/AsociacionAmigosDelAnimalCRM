'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
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
import { Heart, Loader2, Dog, Cat, PawPrint, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';
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
  const [genderFilter, setGenderFilter] = useState<string>('Todos');
  const [sizeFilter, setSizeFilter] = useState<string>('Todos');
  const [currentPage, setCurrentPage] = useState(1);

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
  }, [currentPage, genderFilter, sizeFilter]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  // Reset page cuando cambian filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [genderFilter, sizeFilter]);

  // Limpiar filtros
  const clearFilters = () => {
    setGenderFilter('Todos');
    setSizeFilter('Todos');
    setCurrentPage(1);
  };

  const hasActiveFilters = genderFilter !== 'Todos' || sizeFilter !== 'Todos';

  return (
    <div className="bg-background overflow-hidden">
      {/* Barra de progreso de lectura */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[60]" style={{ scaleX }} />

      {/* --- HERO ESTILO FURS --- */}
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
          <div className="flex flex-col lg:flex-row gap-8">

            {/* SIDEBAR DE FILTROS (izquierda) */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-4 furs-card bg-card border border-border/50 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-primary" />
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

                {/* Filtro de Sexo */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Sexo
                  </label>
                  <Select value={genderFilter} onValueChange={setGenderFilter}>
                    <SelectTrigger className="w-full rounded-xl bg-background">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos</SelectItem>
                      <SelectItem value="Macho">Machitos</SelectItem>
                      <SelectItem value="Hembra">Hembritas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filtro de Tamaño */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Tamaño
                  </label>
                  <Select value={sizeFilter} onValueChange={setSizeFilter}>
                    <SelectTrigger className="w-full rounded-xl bg-background">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos</SelectItem>
                      <SelectItem value="Pequeño">Pequeño</SelectItem>
                      <SelectItem value="Mediano">Mediano</SelectItem>
                      <SelectItem value="Grande">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Contador de resultados */}
                {meta && !loading && (
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-bold text-foreground text-lg">{meta.total}</span>
                      <br />rescataditos encontrados
                    </p>
                  </div>
                )}
              </div>
            </aside>

            {/* CONTENIDO PRINCIPAL (derecha) */}
            <main className="flex-1">
              {/* Barra superior con contador */}
              {meta && !loading && (
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-muted-foreground">
                    Mostrando <span className="font-medium text-foreground">{meta.from || 0}-{meta.to || 0}</span> de{' '}
                    <span className="font-medium text-foreground">{meta.total}</span>
                  </p>
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

              {/* Grid de Mascotas */}
              {!loading && !error && pets.length > 0 && (
                <>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {pets.map((pet, index) => (
                      <motion.div
                        key={pet.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <Link href={`/adopcion/${pet.slug}`} className="block group">
                          <div className="furs-card bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg overflow-hidden">
                            {/* Imagen */}
                            <div className="relative overflow-hidden">
                              <img
                                src={pet.image || '/Foto-perritos/placeholder.jpg'}
                                alt={`${pet.name} en adopción`}
                                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              {/* Badge de tipo */}
                              <div className="absolute top-3 left-3">
                                <span className="furs-badge bg-white/90 backdrop-blur-sm text-foreground shadow-sm text-xs">
                                  {pet.type === 'Perro' ? <Dog className="w-3 h-3 mr-1" /> : <Cat className="w-3 h-3 mr-1" />}
                                  {pet.type}
                                </span>
                              </div>
                            </div>

                            {/* Contenido */}
                            <div className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                                  {pet.name}
                                </h3>
                                <Badge className="rounded-full bg-primary/10 text-primary border-0 text-xs">
                                  {pet.age}
                                </Badge>
                              </div>

                              <div className="flex flex-wrap gap-1">
                                <Badge variant="secondary" className="rounded-full text-xs">
                                  {pet.gender}
                                </Badge>
                                <Badge variant="secondary" className="rounded-full text-xs">
                                  {pet.size}
                                </Badge>
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

      {/* --- CTA FINAL --- */}
      <section className="furs-section bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="furs-container text-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="furs-card bg-card border border-border/50 p-12 md:p-16 max-w-4xl mx-auto"
          >
            <Heart className="w-14 h-14 text-primary mx-auto mb-6" />
            <h2 className="furs-title-lg text-foreground mb-6">
              ¿No encontrás lo que buscás?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Contáctanos y cuéntanos qué tipo de compañero estás buscando. Te ayudaremos a encontrar tu match perfecto.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contacto" className="btn-pill-primary text-lg px-10 py-4">
                Contactar
              </Link>
              <Link href="/apadrinar" className="btn-pill-secondary text-lg px-10 py-4">
                Apadrinar
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
