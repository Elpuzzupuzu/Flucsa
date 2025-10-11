import React from 'react';
import StatCard from './StatCard';

const StatsSection = ({ stats, getAnimationClass }) => (
    <section className="py-16 px-6 bg-white">
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