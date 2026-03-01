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
      className="absolute w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
      style={{ x, rotate, opacity, borderRadius: 28, background: '#FAF5EE', boxShadow: '0 24px 64px rgba(44,26,14,0.18)' }}
    >
      <div style={{ height: '68%', overflow: 'hidden', position: 'relative' }}>
        <Image src={card.image} alt={card.name} fill className="object-cover" />
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(20,10,4,0.45) 100%)' }} />
      </div>
      <div style={{ padding: '20px 24px 24px', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 700, color: '#2C1A0E', margin: '0 0 8px', lineHeight: 1 }}>{card.name}</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ background: 'rgba(194,130,83,0.12)', color: '#A0623A', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 50, fontFamily: 'Outfit, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{card.species}</span>
          <span style={{ border: '1.5px solid rgba(194,130,83,0.35)', color: '#C28253', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 50, fontFamily: 'Outfit, sans-serif', letterSpacing: '0.06em' }}>{card.age}</span>
        </div>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: '#9A7A5A' }}>Deslizá para conocer más</p>
      </div>
    </motion.div>
  );
}
