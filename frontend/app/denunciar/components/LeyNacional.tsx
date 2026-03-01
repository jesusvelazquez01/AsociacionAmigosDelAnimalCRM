'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Scale, AlertTriangle, BookOpen, ExternalLink, Heart } from 'lucide-react';

export default function LeyNacional() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 overflow-hidden">
      <div className="furs-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="furs-badge bg-orange-100 text-orange-700 border border-orange-200 mb-4">
              <Scale className="w-4 h-4 mr-2" />
              Marco Legal
            </span>
            <h2 className="furs-title-lg text-foreground mb-6">
              Ley Nacional <span className="text-primary">14.346</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Argentina cuenta con una ley de protección animal que establece penas
              de <strong>15 días a 1 año de prisión</strong> para quienes maltraten o causen sufrimiento a los animales.
            </p>

            <div className="space-y-3 mb-8">
              <h4 className="font-bold text-foreground">Actos penados por la ley:</h4>
              {[
                "No alimentar adecuadamente a los animales",
                "Hacerlos trabajar en exceso o maltratarlos",
                "Abandonarlos en la vía pública",
                "Lastimarlos o torturarlos intencionalmente",
                "Organizar o participar en peleas de animales"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-muted-foreground">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a
              href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/150000-154999/153011/norma.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-secondary inline-flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Leer Ley completa
              <ExternalLink className="w-4 h-4" />
            </a>

            <p className="text-muted-foreground mt-6">
              También podés realizar tu denuncia de forma anónima vía web a través de{' '}
              <a
                href="https://argentina.tupista.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                tupista.org
              </a>
              {' '}(Botón <span className="font-semibold">Denunciar</span> seleccionar <span className="font-semibold">Medio Ambiente</span>)
            </p>

          </motion.div>

          {/* Imagen ilustrativa */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="furs-card bg-card border border-border/50 p-6">
              <Image
                src="/Foto-perritos/perrito7.jpg"
                alt="Protección animal"
                width={500}
                height={400}
                className="furs-image w-full h-100 object-cover"
              />
              <div className="text-center mt-4">
                <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">
                  Todos los animales merecen vivir sin sufrimiento
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
