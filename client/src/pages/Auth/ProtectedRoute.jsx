import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { user, loading, authChecked } = useSelector((state) => state.user);
  const isLoggedIn = !!user;

  // Mientras verificamos la sesión inicial, mostramos loader
  if (!authChecked) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-600">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
        <p>Verificando sesión...</p>
      </div>
    );
  }

  // Una vez que authChecked es true, si no hay usuario, redirige al login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Usuario autenticado, renderiza los hijos
  return children;
};

export default ProtectedRoute;
