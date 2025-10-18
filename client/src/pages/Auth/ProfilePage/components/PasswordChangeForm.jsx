// src/components/profile/PasswordChangeForm.jsx
import { useDispatch } from 'react-redux';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { updateUserPassword, clearSuccessMessage } from '../../../../features/user/usersSlice'; // Asegúrate de la ruta
import { useState } from 'react';




const PasswordChangeForm = ({ loading, error, successMessage }) => {
    const dispatch = useDispatch();
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
        dispatch(clearSuccessMessage()); // Limpiar mensaje global de éxito

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
        
        // Limpiar el formulario después del envío
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-lg font-bold text-gray-800 pb-2 border-b border-gray-200">Cambiar Contraseña</h3>

            {/* Mensajes de feedback (Redux) */}
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
            {/* Mensaje de feedback (Local) */}
            {localError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{localError}</span>
                </div>
            )}

            <div className="space-y-4">
                {/* Inputs de Contraseña (mismo código) */}
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

export default PasswordChangeForm;