<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Sistema de Gestión - Asociación Amigos del Animal. Panel administrativo para la gestión de rescataditos, adopciones y padrinos.">
    <title>Asociación Amigos del Animal - Sistema de Gestión</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet">
    <style>
        /* ========================================
           VARIABLES Y CONFIGURACIÓN BASE
           ======================================== */
        :root {
            /* Colores base */
            --background: oklch(0.9777 0.0041 301.4256);
            --foreground: oklch(0.3651 0.0325 287.0807);
            --card: oklch(1.0000 0 0);
            --card-foreground: oklch(0.3651 0.0325 287.0807);
            --popover: oklch(1.0000 0 0);
            --popover-foreground: oklch(0.3651 0.0325 287.0807);
            
            /* Colores principales */
            --primary: oklch(0.8230 0.1200 346.0180);
            --primary-foreground: oklch(0.9777 0.0041 301.4256);
            --secondary: oklch(0.8990 0.0610 343.2310);
            --secondary-foreground: oklch(0.3651 0.0325 287.0807);
            
            /* Colores de acento y estados */
            --muted: oklch(0.8906 0.0139 299.7754);
            --muted-foreground: oklch(0.5288 0.0375 290.7895);
            --accent: oklch(0.8990 0.0610 343.2310);
            --accent-foreground: oklch(0.3394 0.0441 1.7583);
            --destructive: oklch(0.6332 0.1578 22.6734);
            --destructive-foreground: oklch(0.9777 0.0041 301.4256);
            
            /* Bordes y inputs */
            --border: oklch(0.8690 0.0220 252.8940);
            --input: oklch(0.9329 0.0124 301.2783);
            --ring: oklch(0.8990 0.0610 343.2310);
            
            /* Sidebar */
            --sidebar: oklch(0.9554 0.0082 301.3541);
            --sidebar-foreground: oklch(0.3651 0.0325 287.0807);
            --sidebar-primary: oklch(0.6104 0.0767 299.7335);
            --sidebar-border: oklch(0.8719 0.0198 302.1690);
            
            /* Tipografía */
            --font-sans: "Manrope", system-ui, -apple-system, sans-serif;
            --font-serif: "Playfair Display", Georgia, serif;
            
            /* Espaciado y bordes */
            --radius: 1.25rem;
            --spacing: 0.25rem;
            
            /* Sombras */
            --shadow-sm: 1px 2px 1px 1px hsl(0 0% 0% / 0.12);
            --shadow-md: 1px 2px 1px 1px hsl(0 0% 0% / 0.24), 1px 2px 4px 0px hsl(0 0% 0% / 0.24);
            --shadow-lg: 1px 2px 1px 1px hsl(0 0% 0% / 0.24), 1px 4px 6px 0px hsl(0 0% 0% / 0.24);
            --shadow-xl: 1px 2px 1px 1px hsl(0 0% 0% / 0.24), 1px 8px 10px 0px hsl(0 0% 0% / 0.24);
        }

        /* ========================================
           RESET Y CONFIGURACIÓN GLOBAL
           ======================================== */
        *, *::before, *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: var(--font-sans);
            background: var(--background);
            color: var(--foreground);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* ========================================
           FORMAS ANIMADAS DE FONDO
           ======================================== */
        .bg-shapes {
            position: fixed;
            inset: 0;
            z-index: 0;
            overflow: hidden;
            pointer-events: none;
        }

        .shape {
            position: absolute;
            border-radius: 50%;
            opacity: 0.4;
            filter: blur(60px);
            animation: float 20s ease-in-out infinite;
        }

        .shape-1 {
            width: 500px;
            height: 500px;
            background: var(--primary);
            top: -150px;
            right: -150px;
        }

        .shape-2 {
            width: 400px;
            height: 400px;
            background: var(--secondary);
            bottom: -100px;
            left: -100px;
            animation-delay: -7s;
        }

        .shape-3 {
            width: 300px;
            height: 300px;
            background: var(--accent);
            top: 50%;
            left: 40%;
            animation-delay: -14s;
        }

        @keyframes float {
            0%, 100% { 
                transform: translate(0, 0) scale(1); 
            }
            33% { 
                transform: translate(40px, -40px) scale(1.1); 
            }
            66% { 
                transform: translate(-30px, 30px) scale(0.9); 
            }
        }

        /* ========================================
           CONTENEDOR PRINCIPAL
           ======================================== */
        .container {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            padding: clamp(1rem, 4vw, 2rem);
            max-width: 1400px;
            margin: 0 auto;
            width: 100%;
        }

        /* ========================================
           HEADER Y NAVEGACIÓN
           ======================================== */
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.25rem 2rem;
            background: var(--card);
            backdrop-filter: blur(20px);
            border-radius: var(--radius);
            box-shadow: var(--shadow-md);
            margin-bottom: 3rem;
            border: 1px solid var(--border);
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .logo-icon {
            width: 56px;
            height: 56px;
            background: var(--primary);
            border-radius: calc(var(--radius) * 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-md);
            transition: transform 0.3s ease;
        }

        .logo-icon:hover {
            transform: scale(1.05) rotate(5deg);
        }

        .logo-icon svg {
            width: 32px;
            height: 32px;
            color: var(--primary-foreground);
        }

        .logo-text h1 {
            font-size: clamp(1.1rem, 2vw, 1.5rem);
            font-weight: 700;
            color: var(--foreground);
            line-height: 1.2;
            font-family: var(--font-serif);
        }

        .logo-text span {
            font-size: 0.875rem;
            color: var(--muted-foreground);
            font-weight: 500;
        }

        .nav-links {
            display: flex;
            gap: 0.75rem;
        }

        .nav-link {
            padding: 0.75rem 1.5rem;
            border-radius: calc(var(--radius) * 0.5);
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid transparent;
        }

        .nav-link.secondary {
            color: var(--secondary-foreground);
            background: transparent;
            border-color: var(--border);
        }

        .nav-link.secondary:hover {
            background: var(--accent);
            border-color: var(--ring);
            transform: translateY(-2px);
        }

        .nav-link.primary {
            background: var(--primary);
            color: var(--primary-foreground);
            box-shadow: var(--shadow-md);
        }

        .nav-link.primary:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-lg);
        }

        /* ========================================
           SECCIÓN HERO
           ======================================== */
        main {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: clamp(2rem, 5vw, 4rem) 1rem;
        }

        .hero {
            max-width: 900px;
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.625rem 1.25rem;
            background: var(--accent);
            border-radius: 100px;
            color: var(--accent-foreground);
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 2rem;
            animation: fadeInUp 0.6s ease forwards;
            border: 1px solid var(--border);
        }

        .hero-badge svg {
            width: 18px;
            height: 18px;
        }

        .hero h2 {
            font-size: clamp(2.5rem, 7vw, 4.5rem);
            font-weight: 800;
            color: var(--foreground);
            line-height: 1.1;
            margin-bottom: 1.5rem;
            animation: fadeInUp 0.6s ease 0.1s forwards;
            opacity: 0;
            font-family: var(--font-serif);
        }

        .hero h2 span {
            color: var(--primary);
            position: relative;
        }

        .hero h2 span::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0.15em;
            background: var(--primary);
            opacity: 0.3;
            border-radius: 2px;
        }

        .hero p {
            font-size: clamp(1rem, 2vw, 1.35rem);
            color: var(--muted-foreground);
            line-height: 1.7;
            margin-bottom: 2.5rem;
            animation: fadeInUp 0.6s ease 0.2s forwards;
            opacity: 0;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        .hero-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            animation: fadeInUp 0.6s ease 0.3s forwards;
            opacity: 0;
        }

        /* ========================================
           BOTONES
           ======================================== */
        .btn {
            padding: 1rem 2rem;
            border-radius: calc(var(--radius) * 0.5);
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            border: 1px solid transparent;
        }

        .btn-primary {
            background: var(--primary);
            color: var(--primary-foreground);
            box-shadow: var(--shadow-lg);
        }

        .btn-primary:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-xl);
        }

        .btn-secondary {
            background: var(--card);
            color: var(--card-foreground);
            box-shadow: var(--shadow-md);
            border-color: var(--border);
        }

        .btn-secondary:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
            border-color: var(--ring);
        }

        .btn svg {
            width: 20px;
            height: 20px;
        }

        /* ========================================
           ANIMACIONES
           ======================================== */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* ========================================
           SECCIÓN DE ESTADÍSTICAS
           ======================================== */
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-top: 5rem;
            width: 100%;
            max-width: 1000px;
            animation: fadeInUp 0.6s ease 0.4s forwards;
            opacity: 0;
        }

        .stat-card {
            background: var(--card);
            backdrop-filter: blur(10px);
            padding: 2rem 1.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow-md);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid var(--border);
        }

        .stat-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-xl);
            border-color: var(--ring);
        }

        .stat-icon {
            width: 56px;
            height: 56px;
            background: var(--accent);
            border-radius: calc(var(--radius) * 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.25rem;
        }

        .stat-icon svg {
            width: 28px;
            height: 28px;
            color: var(--primary);
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--foreground);
            margin-bottom: 0.5rem;
            font-family: var(--font-serif);
        }

        .stat-label {
            font-size: 0.95rem;
            color: var(--muted-foreground);
            font-weight: 600;
        }

        /* ========================================
           FOOTER
           ======================================== */
        footer {
            text-align: center;
            padding: 3rem 2rem 2rem;
            color: var(--muted-foreground);
            font-size: 0.9rem;
        }

        footer a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
        }

        footer a:hover {
            color: var(--secondary-foreground);
            text-decoration: underline;
        }

        footer small {
            display: block;
            margin-top: 0.5rem;
            font-size: 0.8rem;
            opacity: 0.7;
        }

        /* ========================================
           RESPONSIVE
           ======================================== */
        @media (max-width: 768px) {
            header {
                flex-direction: column;
                gap: 1.5rem;
                text-align: center;
                padding: 1.5rem;
            }

            .nav-links {
                width: 100%;
            }

            .nav-link {
                flex: 1;
                justify-content: center;
            }

            .hero-buttons {
                width: 100%;
            }

            .btn {
                flex: 1;
                justify-content: center;
            }

            .stats {
                grid-template-columns: repeat(2, 1fr);
                margin-top: 3rem;
            }
        }

        @media (max-width: 480px) {
            .container {
                padding: 1rem;
            }

            header {
                padding: 1rem;
                margin-bottom: 2rem;
            }

            .logo-icon {
                width: 48px;
                height: 48px;
            }

            .logo-icon svg {
                width: 28px;
                height: 28px;
            }

            .nav-links {
                flex-direction: column;
            }

            .hero-badge {
                font-size: 0.8rem;
                padding: 0.5rem 1rem;
            }

            .hero-buttons {
                flex-direction: column;
            }

            .stats {
                grid-template-columns: 1fr;
                gap: 1rem;
            }

            .stat-card {
                padding: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <!-- Formas animadas de fondo -->
    <div class="bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
    </div>

    <div class="container">
        <!-- Header -->
        <header>
            <div class="logo">
                <div class="logo-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </div>
                <div class="logo-text">
                    <h1>Amigos del Animal</h1>
                    <span>Sistema de Gestión</span>
                </div>
            </div>
            <nav class="nav-links">
                <a href="/api/rescataditos" class="nav-link secondary" target="_blank">
                    API Docs
                </a>
                <a href="/admin" class="nav-link primary">
                    Panel Admin
                </a>
            </nav>
        </header>

        <!-- Contenido principal -->
        <main>
            <div class="hero">
                <div class="hero-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Sistema activo y funcionando
                </div>
                
                <h2>
                    Gestiona los <span>rescataditos</span> de forma simple
                </h2>
                
                <p>
                    Panel administrativo para gestionar adopciones, padrinazgos, 
                    tratamientos médicos y toda la información de los animalitos rescatados.
                </p>
                
                <div class="hero-buttons">
                    <a href="/admin" class="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                        </svg>
                        Ir al Panel
                    </a>
                    <a href="/api/rescataditos" class="btn btn-secondary" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                        Ver API
                    </a>
                </div>
            </div>

            <!-- Estadísticas -->
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </div>
                    <div class="stat-number" id="stat-animalitos">--</div>
                    <div class="stat-label">Rescataditos</div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                    <div class="stat-number" id="stat-padrinos">--</div>
                    <div class="stat-label">Padrinos</div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </div>
                    <div class="stat-number" id="stat-adoptados">--</div>
                    <div class="stat-label">Adoptados</div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </div>
                    <div class="stat-number" id="stat-mensajes">--</div>
                    <div class="stat-label">Mensajes</div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer>
            <p>
                Hecho con ❤️ para <a href="#">Asociación Amigos del Animal</a>
            </p>
            <small>Sistema de Gestión v1.0</small>
            <small>Desarrollado por <a href="https://softlixs.com" class="text-green-500">Softlixs IT</a></small>

        </footer>
    </div>

    <script>
        // Función para animar números
        function animateNumber(element, target, duration = 1500) {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 16);
        }

        // Cargar estadísticas desde el API
        document.addEventListener('DOMContentLoaded', async () => {
            try {
                const response = await fetch('/api/stats');
                const data = await response.json();
                
                setTimeout(() => {
                    animateNumber(document.getElementById('stat-animalitos'), data.animalitos || 0);
                    animateNumber(document.getElementById('stat-padrinos'), data.padrinos || 0);
                    animateNumber(document.getElementById('stat-adoptados'), data.adoptados || 0);
                    animateNumber(document.getElementById('stat-mensajes'), data.mensajes || 0);
                }, 500);
            } catch (error) {
                console.error('Error al cargar estadísticas:', error);
                // Valores de fallback
                setTimeout(() => {
                    ['stat-animalitos', 'stat-padrinos', 'stat-adoptados', 'stat-mensajes'].forEach(id => {
                        document.getElementById(id).textContent = '0';
                    });
                }, 500);
            }
        });
    </script>
</body>
</html>