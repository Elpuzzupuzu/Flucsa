import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  // 🚨 Usamos authChecked para saber si la verificación inicial ha terminado.
  const { user, authChecked } = useSelector((state) => state.user);
  const isLoggedIn = !!user;

  // 1. Mostrar loader mientras se verifica la sesión inicial
  // Si authChecked es false, significa que aún estamos esperando la respuesta del servidor.
  if (!authChecked) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-600">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
        <p>Verificando sesión...</p>
      </div>
    );
  }

  // 2. Una vez que authChecked es true, si no hay usuario, redirige al home.
  // Esto mantiene la lógica de redirigir al home que solicitaste al inicio.
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // 3. Usuario autenticado, renderiza los hijos
  return children;
};

export default ProtectedRoute;