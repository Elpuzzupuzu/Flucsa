import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Mail, Home, Clock, Heart, ShoppingBag, Lock, AlertCircle, CheckCircle, Loader2, Camera } from 'lucide-react';
import { updateUserProfile, updateUserPassword, clearSuccessMessage } from '../../features/user/usersSlice';

// --- Subcomponentes de la Página de Perfil ---

/**
 * Componente para mostrar y editar la foto de perfil
 */
const ProfilePictureSection = ({ user }) => {
    // Función para obtener las iniciales del nombre
    const getInitials = (name) => {
        if (!name) return "??";
        const parts = name.trim().split(/\s+/);
        let initials = "";

        if (parts.length > 0) {
            initials += parts[0].charAt(0).toUpperCase();
        }
        if (parts.length > 1) {
            initials += parts[1].charAt(0).toUpperCase();
        } else if (initials.length === 1 && name.length > 1) {
            initials += name.charAt(1).toUpperCase();
        }

        return initials.substring(0, 2);
    };

    const userName = user.name || (user.nombre && user.apellido ? `${user.nombre} ${user.apellido}` : 'Usuario');
    const userInitials = getInitials(userName);
    const profilePicture = user?.foto_perfil;

    return (
        <div className="flex flex-col items-center text-center mb-4 pb-4 border-b border-gray-200">
            {/* Contenedor de la imagen/avatar */}
            <div className="relative group mb-2">
                {profilePicture ? (
                    <img
                        src={profilePicture}
                        alt={`${userName}'s profile`}
                        className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-indigo-100 shadow-lg"
                        onError={(e) => {
                            console.error("Error cargando imagen de perfil:", profilePicture);
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    <div className="w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-2xl sm:text-3xl rounded-full shadow-lg border-2 border-indigo-100">
                        {userInitials}
                    </div>
                )}
                
                {/* Botón para cambiar foto */}
                <button 
                    className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-1.5 sm:p-2 rounded-full shadow-md transition-all duration-200"
                    title="Cambiar foto de perfil"
                >
                    <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
            </div>

            {/* Información del usuario */}
            <div>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1">{userName}</h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-1.5 sm:mb-2">{user.correo || user.email}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                    {user.rol ? user.rol.charAt(0).toUpperCase() + user.rol.slice(1) : 'Cliente'}
                </span>
            </div>
        </div>
    );
};

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
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 pb-2 border-b border-gray-200">Editar Detalles</h3>
            
            {/* Mensajes de feedback */}
            {successMessage && (
                <div className="p-2.5 sm:p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start gap-2 text-xs sm:text-sm">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{successMessage}</span>
                </div>
            )}
            {error && (
                <div className="p-2.5 sm:p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-2 text-xs sm:text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Input Nombre */}
                <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5" htmlFor="nombre">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-xs sm:text-sm"
                        required
                    />
                </div>
                
                {/* Input Apellido */}
                <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5" htmlFor="apellido">
                        Apellido
                    </label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-xs sm:text-sm"
                        required
                    />
                </div>
            </div>

            {/* Input Correo */}
            <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5" htmlFor="correo">
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-2.5 bg-gray-50 text-xs sm:text-sm cursor-not-allowed"
                    disabled
                />
                <p className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    El correo electrónico no se puede cambiar desde esta sección.
                </p>
            </div>

            <button
                type="submit"
                className={`w-full flex justify-center items-center gap-2 py-2 sm:py-2.5 px-4 border border-transparent rounded-lg shadow-md text-xs sm:text-sm font-semibold text-white ${
                    loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
                } transition-all duration-200 transform hover:scale-[1.02]`}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Guardando...</span>
                    </>
                ) : (
                    'Guardar Cambios'
                )}
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
        dispatch(clearSuccessMessage());

        if (formData.newPassword !== formData.confirmPassword) {
            setLocalError('Las nuevas contraseñas no coinciden.');
            return;
        }

        if (formData.newPassword.length < 8) {
            setLocalError('La nueva contraseña debe tener al menos 8 caracteres.');
            return;
        }

        dispatch(updateUserPassword({ 
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword 
        }));
        
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-lg font-bold text-gray-800 pb-2 border-b border-gray-200">Cambiar Contraseña</h3>

            {/* Mensajes de feedback */}
            {successMessage && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{successMessage}</span>
                </div>
            )}
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}
            {localError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{localError}</span>
                </div>
            )}

            <div className="space-y-4">
                {/* Input Contraseña Actual */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="currentPassword">
                        Contraseña Actual
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm"
                        required
                    />
                </div>
                
                {/* Input Nueva Contraseña */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="newPassword">
                        Nueva Contraseña
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm"
                        required
                        minLength={8}
                    />
                    <p className="mt-1.5 text-xs text-gray-500">Mínimo 8 caracteres</p>
                </div>

                {/* Input Confirmar Contraseña */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="confirmPassword">
                        Confirmar Nueva Contraseña
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm"
                        required
                    />
                </div>
            </div>

            <button
                type="submit"
                className={`w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white ${
                    loading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 active:bg-red-800'
                } transition-all duration-200 transform hover:scale-[1.02]`}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Cambiando...</span>
                    </>
                ) : (
                    'Cambiar Contraseña'
                )}
            </button>
        </form>
    );
};


// --- Componente Principal ProfilePage ---

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user, loading, error, successMessage } = useSelector((state) => state.user);
    const [selectedSection, setSelectedSection] = useState('details');

    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => {
                dispatch(clearSuccessMessage());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, error, dispatch]);

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 py-10 px-4 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-sm w-full">
                    <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso denegado</h1>
                    <p className="text-base text-gray-600">Por favor, inicia sesión para ver tu perfil.</p>
                </div>
            </div>
        );
    }
    
    const userName = user.name || (user.nombre && user.apellido ? `${user.nombre} ${user.apellido}` : 'Usuario'); 
    const userEmail = user.correo || user.email || 'No proporcionado';
    const userRole = user.rol ? user.rol.charAt(0).toUpperCase() + user.rol.slice(1) : 'Cliente';
    const memberSince = user.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Desconocido';

    const SidebarLink = ({ Icon, title, sectionName }) => (
        <button 
            className={`w-full text-left flex items-center gap-2.5 p-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                selectedSection === sectionName
                ? 'bg-indigo-600 text-white shadow-md scale-[1.02]' 
                : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 active:bg-indigo-100'
            }`}
            onClick={() => {
                setSelectedSection(sectionName);
                dispatch(clearSuccessMessage());
            }}
        >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{title}</span>
        </button>
    );

    const renderContent = () => {
        const isActionLoading = loading && !error && !successMessage;

        switch (selectedSection) {
            case 'details':
                return (
                    <div className="space-y-4 sm:space-y-6">
                        {/* Sección de Foto de Perfil */}
                        <ProfilePictureSection user={user} />

                        {/* Información de Usuario - Cards */}
                        <div>
                            <h2 className="text-base sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Información de Usuario</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                                {/* Card Nombre */}
                                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-3 sm:p-4 rounded-lg border border-indigo-200">
                                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                                        <div className="bg-indigo-600 p-1 sm:p-1.5 rounded-md">
                                            <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                        </div>
                                        <p className="text-[10px] sm:text-xs font-semibold text-indigo-700">Nombre Completo</p>
                                    </div>
                                    <p className="text-sm sm:text-base font-bold text-gray-900 ml-6 sm:ml-9">{userName}</p>
                                </div>
                                
                                {/* Card Email */}
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 rounded-lg border border-purple-200">
                                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                                        <div className="bg-purple-600 p-1 sm:p-1.5 rounded-md">
                                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                        </div>
                                        <p className="text-[10px] sm:text-xs font-semibold text-purple-700">Correo Electrónico</p>
                                    </div>
                                    <p className="text-sm sm:text-base font-bold text-gray-900 ml-6 sm:ml-9 break-words">{userEmail}</p>
                                </div>
                                
                                {/* Card Rol */}
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 rounded-lg border border-blue-200">
                                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                                        <div className="bg-blue-600 p-1 sm:p-1.5 rounded-md">
                                            <Home className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                        </div>
                                        <p className="text-[10px] sm:text-xs font-semibold text-blue-700">Tipo de Usuario</p>
                                    </div>
                                    <p className="text-sm sm:text-base font-bold text-gray-900 ml-6 sm:ml-9">{userRole}</p>
                                </div>
                                
                                {/* Card Miembro Desde */}
                                <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 rounded-lg border border-green-200">
                                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                                        <div className="bg-green-600 p-1 sm:p-1.5 rounded-md">
                                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                        </div>
                                        <p className="text-[10px] sm:text-xs font-semibold text-green-700">Miembro desde</p>
                                    </div>
                                    <p className="text-xs sm:text-sm font-bold text-gray-900 ml-6 sm:ml-9">{memberSince}</p>
                                </div>
                            </div>
                        </div>

                        {/* Formulario de Edición */}
                        <div className="pt-4 sm:pt-6 border-t border-gray-200">
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
                return (
                    <div className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl text-center border border-indigo-100">
                        <div className="bg-indigo-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                            <ShoppingBag className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-1.5">Mis Pedidos</h2>
                        <p className="text-sm text-gray-600">Esta sección está en construcción. ¡Pronto podrás ver tu historial de compras aquí!</p>
                    </div>
                );
            case 'wishlist':
                return (
                    <div className="p-8 bg-gradient-to-br from-pink-50 to-red-50 rounded-xl text-center border border-pink-100">
                        <div className="bg-pink-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Heart className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-1.5">Lista de Deseos</h2>
                        <p className="text-sm text-gray-600">Aquí guardaremos tus productos favoritos.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-6">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                <div className="mb-4 sm:mb-6">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-0.5 sm:mb-1">Mi Perfil</h1>
                    <p className="text-xs sm:text-sm text-gray-600">Gestiona tu información personal y preferencias</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-3 sm:gap-5">
                    {/* Panel de Navegación Lateral - Oculto en móvil */}
                    <aside className="hidden lg:block w-64 bg-white p-5 rounded-xl shadow-lg border border-gray-100 flex-shrink-0 h-fit sticky top-24">
                        <h3 className="text-base font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">Menú de Cuenta</h3>
                        <div className="space-y-1.5">
                            <SidebarLink Icon={User} title="Información Personal" sectionName="details" />
                            <SidebarLink Icon={Lock} title="Cambiar Contraseña" sectionName="password" />
                            <SidebarLink Icon={ShoppingBag} title="Mis Pedidos" sectionName="orders" />
                            <SidebarLink Icon={Heart} title="Lista de Deseos" sectionName="wishlist" />
                        </div>
                    </aside>

                    {/* Contenido Principal */}
                    <main className="flex-1 bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;