import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import LinkSection from '../../components/LinkSection/LinkSection';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import ProductSliderPrototype from '../../components/ShopSlider/ShopSlider';
import AboutUs from '../../components/Location/Location';
import Footer from '../../components/Footer/Footer';

function Home() {
  return (
    <>
      <main>
        <ProductSlider />
        <HeroSection />
        <ProductSliderPrototype />
        <CategoryGrid />
        <AboutUs />
        {/* <LinkSection /> */}
      </main>
    </>
  );
}

export default Home;
