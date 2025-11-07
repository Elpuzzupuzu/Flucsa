import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification = () => (
  <ToastContainer
    position="top-right"
    autoClose={500}          // Duración de 3 segundos
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"           // Fondo coloreado
  />
);

export default ToastNotification;
