import React, { useState, useEffect } from 'react';
import { Calendar, Users, Award, TrendingUp, Handshake, Sun, Droplet, Wrench, Spade, Home, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { stats, expertiseAreas, testimonials, historyItems, values } from './data';
import CSSStyles from './CSSStyles';

// 1. IMPORTAR LA FOTO DEL EQUIPO
// ASUME que el archivo 'foto_equipo.jpg' está en la carpeta 'assets'. 
// AJUSTA esta ruta según la ubicación real de tu archivo.
import teamPhoto from '../../assets/images/team.jpg'; 

// Componentes Modulares
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import HistorySection from './HistorySection';
import MissionVisionSection from './MissionVisionSection';
import ExpertiseAreasSection from './ExpertiseAreasSection';
import TestimonialsSection from './TestimonialsSection';
import FooterCTA from './FooterCTA';

const AboutUsPage = () => {
    const [isVisible, setIsVisible] = useState({});
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({
                            ...prev,
                            [entry.target.id]: true
                        }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // Helper para obtener la clase de animación
    const getAnimationClass = (id, type = 'fade-in-up') => {
        const baseClass = `animate-${type} ${isVisible[id] ? 'visible' : ''}`;
        return baseClass;
    };

    return (
        // Aplicamos un fondo blanco base para máxima limpieza y profesionalismo
        <main className="overflow-hidden bg-white">
            <CSSStyles />

            {/* 2. PASAR LA IMAGEN IMPORTADA teamPhoto COMO PROP 'teamImage' */}
            <HeroSection 
                getAnimationClass={getAnimationClass} 
                UsersIcon={Users} 
                CheckCircleIcon={CheckCircle}
                teamImage={teamPhoto} // ¡Aquí está el cambio!
            />
            
            <StatsSection stats={stats} getAnimationClass={getAnimationClass} />
            
            <HistorySection historyItems={historyItems} getAnimationClass={getAnimationClass} AwardIcon={Award} TrendingUpIcon={TrendingUp} StarIcon={Star} UsersIcon={Users} />

            <MissionVisionSection values={values} getAnimationClass={getAnimationClass} AwardIcon={Award} TrendingUpIcon={TrendingUp} StarIcon={Star} CheckCircleIcon={CheckCircle} UsersIcon={Users} />
            
            <ExpertiseAreasSection expertiseAreas={expertiseAreas} getAnimationClass={getAnimationClass} />
            
            <TestimonialsSection testimonials={testimonials} getAnimationClass={getAnimationClass} StarIcon={Star} />

            <FooterCTA getAnimationClass={getAnimationClass} ArrowRightIcon={ArrowRight} />
        </main>
    );
};

export default AboutUsPage;