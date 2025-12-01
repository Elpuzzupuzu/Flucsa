import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AlertCircle, ShoppingBag, Heart } from 'lucide-react';
import { 
    clearSuccessMessage, 
    fetchUserPurchaseHistory, 
    fetchUserWishlist 
} from '../../../features/user/usersSlice';

import ProfilePictureSection from './components/ProfilePictureSection';
import ProfileDetailsForm from './components/ProfileDetailsForm';
import PasswordChangeForm from './components/PasswordChangeForm';
import ProfileInfoCards from './components/ProfileInfoCards';
import ProfileSidebar from '../../Auth/ProfilePage/components/ProfileSidebar';
import PurchaseHistoryList from './components/PurchaseHistoryList';
import UserReviewsList from './components/UserReviewsList'; 
import WishlistList from './components/WishlistList'; // 🔹 Nuevo componente

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { 
        user, 
        loading, 
        error, 
        successMessage, 
        authChecked, 
        purchaseHistory,
        wishlist
    } = useSelector((state) => state.user);

    const [selectedSection, setSelectedSection] = useState('details');

    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => {
                dispatch(clearSuccessMessage());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, error, dispatch]);

    useEffect(() => {
        if (!user?.id) return;

        if (selectedSection === "orders") {
            dispatch(fetchUserPurchaseHistory(user.id));
        }

        if (selectedSection === "wishlist") {
            dispatch(fetchUserWishlist(user.id));
        }
    }, [selectedSection, dispatch, user?.id]);


    /// FIn de la logica para construir el objeto 

    if (!authChecked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 text-lg">Verificando sesión...</p>
            </div>
        );
    }

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

    const isProfileDataReady = !!user.nombre;
    if (!isProfileDataReady) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 text-lg">Cargando datos del perfil...</p>
            </div>
        );
    }

    const isActionLoading = loading && !error && !successMessage;

    const renderContent = () => {
        switch (selectedSection) {
            case 'details':
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <ProfilePictureSection user={user} isLoading={!isProfileDataReady} />
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
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center">
                                <ShoppingBag className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Historial de Compras</h2>
                                <p className="text-sm text-gray-500">
                                    Aquí puedes ver todas tus órdenes y los productos que has comprado.
                                </p>
                            </div>
                        </div>

                        <PurchaseHistoryList 
                            userId={user.id}
                            history={purchaseHistory}
                            loading={loading}
                        />
                    </div>
                );

            case 'reviews':
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Tus Reseñas</h2>
                        <UserReviewsList userId={user.id} />
                    </div>
                );

            case 'wishlist':
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Lista de Deseos</h2>
                        <WishlistList wishlist={wishlist?.data || []} loading={loading} />
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
                    <ProfileSidebar 
                        selectedSection={selectedSection}
                        setSelectedSection={setSelectedSection}
                    />

                    <main className="flex-1 bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
