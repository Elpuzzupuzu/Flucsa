import React from 'react';

const ValueCard = ({ icon: Icon, title, description }) => (
    <div className="text-center group">
        <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#ED0000] group-hover:to-[#ff4444] transition-all duration-300 border border-white/30">
            <Icon className="w-10 h-10 text-white" />
        </div>
        <h4 className="font-bold text-xl mb-3">{title}</h4>
        <p className="text-white/80 text-sm leading-relaxed">{description}</p>
    </div>
);

export default ValueCard;