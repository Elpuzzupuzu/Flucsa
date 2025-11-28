// src/hooks/useAppInitialization.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus, fetchUserProfile } from '../../features/user/usersSlice';

export function useAppInitialization() {
  const dispatch = useDispatch();
  
  const { user, authChecked: reduxAuthChecked, profileLoaded } = useSelector(
    (state) => state.user
  );
  
  const isAuthenticated = !!user;

  // 1. Ejecutar checkAuthStatus (Autenticación Inicial)
  useEffect(() => {
    // console.log('[useAppInitialization] - reduxAuthChecked:', reduxAuthChecked);
    if (!reduxAuthChecked) { 
        // console.log('[useAppInitialization] - Dispatching checkAuthStatus');
        dispatch(checkAuthStatus()); 
    }
  }, [dispatch, reduxAuthChecked]); 

  // 2. Fetch de datos completos si es necesario
  useEffect(() => {
    // console.log('[useAppInitialization] - Dependencies: ', {
    //   reduxAuthChecked,
    //   user,
    //   profileLoaded
    // });

    if (reduxAuthChecked && user && !profileLoaded) {
      // console.log('[useAppInitialization] - Dispatching fetchUserProfile');
      dispatch(fetchUserProfile())
        .unwrap()
        .then((res) => {
          // console.log('[useAppInitialization] - fetchUserProfile SUCCESS:', res);
        })
        .catch((err) => {
          // console.error('[useAppInitialization] - fetchUserProfile ERROR:', err);
        });
    } else {
      // console.log('[useAppInitialization] - Conditions not met for fetchUserProfile');
    }
  }, [reduxAuthChecked, user, profileLoaded, dispatch]);

  return { isAuthenticated, user, reduxAuthChecked, profileLoaded };
}