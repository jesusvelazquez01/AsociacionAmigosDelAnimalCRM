'use client';

import React from 'react';

// Import local components
import HeroApadrinar from './components/HeroApadrinar';
import PlanesApadrinar from './components/PlanesApadrinar';
import ProcesoApadrinar from './components/ProcesoApadrinar';
import SignificadoApadrinar from './components/SignificadoApadrinar';
import FaqYAnimales from './components/FaqYAnimales';
import LlamadoAAccion from './components/LlamadoAAccion';

// ─── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────
export default function ApadrinarPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');

        :root {
          --cream:       #FAF5EE;
          --cream-dark:  #F0E6D3;
          --terracotta:  #C28253;
          --terra-deep:  #A0623A;
          --forest:      #2D4A35;
          --brown:       #2C1A0E;
          --muted:       #9A7A5A;
          --card:        #FFFDF8;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ap-page { background: var(--cream); font-family: 'Outfit', sans-serif; color: var(--brown); overflow-x: hidden; }

        /* ── HERO ── */
        .ap-hero {
          min-height: 92vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 768px) { .ap-hero { grid-template-columns: 1fr; min-height: auto; } }

        .ap-hero-left {
          background: var(--forest);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 64px 80px 48px;
          position: relative;
          z-index: 2;
        }
        @media (max-width: 768px) { .ap-hero-left { padding: 64px 32px; } }

        .ap-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1.5px solid rgba(194,130,83,0.4);
          color: var(--terracotta);
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 7px 16px; border-radius: 50px;
          margin-bottom: 32px; width: fit-content;
          background: rgba(194,130,83,0.08);
        }

        .ap-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 6vw, 88px);
          font-weight: 700;
          line-height: 0.95;
          color: white;
          margin-bottom: 28px;
          letter-spacing: -0.01em;
        }
        .ap-hero-title em { color: var(--terracotta); font-style: italic; }

        .ap-hero-sub {
          font-size: 16px; font-weight: 300;
          color: rgba(255,255,255,0.65);
          line-height: 1.75;
          max-width: 400px;
          margin-bottom: 48px;
        }

        .ap-hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--terracotta);
          color: white; font-size: 16px; font-weight: 600;
          padding: 16px 36px; border-radius: 50px; border: none;
          cursor: pointer; font-family: 'Outfit', sans-serif;
          transition: all 0.25s; text-decoration: none;
          box-shadow: 0 8px 32px rgba(194,130,83,0.35);
          width: fit-content;
        }
        .ap-hero-cta:hover { background: var(--terra-deep); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(194,130,83,0.45); }

        .ap-hero-right {
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 768px) { .ap-hero-right { height: 360px; } }

        .ap-hero-right img { object-fit: cover; }

        .ap-hero-right::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--forest) 0%, transparent 45%);
          z-index: 1;
        }

        /* Big decorative number */
        .ap-hero-num {
          position: absolute; bottom: -20px; right: 24px; z-index: 2;
          font-family: 'Cormorant Garamond', serif;
          font-size: 220px; font-weight: 700; font-style: italic;
          color: rgba(255,255,255,0.06); line-height: 1;
          pointer-events: none; user-select: none;
        }

        /* ── SECTION SHARED ── */
        .ap-section { padding: 96px 24px; }
        .ap-container { max-width: 1200px; margin: 0 auto; }

        .ap-section-tag {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--terracotta);
          margin-bottom: 16px;
        }
        .ap-section-tag::before { content: ''; width: 24px; height: 1.5px; background: var(--terracotta); display: block; }

        .ap-title-display {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4.5vw, 60px);
          font-weight: 700; color: var(--brown);
          line-height: 1.1; margin-bottom: 16px;
        }
        .ap-title-display em { color: var(--terracotta); font-style: italic; }
        .ap-title-display.light { color: white; }
        .ap-title-display.light em { color: var(--terracotta); }

        .ap-sub { font-size: 16px; color: var(--muted); line-height: 1.7; max-width: 520px; }
        .ap-sub.center { text-align: center; margin: 0 auto; }
        .ap-sub.light { color: rgba(255,255,255,0.6); }

        /* ── PLANES ── */
        .ap-planes-bg { background: var(--cream-dark); }

        .ap-planes-header { text-align: center; margin-bottom: 64px; }

        .ap-planes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) { .ap-planes-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; } }

        .ap-plan-card {
          background: var(--card);
          border-radius: 28px;
          padding: 40px 32px;
          display: flex; flex-direction: column;
          border: 2px solid rgba(194,130,83,0.15);
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
        }
        .ap-plan-card:hover { transform: translateY(-8px); box-shadow: 0 24px 64px rgba(44,26,14,0.12); border-color: rgba(194,130,83,0.4); }
        .ap-plan-card.featured {
          background: var(--forest);
          border-color: transparent;
          box-shadow: 0 16px 64px rgba(45,74,53,0.3);
        }
        .ap-plan-card.featured:hover { transform: translateY(-12px); box-shadow: 0 28px 80px rgba(45,74,53,0.35); }

        .ap-plan-badge {
          position: absolute; top: 24px; right: 24px;
          background: var(--terracotta); color: white;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 50px;
        }

        .ap-plan-icon {
          width: 48px; height: 48px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
        }
        .ap-plan-icon.normal { background: rgba(194,130,83,0.12); }
        .ap-plan-icon.featured { background: rgba(255,255,255,0.15); }

        .ap-plan-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 700;
          color: var(--brown); margin-bottom: 6px;
        }
        .ap-plan-name.light { color: white; }

        .ap-plan-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px; font-weight: 700;
          color: var(--terracotta); line-height: 1;
          margin: 12px 0 6px;
        }
        .ap-plan-price-sub { font-size: 13px; color: var(--muted); margin-bottom: 28px; }
        .ap-plan-price-sub.light { color: rgba(255,255,255,0.5); }

        .ap-plan-divider { height: 1px; background: rgba(194,130,83,0.15); margin-bottom: 24px; }
        .ap-plan-divider.light { background: rgba(255,255,255,0.12); }

        .ap-plan-features { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; margin-bottom: 32px; }
        .ap-plan-feature { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: var(--brown); }
        .ap-plan-feature.light { color: rgba(255,255,255,0.8); }
        .ap-plan-check { color: var(--forest); font-weight: 700; flex-shrink: 0; }
        .ap-plan-check.light { color: var(--terracotta); }

        .ap-plan-btn {
          width: 100%; padding: 14px; border-radius: 14px;
          font-size: 15px; font-weight: 600; cursor: pointer;
          font-family: 'Outfit', sans-serif;
          transition: all 0.2s; border: 2px solid;
        }
        .ap-plan-btn.normal { background: transparent; border-color: rgba(194,130,83,0.4); color: var(--brown); }
        .ap-plan-btn.normal:hover { border-color: var(--terracotta); color: var(--terracotta); }
        .ap-plan-btn.featured-btn { background: var(--terracotta); border-color: var(--terracotta); color: white; }
        .ap-plan-btn.featured-btn:hover { background: var(--terra-deep); border-color: var(--terra-deep); }

        /* ── STEPS ── */
        .ap-steps-bg { background: var(--cream); }

        .ap-steps-wrap { display: grid; grid-template-columns: 1fr 2fr; gap: 80px; align-items: start; }
        @media (max-width: 900px) { .ap-steps-wrap { grid-template-columns: 1fr; gap: 40px; } }

        .ap-steps-list { display: flex; flex-direction: column; gap: 0; }

        .ap-step-item {
          display: flex; gap: 24px; align-items: flex-start;
          padding: 28px 0;
          border-bottom: 1px solid rgba(194,130,83,0.15);
          position: relative;
        }
        .ap-step-item:last-child { border-bottom: none; }

        .ap-step-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px; font-weight: 700; font-style: italic;
          color: rgba(194,130,83,0.25); line-height: 1;
          min-width: 56px; text-align: right;
          transition: color 0.2s;
        }
        .ap-step-item:hover .ap-step-num { color: var(--terracotta); }

        .ap-step-body { padding-top: 6px; }
        .ap-step-title { font-size: 17px; font-weight: 600; color: var(--brown); margin-bottom: 6px; }
        .ap-step-desc { font-size: 14px; color: var(--muted); line-height: 1.6; }

        /* ── QUÉ SIGNIFICA ── */
        .ap-what-bg { background: var(--forest); }

        .ap-what-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        @media (max-width: 900px) { .ap-what-grid { grid-template-columns: 1fr; gap: 48px; } }

        .ap-benefit-list { display: flex; flex-direction: column; gap: 14px; margin-top: 32px; }
        .ap-benefit-item {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 18px; border-radius: 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 14px; color: rgba(255,255,255,0.8);
          transition: background 0.2s;
        }
        .ap-benefit-item:hover { background: rgba(255,255,255,0.08); }
        .ap-benefit-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--terracotta); flex-shrink: 0; }

        .ap-what-img-wrap {
          border-radius: 28px; overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.3);
          position: relative;
        }
        .ap-what-img-frame {
          background: rgba(255,255,255,0.06);
          border-radius: 28px; padding: 16px;
        }
        .ap-what-img-inner { border-radius: 18px; overflow: hidden; }

        /* ── ANIMALES + FAQ ── */
        .ap-grid-two { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        @media (max-width: 900px) { .ap-grid-two { grid-template-columns: 1fr; gap: 64px; } }

        /* FAQ */
        .ap-faq-item {
          background: var(--cream-dark);
          border-radius: 18px; overflow: hidden;
          margin-bottom: 10px; border: none;
        }
        .ap-faq-trigger {
          width: 100%; text-align: left;
          padding: 20px 24px;
          display: flex; align-items: center; justify-content: space-between;
          font-size: 15px; font-weight: 500; color: var(--brown);
          cursor: pointer; background: none; border: none;
          font-family: 'Outfit', sans-serif;
          gap: 16px;
        }
        .ap-faq-trigger:hover { color: var(--terracotta); }
        .ap-faq-content {
          padding: 0 24px 20px;
          font-size: 14px; color: var(--muted); line-height: 1.7;
        }

        /* Card carousel */
        .ap-carousel-wrap { position: relative; width: 100%; max-width: 340px; height: 460px; margin: 0 auto; }
        .ap-carousel-nav { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 24px; }
        .ap-nav-btn {
          width: 44px; height: 44px; border-radius: 50%;
          border: 2px solid rgba(194,130,83,0.3);
          background: transparent; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: var(--brown); transition: all 0.2s;
        }
        .ap-nav-btn:hover { border-color: var(--terracotta); color: var(--terracotta); }
        .ap-counter { font-size: 13px; color: var(--muted); font-family: 'Outfit', sans-serif; }

        /* ── CTA FINAL ── */
        .ap-cta-bg {
          background: var(--brown);
          padding: 120px 24px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .ap-cta-bg::before {
          content: '♥';
          position: absolute;
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          font-size: 600px;
          color: rgba(255,255,255,0.02);
          pointer-events: none; line-height: 1;
          font-family: serif;
        }
        .ap-cta-inner { max-width: 640px; margin: 0 auto; position: relative; z-index: 1; }
        .ap-cta-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: rgba(194,130,83,0.15);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 32px;
        }
        .ap-cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 700; color: white;
          line-height: 1.05; margin-bottom: 20px;
        }
        .ap-cta-title em { color: var(--terracotta); font-style: italic; }
        .ap-cta-sub { font-size: 16px; color: rgba(255,255,255,0.5); line-height: 1.7; margin-bottom: 48px; }
        .ap-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--terracotta); color: white;
          font-size: 17px; font-weight: 600;
          padding: 18px 48px; border-radius: 50px;
          border: none; cursor: pointer;
          font-family: 'Outfit', sans-serif;
          transition: all 0.25s;
          box-shadow: 0 8px 32px rgba(194,130,83,0.3);
          text-decoration: none;
        }
        .ap-cta-btn:hover { background: var(--terra-deep); transform: translateY(-3px); box-shadow: 0 16px 48px rgba(194,130,83,0.4); }
      `}</style>

      <div className="ap-page">
        <HeroApadrinar />
        <PlanesApadrinar />
        <ProcesoApadrinar />
        <SignificadoApadrinar />
        <FaqYAnimales />
        <LlamadoAAccion />
      </div>
    </>
  );
}