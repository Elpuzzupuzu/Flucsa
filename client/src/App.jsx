import React from 'react';
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';
import HeroSection from './components/HeroSection/HeroSection';
import CategoryGrid from './components/CategoryGrid/CategoryGrid';
import LinkSection from './components/LinkSection/LinkSection';
import ProductSlider from './components/ProductSlider/ProductSlider';

function App() {
  return (
    <div className="font-sans min-h-screen bg-gray-100">
      <TopBar />
      <Header/>
      <main>
        <HeroSection/>
        <ProductSlider/>
        <CategoryGrid />
        <LinkSection />
      </main>
    </div>
  );
}

export default App;
