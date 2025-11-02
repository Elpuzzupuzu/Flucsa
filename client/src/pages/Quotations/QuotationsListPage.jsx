// En src/features/quotations/QuotationsListPage.jsx
import React from 'react';
import QuotationList from './components/QuotationList';

/**
 * Componente de la página que organiza el listado de cotizaciones.
 * Este actúa como el componente de vista, recibiendo handlers del Manager/Contenedor.
 */
const QuotationsListPage = ({ quotations, isLoading, onCreate, onDelete, onViewDetails }) => {
    return (
        <div className="container mt-4">
            <header className="d-flex justify-content-between align-items-center mb-4">
                <h2>📊 Mis Cotizaciones</h2>
                <button 
                    className="btn btn-primary" 
                    onClick={onCreate}
                    disabled={isLoading}
                >
                    Generar Nueva Cotización
                </button>
            </header>
            
            <section className="card card-body shadow-sm">
                <QuotationList
                    quotations={quotations}
                    isLoading={isLoading}
                    onDelete={onDelete}
                    onViewDetails={onViewDetails}
                />
            </section>

            {/* Opcional: Componente de paginación o filtros */}
            {/* <Pagination /> */}
        </div>
    );
};

export default QuotationsListPage;