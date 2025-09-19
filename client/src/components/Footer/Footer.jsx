import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
  ];

  return (
    <footer className="bg-[#1C2E82] text-white relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-red-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
          
          {/* Logo/Branding Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
                FLUCSA
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Innovación y excelencia en cada proyecto. Construyendo el futuro juntos.
              </p>
            </div>
          </div>

          {/* Sección de Contacto */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white relative">
              Contáctanos
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-red-500"></div>
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 group">
                <MapPin size={18} className="text-red-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-slate-300 text-sm group-hover:text-white transition-colors">
                  1234 Calle de la Industria<br />Ciudad, País
                </p>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail size={18} className="text-red-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-slate-300 text-sm group-hover:text-white transition-colors">
                  info@flucsa.com
                </p>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone size={18} className="text-red-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-slate-300 text-sm group-hover:text-white transition-colors">
                  +123 456 7890
                </p>
              </div>
            </div>
          </div>

          {/* Enlaces de Navegación */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white relative">
              Enlaces Rápidos
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-red-500"></div>
            </h3>
            <ul className="space-y-2">
              {['Productos', 'Servicios', 'Acerca de Nosotros', 'Blog', 'Soporte'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-slate-300 text-sm hover:text-white hover:translate-x-1 transition-all duration-300 inline-block group"
                  >
                    <span className="border-b border-transparent group-hover:border-red-500 transition-colors">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white relative">
              Síguenos
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-red-500"></div>
            </h3>
            <div className="flex space-x-3 mb-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-red-500 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 backdrop-blur-sm border border-white/20"
                  aria-label={`Enlace a ${link.name}`}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-slate-400 text-xs">
              Mantente conectado con nuestras últimas noticias y actualizaciones
            </p>
          </div>
        </div>

        {/* Línea divisoria con gradiente */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-4"></div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Flucsa. Todos los derechos reservados.
          </div>
          <div className="flex space-x-4 text-xs text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
