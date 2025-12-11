// src/hooks/useQuotationData.js

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuotationById } from '../../../../features/quotations/quotationSlice';

/**
 * Hook personalizado para obtener los datos de la cotización desde el store de Redux
 * y manejar la lógica de carga inicial.
 */
const useQuotationData = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.user.user);
    const quotation = useSelector(state => state.quotations.currentQuotation);
    const { loading, error } = useSelector(state => state.quotations);

    // ---------------- LOG: estado inicial (Solo para desarrollo) ----------------
    // console.log("🟦 useQuotationData - quotation actual:", quotation);

    useEffect(() => {
        // Solo despacha si la cotización no está cargada o no coincide con el ID actual
        if (!quotation || quotation.id !== id) {
            // console.log(`🔄 Dispatch fetchQuotationById con id: ${id}`);
            dispatch(fetchQuotationById(id))
                .unwrap()
                .then(res => console.log("✅ Cotización recibida del backend:", res))
                .catch(err => console.error("❌ Error al traer cotización:", err));
        }
    }, [dispatch, id, quotation]);

    // Retorna todos los datos y estados necesarios para el componente principal
    return {
        id,
        currentUser,
        quotation,
        loading,
        error,
        isQuotationLoaded: !!quotation && quotation.id === id,
    };
};

export default useQuotationData;