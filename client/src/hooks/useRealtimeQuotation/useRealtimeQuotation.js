// Ruta: src/hooks/useRealtimeQuotation/useRealtimeQuotation.js (CON LOGS)

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { quotationAdded, quotationUpdated } from '../../features/quotations/quotationSlice'; 
import { useSocketListener } from '../Socket/useSocketListener'; 
import useNotification from '../Notify/useNotification';

/**
 * Hook para la lógica de tiempo real de cotizaciones.
 */
export function useRealtimeQuotation(socketInstance, user) {
    const dispatch = useDispatch();
    const { notify } = useNotification();
    const isAuthenticated = !!user;

    const handleNewQuotation = useCallback((payload) => {
        const newQuotation = payload.cotizacion;
        const targetUserId = payload.usuarioId; 
        
        // ==============================================
        // 📢 LOGS AÑADIDOS PARA DEPURAR EL NAVEGADOR DEL ADMIN
        // ==============================================
        console.groupCollapsed(`DEBUG EVENTO RECIBIDO: ${newQuotation.id.substring(0, 8)}`);
        console.log("Admin Logueado ID (user.id):", user?.id);
        console.log("Creador de la Cotización ID (targetUserId):", targetUserId);
        console.log("Valor de user.isAdmin:", user?.isAdmin);
        console.groupEnd();
        // ==============================================

        if (user && (user.id === targetUserId || user.isAdmin)) { 
            dispatch(quotationAdded(newQuotation));
            console.log(`✅ [Realtime] Cotización ${newQuotation.id.substring(0, 8)} añadida/actualizada por Socket.IO.`);
            
            // 🚨 NOTIFICACIÓN Y VERIFICACIÓN DE RUTA 🚨
            if (user.id === targetUserId) {
                console.log("PATH: Es el CREADOR (mismo usuario).");
                notify(`✅ Nueva cotización generada! Revísala en tu lista.`, 'info');
            } else if (user.isAdmin) { 
                console.log("PATH: Es ADMIN notificando sobre un externo.");
                notify(`🔔 ¡Nueva Cotización #${newQuotation.id.substring(0, 8)} de un cliente!`, 'info');
            } else {
                 console.log("PATH: No es el creador ni Admin. (No notificar)");
            }
        }
    }, [dispatch, user, notify]);

    const handleQuotationUpdate = useCallback((payload) => {
        // ... (Tu lógica de actualización se mantiene igual)
        const updatedQuotation = payload.cotizacion;
        
        if (isAuthenticated) {
            dispatch(quotationUpdated(updatedQuotation)); 
            
            if (user && updatedQuotation.usuario_id === user.id) {
                if (updatedQuotation.estado === 'Aprobada') {
                    notify(`🎉 ¡Tu cotización #${updatedQuotation.id.substring(0, 8)} ha sido APROBADA!`, 'success');
                } else if (updatedQuotation.estado === 'Rechazada') {
                     notify(`⚠️ Tu cotización #${updatedQuotation.id.substring(0, 8)} ha sido rechazada.`, 'error');
                }
            } else if (user && user.isAdmin) {
                notify(`🔄 Estado de Cotización #${updatedQuotation.id.substring(0, 8)} actualizado a ${updatedQuotation.estado}.`, 'info');
            }
            
            console.log(`📡 Socket.IO: Cotización actualizada ${updatedQuotation.id.substring(0, 8)}`);
        }
    }, [dispatch, user, isAuthenticated, notify]);

    useSocketListener(socketInstance, 'nueva_cotizacion', handleNewQuotation); 
    useSocketListener(socketInstance, 'cotizacion_actualizada', handleQuotationUpdate); 
}