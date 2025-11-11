// src/features/quotations/components/QuotationList.jsx
import React from 'react';
import QuotationRow from './QuotationRow';
import { FileText } from 'lucide-react';

const QuotationList = ({ quotations, isLoading, onDelete, onViewDetails }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-slate-600 text-sm">Cargando cotizaciones...</p>
        </div>
      </div>
    );
  }

  if (!quotations?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-slate-400" />
        </div>
        <p className="text-slate-600 text-center font-medium">No hay cotizaciones registradas</p>
        <p className="text-slate-400 text-sm text-center mt-1">Las cotizaciones aparecerán aquí una vez que las crees</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" suppressHydrationWarning>
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th scope="col" className="py-3.5 px-6 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="py-3.5 px-6 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Fecha
              </th>
              <th scope="col" className="py-3.5 px-6 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Total
              </th>
              <th scope="col" className="py-3.5 px-6 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="py-3.5 px-6 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {quotations.map((quotation) => (
              <QuotationRow
                key={quotation.id}
                quotation={quotation}
                onDelete={onDelete}
                onViewDetails={onViewDetails}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuotationList;