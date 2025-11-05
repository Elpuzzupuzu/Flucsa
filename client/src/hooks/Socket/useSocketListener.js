// Ruta: src/hooks/Socket/useSocketListener.js

import { useEffect } from 'react';

export const useSocketListener = (socketInstance, eventName, handler) => {
    useEffect(() => {
        // === CAMBIO CLAVE AQUÍ: Verificar la instancia del socket ===
        if (socketInstance && typeof socketInstance.on === 'function' && eventName && handler) {
            // Suscribirse al evento
            socketInstance.on(eventName, handler);
        }

        // Función de limpieza (Cleanup)
        return () => {
            // === Y también verificar la instancia y el método .off() en el cleanup ===
            if (socketInstance && typeof socketInstance.off === 'function' && eventName && handler) {
                // SÓLO limpiamos el listener, NO la conexión global
                socketInstance.off(eventName, handler); 
            }
        };
    // Dependencias
    }, [socketInstance, eventName, handler]); 
};