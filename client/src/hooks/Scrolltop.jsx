import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 'pathname' cambia con cada navegación, activando este efecto
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Este componente no renderiza nada, solo maneja el efecto
};

export default ScrollToTop;