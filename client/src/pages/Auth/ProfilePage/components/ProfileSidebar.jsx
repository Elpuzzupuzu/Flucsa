import { User, Lock, ShoppingBag, Heart, MessageSquare } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { clearSuccessMessage } from '../../../../features/user/usersSlice';

const SidebarLink = ({ Icon, title, sectionName, selectedSection, setSelectedSection }) => {
    const dispatch = useDispatch();

    return (
        <button
            className={`w-full flex items-center justify-center lg:justify-start gap-2.5 p-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                selectedSection === sectionName
                    ? 'bg-red-600 text-white shadow-md scale-[1.02]'
                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 active:bg-indigo-100'
            }`}
            onClick={() => {
                setSelectedSection(sectionName);
                dispatch(clearSuccessMessage());
            }}
            title={title}
        >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="hidden lg:inline truncate">{title}</span>
        </button>
    );
};

const ProfileSidebar = ({ selectedSection, setSelectedSection }) => {
    return (
        <>
            {/* Sidebar para mobile - Horizontal */}
            <aside className="lg:hidden w-full bg-white p-3 rounded-xl shadow-lg border border-gray-100 flex-shrink-0">
                <div className="flex gap-1.5 justify-center">
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
                    <SidebarLink
                        Icon={MessageSquare}
                        title="Mis Reseñas"
                        sectionName="reviews"
                        selectedSection={selectedSection}
                        setSelectedSection={setSelectedSection}
                    />
                </div>
            </aside>

            {/* Sidebar para desktop - Vertical */}
            <aside className="hidden lg:flex flex-col w-64 bg-white p-5 rounded-xl shadow-lg border border-gray-100 flex-shrink-0 h-fit sticky top-24">
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
                    <SidebarLink
                        Icon={MessageSquare}
                        title="Mis Reseñas"
                        sectionName="reviews"
                        selectedSection={selectedSection}
                        setSelectedSection={setSelectedSection}
                    />
                </div>
            </aside>
        </>
    );
};

export default ProfileSidebar;
