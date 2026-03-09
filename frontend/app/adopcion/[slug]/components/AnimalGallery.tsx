'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AnimalGalleryProps {
    galleryImages: string[];
}

export function AnimalGallery({ galleryImages }: AnimalGalleryProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
    const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false);

    useEffect(() => {
        if (isGalleryModalOpen || isDisclaimerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isGalleryModalOpen, isDisclaimerOpen]);

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

    return (
        <>
            <div className="relative">
                <div
                    className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-muted cursor-pointer"
                    onClick={() => {
                        if (!isDisclaimerAccepted) {
                            setIsDisclaimerOpen(true);
                        } else {
                            setIsGalleryModalOpen(true);
                        }
                    }}
                >
                    <AnimatePresence mode="popLayout">
                        <CarouselImage 
                            key={currentImageIndex} 
                            image={galleryImages[currentImageIndex]} 
                            onDragEnd={handleDragEnd} 
                            isBlurred={!isDisclaimerAccepted} 
                        />
                    </AnimatePresence>

                    {galleryImages.length > 1 && (
                        <>
                            <button onClick={(e) => { 
                                e.stopPropagation(); 
                                if (!isDisclaimerAccepted) setIsDisclaimerOpen(true);
                                else handlePrev(); 
                            }} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all hover:scale-110">
                                <ChevronLeft className="w-6 h-6 text-gray-800" />
                            </button>
                            <button onClick={(e) => { 
                                e.stopPropagation(); 
                                if (!isDisclaimerAccepted) setIsDisclaimerOpen(true);
                                else handleNext(); 
                            }} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all hover:scale-110">
                                <ChevronRight className="w-6 h-6 text-gray-800" />
                            </button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {galleryImages.map((_, index) => (
                                    <button key={index} onClick={(e) => { 
                                        e.stopPropagation(); 
                                        if (!isDisclaimerAccepted) setIsDisclaimerOpen(true);
                                        else setCurrentImageIndex(index); 
                                    }} className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`} />
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
                            <motion.button key={index} 
                                onClick={() => {
                                    if (!isDisclaimerAccepted) setIsDisclaimerOpen(true);
                                    else setCurrentImageIndex(index);
                                }} 
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${index === currentImageIndex ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border hover:border-primary/50'}`}>
                                <img src={img} alt={`Miniatura ${index + 1}`} className={`w-full h-full object-cover transition-all duration-300 ${!isDisclaimerAccepted ? 'blur-sm scale-110' : ''}`} />
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

            {/* Disclaimer Modal */}
            <AlertDialog open={isDisclaimerOpen} onOpenChange={setIsDisclaimerOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Advertencia de contenido sensible</AlertDialogTitle>
                        <AlertDialogDescription>
                            Algunas de las imágenes de la galería muestran a nuestros rescataditos en el estado crítico en el que fueron encontrados o durante su tratamiento médico, lo cual puede ser fuerte de ver.
                            <br /><br />
                            Mostramos estas fotos para concientizar sobre la realidad que enfrentan y el increíble proceso de recuperación que logran con amor y cuidado. ¿Deseas continuar?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            setIsDisclaimerOpen(false);
                            setIsDisclaimerAccepted(true);
                        }}>
                            Sí, ver galería
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

// --- Subcomponente: Imagen deslizable del carrusel ---
function CarouselImage({ image, onDragEnd, isBlurred }: {
    image: string;
    onDragEnd: (event: any, info: any) => void;
    isBlurred?: boolean;
}) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-5, 5]);
    const opacity = useTransform(x, [-200, 0, 200], [0.7, 1, 0.7]);

    return (
        <motion.div
            drag={!isBlurred ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            style={{ x, rotate, opacity }}
            onDragEnd={!isBlurred ? onDragEnd : undefined}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.4 }}
            className={`absolute inset-0 ${!isBlurred ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
        >
            <img src={image} alt="Foto del animalito" className={`w-full h-full object-cover rounded-3xl transition-all duration-500 ${isBlurred ? 'blur-xl scale-110' : ''}`} draggable={false} />
            {isBlurred && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-3xl">
                    <div className="bg-black/60 text-white px-4 py-2 rounded-full backdrop-blur-md font-medium text-sm flex items-center gap-2">
                        <span>Contenido Sensible - Click para ver</span>
                    </div>
                </div>
            )}
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

    if (typeof document === 'undefined') return null;

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={onClose}
        >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all">
                <X className="w-6 h-6 text-white" />
            </button>
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
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
        </motion.div>,
        document.body
    );
}
