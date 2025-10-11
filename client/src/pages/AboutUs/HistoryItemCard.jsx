import React from 'react';

const HistoryItemCard = ({ icon: Icon, title, description, gradient, animationClass, id, style }) => (
    <div 
        className={`glass-card rounded-3xl p-8 shadow-xl hover-lift ${animationClass}`}
        data-animate
        id={id}
        style={style}
    >
        <div className="flex items-start space-x-4">
            <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center flex-shrink-0 sparkle`}>
                <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-[#1C2E82] mb-3">{title}</h3>
                <p className="text-slate-700 leading-relaxed">{description}</p>
            </div>
        </div>
    </div>
);

export default HistoryItemCard;