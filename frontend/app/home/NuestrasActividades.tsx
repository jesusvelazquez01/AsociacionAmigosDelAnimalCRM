'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Scissors, BookOpen, Gavel, Users, ArrowRight } from 'lucide-react';

// Actividades con colores del sistema Furs (todos usan primary)
const activities = [
    {
        title: 'Acción directa',
        description:
            'Intervenimos directamente en la asistencia a animales abandonados en situaciones críticas, proporcionándoles atención médica y fomentando su adopción posterior por parte de hogares responsables.',
        icon: Heart,
    },
    {
        title: 'Acción preventiva',
        description:
            'Organizamos campañas de castración gratuitas y/o de bajo costo en áreas de alta vulnerabilidad donde la presencia estatal es ineficiente y los perros y gatos se reproducen sin control.',
        icon: Scissors,
    },
    {
        title: 'Acciones educativas',
        description:
            'Impartimos charlas, talleres, campañas de bien público y eventos con el propósito de concientizar sobre temas cruciales como la sobrepoblación animal, la importancia de la castración, el cuidado responsable y la ética animal.',
        icon: BookOpen,
    },
    {
        title: 'Acciones judiciales y legislativas',
        description:
            'Exigimos el cumplimiento de las leyes existentes y respaldamos la presentación de proyectos de ley que beneficien a los animales, contribuyendo así a su protección y bienestar.',
        icon: Gavel,
    },
    {
        title: 'Acciones solidarias',
        description:
            'Establecemos colaboraciones estrechas con entidades de bien público, organizaciones y activistas que comparten nuestros objetivos, fortaleciendo la red de apoyo y compromiso hacia la causa animal.',
        icon: Users,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
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

// Componente Tarjeta mejorado con estilo Furs
interface ActivityCardProps {
    activity: typeof activities[0];
    index: number;
    isFeatured: boolean;
}

const ActivityCard = ({ activity, index, isFeatured }: ActivityCardProps) => {
    const Icon = activity.icon;

    return (
        <motion.div
            variants={itemVariants}
            className={`group ${isFeatured ? 'lg:col-span-1' : 'lg:col-span-1'}`}
        >
            <div className={`
                relative h-full rounded-3xl overflow-hidden transition-all duration-300
                bg-white border border-border/50 
                hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1
                ${isFeatured ? 'p-8' : 'p-6'}
            `}>
                {/* Decoración de fondo */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors" />

                {/* Header con ícono y número */}
                <div className="relative flex items-start gap-4 mb-4">
                    {/* Ícono con estilo Furs */}
                    <div className={`
                        flex items-center justify-center rounded-2xl bg-primary/10 
                        transition-all duration-300 group-hover:bg-primary group-hover:scale-105
                        ${isFeatured ? 'w-16 h-16' : 'w-14 h-14'}
                    `}>
                        <Icon className={`
                            text-primary group-hover:text-white transition-colors
                            ${isFeatured ? 'w-8 h-8' : 'w-7 h-7'}
                        `} />
                    </div>


                </div>

                {/* Título */}
                <h3 className={`
                    font-bold text-foreground mb-3 group-hover:text-primary transition-colors
                    ${isFeatured ? 'text-xl md:text-2xl' : 'text-lg'}
                `}>
                    {activity.title}
                </h3>

                {/* Descripción */}
                <p className={`
                    text-muted-foreground leading-relaxed
                    ${isFeatured ? 'text-base' : 'text-sm'}
                `}>
                    {activity.description}
                </p>

                {/* Línea decorativa inferior */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
        </motion.div>
    );
};


const OurActivities = () => {
    // Las primeras 2 actividades son las destacadas
    const featuredActivities = activities.slice(0, 2);
    // Las últimas 3 son los pilares de soporte
    const supportActivities = activities.slice(2);

    return (
        <section className="py-24 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
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
                        Nuestra Labor
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        ¿Cómo desarrollamos{' '}
                        <span className="text-primary">
                            nuestras actividades
                        </span>?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Trabajamos en <span className="text-primary font-semibold">5 frentes clave</span> para proteger y mejorar la vida de los animales en nuestra comunidad
                    </p>
                </motion.div>

                {/* --- 1. ACTIVIDADES DESTACADAS --- */}
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

                {/* --- 2. PILARES DE SOPORTE --- */}
                <div className="text-center mb-10 mt-16">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                        Nuestros <span className="text-primary">Pilares</span> de Soporte
                    </h3>
                </div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {supportActivities.map((activity, index) => (
                        <ActivityCard
                            key={`support-${index}`}
                            activity={activity}
                            index={index + 2}
                            isFeatured={false}
                        />
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <p className="text-muted-foreground mb-6 text-lg">
                        ¿Querés sumarte a nuestra causa y ayudar a más animales?
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
                            <a href="/voluntariado">
                                Ser Voluntario
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </a>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-primary text-primary hover:bg-primary/10">
                            <a href="/donar">Hacer una Donación</a>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default OurActivities;
