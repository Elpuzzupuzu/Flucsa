import React from 'react';
import { FileText, TrendingUp, Clock, CheckCircle } from 'lucide-react';

/**
 * Componente Presentacional: Muestra las tarjetas de estadísticas de cotizaciones.
 */
const QuotationStats = ({ stats }) => {
    const statCards = [
        { label: 'Total', value: stats.total, icon: FileText, color: 'blue' },
        { label: 'Generadas', value: stats.generadas, icon: Clock, color: 'amber' },
        { label: 'Aceptadas', value: stats.aceptadas, icon: TrendingUp, color: 'green' },
        { label: 'Completadas', value: stats.completadas, icon: CheckCircle, color: 'blue' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {statCards.map((card) => (
                <div key={card.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">{card.label}</p>
                            <p className={`text-3xl font-bold text-${card.color}-600 mt-2`}>{card.value}</p>
                        </div>
                        <div className={`p-3 bg-${card.color}-100 rounded-lg`}>
                            <card.icon className={`w-6 h-6 text-${card.color}-600`} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuotationStats;