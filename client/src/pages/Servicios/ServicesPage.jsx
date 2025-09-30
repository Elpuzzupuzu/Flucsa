import { useEffect, useState } from "react";
import HeroSection from "./heroSection";
import ServicesGrid from "./serviceGrid";
import WhyChooseUs from "./whyChooseUs";
import CTASection from "./CTASection"
import { services, whyChooseUs } from "./serviceData";
import "./Animations.css";

const ServicesPage = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll("[data-animate]").forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <HeroSection isVisible={isVisible} />
      <ServicesGrid services={services} isVisible={isVisible} />
      <WhyChooseUs whyChooseUs={whyChooseUs} isVisible={isVisible} />
      <CTASection isVisible={isVisible} />
    </>
  );
};

export default ServicesPage;
