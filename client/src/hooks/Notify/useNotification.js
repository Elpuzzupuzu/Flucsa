// 

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🎵 Sonidos base por tipo estándar
import soundSuccess from "../../assets/sounds/success.mp3";
import soundError from "../../assets/sounds/error.mp3";
import soundWarning from "../../assets/sounds/warning.mp3";
import soundInfo from "../../assets/sounds/info.mp3";

// 🔊 Sonido default
import soundDefault from "../../assets/sounds/sound-5.mp3";

// 🎧 Sonidos adicionales
import soundLike from "../../assets/sounds/like.mp3";
import soundCartAdded from "../../assets/sounds/cart_added.mp3";
import soundCartRemoved from "../../assets/sounds/cart_removed.mp3";
import soundCartQuantity from "../../assets/sounds/cart_quantity.mp3";
import soundQuotation from "../../assets/sounds/quotation_created.mp3";

// 🆕 🎵 Wishlist / autenticación
import soundWishlistAdded from "../../assets/sounds/like.mp3";
import soundWishlistRemoved from "../../assets/sounds/wishlist_removed.mp3";
import soundAuthRequired from "../../assets/sounds/info.mp3";

// 📦 Mapa central de sonidos
const soundMap = {
  // Estándar
  success: soundSuccess,
  error: soundError,
  warning: soundWarning,
  info: soundInfo,

  // 🎵 Extras generales
  like: soundLike,
  cart_added: soundCartAdded,
  cart_removed: soundCartRemoved,
  cart_quantity: soundCartQuantity,
  quotation_created: soundQuotation,

  // 🆕 🎵 Wishlist / autenticación
  wishlist_added: soundWishlistAdded,
  wishlist_removed: soundWishlistRemoved,
  auth_required: soundAuthRequired,
};


const playSound = (soundUrl) => {
  console.log("%c🎧 Reproduciendo sonido:", "color:#9D4EDD;font-weight:bold;", soundUrl);

  try {
    const audio = new Audio(soundUrl);
    audio.volume = 0.6;

    audio.play()
      .then(() => {
        console.log("%c🔊 Sonido reproducido correctamente", "color:#4CC9F0");
      })
      .catch((err) => {
        console.warn("%c⚠️ Error al reproducir sonido:", "color:#F72585", err);
      });

  } catch (error) {
    console.warn("%c❌ Excepción en playSound:", "color:red;font-weight:bold;", error);
  }
};

const useNotification = () => {

  const notify = (message, type = "info", customSound = null) => {
    console.log("%c📢 Notificación activada:", "color:#4361EE;font-weight:bold;");
    console.log("message:", message);
    console.log("type:", type);
    console.log("customSound:", customSound);

    // 1️⃣ Sonido personalizado
    if (customSound) {
      console.log("%c🎵 Usando customSound", "color:#F15BB5;font-weight:bold;");
      playSound(customSound);
    } else {
      // 2️⃣ Sonido basado en el "type"
      const soundToPlay = soundMap[type] || soundDefault;

      console.log("%c🎶 Sonido según type:", "color:#B5179E;font-weight:bold;");
      console.log("soundToPlay:", soundToPlay);

      playSound(soundToPlay);
    }

    // 3️⃣ Mostrar toast
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      case "info":
        toast.info(message);
        break;
      default:
        toast(message);
    }
  };

  return { notify };
};

export default useNotification;
