// src/components/profile/ProfilePictureSection.jsx

import { Camera } from 'lucide-react';
import { getInitials } from '../utils/profileUtils';

const ProfilePictureSection = ({ user }) => {
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
                
                {/* Botón para cambiar foto (funcionalidad pendiente) */}
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

export default ProfilePictureSection;