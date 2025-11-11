// src/features/quotations/components/QuotationRow.jsx
import React from 'react';
import { FileText, Trash2, Eye, Calendar, DollarSign } from 'lucide-react';

/**
 * Componente presentacional para mostrar una sola fila de cotización.
 */
const QuotationRow = ({ quotation, onDelete, onViewDetails }) => {
  // 🧩 Formatear fecha
  const formatDate = (isoDate) => {
    if (!isoDate) return 'N/A';
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(isoDate));
  };

  // 💲 Formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0);
  };

  // 🎨 Configuración de estilos por estado
  const getStatusConfig = (status) => {
    const configs = {
      GENERADA: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        label: 'Generada'
      },
      ACEPTADA: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        label: 'Aceptada'
      },
      RECHAZADA: {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        label: 'Rechazada'
      },
      CANCELADA: {
        bg: 'bg-slate-50',
        text: 'text-slate-600',
        border: 'border-slate-200',
        label: 'Cancelada'
      }
    };
    return configs[status] || configs.GENERADA;
  };

  const statusConfig = getStatusConfig(quotation.estado_cotizacion);

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150">
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-400" />
          <span className="font-mono text-sm text-slate-600">
            {quotation.id.substring(0, 8)}...
          </span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2 text-slate-700">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-sm">{formatDate(quotation.fecha_creacion)}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-900">
            {formatCurrency(quotation.total_cotizado)}
          </span>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
          {statusConfig.label}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(quotation.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-150"
            title="Ver Detalles"
          >
            <Eye className="w-4 h-4" />
            <span>Ver</span>
          </button>
          <button
            onClick={() => onDelete(quotation.id)}
            disabled={quotation.estado_cotizacion === 'CANCELADA'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
              quotation.estado_cotizacion === 'CANCELADA'
                ? 'text-slate-400 bg-slate-50 cursor-not-allowed'
                : 'text-red-700 bg-red-50 hover:bg-red-100'
            }`}
            title={quotation.estado_cotizacion === 'CANCELADA' ? 'No se puede eliminar' : 'Eliminar o Cancelar'}
          >
            <Trash2 className="w-4 h-4" />
            <span>{quotation.estado_cotizacion === 'GENERADA' ? 'Cancelar' : 'Eliminar'}</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default QuotationRow;