import React, { useState } from 'react';
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';
import Home from './pages/Home/Home';
import ProductsPage from './pages/Products/Products';

function App() {
  // Estado para rastrear la página actual. 'home' es la página por defecto.
  const [currentPage, setCurrentPage] = useState('home');

  // Función para renderizar el componente de página correcto
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'products':
        return <ProductsPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gray-100">
      <TopBar />
      <Header setCurrentPage={setCurrentPage} />
      {/* El contenido de la página se renderiza aquí según el estado */}
      {renderPage()}
    </div>
  );
}

export default App;
