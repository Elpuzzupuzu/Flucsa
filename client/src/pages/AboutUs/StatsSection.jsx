import React from 'react';
import StatCard from './StatCard';

const StatsSection = ({ stats = [], getAnimationClass }) => (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 shadow-inner">
        <div className="max-w-6xl mx-auto">
            <div 
                className={`grid grid-cols-2 lg:grid-cols-4 gap-8 ${getAnimationClass('stats', 'scale-in')}`}
                data-animate
                id="stats"
            >
                {stats.map((stat, index) => {
                    const { key, ...rest } = stat; // Evita conflictos si stat tiene 'key'
                    return <StatCard key={key || index} {...rest} />;
                })}
            </div>
        </div>
    </section>
);

export default StatsSection;
