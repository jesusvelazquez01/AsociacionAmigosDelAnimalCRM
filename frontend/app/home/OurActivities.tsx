'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Scissors, BookOpen, Gavel, Users } from 'lucide-react';

// Se mantiene el array de activities (No necesita cambios)
const activities = [
    {
        title: 'Acción directa',
        description:
            'Intervenimos directamente en la asistencia a animales abandonados en situaciones críticas, proporcionándoles atención médica y fomentando su adopción posterior por parte de hogares responsables.',
        icon: Heart,
        color: 'text-primary',
        bgColor: 'bg-pink-50',
    },
    {
        title: 'Acción preventiva',
        description:
            'Organizamos campañas de castración gratuitas y/o de bajo costo en áreas de alta vulnerabilidad donde la presencia estatal es ineficiente y los perros y gatos se reproducen sin control.',
        icon: Scissors,
        color: 'text-primary',
        bgColor: 'bg-purple-50',
    },
    {
        title: 'Acciones educativas',
        description:
            'Impartimos charlas, talleres, campañas de bien público y eventos con el propósito de concientizar sobre temas cruciales como la sobrepoblación animal, la importancia de la castración, el cuidado responsable y la ética animal.',
        icon: BookOpen,
        color: 'text-primary',
        bgColor: 'bg-blue-50',
    },
    {
        title: 'Acciones judiciales y legislativas',
        description:
            'Exigimos el cumplimiento de las leyes existentes y respaldamos la presentación de proyectos de ley que beneficien a los animales, contribuyendo así a su protección y bienestar.',
        icon: Gavel,
        color: 'text-primary',
        bgColor: 'bg-amber-50',
    },
    {
        title: 'Acciones solidarias',
        description:
            'Establecemos colaboraciones estrechas con entidades de bien público, organizaciones y activistas que comparten nuestros objetivos, fortaleciendo la red de apoyo y compromiso hacia la causa animal.',
        icon: Users,
        color: 'text-primary',
        bgColor: 'bg-green-50',
    },
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

// Componente Tarjeta Abstrato para reutilizar la lógica de renderizado
interface ActivityCardProps {
    activity: typeof activities[0];
    index: number;
    isFeatured: boolean;
}

const ActivityCard = ({ activity, index, isFeatured }: ActivityCardProps) => {
    const Icon = activity.icon;

    // Clases condicionales para las tarjetas destacadas (isFeatured = true)
    const iconSize = isFeatured ? 'w-8 h-8' : 'w-6 h-6';
    const wrapperSize = isFeatured ? 'w-16 h-16 rounded-2xl' : 'w-12 h-12 rounded-xl';
    const titleSize = isFeatured ? 'text-xl md:text-2xl font-bold' : 'text-lg font-semibold';
    const descriptionSize = isFeatured ? 'text-base text-gray-700' : 'text-sm text-gray-600';
    const padding = isFeatured ? 'p-6' : 'p-4';

    return (
        <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, scale: isFeatured ? 1.01 : 1 }} // Movimiento más sutil para las destacadas
            className={isFeatured ? 'lg:col-span-1' : 'lg:col-span-1'} // Las destacadas ocuparán 1 columna en un grid de 2, y las de soporte 1 columna en un grid de 3.
        >
            <Card className={`${activity.bgColor} rounded-2xl border-gray-100 h-full transition-all duration-300 shadow-lg ${isFeatured ? 'shadow-pink-100/80' : 'shadow-sm'}`}>
                <CardHeader className={padding}>
                    <div className="flex items-start justify-between w-full"> {/* Usamos items-start para alinear el icono y el título */}
                        <div className="flex items-start gap-4">
                            <div className={`flex items-center justify-center ${wrapperSize} bg-white/80 shadow`}>
                                <Icon className={`${iconSize} text-pink-600`} />
                            </div>
                            <CardTitle className={`mt-1 ${titleSize} text-gray-900`}>{activity.title}</CardTitle>
                        </div>
                        <Badge variant="secondary">Nuestra labor</Badge>
                    </div>
                </CardHeader>
                <CardContent className={padding}>
                    <CardDescription className={descriptionSize}>
                        {activity.description}
                    </CardDescription>
                </CardContent>
            </Card>
        </motion.div>
    );
};


const OurActivities = () => {
    // Las primeras 2 actividades son las destacadas
    const featuredActivities = activities.slice(0, 2);
    // Las últimas 3 son los pilares de soporte
    const supportActivities = activities.slice(2);

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header (Se mantiene igual, ya está bien) */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <motion.span
                        className="inline-block bg-pink-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Nuestra Labor
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        ¿Cómo desarrollamos{' '}
                        <span className="text-transparent bg-clip-text bg-primary">
                            nuestras actividades
                        </span>?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Trabajamos en <span className="text-primary">5 frentes clave</span> para proteger y mejorar la vida de los animales en nuestra comunidad
                    </p>
                </motion.div>

                {/* --- 1. ACTIVIDADES DESTACADAS (Jerarquía Visual) --- */}
                <motion.div
                    className="grid lg:grid-cols-2 gap-8 mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {featuredActivities.map((activity, index) => (
                        <ActivityCard
                            key={`featured-${index}`}
                            activity={activity}
                            index={index}
                            isFeatured={true}
                        />
                    ))}
                </motion.div>

                {/* --- 2. PILARES DE SOPORTE (Agrupación) --- */}
                <div className="text-center mb-10 mt-16">
                    <h3 className="text-3xl font-bold text-gray-800">Nuestros Pilares de Soporte</h3>
                </div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // Mantiene la animación pero se activa un poco antes
                >
                    {supportActivities.map((activity, index) => (
                        <ActivityCard
                            key={`support-${index}`}
                            activity={activity}
                            index={index + 2} // Continuamos el índice para el staggerChildren
                            isFeatured={false}
                        />
                    ))}
                </motion.div>

                {/* Bottom CTA (Se mantiene igual, ya es efectivo) */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-600 mb-6">
                        ¿Querés sumarte a nuestra causa y ayudar a más animales?
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild>
                            <a href="/voluntariado" className="px-8 py-4 rounded-full">Ser Voluntario</a>
                        </Button>
                        <Button asChild variant="outline">
                            <a href="/donar" className="px-8 py-4 rounded-full">Hacer una Donación</a>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default OurActivities;
