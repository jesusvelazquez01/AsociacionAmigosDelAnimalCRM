'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PetCard({ card, onDragEnd }: any) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}

      onDragEnd={(event, info) => onDragEnd(event, info)}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}
      className="absolute w-full h-full cursor-grab active:cursor-grabbing overflow-hidden furs-card bg-background shadow-xl border border-border"
      style={{ x, rotate, opacity }}
    >
      <div className="h-[65%] relative overflow-hidden">
        <Image src={card.image} alt={card.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 30vw" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
      </div>
      <div className="p-6 text-center bg-background h-auto flex flex-col justify-center relative z-10">
        <h3 className="furs-title-lg text-foreground mb-3 leading-none">{card.name}</h3>
        <div className="flex justify-center gap-3 mb-4">
          <span className="bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">{card.species}</span>
          <span className="border border-primary/30 text-primary text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">{card.age}</span>
        </div>
        <p className="text-sm font-medium text-muted-foreground mt-2">← Deslizá para conocer más →</p>
      </div>
    </motion.div>
  );
}
