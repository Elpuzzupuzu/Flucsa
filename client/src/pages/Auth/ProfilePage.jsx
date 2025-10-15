import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Mail, Home, Clock, Heart, ShoppingBag, Lock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { updateUserProfile, updateUserPassword, clearSuccessMessage } from '../../features/user/usersSlice';

// --- Subcomponentes de la Página de Perfil ---

/**
 * Formulario para Editar Información Personal (Nombre, Apellido, etc.)
 */
const ProfileDetailsForm = ({ user, dispatch, loading, error, successMessage }) => {
    // Inicializa el formulario con los datos actuales del usuario
    const [formData, setFormData] = useState({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        correo: user.correo || user.email || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispara la thunk de Redux para actualizar el perfil
        dispatch(updateUserProfile(formData));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Editar Detalles</h3>
            
            {/* Mensajes de feedback */}
            {successMessage && <div className="p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2"><CheckCircle className="w-5 h-5" />{successMessage}</div>}
            {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2"><AlertCircle className="w-5 h-5" />{error}</div>}

            {/* Input Nombre */}
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>
            
            {/* Input Apellido */}
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="apellido">Apellido</label>
                <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>

            {/* Input Correo (Deshabilitado por convención común) */}
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="correo">Correo Electrónico</label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-gray-100"
                    disabled
                />
                <p className="mt-1 text-xs text-gray-500">El correo electrónico no se puede cambiar desde esta sección.</p>
            </div>

            <button
                type="submit"
                className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                } transition-colors`}
                disabled={loading}
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Guardar Cambios'}
            </button>
        </form>
    );
};

/**
 * Formulario para Cambiar Contraseña
 */
const PasswordChangeForm = ({ dispatch, loading, error, successMessage }) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [localError, setLocalError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalError(null);
        dispatch(clearSuccessMessage()); // Limpia mensajes previos de éxito de otras acciones

        if (formData.newPassword !== formData.confirmPassword) {
            setLocalError('Las nuevas contraseñas no coinciden.');
            return;
        }

        if (formData.newPassword.length < 8) {
            setLocalError('La nueva contraseña debe tener al menos 8 caracteres.');
            return;
        }

        // Dispara la thunk de Redux para actualizar la contraseña
        dispatch(updateUserPassword({ 
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword 
        }));
        
        // Limpiar el formulario después de enviar
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Cambiar Contraseña</h3>

            {/* Mensajes de feedback */}
            {successMessage && <div className="p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2"><CheckCircle className="w-5 h-5" />{successMessage}</div>}
            {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2"><AlertCircle className="w-5 h-5" />{error}</div>}
            {localError && <div className="p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2"><AlertCircle className="w-5 h-5" />{localError}</div>}


            {/* Input Contraseña Actual */}
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="currentPassword">Contraseña Actual</label>
                <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>
            
            {/* Input Nueva Contraseña */}
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="newPassword">Nueva Contraseña</label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    minLength={8}
                />
            </div>

            {/* Input Confirmar Contraseña */}
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>

            <button
                type="submit"
                className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    loading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                } transition-colors`}
                disabled={loading}
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Cambiar Contraseña'}
            </button>
        </form>
    );
};


// --- Componente Principal ProfilePage ---

const ProfilePage = () => {
    const dispatch = useDispatch();
    // Extrae el estado del slice de usuario
    const { user, loading, error, successMessage } = useSelector((state) => state.user);
    // Estado local para la navegación lateral
    const [selectedSection, setSelectedSection] = useState('details'); // 'details' | 'password' | 'orders' | ...

    // Limpia el mensaje de éxito o error después de 5 segundos
    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => {
                dispatch(clearSuccessMessage());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, error, dispatch]);

    // Redirección o mensaje si el usuario no está logueado
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 py-10 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-sm">
                    <AlertCircle className="w-10 h-10 mx-auto text-red-500 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900">Acceso denegado</h1>
                    <p className="mt-2 text-gray-600">Por favor, inicia sesión para ver tu perfil.</p>
                </div>
            </div>
        );
    }
    
    // Preparación de datos para la vista
    // Priorizamos 'name' (si fue formateado por el slice) o lo construimos
    const userName = user.name || (user.nombre && user.apellido ? `${user.nombre} ${user.apellido}` : 'Usuario'); 
    const userEmail = user.correo || user.email || 'No proporcionado';
    // Capitalizamos el rol
    const userRole = user.rol ? user.rol.charAt(0).toUpperCase() + user.rol.slice(1) : 'Cliente';
    const memberSince = user.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES') : 'Desconocido';


    // Componente de Enlace del Menú Lateral
    const SidebarLink = ({ Icon, title, sectionName }) => (
        <button 
            className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                selectedSection === sectionName
                ? 'bg-indigo-600 text-white font-semibold shadow-md' 
                : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
            }`}
            onClick={() => {
                setSelectedSection(sectionName);
                dispatch(clearSuccessMessage()); // Limpia mensajes al cambiar de sección
            }}
        >
            <Icon className="w-5 h-5" />
            {title}
        </button>
    );

    // Renderiza el contenido principal basado en la sección seleccionada
    const renderContent = () => {
        // El estado de 'loading' se pasa aquí para manejar el botón de carga en los formularios
        const isActionLoading = loading && !error && !successMessage;

        switch (selectedSection) {
            case 'details':
                return (
                    <div className="space-y-8">
                        {/* Detalles de Lectura */}
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Información de Usuario</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {/* Nombre */}
                            <div>
                                <p className="text-sm font-medium text-gray-500 flex items-center gap-2"><User className="w-4 h-4 text-indigo-500" /> Nombre Completo</p>
                                <p className="mt-1 text-lg font-semibold text-gray-900">{userName}</p>
                            </div>
                            
                            {/* Email */}
                            <div>
                                <p className="text-sm font-medium text-gray-500 flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-500" /> Correo Electrónico</p>
                                <p className="mt-1 text-lg font-semibold text-gray-900">{userEmail}</p>
                            </div>
                            
                            {/* Rol */}
                            <div>
                                <p className="text-sm font-medium text-gray-500 flex items-center gap-2"><Home className="w-4 h-4 text-indigo-500" /> Tipo de Usuario</p>
                                <p className="mt-1 text-lg font-semibold text-gray-900">{userRole}</p>
                            </div>
                            
                            {/* Miembro Desde */}
                            <div>
                                <p className="text-sm font-medium text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4 text-indigo-500" /> Miembro desde</p>
                                <p className="mt-1 text-lg font-semibold text-gray-900">{memberSince}</p>
                            </div>
                        </div>

                        {/* Formulario de Edición */}
                        <div className="mt-10 pt-6 border-t border-gray-200">
                            <ProfileDetailsForm 
                                user={user} 
                                dispatch={dispatch} 
                                loading={isActionLoading} 
                                error={error}
                                successMessage={successMessage}
                            />
                        </div>
                    </div>
                );
            case 'password':
                return (
                    <PasswordChangeForm 
                        dispatch={dispatch} 
                        loading={isActionLoading} 
                        error={error}
                        successMessage={successMessage}
                    />
                );
            case 'orders':
                return <div className="p-10 bg-gray-50 rounded-lg text-center"><ShoppingBag className="w-10 h-10 text-indigo-500 mx-auto mb-4" /><h2 className="text-2xl font-bold text-gray-800">Mis Pedidos</h2><p className="text-gray-600">Esta sección está en construcción. ¡Pronto podrás ver tu historial de compras aquí!</p></div>;
            case 'wishlist':
                return <div className="p-10 bg-gray-50 rounded-lg text-center"><Heart className="w-10 h-10 text-pink-500 mx-auto mb-4" /><h2 className="text-2xl font-bold text-gray-800">Lista de Deseos</h2><p className="text-gray-600">Aquí guardaremos los productos que te enamoren.</p></div>;
            default:
                return null;
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-2">
                    Mi Perfil
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Panel de Navegación Lateral */}
                    <aside className="w-full lg:w-64 bg-white p-6 rounded-xl shadow-xl flex-shrink-0">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Menú de Cuenta</h3>
                        <div className="space-y-2">
                            <SidebarLink Icon={User} title="Información Personal" sectionName="details" />
                            <SidebarLink Icon={Lock} title="Cambiar Contraseña" sectionName="password" />
                            <SidebarLink Icon={ShoppingBag} title="Mis Pedidos" sectionName="orders" />
                            <SidebarLink Icon={Heart} title="Lista de Deseos" sectionName="wishlist" />
                        </div>
                    </aside>

                    {/* Contenido Principal */}
                    <main className="flex-1 bg-white p-8 rounded-xl shadow-xl border border-gray-100">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;