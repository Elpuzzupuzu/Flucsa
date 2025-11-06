import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

export default function NatalieCatering() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const observerRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-zinc-50 font-serif">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
        
        .font-serif {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .font-sans {
          font-family: 'Montserrat', sans-serif;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }

        .parallax-bg {
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .overlay-gradient {
          background: linear-gradient(135deg, rgba(24, 24, 27, 0.95), rgba(39, 39, 42, 0.9));
        }

        .text-gradient {
          background: linear-gradient(135deg, #f4f4f5 0%, #d4d4d8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-zinc-900/98 shadow-2xl backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="text-3xl font-light tracking-wider text-zinc-100 animate-fade-in-left">
            Natalie <span className="font-medium italic">Catering</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Services', 'About', 'Gallery', 'Contact'].map((item, idx) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-sans tracking-wide text-zinc-300 hover:text-zinc-100 transition-all duration-300 uppercase relative group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-zinc-100 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-zinc-100 transition-transform hover:scale-110"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-900/98 backdrop-blur-sm border-t border-zinc-800 animate-fade-in-up">
            <div className="px-6 py-4 space-y-4">
              {['Home', 'Services', 'About', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left text-sm font-sans tracking-wide text-zinc-300 hover:text-zinc-100 hover:translate-x-2 transition-all uppercase"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80)',
          }}
        ></div>
        <div className="absolute inset-0 overlay-gradient"></div>
        
        {/* Animated decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-zinc-700/30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 border border-zinc-700/30 animate-pulse delay-300"></div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-6 text-sm font-sans tracking-[0.3em] text-zinc-400 uppercase animate-fade-in-up opacity-0">
            Exceptional Culinary Experiences
          </div>
          
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-light text-zinc-100 mb-8 leading-tight animate-fade-in-up opacity-0 delay-100">
            Natalie <span className="italic font-normal text-gradient">Catering</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-sans font-light text-zinc-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up opacity-0 delay-200">
            Elevating events through refined cuisine, impeccable presentation, 
            and distinguished service for corporate gatherings and celebrations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up opacity-0 delay-300">
            <button
              onClick={() => scrollToSection('contact')}
              className="group px-10 py-4 bg-zinc-100 text-zinc-900 font-sans text-sm tracking-wider uppercase hover:bg-zinc-200 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              Inquire Now
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="px-10 py-4 border-2 border-zinc-100 text-zinc-100 font-sans text-sm tracking-wider uppercase hover:bg-zinc-100 hover:text-zinc-900 transition-all duration-300 hover:scale-105"
            >
              Explore Services
            </button>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('services')}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-zinc-400 animate-bounce hover:text-zinc-100 transition-colors"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* Services Section */}
      <section 
        id="services" 
        className="py-24 px-6 bg-zinc-50"
        ref={(el) => (observerRefs.current[0] = el)}
      >
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${
            isVisible.services ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
            <h2 className="text-5xl md:text-6xl font-light text-zinc-900 mb-4">
              Our <span className="italic">Services</span>
            </h2>
            <div className="w-20 h-px bg-zinc-900 mx-auto mt-6"></div>
            <p className="font-sans text-lg text-zinc-600 mt-6 max-w-2xl mx-auto">
              Tailored culinary solutions for every occasion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: 'Corporate Events',
                desc: 'Sophisticated menus and professional service designed to impress clients and colleagues at corporate functions.',
                image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80'
              },
              {
                title: 'Weddings',
                desc: 'Bespoke culinary experiences crafted to make your special day unforgettable with elegance and refinement.',
                image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80'
              },
              {
                title: 'Private Gatherings',
                desc: 'Intimate celebrations elevated with personalized menus and attentive service for discerning hosts.',
                image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80'
              },
              {
                title: 'Gala Dinners',
                desc: 'Multi-course dining experiences with impeccable presentation for prestigious events and fundraisers.',
                image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80'
              },
              {
                title: 'Cocktail Receptions',
                desc: 'Curated selection of canapés and beverages served with sophistication for social engagements.',
                image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80'
              },
              {
                title: 'Custom Menus',
                desc: 'Tailored culinary solutions accommodating dietary requirements and personal preferences with creativity.',
                image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80'
              }
            ].map((service, idx) => (
              <div
                key={idx}
                className={`group bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 border border-zinc-200 ${
                  isVisible.services ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent"></div>
                </div>
                <div className="p-10">
                  <div className="w-12 h-px bg-zinc-900 mb-6 group-hover:w-24 transition-all duration-500"></div>
                  <h3 className="text-2xl font-light text-zinc-900 mb-4">{service.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-zinc-600 font-light">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="relative py-24 px-6 overflow-hidden"
        ref={(el) => (observerRefs.current[1] = el)}
      >
        <div 
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80)',
          }}
        ></div>
        <div className="absolute inset-0 bg-zinc-900/90"></div>
        
        <div className={`max-w-6xl mx-auto text-center relative z-10 transition-all duration-1000 ${
          isVisible.about ? 'animate-fade-in-up' : 'opacity-0'
        }`}>
          <h2 className="text-5xl md:text-6xl font-light text-zinc-100 mb-8">
            Excellence in Every <span className="italic">Detail</span>
          </h2>
          <div className="w-20 h-px bg-zinc-100 mx-auto mb-12"></div>
          <p className="font-sans text-lg md:text-xl font-light text-zinc-300 leading-relaxed max-w-4xl mx-auto mb-8">
            With years of experience in premium catering services, Natalie Catering delivers 
            exceptional culinary experiences that reflect sophistication, quality, and attention to detail.
          </p>
          <p className="font-sans text-lg md:text-xl font-light text-zinc-300 leading-relaxed max-w-4xl mx-auto mb-12">
            Our commitment to excellence ensures every event is executed flawlessly, 
            from intimate gatherings to grand celebrations.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { number: '500+', label: 'Events Catered' },
              { number: '15+', label: 'Years Experience' },
              { number: '100%', label: 'Client Satisfaction' }
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className={`transition-all duration-1000 ${
                  isVisible.about ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="text-5xl font-light text-zinc-100 mb-3">{stat.number}</div>
                <div className="font-sans text-sm tracking-wider text-zinc-400 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section 
        id="gallery" 
        className="py-24 px-6 bg-zinc-50"
        ref={(el) => (observerRefs.current[2] = el)}
      >
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${
            isVisible.gallery ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
            <h2 className="text-5xl md:text-6xl font-light text-zinc-900 mb-4">
              Recent <span className="italic">Events</span>
            </h2>
            <div className="w-20 h-px bg-zinc-900 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80',
              'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
              'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
              'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=600&q=80',
              'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
              'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80'
            ].map((img, idx) => (
              <div
                key={idx}
                className={`group aspect-square overflow-hidden transition-all duration-1000 ${
                  isVisible.gallery ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <img 
                  src={img} 
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="relative py-24 px-6 overflow-hidden"
        ref={(el) => (observerRefs.current[3] = el)}
      >
        <div 
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&q=80)',
          }}
        ></div>
        <div className="absolute inset-0 overlay-gradient"></div>
        
        <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 ${
          isVisible.contact ? 'animate-fade-in-up' : 'opacity-0'
        }`}>
          <h2 className="text-5xl md:text-6xl font-light text-zinc-100 mb-8">
            Begin Your <span className="italic">Journey</span>
          </h2>
          <div className="w-20 h-px bg-zinc-100 mx-auto mb-12"></div>
          <p className="font-sans text-lg md:text-xl font-light text-zinc-300 mb-12 leading-relaxed">
            Connect with us to discuss your upcoming event and discover how we can 
            create an exceptional culinary experience tailored to your vision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button className="group px-12 py-5 bg-zinc-100 text-zinc-900 font-sans text-sm tracking-wider uppercase hover:bg-zinc-200 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105">
              Contact Us
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button className="px-12 py-5 border-2 border-zinc-100 text-zinc-100 font-sans text-sm tracking-wider uppercase hover:bg-zinc-100 hover:text-zinc-900 transition-all duration-300 hover:scale-105">
              View Menu
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
              { icon: Mail, label: 'Email', value: 'hello@nataliecatering.com' },
              { icon: MapPin, label: 'Location', value: 'New York, NY' }
            ].map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <div 
                  key={idx}
                  className={`transition-all duration-1000 ${
                    isVisible.contact ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <Icon className="w-8 h-8 text-zinc-300 mx-auto mb-4" />
                  <div className="font-sans text-sm tracking-wider text-zinc-400 uppercase mb-2">{contact.label}</div>
                  <div className="font-sans text-zinc-100">{contact.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="text-3xl font-light text-zinc-100 mb-6">
                Natalie <span className="italic">Catering</span>
              </div>
              <p className="font-sans text-sm leading-relaxed text-zinc-400 mb-6">
                Elevating events through refined cuisine, impeccable presentation, 
                and distinguished service since 2010.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Linkedin].map((Icon, idx) => (
                  <button
                    key={idx}
                    className="w-10 h-10 border border-zinc-700 flex items-center justify-center hover:bg-zinc-100 hover:text-zinc-900 hover:border-zinc-100 transition-all duration-300 hover:scale-110"
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-sans text-sm tracking-wider text-zinc-100 uppercase mb-6">Quick Links</h3>
              <div className="space-y-3">
                {['Home', 'Services', 'About', 'Gallery', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block font-sans text-sm hover:text-zinc-100 transition-colors hover:translate-x-1 duration-300"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-sans text-sm tracking-wider text-zinc-100 uppercase mb-6">Contact</h3>
              <div className="space-y-3 font-sans text-sm">
                <p>123 Gourmet Street</p>
                <p>New York, NY 10001</p>
                <p>+1 (555) 123-4567</p>
                <p>hello@nataliecatering.com</p>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-sm text-center md:text-left">
              © 2025 Natalie Catering. All rights reserved.
            </p>
            <div className="flex gap-6 font-sans text-sm">
              <button className="hover:text-zinc-100 transition-colors">Privacy Policy</button>
              <button className="hover:text-zinc-100 transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}