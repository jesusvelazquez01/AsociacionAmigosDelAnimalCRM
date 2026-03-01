'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, CheckCircle2, AlertCircle, X, PawPrint } from 'lucide-react';

interface AdoptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    petName: string;
    petId: number;
}

export function ModalAdopcion({ isOpen, onClose, petName, petId }: AdoptionModalProps) {
    const [showRequirementsConfirm, setShowRequirementsConfirm] = useState(false);

    const handleFormRedirect = () => {
        const formUrl = `/adopcion/formulario?petId=${petId}&petName=${encodeURIComponent(petName)}`;
        window.location.href = formUrl;
        onClose();
    };

    const handleBackClick = () => {
        setShowRequirementsConfirm(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    >
                        <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors"
                            >
                                <X className="w-4 h-4 text-gray-600" />
                            </button>

                            {/* Content */}
                            <div className="p-6 md:p-8">
                                {!showRequirementsConfirm ? (
                                    // Initial Step - Requirements Question
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="flex justify-center mb-6">
                                            <div className="bg-primary rounded-full p-3 shadow-lg">
                                                <Heart className="w-6 h-6 text-white" />
                                            </div>
                                        </div>

                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                                            ¡Excelente elección!
                                        </h2>

                                        <p className="text-gray-600 text-base mb-5">
                                            Antes de continuar con la adopción de <span className="font-bold text-primary">{petName}</span>, queremos asegurarnos de que conoces todos los requisitos.
                                        </p>

                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-left">
                                            <div className="flex gap-2">
                                                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-blue-900 font-medium mb-0.5">
                                                        Importante
                                                    </p>
                                                    <p className="text-xs text-blue-700">
                                                        Revisa los requisitos para asegurar que tu hogar es ideal para {petName}.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 font-medium mb-5 text-sm">
                                            ¿Ya has revisado los requisitos de adopción?
                                        </p>

                                        <div className="space-y-3">
                                            <Button
                                                onClick={() => setShowRequirementsConfirm(true)}
                                                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-4 text-base font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                            >
                                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                                Sí, ya los revisé
                                            </Button>

                                            <Button
                                                onClick={onClose}
                                                variant="outline"
                                                className="w-full border-2 border-gray-300 hover:border-primary rounded-full px-6 py-4 text-base font-medium transition-colors"
                                            >
                                                No, quiero revisarlos primero
                                            </Button>
                                        </div>

                                        <p className="text-gray-500 text-xs mt-4">
                                            <Link
                                                href="/adopcion/requisitos"
                                                className="text-primary hover:underline font-medium"
                                            >
                                                Ver requisitos de adopción →
                                            </Link>
                                        </p>
                                    </motion.div>
                                ) : (
                                    // Second Step - Confirmation
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="flex justify-center mb-5">
                                            <motion.div
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="bg-primary rounded-full p-3 shadow-lg"
                                            >
                                                <PawPrint className="w-6 h-6 text-white" />
                                            </motion.div>
                                        </div>

                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                                            ¡Perfecto!
                                        </h2>

                                        <p className="text-gray-600 text-sm mb-1">
                                            A continuación completarás un formulario de adopción para
                                        </p>
                                        <p className="text-lg font-bold text-primary mb-5">
                                            {petName}
                                        </p>

                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-5 text-left">
                                            <div className="flex gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-green-900 font-medium mb-1">
                                                        Próximos pasos
                                                    </p>
                                                    <ul className="text-xs text-green-700 space-y-0.5">
                                                        <li>• Completarás el formulario de adopción</li>
                                                        <li>• Revisaremos tu solicitud</li>
                                                        <li>• Te contactaremos por WhatsApp</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Button
                                                onClick={handleFormRedirect}
                                                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-4 text-base font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                            >
                                                <Heart className="w-4 h-4 mr-2" />
                                                Ir al Formulario
                                            </Button>

                                            <Button
                                                onClick={handleBackClick}
                                                variant="outline"
                                                className="w-full border-2 border-gray-300 hover:border-primary rounded-full px-6 py-4 text-base font-medium transition-colors"
                                            >
                                                Volver atrás
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
