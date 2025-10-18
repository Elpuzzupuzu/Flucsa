// src/components/profile/ProfileDetailsForm.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { updateUserProfile } from '../../../../features/user/usersSlice'

const ProfileDetailsForm = ({ user, loading, error, successMessage }) => {
    const dispatch = useDispatch();

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
                {/* Input Nombre y Apellido... (mismo código) */}
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

            {/* Input Correo (Deshabilitado) */}
            <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5" htmlFor="correo">
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
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

export default ProfileDetailsForm;