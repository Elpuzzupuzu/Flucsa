// // client/src/hooks/useSocketIO.js

// import { useEffect, useRef } from 'react';
// import io from 'socket.io-client';

// // 🚨 CAMBIO CRÍTICO: Usamos VITE_SOCKET_URL. 
// // Esta variable debe apuntar a la raíz del backend (ej: https://flucsa-backend.onrender.com)
// // y debe estar configurada en el servicio frontend de Render.
// // const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';
// const SOCKET_SERVER_URL = 'https://flucsa-backend.onrender.com';


// /**
//  * Hook personalizado para manejar la conexión y los eventos de Socket.IO.
//  * @param {string} eventName - El nombre del evento de Socket.IO a escuchar (ej: 'nueva_cotizacion').
//  * @param {function} handler - La función que se ejecuta cuando se recibe el evento.
//  * @param {boolean} shouldConnect - Controla si la conexión debe estar activa.
//  */
// export const useSocketIO = (eventName, handler, shouldConnect = true) => {
//     // Usamos useRef para mantener la instancia del socket a través de renders
//     const socketRef = useRef(null);

//     useEffect(() => {
//         if (!shouldConnect) {
//             // Si shouldConnect es falso, nos aseguramos de desconectar si ya lo está
//             if (socketRef.current) {
//                 socketRef.current.disconnect();
//                 socketRef.current = null;
//             }
//             return;
//         }

//         // 1. Conectar solo si no hay una instancia activa
//         if (!socketRef.current) {
//             socketRef.current = io(SOCKET_SERVER_URL, {
//                 // Si usas cookies o JWT para autenticar el socket, se añadiría aquí
//                 withCredentials: true,
//             });

//             socketRef.current.on('connect', () => {
//                 console.log(`📡 Cliente Socket.IO conectado con ID: ${socketRef.current.id}`);
//             });
            
//             socketRef.current.on('disconnect', () => {
//                 console.log('❌ Cliente Socket.IO desconectado.');
//             });
//         }

//         // 2. Suscribirse al evento específico
//         if (eventName && handler) {
//             socketRef.current.on(eventName, handler);
//         }

//         // 3. Función de limpieza (Cleanup)
//         return () => {
//             if (socketRef.current) {
//                 // Limpiar el manejador de eventos para evitar duplicados
//                 if (eventName && handler) {
//                     socketRef.current.off(eventName, handler);
//                 }
                
//                 // Opcional: Desconectar el socket si quieres que la conexión se cierre completamente
//                 // socketRef.current.disconnect(); 
//                 // socketRef.current = null;
//             }
//         };
//     // El efecto se ejecuta cuando cambia el evento, el manejador o el estado de conexión
//     }, [eventName, handler, shouldConnect]); 
    
//     // Retornar la instancia del socket si necesitas emitir eventos desde el frontend
//     return socketRef.current;
// };


// client/src/hooks/useSocketIO.js

import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'https://flucsa-backend.onrender.com';

/**
 * Hook personalizado para manejar la conexión y los eventos de Socket.IO.
 * 🚨 IMPORTANTE: Se han añadido opciones de reconexión para mejorar la estabilidad en redes deficientes.
 */
export const useSocketIO = (eventName, handler, shouldConnect = true) => {
    const socketRef = useRef(null);

    useEffect(() => {
        if (!shouldConnect) {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
            return;
        }

        if (!socketRef.current) {
            // ⭐ CAMBIO CRÍTICO: CONFIGURACIÓN DE ESTABILIDAD ⭐
            socketRef.current = io(SOCKET_SERVER_URL, {
                // Si usas cookies o JWT para autenticar el socket, se añadiría aquí
                withCredentials: true,
                
                // --- Opciones de Estabilidad ---
                // 1. Aumentar el tiempo de espera para que el servidor responda al ping.
                // Lo elevamos de 20s (default) a 30s.
                pingTimeout: 30000, 
                
                // 2. Reducir el tiempo entre pings para detectar fallos más rápido 
                // y mantener la conexión 'viva' ante proxies/firewalls.
                // Lo bajamos de 25s (default) a 15s.
                pingInterval: 15000, 
                
                // 3. Aumentar el tiempo de espera inicial de conexión (de 20s a 30s)
                timeout: 30000, 
                
                // 4. Aumentar los intentos de reconexión
                reconnectionAttempts: 30, 
                
            });

            socketRef.current.on('connect', () => {
                console.log(`📡 Cliente Socket.IO conectado con ID: ${socketRef.current.id}`);
            });
            
            // 🚨 Añadir logging de la razón de desconexión para debugging
            socketRef.current.on('disconnect', (reason) => {
                console.log(`❌ Cliente Socket.IO desconectado. Razón: ${reason}`);
            });

            socketRef.current.on('reconnect', (attemptNumber) => {
                console.log(`✅ Cliente Socket.IO reconectado tras ${attemptNumber} intentos.`);
            });
        }

        if (eventName && handler) {
            socketRef.current.on(eventName, handler);
        }

        return () => {
            if (socketRef.current && eventName && handler) {
                socketRef.current.off(eventName, handler);
            }
        };
    }, [eventName, handler, shouldConnect]); 
    
    return socketRef.current;
};