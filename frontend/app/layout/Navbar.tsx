'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
    Home,
    Heart,
    Mail,
    Gift,
    Crown,
    HandshakeIcon,
    AlertCircle,
    Users,
    Building2,
    HandHelping,
    ChevronDown,
    Menu,
    X
} from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
    const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
    const aboutDropdownRef = useRef<HTMLDivElement>(null);
    const helpDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
                setIsAboutDropdownOpen(false);
            }
            if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target as Node)) {
                setIsHelpDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-white/90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="flex items-center gap-3">
                        <img
                            src="/Asoc.jpg"
                            alt="Logo Amigos del Animal"
                            className="w-12 h-12 rounded-full object-cover border-2 border-pink-200"
                        />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-900 leading-tight">Amigos del Animal</span>
                            <span className="text-xs text-primary font-medium">Asociación Protectora</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-primary transition font-medium">
                            <Home className="w-4 h-4" />
                            Inicio
                        </Link>

                        {/* Sobre Nosotros Dropdown */}
                        <div className="relative" ref={aboutDropdownRef}>
                            <Button
                                onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                                variant="ghost"
                                className="flex items-center gap-2 text-gray-700 hover:text-primary"
                            >
                                <Users className="w-4 h-4" />
                                Sobre nosotros
                                <motion.svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    animate={{ rotate: isAboutDropdownOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </motion.svg>
                            </Button>

                            <AnimatePresence>
                                {isAboutDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
                                    >
                                        <Link
                                            href="/el-refugio"
                                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-primary transition font-medium"
                                            onClick={() => setIsAboutDropdownOpen(false)}
                                        >
                                            <Building2 className="w-4 h-4" />
                                            El refugio
                                        </Link>
                                        <Link
                                            href="/nosotros"
                                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-primary transition font-medium"
                                            onClick={() => setIsAboutDropdownOpen(false)}
                                        >
                                            <Heart className="w-4 h-4" />
                                            Nosotros
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/adopcion" className="flex items-center gap-2 text-gray-700 hover:text-primary transition font-medium">
                            <Heart className="w-4 h-4" />
                            Nuestros refugiados
                        </Link>

                        <Link href="/contacto" className="flex items-center gap-2 text-gray-700 hover:text-primary transition font-medium">
                            <Mail className="w-4 h-4" />
                            Contacto
                        </Link>

                        {/* Ayudar Dropdown */}
                        <div className="relative" ref={helpDropdownRef}>
                            <Button
                                onClick={() => setIsHelpDropdownOpen(!isHelpDropdownOpen)}
                                variant="ghost"
                                className="flex items-center gap-2 text-gray-700 hover:text-primary"
                            >
                                <HandHelping className="w-4 h-4" />
                                Ayudar
                                <motion.svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    animate={{ rotate: isHelpDropdownOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </motion.svg>
                            </Button>

                            <AnimatePresence>
                                {isHelpDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
                                    >
                                        <Link
                                            href="/donar"
                                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-primary transition font-medium"
                                            onClick={() => setIsHelpDropdownOpen(false)}
                                        >
                                            <Gift className="w-4 h-4" />
                                            Donar
                                        </Link>
                                        <Link
                                            href="/apadrinar"
                                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-primary transition font-medium"
                                            onClick={() => setIsHelpDropdownOpen(false)}
                                        >
                                            <Crown className="w-4 h-4" />
                                            Apadrinar
                                        </Link>
                                        <Link
                                            href="/denunciar"
                                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-primary transition font-medium"
                                            onClick={() => setIsHelpDropdownOpen(false)}
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            Denunciar
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-gray-700" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden pb-4 border-t border-gray-100 overflow-hidden"
                        >
                            <Link href="/" className="flex items-center gap-3 py-3 text-gray-700 hover:text-primary font-medium" onClick={() => setIsMenuOpen(false)}>
                                <Home className="w-4 h-4" />
                                Inicio
                            </Link>
                            <Link href="/adopcion" className="flex items-center gap-3 py-3 text-gray-700 hover:text-primary font-medium" onClick={() => setIsMenuOpen(false)}>
                                <Heart className="w-4 h-4" />
                                Adopción
                            </Link>
                            <Link href="/nosotros" className="flex items-center gap-3 py-3 text-gray-700 hover:text-primary font-medium" onClick={() => setIsMenuOpen(false)}>
                                <Users className="w-4 h-4" />
                                Nosotros
                            </Link>
                            <Link href="/contacto" className="flex items-center gap-3 py-3 text-gray-700 hover:text-primary font-medium" onClick={() => setIsMenuOpen(false)}>
                                <Mail className="w-4 h-4" />
                                Contacto
                            </Link>

                            {/* Mobile Help Section */}
                            <div className="pt-2 border-t border-gray-100 mt-2">
                                <p className="text-sm font-semibold text-gray-500 mb-2 px-0">Ayudar</p>
                                <Link href="/donar" className="flex items-center gap-3 py-2 pl-4 text-primary font-medium" onClick={() => setIsMenuOpen(false)}>
                                    <Gift className="w-4 h-4" />
                                    Donar
                                </Link>
                                <Link href="/apadrinar" className="flex items-center gap-3 py-2 pl-4 text-primary font-medium" onClick={() => setIsMenuOpen(false)}>
                                    <Crown className="w-4 h-4" />
                                    Apadrinar
                                </Link>
                                <Link href="/voluntarios" className="flex items-center gap-3 py-2 pl-4 text-primary font-medium" onClick={() => setIsMenuOpen(false)}>
                                    <HandshakeIcon className="w-4 h-4" />
                                    Voluntarios
                                </Link>
                                <Link href="/denunciar" className="flex items-center gap-3 py-2 pl-4 text-primary font-medium" onClick={() => setIsMenuOpen(false)}>
                                    <AlertCircle className="w-4 h-4" />
                                    Denunciar
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;

