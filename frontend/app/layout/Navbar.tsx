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
        <nav className="bg-background/95 border-b border-border/50 sticky top-0 z-50 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <img
                                src="/Asoc.jpg"
                                alt="Logo Amigos del Animal"
                                className="w-12 h-12 rounded-full object-cover border-2 border-primary/30 group-hover:border-primary transition-colors"
                            />
                            <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                                Amigos del Animal
                            </span>
                            <span className="text-xs text-primary font-medium">Asociación Protectora</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-full hover:bg-primary/5"
                        >
                            <Home className="w-4 h-4" />
                            Inicio
                        </Link>

                        {/* Sobre Nosotros Dropdown */}
                        <div className="relative" ref={aboutDropdownRef}>
                            <Button
                                onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                                variant="ghost"
                                className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full"
                            >
                                <Users className="w-4 h-4" />
                                Sobre nosotros
                                <motion.div
                                    animate={{ rotate: isAboutDropdownOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </motion.div>
                            </Button>

                            <AnimatePresence>
                                {isAboutDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full right-0 mt-2 w-56 bg-card rounded-2xl shadow-xl border border-border/50 py-2 z-50"
                                    >
                                        <Link
                                            href="/el-refugio"
                                            className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors font-medium"
                                            onClick={() => setIsAboutDropdownOpen(false)}
                                        >
                                            <Building2 className="w-4 h-4" />
                                            El refugio
                                        </Link>
                                        <Link
                                            href="/nosotros"
                                            className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors font-medium"
                                            onClick={() => setIsAboutDropdownOpen(false)}
                                        >
                                            <Heart className="w-4 h-4" />
                                            Nosotros
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            href="/adopcion"
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-full hover:bg-primary/5"
                        >
                            <Heart className="w-4 h-4" />
                            Nuestros refugiados
                        </Link>

                        <Link
                            href="/contacto"
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-full hover:bg-primary/5"
                        >
                            <Mail className="w-4 h-4" />
                            Contacto
                        </Link>

                        {/* Ayudar Dropdown */}
                        <div className="relative" ref={helpDropdownRef}>
                            <Button
                                onClick={() => setIsHelpDropdownOpen(!isHelpDropdownOpen)}
                                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-full px-5"
                            >
                                <HandHelping className="w-4 h-4" />
                                Ayudar
                                <motion.div
                                    animate={{ rotate: isHelpDropdownOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </motion.div>
                            </Button>

                            <AnimatePresence>
                                {isHelpDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full right-0 mt-2 w-56 bg-card rounded-2xl shadow-xl border border-border/50 py-2 z-50"
                                    >
                                        <Link
                                            href="/donar"
                                            className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors font-medium"
                                            onClick={() => setIsHelpDropdownOpen(false)}
                                        >
                                            <Gift className="w-4 h-4" />
                                            Donar
                                        </Link>
                                        <Link
                                            href="/apadrinar"
                                            className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors font-medium"
                                            onClick={() => setIsHelpDropdownOpen(false)}
                                        >
                                            <Crown className="w-4 h-4" />
                                            Apadrinar
                                        </Link>
                                        <Link
                                            href="/denunciar"
                                            className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors font-medium"
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
                        className="md:hidden p-2 rounded-full hover:bg-primary/5 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-foreground" />
                        ) : (
                            <Menu className="w-6 h-6 text-foreground" />
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
                            className="md:hidden pb-4 border-t border-border/50 overflow-hidden"
                        >
                            <Link
                                href="/"
                                className="flex items-center gap-3 py-3 text-muted-foreground hover:text-primary font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Home className="w-4 h-4" />
                                Inicio
                            </Link>
                            <Link
                                href="/adopcion"
                                className="flex items-center gap-3 py-3 text-muted-foreground hover:text-primary font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Heart className="w-4 h-4" />
                                Adopción
                            </Link>
                            <Link
                                href="/nosotros"
                                className="flex items-center gap-3 py-3 text-muted-foreground hover:text-primary font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Users className="w-4 h-4" />
                                Nosotros
                            </Link>
                            <Link
                                href="/contacto"
                                className="flex items-center gap-3 py-3 text-muted-foreground hover:text-primary font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Mail className="w-4 h-4" />
                                Contacto
                            </Link>

                            {/* Mobile Help Section */}
                            <div className="pt-3 border-t border-border/50 mt-3">
                                <p className="text-sm font-bold text-primary mb-3">Ayudar</p>
                                <Link
                                    href="/donar"
                                    className="flex items-center gap-3 py-2 pl-4 text-muted-foreground hover:text-primary font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Gift className="w-4 h-4" />
                                    Donar
                                </Link>
                                <Link
                                    href="/apadrinar"
                                    className="flex items-center gap-3 py-2 pl-4 text-muted-foreground hover:text-primary font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Crown className="w-4 h-4" />
                                    Apadrinar
                                </Link>
                                <Link
                                    href="/voluntarios"
                                    className="flex items-center gap-3 py-2 pl-4 text-muted-foreground hover:text-primary font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <HandshakeIcon className="w-4 h-4" />
                                    Voluntarios
                                </Link>
                                <Link
                                    href="/denunciar"
                                    className="flex items-center gap-3 py-2 pl-4 text-muted-foreground hover:text-primary font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
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
