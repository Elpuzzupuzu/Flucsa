// src/hooks/useAppInitialization.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus, fetchUserProfile } from '../../features/user/usersSlice';

export function useAppInitialization() {
  const dispatch = useDispatch();
  const { user, authChecked: reduxAuthChecked } = useSelector(
    (state) => state.user
  );
  const isAuthenticated = !!user;

  // 1. Ejecutar checkAuthStatus (Autenticación Inicial)
  useEffect(() => {
    dispatch(checkAuthStatus()); 
  }, [dispatch]);

  // 2. Fetch de datos completos si es necesario
  useEffect(() => {
    if (reduxAuthChecked && user && !user.nombre) {
      dispatch(fetchUserProfile());
    }
  }, [reduxAuthChecked, user, dispatch]);

  return { isAuthenticated, user, reduxAuthChecked };
}