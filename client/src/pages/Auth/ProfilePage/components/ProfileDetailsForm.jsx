// src/components/profile/ProfileDetailsForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { updateUserProfile } from '../../../../features/user/usersSlice';
import { useUserProfileImage } from '../../../../hooks/userProfile/useUserProfileImage';

const ProfileDetailsForm = ({ user, loading, error, successMessage }) => {
    const dispatch = useDispatch();

    // Estado del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
    });

    // Hook para manejo de imagen
    const {
        file,
        imagePreview,
        uploading,
        uploadError,
        handleFileChange,
        handleDrag,
        handleDrop,
        uploadImage,
        resetImage,
    } = useUserProfileImage();

    // ⚡ Sincronizar formData cada vez que `user` cambie
    useEffect(() => {
        if (user) {
            setFormData({
                nombre: user.nombre || '',
                apellido: user.apellido || '',
                correo: user.correo || user.email || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = user?.foto_perfil || "";

        // Subir imagen si hay archivo seleccionado
        if (file) {
            const uploadedUrl = await uploadImage(user.id);
            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            }
        }

        // Dispatch para actualizar perfil incluyendo la foto
        dispatch(updateUserProfile({ ...formData, foto_perfil: imageUrl }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 pb-2 border-b border-gray-200">
                Editar Detalles
            </h3>

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

            {/* Sección de foto de perfil */}
            <div className="flex flex-col items-center gap-2">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                    Foto de Perfil
                </label>
                <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className="w-32 h-32 border border-gray-300 rounded-full overflow-hidden flex items-center justify-center cursor-pointer relative"
                >
                    {imagePreview || user?.foto_perfil ? (
                        <img
                            src={imagePreview || user.foto_perfil}
                            alt="Foto de perfil"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-gray-400 text-sm">Arrastra o selecciona</span>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
                {uploading && (
                    <div className="text-indigo-600 text-xs flex items-center gap-1">
                        <Loader2 className="w-4 h-4 animate-spin" /> Subiendo...
                    </div>
                )}
                {uploadError && (
                    <p className="text-red-600 text-xs">{uploadError}</p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Nombre */}
                <div>
                    <label
                        htmlFor="nombre"
                        className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5"
                    >
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

                {/* Apellido */}
                <div>
                    <label
                        htmlFor="apellido"
                        className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5"
                    >
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

            {/* Correo */}
            <div>
                <label
                    htmlFor="correo"
                    className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5"
                >
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

            {/* Botón Guardar */}
            <button
                type="submit"
                disabled={loading || uploading}
                className={`w-full flex justify-center items-center gap-2 py-2 sm:py-2.5 px-4 border border-transparent rounded-lg shadow-md text-xs sm:text-sm font-semibold text-white ${
                    loading || uploading
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
                } transition-all duration-200 transform hover:scale-[1.02]`}
            >
                {loading || uploading ? (
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
