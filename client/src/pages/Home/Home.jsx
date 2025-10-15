import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import LinkSection from '../../components/LinkSection/LinkSection';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import ProductSliderPrototype from '../../components/ShopSlider/ShopSlider';
import AboutUs from '../../components/Location/Location';
import Footer from '../../components/Footer/Footer';
import HeroSlider from '../../components/BannerSlider/HeroSlider';
import heroImage from '../../assets/images/pipes.jpg'

function Home() {
  return (
    <>
      <main>
        {/* <ProductSlider /> */}
        <HeroSlider/>
        {/* <HeroSection heroImage={heroImage} /> */}
        <ProductSliderPrototype />
        <CategoryGrid />
        <AboutUs />
        {/* <LinkSection /> */}
      </main>
    </>
  );
}

export default Home;
