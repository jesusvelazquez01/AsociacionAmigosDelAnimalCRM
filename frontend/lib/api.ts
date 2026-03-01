/**
 * Helper de fetch nativo de Next.js
 * Reemplaza a @/lib/axios con la API fetch extendida de Next.js v16
 *
 * Ventajas sobre Axios:
 * - Caching nativo de Next.js (no-store, force-cache, revalidate)
 * - Deduplificación de requests automática en Server Components
 * - Soporte para tags de invalidación de caché
 * - Sin dependencia extra
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

interface ApiFetchOptions extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

/**
 * Función genérica de fetch para el proyecto.
 * Usa la instancia extendida de fetch de Next.js.
 *
 * @example
 * // Datos siempre frescos (Client o Server Component)
 * const mascotas = await apiFetch<Mascota[]>('/rescataditos', { cache: 'no-store' });
 *
 * @example
 * // Con revalidación automática cada 5 minutos (ISR)
 * const stats = await apiFetch('/estadisticas', { next: { revalidate: 300 } });
 *
 * @example
 * // Con tags para invalidación on-demand
 * const data = await apiFetch('/rescataditos', { next: { tags: ['mascotas'] } });
 */
export async function apiFetch<T = unknown>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { headers: customHeaders, ...rest } = options;

  const url = `${API_URL}${endpoint}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(customHeaders as Record<string, string>),
    },
    ...rest,
  });

  if (!res.ok) {
    let errorMessage = `Error ${res.status}: ${res.statusText}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // no-op si no hay JSON en la respuesta de error
    }
    throw new Error(errorMessage);
  }

  return res.json() as Promise<T>;
}

/**
 * POST: enviar datos al backend (formularios, mutaciones)
 * Para uso en Client Components o Server Actions
 */
export async function apiPost<T = unknown>(
  endpoint: string,
  data: Record<string, unknown>,
  options: ApiFetchOptions = {}
): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
}
