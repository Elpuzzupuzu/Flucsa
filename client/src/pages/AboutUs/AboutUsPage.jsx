import React, { useState, useEffect } from 'react';
import { Calendar, Users, Award, TrendingUp, Handshake, Sun, Droplet, Wrench, Spade, Home, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { stats, expertiseAreas, testimonials, historyItems, values } from './data';
import CSSStyles from './CSSStyles';
import teamPhoto from '../../assets/images/team.jpg'; // Foto del equipo

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
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const getAnimationClass = (id, type = 'fade-in-up') => {
        return `animate-${type} ${isVisible[id] ? 'visible' : ''}`;
    };

    return (
        <main className="overflow-hidden bg-white">
            <CSSStyles />

            <HeroSection 
                getAnimationClass={getAnimationClass} 
                UsersIcon={Users} 
                CheckCircleIcon={CheckCircle}
                teamImage={teamPhoto} 
            />

            <StatsSection stats={stats} getAnimationClass={getAnimationClass} />

            <HistorySection 
                historyItems={historyItems} 
                getAnimationClass={getAnimationClass} 
                AwardIcon={Award} 
                TrendingUpIcon={TrendingUp} 
                StarIcon={Star} 
                UsersIcon={Users} 
            />

            <MissionVisionSection 
                values={values} 
                getAnimationClass={getAnimationClass} 
                AwardIcon={Award} 
                TrendingUpIcon={TrendingUp} 
                StarIcon={Star} 
                CheckCircleIcon={CheckCircle} 
                UsersIcon={Users} 
            />

            <ExpertiseAreasSection 
                expertiseAreas={expertiseAreas} 
                getAnimationClass={getAnimationClass} 
            />

            <TestimonialsSection 
                testimonials={testimonials} 
                getAnimationClass={getAnimationClass} 
                StarIcon={Star} 
            />

            <FooterCTA 
                getAnimationClass={getAnimationClass} 
                ArrowRightIcon={ArrowRight} 
            />
        </main>
    );
};

export default AboutUsPage;
