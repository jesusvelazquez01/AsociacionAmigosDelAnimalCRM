# 1. Imagen base para instalar dependencias
FROM node:20-slim AS deps

WORKDIR /app

# Copiamos package.json y lockfile
COPY package.json package-lock.json* ./

# Instalamos dependencias y forzamos la instalación de binarios nativos de lightningcss
RUN npm ci && \
    npm rebuild lightningcss

# 2. Imagen para construir el proyecto (Builder)
FROM node:20-slim AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Deshabilitamos telemetría de Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Argumentos de construcción (Las variables de entorno de Easypanel se pasan aquí)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Ejecutamos el build
RUN npm run build

# 3. Imagen final para producción (Runner)
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Crear usuario y grupo para seguridad
RUN groupadd --system --gid 1001 asoc_amigos_26 && \
    useradd --system --uid 1001 --gid asoc_amigos_26 asoc_amigos_26

# --- PERMISOS ---
COPY --from=builder --chown=asoc_amigos_26:asoc_amigos_26 /app/public ./public
COPY --from=builder --chown=asoc_amigos_26:asoc_amigos_26 /app/.next/standalone ./
COPY --from=builder --chown=asoc_amigos_26:asoc_amigos_26 /app/.next/static ./.next/static

USER asoc_amigos_26

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]