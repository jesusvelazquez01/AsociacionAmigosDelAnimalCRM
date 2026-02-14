'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FormNavigationProps } from './types';

export default function FormNavigation({
    sections,
    currentSection,
    onSectionChange,
    validateSection,
    progress
}: FormNavigationProps) {
    return (
        <aside className="hidden lg:flex flex-col w-80 bg-card border-r border-border/50 min-h-screen sticky top-0">
            {/* Header del sidebar */}
            <div className="p-6 border-b border-border/50">
                <Button
                    asChild
                    variant="ghost"
                    className="mb-4 text-muted-foreground hover:text-primary -ml-2"
                >
                    <Link href="/adopcion">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver a Adopción
                    </Link>
                </Button>

                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-foreground">Formulario de Adopción</h1>
                        <p className="text-sm text-muted-foreground">{progress}% completado</p>
                    </div>
                </div>

                <Progress value={progress} className="h-2" />
            </div>

            {/* Steps verticales */}
            <nav className="flex-1 p-4 space-y-2">
                {sections.map((section, index) => {
                    const sectionErrors = validateSection(index);
                    const isCompleted = sectionErrors.length === 0 && (
                        index < currentSection ||
                        (index === currentSection && progress === 100)
                    );
                    const isCurrent = index === currentSection;
                    const SectionIcon = section.icon;

                    return (
                        <button
                            key={section.id}
                            onClick={() => {
                                if (index < currentSection || validateSection(currentSection).length === 0) {
                                    onSectionChange(index);
                                }
                            }}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left group ${isCurrent
                                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                : isCompleted
                                    ? 'bg-green-50 text-green-700 hover:bg-green-100'
                                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isCurrent
                                ? 'bg-white/20'
                                : isCompleted
                                    ? 'bg-green-100'
                                    : 'bg-background'
                                }`}>
                                {isCompleted ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <span className="text-sm font-bold">{index + 1}</span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`font-medium truncate ${isCurrent ? 'text-white' : ''
                                    }`}>
                                    {section.title}
                                </p>
                                <p className={`text-xs truncate ${isCurrent
                                    ? 'text-white/70'
                                    : isCompleted
                                        ? 'text-green-600'
                                        : 'text-muted-foreground'
                                    }`}>
                                    {section.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </nav>

            {/* Footer del sidebar */}
            <div className="p-4 border-t border-border/50">
                <div className="bg-primary/5 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">¿Necesitas ayuda?</span>
                        <br />
                        Contáctanos al <span className="text-primary font-medium">388-123-4567</span>
                    </p>
                </div>
            </div>
        </aside>
    );
}

// Componente para navegación móvil (header horizontal)
export function MobileNavigation({
    sections,
    currentSection,
    onSectionChange,
    validateSection,
    progress
}: FormNavigationProps) {
    return (
        <div className="lg:hidden bg-card border-b border-border/50 sticky top-0 z-10 overflow-hidden">
            <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary -ml-2"
                    >
                        <Link href="/adopcion">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Volver
                        </Link>
                    </Button>
                    <span className="text-sm font-medium text-muted-foreground">
                        {progress}% completado
                    </span>
                </div>

                <Progress value={progress} className="h-1.5 mb-3" />

                <div className="flex overflow-x-auto gap-2 pb-1 -mx-4 px-4">
                    {sections.map((section, index) => {
                        const sectionErrors = validateSection(index);
                        const isCompleted = sectionErrors.length === 0 && (
                            index < currentSection ||
                            (index === currentSection && progress === 100)
                        );
                        const isCurrent = index === currentSection;

                        return (
                            <button
                                key={section.id}
                                onClick={() => {
                                    if (index < currentSection || validateSection(currentSection).length === 0) {
                                        onSectionChange(index);
                                    }
                                }}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all text-sm ${isCurrent
                                    ? 'bg-primary text-white shadow-md'
                                    : isCompleted
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-secondary text-muted-foreground'
                                    }`}
                            >
                                {isCompleted ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                                        {index + 1}
                                    </span>
                                )}
                                <span className="font-medium">{section.title}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
