import React from 'react';
import { FileText, TrendingUp, Clock, CheckCircle } from 'lucide-react';

/**
 * Componente Presentacional: Muestra las tarjetas de estadísticas de cotizaciones.
 */
const QuotationStats = ({ stats }) => {
    const statCards = [
        { 
            label: 'Total', 
            value: stats.total, 
            icon: FileText, 
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-100',
            textColor: 'text-blue-600',
            iconColor: 'text-blue-600'
        },
        { 
            label: 'Generadas', 
            value: stats.generadas, 
            icon: Clock, 
            bgColor: 'bg-amber-50',
            borderColor: 'border-amber-100',
            textColor: 'text-amber-600',
            iconColor: 'text-amber-600'
        },
        { 
            label: 'Aceptadas', 
            value: stats.aceptadas, 
            icon: TrendingUp, 
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-100',
            textColor: 'text-emerald-600',
            iconColor: 'text-emerald-600'
        },
        { 
            label: 'Completadas', 
            value: stats.completadas, 
            icon: CheckCircle, 
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-100',
            textColor: 'text-blue-600',
            iconColor: 'text-blue-600'
        },
    ];

    return (
        <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
        >
            {statCards.map((card) => (
                <div 
                    key={card.label} 
                    className="bg-white rounded-md border border-neutral-200 p-5 hover:border-neutral-300 transition-colors duration-150"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-neutral-600 uppercase mb-2" style={{ letterSpacing: '0.05em' }}>
                                {card.label}
                            </p>
                            <p className={`text-3xl font-semibold ${card.textColor}`} style={{ letterSpacing: '-0.02em' }}>
                                {card.value}
                            </p>
                        </div>
                        <div className={`p-2.5 ${card.bgColor} border ${card.borderColor} rounded-md`}>
                            <card.icon className={`w-6 h-6 ${card.iconColor}`} strokeWidth={2} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuotationStats;