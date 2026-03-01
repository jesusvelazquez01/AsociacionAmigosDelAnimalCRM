'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Heart,
    ArrowLeft,
    Calendar,
    Ruler,
    Dog,
    Cat,
    Syringe,
    Stethoscope,
    ChevronLeft,
    ChevronRight,
    PawPrint,
    MapPin,
    CheckCircle2,
    Share2,
    X
} from 'lucide-react';
import { ModalAdopcion } from '@/components/ui/modal-adopcion';

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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDragEnd = (event: any, info: any) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        if (Math.abs(offset) > 50 || Math.abs(velocity) > 300) {
            if (offset > 0 || velocity > 300) {
                setCurrentImageIndex((prev) => prev === 0 ? galleryImages.length - 1 : prev - 1);
            } else {
                setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
            }
        }
    };

    const handleNext = () => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    const handlePrev = () => setCurrentImageIndex((prev) => prev === 0 ? galleryImages.length - 1 : prev - 1);

    const getTypeEmoji = () => pet.type === 'Perro' ? <Dog className="w-8 h-8" /> : <Cat className="w-8 h-8" />;

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
                        <div className="flex items-center gap-2 text-sm">
                            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Inicio</Link>
                            <span className="text-muted-foreground">•</span>
                            <Link href="/adopcion" className="text-muted-foreground hover:text-primary transition-colors">Adopción</Link>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-primary font-medium">{pet.name}</span>
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
                        <div className="bg-card rounded-3xl border border-border/50 p-6 md:p-8 shadow-lg space-y-6">
                            {/* Nombre */}
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="text-primary">{getTypeEmoji()}</span>
                                    <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">{pet.name}</h1>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground mt-3">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">Jujuy, Argentina</span>
                                </div>
                            </div>

                            <div className="border-t border-border/50" />

                            {/* Características */}
                            <div>
                                <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-wide">Características</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { icon: <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />, label: 'Edad', value: pet.age },
                                        { icon: <PawPrint className="w-5 h-5 mx-auto mb-1 text-primary" />, label: 'Sexo', value: pet.gender },
                                        { icon: <Ruler className="w-5 h-5 mx-auto mb-1 text-primary" />, label: 'Tamaño', value: pet.size },
                                    ].map((item) => (
                                        <motion.div key={item.label} whileHover={{ scale: 1.05 }} className="bg-muted/50 rounded-2xl p-3 text-center cursor-default">
                                            {item.icon}
                                            <p className="text-xs text-muted-foreground">{item.label}</p>
                                            <p className="font-bold text-foreground text-sm">{item.value}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-border/50" />

                            {/* Estado de salud */}
                            <div>
                                <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-wide">Estado de salud</h3>
                                <div className="flex flex-wrap gap-2">
                                    {pet.vaccinated && (
                                        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
                                            <Syringe className="w-4 h-4" /><span className="font-medium text-sm">Vacunado</span>
                                        </motion.div>
                                    )}
                                    {pet.in_treatment && (
                                        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full">
                                            <Stethoscope className="w-4 h-4" /><span className="font-medium text-sm">En tratamiento</span>
                                        </motion.div>
                                    )}
                                    {!pet.vaccinated && !pet.in_treatment && (
                                        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
                                            <CheckCircle2 className="w-4 h-4" /><span className="font-medium text-sm">Desparasitado</span>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-border/50" />

                            {/* Personalidad */}
                            <div>
                                <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-wide">Personalidad</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Bueno con niños', 'Amigable con gatos', 'Sociable'].map((trait, index) => (
                                        <motion.div key={trait} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05 }}>
                                            <Badge className="bg-primary/10 text-primary border-0 rounded-full px-3 py-1.5">
                                                <CheckCircle2 className="w-3 h-3 mr-1.5" />
                                                {trait}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-border/50" />

                            {/* Mi historia */}
                            <div>
                                <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-wide">Mi historia</h3>
                                <div
                                    className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: pet.description || 'Este animalito está buscando un hogar lleno de amor. ¡Podría ser el tuyo!' }}
                                />
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="space-y-4">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    size="lg"
                                    onClick={() => setIsAdoptionModalOpen(true)}
                                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
                                >
                                    <Heart className="w-6 h-6 mr-3" />
                                    ¡Quiero adoptar a {pet.name}!
                                </Button>
                            </motion.div>
                            <div className="grid grid-cols-2 gap-3">
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button asChild variant="outline" size="lg" className="w-full border-2 border-border hover:border-primary hover:bg-primary/5 rounded-full py-4">
                                        <Link href="/apadrinar" className="flex flex-col items-center gap-1">
                                            <PawPrint className="w-5 h-5 text-primary" />
                                            <span className="text-xs">Apadrinar</span>
                                        </Link>
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button asChild variant="outline" size="lg" className="w-full border-2 border-border hover:border-primary hover:bg-primary/5 rounded-full py-4">
                                        <Link href="/adopcion/requisitos" className="flex flex-col items-center gap-1">
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                            <span className="text-xs">Requisitos</span>
                                        </Link>
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Columna derecha - Carrusel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="order-1 lg:order-2 lg:sticky lg:top-24"
                    >
                        <div className="relative">
                            <div
                                className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-muted cursor-pointer"
                                onClick={() => setIsGalleryModalOpen(true)}
                            >
                                <AnimatePresence mode="popLayout">
                                    <CarouselImage key={currentImageIndex} image={galleryImages[currentImageIndex]} onDragEnd={handleDragEnd} />
                                </AnimatePresence>

                                {galleryImages.length > 1 && (
                                    <>
                                        <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all hover:scale-110">
                                            <ChevronLeft className="w-6 h-6 text-gray-800" />
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all hover:scale-110">
                                            <ChevronRight className="w-6 h-6 text-gray-800" />
                                        </button>
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {galleryImages.map((_, index) => (
                                                <button key={index} onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }} className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`} />
                                            ))}
                                        </div>
                                    </>
                                )}
                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
                                    <p className="text-white text-xs font-medium">Click para ampliar</p>
                                </div>
                            </div>

                            {galleryImages.length > 1 && galleryImages.length <= 6 && (
                                <div className="flex justify-center gap-3 mt-4">
                                    {galleryImages.map((img, index) => (
                                        <motion.button key={index} onClick={() => setCurrentImageIndex(index)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                                            className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${index === currentImageIndex ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border hover:border-primary/50'}`}>
                                            <img src={img} alt={`Miniatura ${index + 1}`} className="w-full h-full object-cover" />
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {galleryImages.length > 1 && (
                                <p className="text-center text-sm text-muted-foreground mt-3">
                                    Deslizá o usa las flechas • Foto {currentImageIndex + 1} de {galleryImages.length}
                                </p>
                            )}
                        </div>
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
                            <Link href="/contacto" className="btn-pill-primary text-lg px-8 py-4">Contactanos</Link>
                            <Link href="/adopcion/requisitos" className="btn-pill-secondary text-lg px-8 py-4">Ver requisitos</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Botón scroll top */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="fixed bottom-8 right-8 bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg z-40 transition-all hover:scale-110"
                        whileHover={{ y: -4 }} whileTap={{ scale: 0.95 }}>
                        <ArrowLeft className="w-6 h-6 rotate-90" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Gallery Modal */}
            <AnimatePresence>
                {isGalleryModalOpen && (
                    <GalleryModal
                        images={galleryImages}
                        currentIndex={currentImageIndex}
                        onClose={() => setIsGalleryModalOpen(false)}
                        onIndexChange={setCurrentImageIndex}
                    />
                )}
            </AnimatePresence>

            {/* Adoption Modal */}
            <ModalAdopcion isOpen={isAdoptionModalOpen} onClose={() => setIsAdoptionModalOpen(false)} petName={pet.name} petId={pet.id} />
        </div>
    );
}

// --- Subcomponente: Imagen deslizable del carrusel ---
function CarouselImage({ image, onDragEnd }: {
    image: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDragEnd: (event: any, info: any) => void;
}) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-5, 5]);
    const opacity = useTransform(x, [-200, 0, 200], [0.7, 1, 0.7]);

    return (
        <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            style={{ x, rotate, opacity }}
            onDragEnd={onDragEnd}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.4 }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
            <img src={image} alt="Foto del animalito" className="w-full h-full object-cover rounded-3xl" draggable={false} />
        </motion.div>
    );
}

// --- Subcomponente: Modal galería fullscreen ---
function GalleryModal({ images, currentIndex, onClose, onIndexChange }: {
    images: string[];
    currentIndex: number;
    onClose: () => void;
    onIndexChange: (index: number) => void;
}) {
    const handleNext = () => onIndexChange((currentIndex + 1) % images.length);
    const handlePrev = () => onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={onClose}
        >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all">
                <X className="w-6 h-6 text-white" />
            </button>
            <div className="relative w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`Foto ${currentIndex + 1}`}
                        className="max-w-full max-h-full object-contain rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    />
                </AnimatePresence>
                {images.length > 1 && (
                    <>
                        <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 transition-all">
                            <ChevronLeft className="w-8 h-8 text-white" />
                        </button>
                        <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 transition-all">
                            <ChevronRight className="w-8 h-8 text-white" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                            <p className="text-white text-sm font-medium">{currentIndex + 1} / {images.length}</p>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
}
