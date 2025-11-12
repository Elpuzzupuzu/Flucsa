import React from 'react';
import StatCard from './StatCard';

const StatsSection = ({ stats, getAnimationClass }) => (
    // Fondo muy limpio y sutil para que los StatCard destaquen (Perfecto para profesionalismo)
    <section className="py-16 px-6 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 shadow-inner">
        <div className="max-w-6xl mx-auto">
            <div 
                className={`grid grid-cols-2 lg:grid-cols-4 gap-8 ${getAnimationClass('stats', 'scale-in')}`}
                data-animate
                id="stats"
            >
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>
        </div>
    </section>
);

export default StatsSection;