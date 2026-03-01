'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal, X, Dog, Cat, Heart } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface FiltrosAdopcionProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  typeFilter: string;
  setTypeFilter: (v: string) => void;
  genderFilter: string;
  setGenderFilter: (v: string) => void;
  sizeFilter: string;
  setSizeFilter: (v: string) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
  totalMascotas: number | undefined;
  loading: boolean;
}

export default function FiltrosAdopcion({
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  genderFilter,
  setGenderFilter,
  sizeFilter,
  setSizeFilter,
  hasActiveFilters,
  clearFilters,
  totalMascotas,
  loading
}: FiltrosAdopcionProps) {
  const { trackFilterApplied } = useAnalytics();

  return (
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
            <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); if (v !== 'Todos') trackFilterApplied({ filter_type: 'especie', filter_value: v }); }}>
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
            <Select value={genderFilter} onValueChange={(v) => { setGenderFilter(v); if (v !== 'Todos') trackFilterApplied({ filter_type: 'genero', filter_value: v }); }}>
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
            <Select value={sizeFilter} onValueChange={(v) => { setSizeFilter(v); if (v !== 'Todos') trackFilterApplied({ filter_type: 'tamaño', filter_value: v }); }}>
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

      {/* Contador de resultados */}
      {totalMascotas !== undefined && !loading && (
        <div className="furs-card-sm bg-primary/10 p-6 text-center">
          <p className="text-4xl font-bold text-primary mb-1">{totalMascotas}</p>
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
}
