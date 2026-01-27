'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight } from 'lucide-react';

interface Pet {
    id: number;
    name: string;
    age: string;
    description: string;
    gender: string;
    size: string;
    image: string;
}

const pets: Pet[] = [
    {
        id: 1,
        name: "Luna",
        age: "2 años",
        description: "Dulce, juguetona y perfecta para familias. Le encanta correr y recibir caricias.",
        gender: "Hembra",
        size: "Mediana",
        image: "/Foto-perritos/perrito1.jpg"
    },
    {
        id: 2,
        name: "Simba",
        age: "1 año",
        description: "Cariñoso, tranquilo e independiente. Ideal para departamentos.",
        gender: "Macho",
        size: "Pequeño",
        image: "/Foto-perritos/perrito2.jpg"
    },
    {
        id: 3,
        name: "Max",
        age: "3 años",
        description: "Leal, protector y muy inteligente. Necesita espacio para ejercitarse.",
        gender: "Macho",
        size: "Grande",
        image: "/Foto-perritos/perrito3.jpg"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const PetCard = ({ pet }: { pet: Pet }) => (
    <motion.div
        variants={itemVariants}
        className="group"
    >
        <div className="relative h-full bg-white rounded-3xl border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
            {/* Imagen */}
            <div className="relative overflow-hidden">
                <img
                    src={pet.image}
                    alt={`${pet.name} en adopción`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge de edad */}
                <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        {pet.age}
                    </span>
                </div>

                {/* Botón de favorito */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors">
                        <Heart className="w-5 h-5 text-primary group-hover:text-inherit" />
                    </button>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {pet.name}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                    {pet.description}
                </p>

                {/* Tags */}
                <div className="flex gap-2 mb-6">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {pet.gender}
                    </span>
                    <span className="bg-secondary/50 text-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {pet.size}
                    </span>
                </div>

                {/* Botón */}
                <Button asChild className="w-full rounded-full bg-primary hover:bg-primary/90">
                    <Link href={`/adopcion/${pet.id}`}>
                        Conocer a {pet.name}
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </Button>
            </div>

            {/* Línea decorativa inferior */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>
    </motion.div>
);

const FeaturedPets = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
            {/* Decoraciones de fondo */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <motion.span
                        className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Adopta, no compres
                    </motion.span>

                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Encuentra tu <span className="text-primary">Mejor Amigo</span>
                    </h2>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Todos nuestros animalitos están esperando conocerte. Están vacunados, desparasitados y listos para llenar tu vida de amor.
                    </p>
                </motion.div>

                {/* Grid de mascotas */}
                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {pets.map((pet) => (
                        <PetCard key={pet.id} pet={pet} />
                    ))}
                </motion.div>

                {/* CTA inferior */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-primary text-primary hover:bg-primary/10">
                        <Link href="/adopcion">
                            Ver Todos los Animalitos
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedPets;
