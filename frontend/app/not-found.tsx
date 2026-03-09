import Link from 'next/link';
import { Home, PawPrint } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="relative min-h-screen bg-background overflow-hidden flex flex-col items-center justify-center px-6 py-16">

            {/* ── Fondos decorativos ───────────────────────────────────── */}
            <div className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-24 w-[380px] h-[380px] rounded-full bg-secondary/20 blur-3xl" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

            {/* Dot pattern usando color primario del tema */}
            <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `radial-gradient(circle, oklch(0.8230 0.1200 346 / 0.22) 1.5px, transparent 1.5px)`,
                    backgroundSize: '32px 32px',
                    maskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, black 20%, transparent 100%)',
                }}
            />

            {/* ── Contenido ────────────────────────────────────────────── */}
            <div className="relative z-10 w-full max-w-lg text-center flex flex-col items-center">

                {/* Eyebrow pill */}
                <div
                    className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase"
                >
                    <PawPrint size={12} />
                    Página no encontrada
                </div>

                {/* 404 outline gigante — Playfair Display */}
                <h1
                    className="furs-title select-none leading-none mb-0"
                    style={{
                        fontSize: 'clamp(100px, 20vw, 176px)',
                        fontWeight: 900,
                        fontStyle: 'italic',
                        color: 'transparent',
                        WebkitTextStroke: '2.5px oklch(0.8230 0.1200 346 / 0.7)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                    }}
                >
                    404
                </h1>

                {/* ── Perrito SVG ───────────────────────────────────────── */}
                <div className="relative flex justify-center my-1">

                    {/* ? flotantes */}
                    {[
                        { style: { top: 0, right: '12%', fontSize: 28, animationDelay: '0s' } },
                        { style: { top: 20, left: '8%', fontSize: 20, animationDelay: '0.8s' } },
                        { style: { top: -8, right: '28%', fontSize: 34, animationDelay: '1.6s' } },
                    ].map((q, i) => (
                        <span
                            key={i}
                            className="absolute font-bold furs-title italic"
                            style={{
                                ...q.style,
                                color: 'oklch(0.8230 0.1200 346)',
                                opacity: 0,
                                animation: 'floatQ 3s ease-in-out infinite',
                            }}
                        >?</span>
                    ))}

                    <style>{`
                        @keyframes floatQ {
                            0%   { opacity: 0; transform: translateY(0); }
                            20%  { opacity: 0.8; }
                            60%  { opacity: 0.4; transform: translateY(-18px); }
                            100% { opacity: 0; transform: translateY(-30px); }
                        }
                        @keyframes dogTilt {
                            0%, 100% { transform: rotate(-8deg); }
                            50%      { transform: rotate(5deg); }
                        }
                        .nf-dog {
                            animation: dogTilt 2.8s ease-in-out infinite;
                            transform-origin: bottom center;
                        }
                    `}</style>

                    {/* Perrito SVG — colores adaptados a paleta rosa/primario */}
                    <svg className="nf-dog" width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Cuerpo */}
                        <ellipse cx="80" cy="118" rx="38" ry="28" fill="#f2bdd0"/>
                        {/* Patas traseras */}
                        <ellipse cx="56" cy="140" rx="12" ry="8" fill="#e89ab8"/>
                        <ellipse cx="104" cy="140" rx="12" ry="8" fill="#e89ab8"/>
                        {/* Patitas delanteras */}
                        <ellipse cx="50" cy="132" rx="8" ry="6" fill="#e89ab8"/>
                        <ellipse cx="110" cy="132" rx="8" ry="6" fill="#e89ab8"/>
                        <ellipse cx="50" cy="136" rx="7" ry="5" fill="#d4789f"/>
                        <ellipse cx="110" cy="136" rx="7" ry="5" fill="#d4789f"/>
                        <ellipse cx="56" cy="144" rx="10" ry="6" fill="#d4789f"/>
                        <ellipse cx="104" cy="144" rx="10" ry="6" fill="#d4789f"/>
                        {/* Cola */}
                        <path d="M118 108 Q138 88 132 72 Q128 62 122 68 Q130 80 116 96 Z" fill="#e89ab8"/>
                        {/* Cuello */}
                        <ellipse cx="80" cy="94" rx="22" ry="14" fill="#f2bdd0"/>
                        {/* Cabeza inclinada */}
                        <g transform="rotate(15, 80, 72)">
                            <ellipse cx="80" cy="66" rx="34" ry="30" fill="#f2bdd0"/>
                            {/* Orejas */}
                            <ellipse cx="50" cy="56" rx="14" ry="20" fill="#e89ab8" transform="rotate(-15, 50, 56)"/>
                            <ellipse cx="110" cy="58" rx="12" ry="18" fill="#e89ab8" transform="rotate(10, 110, 58)"/>
                            <ellipse cx="50" cy="57" rx="9" ry="14" fill="#d4789f" transform="rotate(-15, 50, 57)"/>
                            <ellipse cx="110" cy="59" rx="7" ry="12" fill="#d4789f" transform="rotate(10, 110, 59)"/>
                            {/* Ojos */}
                            <ellipse cx="66" cy="62" rx="7" ry="7" fill="white"/>
                            <ellipse cx="67" cy="63" rx="4.5" ry="4.5" fill="#3d1a2e"/>
                            <ellipse cx="68.5" cy="61.5" rx="1.5" ry="1.5" fill="white"/>
                            <ellipse cx="94" cy="62" rx="8" ry="8" fill="white"/>
                            <ellipse cx="95" cy="63" rx="5" ry="5" fill="#3d1a2e"/>
                            <ellipse cx="96.5" cy="61.5" rx="1.5" ry="1.5" fill="white"/>
                            {/* Cejas confundidas */}
                            <path d="M60 54 Q66 50 72 53" stroke="#a04070" strokeWidth="2" strokeLinecap="round" fill="none"/>
                            <path d="M88 52 Q95 49 100 53" stroke="#a04070" strokeWidth="2" strokeLinecap="round" fill="none"/>
                            {/* Hocico */}
                            <ellipse cx="80" cy="76" rx="14" ry="10" fill="#e89ab8"/>
                            <ellipse cx="80" cy="70" rx="6" ry="4" fill="#3d1a2e"/>
                            <ellipse cx="78" cy="69" rx="1.5" ry="1" fill="rgba(255,255,255,0.4)"/>
                            <path d="M74 78 Q80 84 86 78" stroke="#a04070" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                            {/* Manchita */}
                            <ellipse cx="88" cy="48" rx="10" ry="8" fill="#e89ab8" opacity="0.55"/>
                        </g>
                        {/* Collar — rosa primario */}
                        <rect x="62" y="88" width="36" height="8" rx="4" fill="oklch(0.8230 0.1200 346)"/>
                        <ellipse cx="80" cy="96" rx="4" ry="3" fill="oklch(0.68 0.16 346)"/>
                        {/* Chapita dorada */}
                        <ellipse cx="80" cy="97" rx="3" ry="2.5" fill="#f5c842"/>
                    </svg>
                </div>

                {/* ── Textos ────────────────────────────────────────────── */}
                <h2
                    className="furs-title text-foreground mb-3 leading-snug"
                    style={{
                        fontSize: 'clamp(24px, 4vw, 36px)',
                        fontWeight: 700,
                    }}
                >
                    ¡Ups! Este rincón{' '}
                    <em className="not-italic text-primary">no existe</em>
                </h2>

                <p
                    className="text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto text-[15px] font-light"
                >
                    La página que buscás fue movida, no existe, el asoc fue adoptado o tal vez escribiste mal la dirección. Nuestros rescataditos tampoco la encuentran.
                </p>

                {/* Divider con huellita */}
                <div className="flex items-center justify-center gap-3 mb-8 w-full max-w-xs mx-auto">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
                    <PawPrint size={14} className="text-primary opacity-40 flex-shrink-0" />
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
                </div>

                {/* ── Botones ───────────────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center w-full">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md bg-primary text-primary-foreground"
                    >
                        <Home size={16} />
                        Volver al inicio
                    </Link>

                    <Link
                        href="/adopcion"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-semibold border-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/10 active:translate-y-0 border-primary text-primary bg-transparent"
                    >
                        <PawPrint size={15} />
                        Ver adopción
                    </Link>
                </div>
            </div>

            {/* Strip inferior */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1.5"
                style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary), var(--primary))' }}
            />
        </div>
    );
}