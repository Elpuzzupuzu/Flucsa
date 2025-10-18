// src/components/profile/ProfilePage.jsx

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AlertCircle, ShoppingBag, Heart } from 'lucide-react';
import { clearSuccessMessage } from '../../../features/user/usersSlice'; // Asegúrate de la ruta

// Importar los nuevos componentes modulares
import ProfilePictureSection from './components/ProfilePictureSection';
import ProfileDetailsForm from './components/ProfileDetailsForm';
import PasswordChangeForm from './components/PasswordChangeForm';
import ProfileInfoCards from './components/ProfileInfoCards';
import ProfileSidebar from './components/ProfileSideBar';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user, loading, error, successMessage } = useSelector((state) => state.user);
    const [selectedSection, setSelectedSection] = useState('details');

    // Efecto para limpiar mensajes de feedback después de un tiempo
    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => {
                dispatch(clearSuccessMessage());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, error, dispatch]);

    // Manejo de usuario no autenticado
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
    
    // El estado de carga solo aplica a las acciones de Redux (guardar/cambiar)
    const isActionLoading = loading && !error && !successMessage;

    const renderContent = () => {
        switch (selectedSection) {
            case 'details':
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <ProfilePictureSection user={user} />
                        
                        <ProfileInfoCards user={user} />

                        <div className="pt-4 sm:pt-6 border-t border-gray-200">
                            <ProfileDetailsForm 
                                user={user} 
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
                <div className="flex flex-col lg:flex-row gap-3 sm:gap-5">
                    {/* Panel de Navegación Lateral */}
                    <ProfileSidebar 
                        selectedSection={selectedSection} 
                        setSelectedSection={setSelectedSection} 
                    />

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