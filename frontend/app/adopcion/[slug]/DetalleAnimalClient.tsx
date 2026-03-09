'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Share2, Heart } from 'lucide-react';
import { ModalAdopcion } from '@/components/ui/modal-adopcion';
import { AnimalInfo } from './components/AnimalInfo';
import { AnimalCTAs } from './components/AnimalCTAs';
import { AnimalGallery } from './components/AnimalGallery';

interface GalleryImage {
    id: number;
    original: string;
    webp: string;
    thumb: string;
    mini: string;
}

export interface Pet {
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
    gallery?: GalleryImage[];
    vaccinated?: boolean;
    in_treatment?: boolean;
    health?: string[];
    personality?: string[];
    history?: string;
}

export interface RelatedPet {
    id: number;
    name: string;
    slug: string;
    age: string;
    type: string;
    image: string | null;
}

interface DetalleAnimalClientProps {
    pet: Pet;
    relatedPets: RelatedPet[];
    galleryImages: string[];
}

export default function DetalleAnimalClient({ pet, relatedPets, galleryImages }: DetalleAnimalClientProps) {
    const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="bg-background min-h-screen">
            {/* Barra de progreso de scroll */}
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50" style={{ scaleX }} />

            {/* Breadcrumbs */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-muted/50 border-b border-border/50 sticky top-0 z-40 backdrop-blur-sm"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center justify-between">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Inicio</Link>
                            <span className="text-muted-foreground">•</span>
                            <Link href="/adopcion" className="text-muted-foreground hover:text-primary transition-colors">Adopción</Link>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-primary font-medium truncate max-w-[120px] sm:max-w-none">{pet.name}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hidden sm:flex items-center gap-2"
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({ title: `Adopta a ${pet.name}`, url: window.location.href });
                                }
                            }}
                        >
                            <Share2 className="w-4 h-4" />
                            Compartir
                        </Button>
                    </nav>
                </div>
            </motion.div>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    {/* Columna izquierda - Información */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="order-2 lg:order-1 space-y-6"
                    >
                        <AnimalInfo pet={pet} />

                        {/* CTAs */}
                        <div>
                            <AnimalCTAs petName={pet.name} onAdoptClick={() => setIsAdoptionModalOpen(true)} />
                        </div>
                    </motion.div>

                    {/* Columna derecha - Carrusel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="order-1 lg:order-2 lg:sticky lg:top-24"
                    >
                        <AnimalGallery galleryImages={galleryImages} />
                    </motion.div>
                </div>
            </section>

            {/* Otros animalitos */}
            {relatedPets.length > 0 && (
                <section className="bg-muted/30 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, margin: "-100px" }}>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">Otros animalitos en adopción</h2>
                            <p className="text-muted-foreground text-center mb-10">También podrías darle un hogar a alguno de ellos</p>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedPets.map((related, index) => (
                                    <motion.div key={related.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}>
                                        <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group border-0 shadow-lg">
                                            <Link href={`/adopcion/${related.slug}`}>
                                                <div className="relative overflow-hidden">
                                                    <img src={related.image || '/Foto-perritos/placeholder.jpg'} alt={`${related.name} en adopción`} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
                                                </div>
                                                <CardContent className="p-4">
                                                    <h3 className="text-xl font-bold text-foreground mb-1">{related.name}</h3>
                                                    <p className="text-muted-foreground text-sm">{related.age}</p>
                                                </CardContent>
                                            </Link>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="text-center mt-10">
                                <Button asChild variant="outline" className="rounded-full px-8">
                                    <Link href="/adopcion">Ver todos los animalitos</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* CTA Final */}
            <section className="furs-section bg-card border-t border-border/30">
                <div className="furs-container text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, margin: "-100px" }}
                        className="furs-card bg-gradient-to-br from-primary/5 to-secondary/10 border border-border/50 p-12 max-w-3xl mx-auto">
                        <Heart className="w-14 h-14 text-primary mx-auto mb-6" />
                        <h2 className="furs-title-lg text-foreground mb-4">¿Tenés dudas sobre la adopción?</h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">Estamos aquí para ayudarte en todo el proceso. Contáctanos y te guiaremos paso a paso.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="https://wa.me/5493884219759?text=Hola Asoc. Amigos del Animal, %20quiero%20adoptar%20un%20animal" className="btn-pill-primary text-lg px-8 py-4">Contactanos</Link>
                            <Link href="/adopcion/requisitos" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full px-8 py-4 text-lg h-auto font-bold">Ver requisitos</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

           

            {/* Adoption Modal */}
            <ModalAdopcion isOpen={isAdoptionModalOpen} onClose={() => setIsAdoptionModalOpen(false)} petName={pet.name} petId={pet.id} />
        </div>
    );
}
