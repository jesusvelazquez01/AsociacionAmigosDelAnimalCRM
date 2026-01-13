'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type CardItem = {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  emoji?: string;
  colorClass?: string; // Tailwind color helper like 'from-pink-500'
}

export default function CardStack({ items }: { items: CardItem[] }) {
  const [cards, setCards] = useState<CardItem[]>(items);

  function remove(index: number) {
    setCards(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="relative w-full max-w-xl mx-auto h-[420px]">
      {cards.map((card, i) => {
        const idx = cards.length - 1 - i; // top card has index 0
        const y = i * 8; // offset between stacked cards
        const scale = 1 - i * 0.02;

        return (
          <motion.div
            key={card.id}
            className={`absolute inset-0 m-auto w-11/12 h-[360px] rounded-2xl shadow-xl bg-white border border-gray-100 overflow-hidden cursor-grab`}
            style={{ y, scale, zIndex: 50 - i }}
            initial={{ opacity: 0, y: 30 + i * 8, scale: scale - 0.02 }}
            animate={{ opacity: 1, y, scale }}
            whileHover={{ scale: 1.02 }}
            drag={i === 0 ? 'x' : false}
            dragConstraints={{ left: -9999, right: 9999 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              const velocity = Math.abs(info.velocity.x);
              const offset = Math.abs(info.offset.x);
              if (velocity > 500 || offset > 140) {
                // Swiped away
                remove(i);
              }
            }}
            whileTap={{ cursor: 'grabbing' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{card.emoji ?? '🐾'}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{card.title}</h4>
                    {card.subtitle && <p className="text-sm text-gray-500">{card.subtitle}</p>}
                  </div>
                </div>
                <div className="text-xs text-gray-400">{idx + 1}/{cards.length}</div>
              </div>
              <div className="px-6 pb-6 flex-1 flex flex-col">
                <p className="text-gray-600 mb-4 flex-1">{card.description}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => remove(i)}
                    className="text-sm text-pink-500 font-semibold px-5 py-2 rounded-full border border-pink-100 hover:bg-pink-50"
                  >
                    No me interesa
                  </button>
                  <button
                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-95"
                  >
                    Me interesa
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
      {cards.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-500">No hay más tarjetas</div>
        </div>
      )}
    </div>
  );
}
