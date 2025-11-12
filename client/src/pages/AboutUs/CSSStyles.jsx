
import React from 'react';

const CSSStyles = () => (
    <style jsx>{`
        /* Animaciones de entrada optimizadas (Sin cambios, son funcionales) */
        .animate-fade-in-up {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-fade-in-up.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-scale-in {
            opacity: 0;
            transform: scale(0.92);
            transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-scale-in.visible {
            opacity: 1;
            transform: scale(1);
        }
        
        /* Gradiente de texto premium (Ajustado al AZUL MARINO corporativo) */
        .gradient-text {
            background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%); /* Usando Azul Marino y Azul Corporativo */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            background-size: 200% auto;
            animation: gradient-shift 3s ease infinite;
        }
        
        @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        /* Glass morphism mejorado (Mantenido limpio, solo ajuste de sombra) */
        .glass-card {
            background: rgba(255, 255, 255, 0.92);
            backdrop-filter: blur(16px) saturate(180%);
            -webkit-backdrop-filter: blur(16px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.25);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.08); /* Sombra azul/gris sutil */
        }
        
        /* Hover lift premium con sombra suave (Sombra ajustada al AZUL MARINO) */
        .hover-lift {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                        box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .hover-lift:hover {
            transform: translateY(-12px);
            box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.12),
                        0 12px 24px -8px rgba(30, 58, 138, 0.08); /* Sombra sutil con el color primario (#1E3A8A) */
        }
        
        /* Formas flotantes con blur moderno (Ajustado a la paleta) */
        .floating-shapes {
            position: relative;
            overflow: hidden;
        }
        
        .floating-shapes::before {
            content: '';
            position: absolute;
            top: 8%;
            right: 8%;
            width: 140px;
            height: 140px;
            background: linear-gradient(135deg, #1E3A8A, #3B82F6); /* Azul principal */
            border-radius: 50%;
            opacity: 0.08;
            filter: blur(40px);
            animation: float 8s ease-in-out infinite;
        }
        
        .floating-shapes::after {
            content: '';
            position: absolute;
            bottom: 15%;
            left: 5%;
            width: 100px;
            height: 100px;
            background: #374151; /* Gris Carbón para contraste serio/neutro */
            border-radius: 50%;
            opacity: 0.06; /* Opacidad reducida para limpieza */
            filter: blur(40px);
            animation: float 6s ease-in-out infinite reverse;
        }
        
        @keyframes float {
            0%, 100% { 
                transform: translateY(0px) translateX(0px) rotate(0deg); 
            }
            33% {
                transform: translateY(-25px) translateX(10px) rotate(120deg);
            }
            66% {
                transform: translateY(-15px) translateX(-10px) rotate(240deg);
            }
        }
        
        /* Efecto sparkle mejorado (Sin cambios, ya que usa blanco transparente) */
        .sparkle {
            position: relative;
            overflow: hidden;
        }
        
        .sparkle::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                120deg,
                transparent 30%,
                rgba(255, 255, 255, 0.3) 50%,
                transparent 70%
            );
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
            transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .sparkle:hover::before {
            transform: translateX(100%) translateY(100%) rotate(45deg);
        }
        
        /* Efecto glow suave para elementos interactivos (Ajustado al AZUL) */
        .glow-on-hover {
            position: relative;
            transition: all 0.3s ease;
        }
        
        .glow-on-hover::after {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg, #1E3A8A, #3B82F6); /* Degradado solo en tonos azules */
            border-radius: inherit;
            opacity: 0;
            z-index: -1;
            filter: blur(15px);
            transition: opacity 0.4s ease;
        }
        
        .glow-on-hover:hover::after {
            opacity: 0.3;
        }
        
        /* Smooth scroll para toda la página (Sin cambios) */
        html {
            scroll-behavior: smooth;
        }
        
        /* Optimización de rendimiento (Sin cambios) */
        .animate-fade-in-up,
        .animate-scale-in,
        .hover-lift,
        .sparkle {
            will-change: transform, opacity;
        }
        
        .animate-fade-in-up.visible,
        .animate-scale-in.visible {
            will-change: auto;
        }
    `}</style>
);

export default CSSStyles;