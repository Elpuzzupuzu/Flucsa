// En src/features/quotations/QuotationDetailPage.jsx

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Nota: Necesitarías añadir un thunk para fetchQuotationById 
// (ya que fetchQuotations solo trae la lista, no un detalle).
import QuotationDetailsCard from './components/QuotationDetailsCard'; 

const QuotationDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    // Podrías tener un estado 'selectedQuotation' en tu slice, o buscarlo en la lista.
    const quotation = useSelector(state => 
        state.quotations.list.find(q => q.id === id) 
    ); 
    const loading = useSelector(state => state.quotations.loading);

    // *Aquí harías el dispatch de fetchQuotationById(id) si no lo tienes cargado*

    if (loading && !quotation) {
        return <p className="text-center mt-5">Cargando detalles de cotización...</p>;
    }

    return (
        <div className="container mt-5">
            <QuotationDetailsCard quotation={quotation} />
        </div>
    );
};

export default QuotationDetailPage;