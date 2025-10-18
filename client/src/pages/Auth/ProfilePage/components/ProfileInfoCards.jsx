// src/components/profile/ProfileInfoCards.jsx
import { User, Mail, Home, Clock } from 'lucide-react';

const Card = ({ Icon, title, value, color, iconBg, border }) => (
    <div className={`bg-gradient-to-br from-${color}-50 to-${color}-100 p-3 sm:p-4 rounded-lg border border-${border}`}>
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
            <div className={`${iconBg} p-1 sm:p-1.5 rounded-md`}>
                <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <p className={`text-[10px] sm:text-xs font-semibold text-${color}-700`}>{title}</p>
        </div>
        <p className="text-sm sm:text-base font-bold text-gray-900 ml-6 sm:ml-9 break-words">{value}</p>
    </div>
);

const ProfileInfoCards = ({ user }) => {
    const userName = user.name || (user.nombre && user.apellido ? `${user.nombre} ${user.apellido}` : 'Usuario'); 
    const userEmail = user.correo || user.email || 'No proporcionado';
    const userRole = user.rol ? user.rol.charAt(0).toUpperCase() + user.rol.slice(1) : 'Cliente';
    const memberSince = user.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Desconocido';

    return (
        <div>
            <h2 className="text-base sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Información de Usuario</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <Card 
                    Icon={User} 
                    title="Nombre Completo" 
                    value={userName} 
                    color="indigo" 
                    iconBg="bg-indigo-600" 
                    border="indigo-200" 
                />
                <Card 
                    Icon={Mail} 
                    title="Correo Electrónico" 
                    value={userEmail} 
                    color="purple" 
                    iconBg="bg-purple-600" 
                    border="purple-200" 
                />
                <Card 
                    Icon={Home} 
                    title="Tipo de Usuario" 
                    value={userRole} 
                    color="blue" 
                    iconBg="bg-blue-600" 
                    border="blue-200" 
                />
                <Card 
                    Icon={Clock} 
                    title="Miembro desde" 
                    value={memberSince} 
                    color="green" 
                    iconBg="bg-green-600" 
                    border="green-200" 
                />
            </div>
        </div>
    );
};

export default ProfileInfoCards;