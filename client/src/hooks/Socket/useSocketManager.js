// Ruta: src/hooks/Socket/useSocketManager.js

import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'; 

// Usamos una variable fuera del hook para mantener la instancia única a través de todos los módulos
// OJO: Esto puede ser delicado, pero garantiza la unicidad. Alternativamente, puedes pasarlo por contexto.
let globalSocket = null; 

/**
 * Hook maestro para gestionar la conexión y desconexión global de Socket.IO.
 * Debe llamarse una sola vez en App.jsx.
 * @param {boolean} shouldConnect - Controla si la conexión debe estar activa (ej: isAuthenticated).
 */
export const useSocketManager = (shouldConnect) => {
    
    // Usamos una ref para la instancia local, aunque la globalSocket almacene el valor.
    // Podrías usar useRef como lo hacías antes si prefieres no usar una variable global.
    const socketRef = useRef(globalSocket);

    useEffect(() => {
        // CONEXIÓN
        if (shouldConnect && !globalSocket) {
            globalSocket = io(SOCKET_SERVER_URL, {
                withCredentials: true,
            });
            socketRef.current = globalSocket;

            globalSocket.on('connect', () => {
                console.log(`📡 Socket Manager: Conectado con ID: ${globalSocket.id}`);
            });
            
            globalSocket.on('disconnect', () => {
                console.log('❌ Socket Manager: Desconectado.');
            });

        // DESCONEXIÓN
        } else if (!shouldConnect && globalSocket) {
            globalSocket.disconnect();
            globalSocket = null; // Limpiar la variable global
            socketRef.current = null;
        }

        // Cleanup: El cleanup principal se realiza en el else if anterior al cambiar shouldConnect.
        // Aquí no hay necesidad de desconexión adicional.

    }, [shouldConnect]); 
    
    // Retornamos la instancia actual para que otros hooks la utilicen
    return socketRef.current;
};