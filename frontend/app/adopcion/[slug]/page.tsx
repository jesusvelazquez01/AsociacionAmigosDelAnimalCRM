'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Heart,
    ArrowLeft,
    Loader2,
    Calendar,
    Ruler,
    Dog,
    Cat,
    Palette,
    Users,
    Syringe,
    Stethoscope,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import api from '@/lib/axios';
import { useParams } from 'next/navigation';
import { ModalAdopcion } from '@/components/ui/modal-adopcion';
interface GalleryImage {
    id: number;
    original: string;
    webp: string;
    thumb: string;
    mini: string;
}

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
    gallery?: GalleryImage[];
    vaccinated?: boolean;
    in_treatment?: boolean;
}

interface RelatedPet {
    id: number;
    name: string;
    slug: string;
    age: string;
    type: string;
    image: string | null;
}

// Componente de imagen deslizable para el carrusel
function CarouselImage({
    image,
    onDragEnd
}: {
    image: string;
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
            <Image
                src={image}
                alt="Foto del animalito"
                fill
                className="object-cover rounded-3xl"
                draggable={false}
            />
        </motion.div>
    );
}

export default function AnimalDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [pet, setPet] = useState<Pet | null>(null);
    const [relatedPets, setRelatedPets] = useState<RelatedPet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);

    useEffect(() => {
        if (!slug) return;

        api.get(`/rescataditos/${slug}`)
            .then(res => {
                setPet(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error cargando animalito:", err);
                setError("No se pudo encontrar este animalito.");
                setLoading(false);
            });

        api.get('/rescataditos')
            .then(res => {
                // La API ahora devuelve { data: [...], meta: {...} }
                const petsData = res.data.data || res.data;
                const others = petsData
                    .filter((p: RelatedPet) => p.slug !== slug)
                    .slice(0, 4);
                setRelatedPets(others);
            })
            .catch(err => {
                console.error("Error cargando relacionados:", err);
            });
    }, [slug]);

    // Construir array de imágenes para el carrusel
    const getGalleryImages = (): string[] => {
        if (!pet) return [];

        // Si tiene galería de la API, usar esas imágenes
        if (pet.gallery && pet.gallery.length > 0) {
            return pet.gallery.map(img => img.webp || img.original);
        }

        // Fallback a imagen única
        if (pet.image) {
            return [pet.image];
        }

        return ['/Foto-perritos/placeholder.jpg'];
    };

    const galleryImages = getGalleryImages();

    const handleDragEnd = (event: any, info: any) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (Math.abs(offset) > 50 || Math.abs(velocity) > 300) {
            if (offset > 0 || velocity > 300) {
                // Deslizar a la derecha - imagen anterior
                setCurrentImageIndex((prev) => prev === 0 ? galleryImages.length - 1 : prev - 1);
            } else {
                // Deslizar a la izquierda - siguiente imagen
                setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
            }
        }
    };

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prev) => prev === 0 ? galleryImages.length - 1 : prev - 1);
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !pet) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
                <Heart className="w-16 h-16 text-gray-300 mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Animalito no encontrado</h1>
                <p className="text-gray-500 mb-6">{error || "Este animalito no existe o ya fue adoptado."}</p>
                <Button asChild>
                    <Link href="/adopcion">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver a adopción
                    </Link>
                </Button>
            </div>
        );
    }

    const getTypeIcon = () => {
        return pet.type === 'Perro' ? <Dog className="w-5 h-5" /> : <Cat className="w-5 h-5" />;
    };

    const getTypeEmoji = () => {
        return pet.type === 'Perro' ? <Dog className="w-8 h-8" /> : <Cat className="w-8 h-8" />;
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumbs */}
            <div className="bg-gray-50 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-gray-500 hover:text-primary transition-colors">
                            Inicio
                        </Link>
                        <span className="text-gray-400">•</span>
                        <Link href="/adopcion" className="text-gray-500 hover:text-primary transition-colors">
                            Adopción
                        </Link>
                        <span className="text-gray-400">•</span>
                        <span className="text-primary font-medium">{pet.name}</span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Columna izquierda - Información */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="order-2 lg:order-1"
                    >
                        {/* Nombre y tipo */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-primary">{getTypeEmoji()}</span>
                            <h1 className="text-5xl md:text-6xl font-black text-gray-800 tracking-tight">
                                {pet.name}
                            </h1>
                        </div>

                        {/* Badges de características */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            <Badge variant="outline" className="text-sm py-2 px-4 border-primary text-primary">
                                <Calendar className="w-4 h-4 mr-2" />
                                {pet.age}
                            </Badge>
                            <Badge variant="outline" className="text-sm py-2 px-4 border-gray-300">
                                <Users className="w-4 h-4 mr-2" />
                                {pet.gender}
                            </Badge>
                            <Badge variant="outline" className="text-sm py-2 px-4 border-gray-300">
                                <Ruler className="w-4 h-4 mr-2" />
                                {pet.size}
                            </Badge>
                        </div>

                        {/* Estado de salud */}
                        <div className="flex gap-4 mb-8">
                            {pet.vaccinated && (
                                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
                                    <Syringe className="w-4 h-4" />
                                    <span className="text-sm font-medium">Vacunado</span>
                                </div>
                            )}
                            {pet.in_treatment && (
                                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-full">
                                    <Stethoscope className="w-4 h-4" />
                                    <span className="text-sm font-medium">En tratamiento</span>
                                </div>
                            )}
                        </div>

                        {/* Descripción */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Mi historia:</h2>
                            <div
                                className="text-gray-600 text-lg leading-relaxed prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ __html: pet.description || 'Este animalito está buscando un hogar lleno de amor. ¡Podría ser el tuyo!' }}
                            />
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Columna izquierda: Adoptar y Apadrinar */}
                            <div className="flex flex-col gap-4">
                                <Button

                                    size="lg"
                                    onClick={() => setIsAdoptionModalOpen(true)}
                                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 py-7 text-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                >
                                    <Heart className="w-6 h-6 mr-3" />
                                    ¡Quiero adoptarlo!
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-gray-300 hover:border-primary rounded-full px-8 py-7 text-lg"
                                >
                                    <Link href="/apadrinar">
                                        Apadrinar
                                    </Link>
                                </Button>
                            </div>
                            {/* Columna derecha: Ver requisitos */}
                            <div className="flex items-center">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-gray-300 hover:border-primary rounded-full px-8 py-7 text-lg"
                                >
                                    <Link href="/adopcion/requisitos">
                                        Ver requisitos
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Columna derecha - Carrusel de Imágenes */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="order-1 lg:order-2"
                    >
                        <div className="relative">
                            {/* Imagen principal con carrusel */}
                            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                                <AnimatePresence mode="popLayout">
                                    <CarouselImage
                                        key={currentImageIndex}
                                        image={galleryImages[currentImageIndex]}
                                        onDragEnd={handleDragEnd}
                                    />
                                </AnimatePresence>

                                {/* Badge flotante */}
                                <div className="absolute top-6 right-6 z-10">
                                    <Badge className="bg-white/95 backdrop-blur-sm text-primary border-0 shadow-lg py-2 px-4 text-sm font-semibold">
                                        {pet.status}
                                    </Badge>
                                </div>

                                {/* Botones de navegación (solo si hay más de 1 imagen) */}
                                {galleryImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrev}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all hover:scale-110"
                                        >
                                            <ChevronLeft className="w-6 h-6 text-gray-800" />
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all hover:scale-110"
                                        >
                                            <ChevronRight className="w-6 h-6 text-gray-800" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Indicador de posición y texto de ayuda */}
                            {galleryImages.length > 1 && (
                                <div className="text-center mt-4">
                                    <p className="text-sm text-gray-500 mb-2">
                                        Desliza o usa las flechas • Foto {currentImageIndex + 1} de {galleryImages.length}
                                    </p>

                                    {/* Thumbnails / Dots */}
                                    <div className="flex justify-center gap-2">
                                        {galleryImages.length <= 6 ? (
                                            // Mostrar miniaturas si hay 6 o menos imágenes
                                            galleryImages.map((img, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleThumbnailClick(index)}
                                                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex
                                                        ? 'border-primary ring-2 ring-primary ring-offset-2'
                                                        : 'border-gray-200 hover:border-primary/50'
                                                        }`}
                                                >
                                                    <Image
                                                        src={pet.gallery?.[index]?.mini || img}
                                                        alt={`Miniatura ${index + 1}`}
                                                        width={64}
                                                        height={64}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))
                                        ) : (
                                            // Mostrar puntos si hay más de 6 imágenes
                                            galleryImages.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleThumbnailClick(index)}
                                                    className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex
                                                        ? 'bg-primary scale-125'
                                                        : 'bg-gray-300 hover:bg-primary/50'
                                                        }`}
                                                />
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section >

            {/* Otros animalitos en adopción */}
            {
                relatedPets.length > 0 && (
                    <section className="bg-gray-50 py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 text-center">
                                    Otros animalitos en adopción
                                </h2>
                                <p className="text-gray-500 text-center mb-10">
                                    También podrías darle un hogar a alguno de ellos
                                </p>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {relatedPets.map((related) => (
                                        <Card
                                            key={related.id}
                                            className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group"
                                        >
                                            <Link href={`/adopcion/${related.slug}`}>
                                                <div className="relative overflow-hidden">
                                                    <Image
                                                        src={related.image || '/Foto-perritos/placeholder.jpg'}
                                                        alt={`${related.name} en adopción`}
                                                        width={400}
                                                        height={192}
                                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <CardContent className="p-4">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{related.name}</h3>
                                                    <p className="text-gray-500 text-sm">{related.age}</p>
                                                </CardContent>
                                            </Link>
                                        </Card>
                                    ))}
                                </div>

                                <div className="text-center mt-10">
                                    <Button asChild variant="outline" className="rounded-full px-8">
                                        <Link href="/adopcion">
                                            Ver todos los animalitos
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )
            }

            {/* CTA Final */}
            <section className="py-20 bg-gray-900 text-center px-4">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        ¿Tienes dudas sobre la adopción?
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        Estamos aquí para ayudarte en todo el proceso. Contáctanos y te guiaremos paso a paso.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild className="bg-primary hover:bg-primary/90 rounded-full px-8 py-6 text-lg">
                            <Link href="/contacto">Contactar</Link>
                        </Button>
                        <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg">
                            <Link href="/adopcion/requisitos">Ver requisitos</Link>
                        </Button>
                    </div>
                </motion.div>
            </section>


            {/* Adoption Modal */}
            {
                pet && (
                    <ModalAdopcion
                        isOpen={isAdoptionModalOpen}
                        onClose={() => setIsAdoptionModalOpen(false)}
                        petName={pet.name}
                        petId={pet.id}
                    />
                )
            }
        </div >
    );
}

