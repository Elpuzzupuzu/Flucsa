import React from 'react';

/**
 * Componente que renderiza un conjunto de estrellas basado en una calificación (rating).
 * Muestra estrellas completas y medias estrellas.
 * @param {number} rating - La calificación a mostrar (ej. 4.5).
 */
const StarRating = ({ rating = 0 }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Rellenar estrellas completas
    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
        );
    }
    
    // Agregar media estrella si es necesario
    if (hasHalfStar) {
        stars.push(
            <svg key="half" className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20">
                {/* Definición del degradado para la media estrella */}
                <defs>
                    <linearGradient id="half-fill">
                        <stop offset="50%" stopColor="currentColor"/>
                        <stop offset="50%" stopColor="transparent"/>
                    </linearGradient>
                </defs>
                {/* Usar el degradado como relleno */}
                <path fill="url(#half-fill)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
        );
    }
    
    return (
        <div className="flex items-center gap-1">
            {stars}
        </div>
    );
};

export default StarRating;