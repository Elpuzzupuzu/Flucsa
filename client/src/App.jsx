// src/App.jsx
import React from 'react';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import CategoryGrid from './components/CategoryGrid/CategoryGrid';
import LinkSection from './components/LinkSection/LinkSection';

function App() {
  return (
    <div className="font-sans min-h-screen bg-gray-100">
      <Header/>
      <main>
        <HeroSection/>
        <CategoryGrid />
        <LinkSection />
      </main>
    </div>
  );
}

export default App;