'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

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

interface GrillaMascotasProps {
  pets: Pet[];
  meta: PaginationMeta | null;
  loading: boolean;
  error: string | null;
  hasActiveFilters: boolean;
  clearFilters: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function GrillaMascotas({
  pets,
  meta,
  loading,
  error,
  hasActiveFilters,
  clearFilters,
  currentPage,
  setCurrentPage
}: GrillaMascotasProps) {
  const { trackPetCardClicked, trackPaginationUsed } = useAnalytics();

  return (
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
                <Link href={`/adopcion/${pet.slug}`} className="block group" onClick={() => trackPetCardClicked({ pet_name: pet.name, pet_type: pet.type, pet_id: pet.id })}>
                  <div className="bg-card rounded-3xl border border-border/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {/* Imagen con badges */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={pet.image || '/Foto-perritos/placeholder.jpg'}
                        alt={`${pet.name} en adopción`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

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
                      </div>

                      {/* Badges de info */}
                      <div className="flex flex-wrap gap-2">
                        <Badge className="rounded-full bg-secondary text-secondary-foreground border-0 text-xs px-3">
                          {pet.gender}
                        </Badge>
                        <Badge className="rounded-full bg-secondary text-secondary-foreground border-0 text-xs px-3">
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
                onClick={() => { const p = Math.max(1, currentPage - 1); setCurrentPage(p); trackPaginationUsed({ page_number: p }); }}
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
                onClick={() => { const p = Math.min(meta.last_page, currentPage + 1); setCurrentPage(p); trackPaginationUsed({ page_number: p }); }}
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
  );
}
