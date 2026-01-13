import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: "El refugio | Amigos del Animal",
  description: "Tu donación ayuda a rescatar, cuidar y encontrar hogares para animales abandonados en Jujuy. Cada aporte cuenta.",
};

const donationOptions = [
  { amount: "$1.000", description: "Alimentación para un animal por 1 semana" },
  { amount: "$2.500", description: "Vacunas y desparasitación" },
  { amount: "$5.000", description: "Castración/Esterilización" },
  { amount: "$10.000", description: "Cirugía o tratamiento especial" },
];

export default function DonarPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-pink-50 to-white py-20" style={{backgroundImage: 'url(/Foto-perritos/perrito11.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top 35%'}}>
        <div className="absolute inset-0 bg-pink-900/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Tu ayuda salva vidas
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Haz una <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-rose-200">Donación</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Cada aporte, por pequeño que sea, nos ayuda a seguir rescatando, curando y encontrando hogares para animales que lo necesitan.
          </p>
        </div>
      </section>

      {/* How donations help */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿En qué usamos tu donación?</h2>
            <p className="text-xl text-gray-600">100% de las donaciones se destinan al cuidado de los animales</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {donationOptions.map((option, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-pink-500 mb-2">{option.amount}</div>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

     

      {/* Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Gracias a donantes como vos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-5xl font-bold text-pink-500 mb-2">+400</div>
                <p className="text-gray-600">Animales rescatados</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-5xl font-bold text-pink-500 mb-2">+1.200</div>
                <p className="text-gray-600">Castraciones realizadas</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-5xl font-bold text-pink-500 mb-2">+350</div>
                <p className="text-gray-600">Adopciones exitosas</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">¿Prefieres ayudar de otra manera?</h2>
          <p className="text-pink-100 mb-8">
            También puedes ser voluntario, hogar temporal o ayudar a difundir nuestros casos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/voluntariado">
                Ser Voluntario
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/contacto">
                Contactar
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
