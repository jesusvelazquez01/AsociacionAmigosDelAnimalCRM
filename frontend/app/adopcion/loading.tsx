/**
 * Loading UI para la ruta /adopcion
 * Next.js muestra este componente automáticamente durante la navegación
 * mientras el Server Component se renderiza en el servidor.
 */
import PatitosCaminando from '@/components/ui/PatitosCaminando';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <PatitosCaminando mensaje="Cargando animalitos..." size="lg" />
    </div>
  );
}
