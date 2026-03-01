/**
 * Componente reutilizable: animación de huellas de perro caminando.
 * Úsalo en cualquier loading state del proyecto.
 *
 * @example
 * <PatitosCaminando mensaje="Buscando mascotas..." />
 * <PatitosCaminando size="sm" mensaje="Cargando..." />
 */

const keyframes = `
@keyframes pata-aparecer {
  0%   { opacity: 0; transform: translateY(0)    scale(0.7) rotate(var(--rot)); }
  25%  { opacity: 1; transform: translateY(-10px) scale(1.1) rotate(var(--rot)); }
  55%  { opacity: 1; transform: translateY(0)    scale(1)   rotate(var(--rot)); }
  85%  { opacity: 0.3; transform: translateY(2px)  scale(0.95) rotate(var(--rot)); }
  100% { opacity: 0; transform: translateY(0)    scale(0.7) rotate(var(--rot)); }
}
`;

interface PatitosCaminandoProps {
  mensaje?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function PatitosCaminando({
  mensaje = 'Cargando...',
  size = 'md',
  className = '',
}: PatitosCaminandoProps) {
  const sizes = {
    sm: { pata: 'w-7 h-7',  gap: 'gap-2', text: 'text-xs' },
    md: { pata: 'w-10 h-10', gap: 'gap-3', text: 'text-sm' },
    lg: { pata: 'w-14 h-14', gap: 'gap-4', text: 'text-base' },
  };

  const s = sizes[size];

  // Alternar rotación para simular pata izquierda / derecha
  const rotaciones = ['-8deg', '8deg', '-8deg', '8deg', '-8deg'];

  return (
    <div className={`flex flex-col items-center justify-center gap-4 py-12 ${className}`}>
      <style>{keyframes}</style>

      <div className={`flex items-end ${s.gap} h-16`}>
        {rotaciones.map((rot, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className={`${s.pata} text-primary flex-shrink-0`}
            style={{
              '--rot': rot,
              animation: `pata-aparecer 1.2s ease-in-out ${i * 0.2}s infinite`,
              opacity: 0,
            } as React.CSSProperties}
            fill="currentColor"
            aria-hidden="true"
          >
            {/* Palma */}
            <ellipse cx="32" cy="41" rx="13" ry="11" />
            {/* Deditos */}
            <ellipse cx="14" cy="26" rx="6"  ry="7.5" />
            <ellipse cx="26" cy="18" rx="6.5" ry="7.5" />
            <ellipse cx="38" cy="18" rx="6.5" ry="7.5" />
            <ellipse cx="50" cy="26" rx="6"  ry="7.5" />
          </svg>
        ))}
      </div>

      {mensaje && (
        <p className={`text-muted-foreground font-medium animate-pulse ${s.text}`}>
          {mensaje}
        </p>
      )}
    </div>
  );
}
