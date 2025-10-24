import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useNotification = () => {
  const notify = (message, type = 'info') => {
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
      default:
        toast(message);
        break;
    }
  };

  return { notify };
};

export default useNotification;
