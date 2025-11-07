// En tu archivo useNotification.js (o donde lo tengas definido)

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 💡 IMPORTANTE: Importa el archivo de sonido directamente
// Asegúrate de que la ruta sea correcta a tu archivo dentro de 'src/assets'
import notificationSound from '../../assets/sounds/sound-5.mp3'; 


/**
 * Función auxiliar para reproducir el sonido.
 * Usa la URL importada.
 */
const playNotificationSound = () => {
  try {
    // Usamos la variable 'notificationSound' que ahora contiene la URL generada
    const audio = new Audio(notificationSound); 
    
    audio.play();

  } catch (error) {
    console.error("Error al reproducir el sonido de notificación:", error);
  }
};


const useNotification = () => {
  
  const notify = (message, type = 'info') => {
    // Reproduce el sonido
    playNotificationSound(); 

    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      case 'info':
        toast.info(message);
        break;
      default:
        toast(message);
        break;
    }
  };

  return { notify };
};

export default useNotification;