import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
  ];

  return (
    <footer className="bg-[#1C2E82] text-white py-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Sección de Contacto */}
        <div>
          <h3 className="text-xl font-extrabold mb-3 text-white">Contáctanos</h3>
          <p className="text-slate-300 mb-1 transition-transform duration-300 transform hover:scale-105">
            1234 Calle de la Industria, Ciudad, País
          </p>
          <p className="text-slate-300 mb-1 transition-transform duration-300 transform hover:scale-105">
            info@flucsa.com
          </p>
          <p className="text-slate-300 transition-transform duration-300 transform hover:scale-105">
            +123 456 7890
          </p>
        </div>

        {/* Enlaces de Navegación */}
        <div>
          <h3 className="text-xl font-extrabold mb-3 text-white">Enlaces Rápidos</h3>
          <ul className="space-y-2 text-slate-300">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Productos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Servicios
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Acerca de Nosotros
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Redes Sociales */}
        <div>
          <h3 className="text-xl font-extrabold mb-3 text-white">Síguenos</h3>
          <div className="flex justify-center md:justify-start space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="text-white hover:text-red-500 transition-colors transform hover:scale-125"
                aria-label={`Enlace a ${link.name}`}
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 text-center text-slate-400 border-t border-slate-700 pt-4">
        <p>
          &copy; {new Date().getFullYear()} Flucsa. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
