import React from 'react';

const StatCard = ({ icon: Icon, number, label }) => (
    <div className="text-center group hover-lift">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-3xl flex items-center justify-center sparkle transform group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-10 h-10 text-white" />
        </div>
        <div className="text-4xl md:text-5xl font-black gradient-text mb-2 group-hover:scale-105 transition-transform">
            {number}
        </div>
        <div className="text-slate-600 font-semibold">{label}</div>
    </div>
);

export default StatCard;