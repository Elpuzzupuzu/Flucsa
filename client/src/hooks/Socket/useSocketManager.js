// Ruta: src/hooks/Socket/useSocketManager.js

import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = import.meta.env.VITE_API_URL || 'https://flucsa-backend.onrender.com'; 

let globalSocket = null; 

export const useSocketManager = (shouldConnect) => {
    const socketRef = useRef(globalSocket);

    useEffect(() => {
        // CONEXIÓN
        if (shouldConnect && !globalSocket) {
            // ⭐ APLICACIÓN DE LAS OPCIONES DE ESTABILIDAD ⭐
            globalSocket = io(SOCKET_SERVER_URL, {
                withCredentials: true,
                
                // --- Opciones de Estabilidad ---
                // Debe ser menor que el pingTimeout del servidor (que ajustamos a 40s)
                pingTimeout: 30000, 
                // Debe ser menor que el pingInterval del servidor (que ajustamos a 20s)
                pingInterval: 15000, 
                // Aumentar el tiempo de espera inicial
                timeout: 30000, 
                // Más intentos de reconexión
                reconnectionAttempts: 30, 
            });
            socketRef.current = globalSocket;

            globalSocket.on('connect', () => {
                console.log(`📡 Socket Manager: Conectado con ID: ${globalSocket.id}`);
            });
            
            // AÑADIR LOGGING DE RAZÓN DE DESCONEXIÓN
            globalSocket.on('disconnect', (reason) => {
                console.log(`❌ Socket Manager: Desconectado. Razón: ${reason}`);
            });
            
            // AÑADIR LOGGING DE RECONEXIÓN
            globalSocket.on('reconnect', (attemptNumber) => {
                console.log(`✅ Socket Manager: Reconectado tras ${attemptNumber} intentos.`);
            });


        // DESCONEXIÓN
        } else if (!shouldConnect && globalSocket) {
            globalSocket.disconnect();
            globalSocket = null;
            socketRef.current = null;
        }

    }, [shouldConnect]); 
    
    return socketRef.current;
};