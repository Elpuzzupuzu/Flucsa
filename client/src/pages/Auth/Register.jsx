import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/user/usersSlice'; // Tu thunk de registro
import { ArrowRight, Loader2 } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '', // Asegúrate de que este nombre coincida con el backend
    confirmContraseña: '',
  });
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Extraemos estado de Redux para manejar carga y errores
  const { loading, error, user } = useSelector((state) => state.user);

  // Maneja el cambio de los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Limpia el error de contraseña si el usuario empieza a escribir
    if (passwordError) setPasswordError('');
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, apellido, correo, contraseña, confirmContraseña } = formData;

    if (contraseña !== confirmContraseña) {
      setPasswordError('Las contraseñas no coinciden.');
      return;
    }

    // El objeto enviado al backend debe coincidir con la estructura de tu servicio
    const userData = {
      nombre,
      apellido,
      correo,
      contraseña,
    };

    // Despachar la thunk. Usamos .unwrap() para manejar la redirección.
    try {
      // Nota: Si el registro es exitoso, Redux guarda el usuario recién creado.
      // Puedes elegir si quieres redirigir o autologuear.
      await dispatch(registerUser(userData)).unwrap();
      
      // Registro exitoso: Redirigir al login o a la página principal
      alert('¡Registro exitoso! Por favor, inicia sesión.');
      navigate('/login');

    } catch (rejectedValueOrSerializedError) {
      // El error ya se maneja en el slice (state.user.error)
      // Opcional: console.error("Error de registro:", rejectedValueOrSerializedError);
    }
  };
  
  // Efecto para limpiar errores de Redux al desmontar (Buena práctica)
  // Nota: También puedes añadir lógica para autologin si tu requisito lo pide.
  /*
  useEffect(() => {
    return () => {
      if (error) {
        // dispatch(clearUserError()); // Si tu slice tiene una acción para limpiar errores
      }
    };
  }, [error]);
  */


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl border border-gray-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crea tu cuenta FLUCSA
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150">
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Nombre y Apellido */}
            <div className="flex gap-4 mb-4">
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                value={formData.nombre}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nombre"
              />
              <input
                id="apellido"
                name="apellido"
                type="text"
                required
                value={formData.apellido}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Apellido"
              />
            </div>
            
            {/* Correo */}
            <div>
              <input
                id="correo"
                name="correo"
                type="email"
                autoComplete="email"
                required
                value={formData.correo}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo Electrónico"
              />
            </div>

            {/* Contraseña */}
            <div className="pt-3">
              <input
                id="contraseña"
                name="contraseña"
                type="password"
                autoComplete="new-password"
                required
                value={formData.contraseña}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <input
                id="confirmContraseña"
                name="confirmContraseña"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmContraseña}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar Contraseña"
              />
            </div>
          </div>

          {/* Mensajes de error */}
          {(error || passwordError) && (
            <div className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
              {passwordError || (typeof error === 'string' ? error : error.message || 'Error en el registro.')}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out`}
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="h-5 w-5 mr-2" />
              )}
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;