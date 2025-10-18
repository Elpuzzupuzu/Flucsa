// src/components/profile/ProfileSidebar.jsx

import React from 'react';
import { User, Lock, ShoppingBag, Heart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { clearSuccessMessage } from '../../../../features/user/usersSlice';

const SidebarLink = ({ Icon, title, sectionName, selectedSection, setSelectedSection }) => {
    const dispatch = useDispatch();
    
    return (
        <button 
            className={`w-full text-left flex items-center gap-2.5 p-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                selectedSection === sectionName
                ? 'bg-indigo-600 text-white shadow-md scale-[1.02]' 
                : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 active:bg-indigo-100'
            }`}
            onClick={() => {
                setSelectedSection(sectionName);
                dispatch(clearSuccessMessage()); // Limpiar mensajes al cambiar de sección
            }}
        >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{title}</span>
        </button>
    );
};

const ProfileSidebar = ({ selectedSection, setSelectedSection }) => {
    return (
        <aside className="hidden lg:block w-64 bg-white p-5 rounded-xl shadow-lg border border-gray-100 flex-shrink-0 h-fit sticky top-24">
            <h3 className="text-base font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">Menú de Cuenta</h3>
            <div className="space-y-1.5">
                <SidebarLink 
                    Icon={User} 
                    title="Información Personal" 
                    sectionName="details" 
                    selectedSection={selectedSection} 
                    setSelectedSection={setSelectedSection} 
                />
                <SidebarLink 
                    Icon={Lock} 
                    title="Cambiar Contraseña" 
                    sectionName="password" 
                    selectedSection={selectedSection} 
                    setSelectedSection={setSelectedSection} 
                />
                <SidebarLink 
                    Icon={ShoppingBag} 
                    title="Mis Pedidos" 
                    sectionName="orders" 
                    selectedSection={selectedSection} 
                    setSelectedSection={setSelectedSection} 
                />
                <SidebarLink 
                    Icon={Heart} 
                    title="Lista de Deseos" 
                    sectionName="wishlist" 
                    selectedSection={selectedSection} 
                    setSelectedSection={setSelectedSection} 
                />
            </div>
        </aside>
    );
};


export default ProfileSidebar;