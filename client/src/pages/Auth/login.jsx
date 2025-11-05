import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogIn, Mail, Lock } from "lucide-react";
import { loginUser } from "../../features/user/usersSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Obtener estados de Redux
  const { loading, error, user } = useSelector((state) => state.user);

  // 🔍 Log del estado completo del slice de usuario
  useEffect(() => {
    console.log("🟢 Estado actual de userSlice:", { loading, error, user });
  }, [loading, error, user]);

  // Efecto para manejar la redirección al loguearse
  useEffect(() => {
    if (user) {
      console.log("✅ Usuario detectado en Redux:", user);
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("📩 Intentando login con:", {
      correo: email,
      contraseña: password,
    });

    if (email && password) {
      dispatch(
        loginUser({
          correo: email,
          contraseña: password,
        })
      );
    } else {
      console.warn("⚠️ Falta email o contraseña");
    }
  };

  // Log del error (si ocurre)
  useEffect(() => {
    if (error) {
      console.error("❌ Error en login:", error);
    }
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
          <LogIn className="w-8 h-8 text-[#1C2E82]" /> Iniciar Sesión
        </h2>

        {/* Indicador de Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error.message ||
              "Error al iniciar sesión. Verifica tus credenciales."}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#1C2E82] focus:border-[#1C2E82] sm:text-sm"
                disabled={loading}
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#1C2E82] focus:border-[#1C2E82] sm:text-sm"
                disabled={loading}
              />
            </div>
          </div>

          {/* Botón de Submit */}
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C2E82] ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#f08804] hover:bg-[#eb9a27]"
              }`}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 
                      0 5.373 0 12h4zm2 
                      5.291A7.962 7.962 0 014 
                      12H0c0 3.042 
                      1.135 5.824 3 
                      7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Acceder"
              )}
            </button>
          </div>
        </form>

        {/* Enlace a Registro */}
        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">
            ¿Eres nuevo en FLUCSA?{" "}
            <Link
              to="/register"
              className="font-medium text-[#1C2E82] hover:text-blue-700"
            >
              Crear una cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
