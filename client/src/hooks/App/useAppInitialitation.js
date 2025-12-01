// src/hooks/useAppInitialization.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus, fetchUserProfile } from '../../features/user/usersSlice';
import { fetchWishlist } from '../../features/wishlist/wishListSlice';

export function useAppInitialization() {
  const dispatch = useDispatch();
  
  const { user, authChecked: reduxAuthChecked, profileLoaded } = useSelector(
    (state) => state.user
  );
  
  const isAuthenticated = !!user;

  // 1. Ejecutar checkAuthStatus (Autenticación Inicial)
  useEffect(() => {
    if (!reduxAuthChecked) {
      dispatch(checkAuthStatus()); 
    }
  }, [dispatch, reduxAuthChecked]); 

  // 2. Fetch del perfil completo si es necesario
  useEffect(() => {
    if (reduxAuthChecked && user && !profileLoaded) {
      dispatch(fetchUserProfile());
    }
  }, [reduxAuthChecked, user, profileLoaded, dispatch]);

  // 
  // 3. Cargar WISHLIST al iniciar la app o al recargar (F5)
  // 
  useEffect(() => {
    // Solo cuando YA sabemos si está autenticado
    if (reduxAuthChecked && user?.id) {
      dispatch(fetchWishlist(user.id));
    }
  }, [reduxAuthChecked, user?.id, dispatch]);

  return { isAuthenticated, user, reduxAuthChecked, profileLoaded };
}
