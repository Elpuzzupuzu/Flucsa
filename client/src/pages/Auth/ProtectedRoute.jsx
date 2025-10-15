import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
    // Obtenemos el estado de autenticación y carga del store de Redux
    const { user, loading } = useSelector((state) => state.user);
    const isLoggedIn = !!user;
    
    // Si estamos verificando el estado de la sesión, mostramos un indicador de carga.
    // Esto es importante para evitar el "parpadeo" de redirección a /login cuando la cookie es válida.
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-600">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
                <p>Verificando sesión...</p>
            </div>
        );
    }

    // Si no hay usuario logueado después de la verificación, redirige a la página de login.
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // Si el usuario está logueado, permite el acceso al componente hijo.
    return children;
};

export default ProtectedRoute;
