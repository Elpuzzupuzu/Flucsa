import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const AdminRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.user);
  const isLoggedIn = !!user;

  console.log("🧩 AdminRoute state:", { user, loading, isLoggedIn });

  // 1️⃣ Mostrar loader mientras se carga el usuario o el rol
  if (loading || !user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-600">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
        <p>Verificando rol de usuario...</p>
      </div>
    );
  }

  // 2️⃣ Si no hay sesión iniciada
  if (!isLoggedIn) {
    console.warn("⚠️ Usuario no logueado. Redirigiendo a login.");
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  // 3️⃣ Normalizar el rol del usuario
  const userRole = String(user.rol).toLowerCase().trim();

  // 4️⃣ Verificar si el usuario es admin
  if (userRole !== 'admin') {
    console.error(`🚫 Acceso denegado: El usuario ${user.correo} tiene rol '${userRole}'`);
    return <Navigate to="/" replace />;
  }

  // 5️⃣ Acceso permitido
  console.log("✅ Acceso permitido al panel admin");
  return children;
};

export default AdminRoute;
