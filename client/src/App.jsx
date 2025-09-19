import React from 'react';
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';
import HeroSection from './components/HeroSection/HeroSection';
import CategoryGrid from './components/CategoryGrid/CategoryGrid';
import LinkSection from './components/LinkSection/LinkSection';
import ProductSlider from './components/ProductSlider/ProductSlider';
import ProductSliderPrototype from './components/ShopSlider/ShopSlider';
import AboutUs from './components/AboutUs/AboutUs';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="font-sans min-h-screen bg-gray-100">
      <TopBar />
      <Header/>
      <main>
        <ProductSlider/>
        <HeroSection/>
        <ProductSliderPrototype/>
        <CategoryGrid />
        <AboutUs/>
        <Footer/>

        {/* <LinkSection /> */}
      </main>
    </div>
  );
}

export default App;
