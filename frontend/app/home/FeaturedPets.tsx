import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

const PetCard = ({ pet }: { pet: Pet }) => (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-pink-300 transition-all hover:shadow-xl group">
        <div className="relative overflow-hidden">
            <img 
                src={pet.image} 
                alt={`${pet.name} en adopción`} 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute top-4 right-4">
                <span className="bg-white/90 backdrop-blur-sm text-pink-600 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {pet.age}
                </span>
            </div>
        </div>
        <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{pet.name}</h3>
            <p className="text-gray-600 mb-4">{pet.description}</p>
            <div className="flex gap-2 mb-4">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{pet.gender}</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{pet.size}</span>
            </div>
            <Button asChild className="w-full">
                <Link href={`/adopcion/${pet.id}`} className="w-full text-center">
                    Conocer a {pet.name}
                </Link>
            </Button>
        </div>
    </div>
);

const FeaturedPets = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        Adopta, no compres
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Encuentra tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Mejor Amigo</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Todos nuestros animalitos están esperando conocerte. Están vacunados, desparasitados y listos para llenar tu vida de amor.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {pets.map((pet) => (
                        <PetCard key={pet.id} pet={pet} />
                    ))}
                </div>
                
                <div className="text-center mt-12">
                    <Button asChild>
                        <Link href="/adopcion">Ver Todos los Animalitos</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPets;
