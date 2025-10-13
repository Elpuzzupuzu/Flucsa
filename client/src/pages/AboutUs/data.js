import { Calendar, Users, Award, TrendingUp, Handshake, Droplet, Wrench, Spade, Home, CheckCircle, Star } from 'lucide-react';

import riego from '../../assets/images/imgs/riego.jpg'; 
import riego2 from '../../assets/images/imgs/riego2.jpg'; 
import epis from '../../assets/images/imgs/epis.jpg'; 
import cocina from '../../assets/images/imgs/cocina.jpg'; 
import indus from '../../assets/images/imgs/indus.jpg'; 
import tinaco from '../../assets/images/imgs/tinaco.jpg'; 






export const stats = [
    { icon: Calendar, number: '2015', key: 'years', label: 'Año de Fundación' },
    { icon: Users, number: '500+', key: 'clients', label: 'Clientes Satisfechos' },
    { icon: Award, number: '10', key: 'experience', label: 'Años de Experiencia' },
    { icon: TrendingUp, number: '100%', key: 'satisfaction', label: 'Atención del Cliente' },
];

export const expertiseAreas = [
    { 
        icon: Droplet, 
        title: 'Sistemas de Riego', 
        description: 'Soluciones eficientes para optimizar el consumo de agua y el cuidado de tus jardines.',
        features: ['Riego automatizado', 'Sensores inteligentes', 'Ahorro de agua'],
        image: riego2 // <<-- ¡APLICADO!
    },
    { 
        icon: Handshake, 
        title: 'Equipos para Piscinas', 
        description: 'Diseño e instalación de sistemas de filtrado y bombas para piscinas residenciales.',
        features: ['Filtros de alta calidad', 'Bombas eficientes', 'Mantenimiento'],
        image: epis // <<-- ¡APLICADO!
    },
    { 
        icon: Wrench, 
        title: 'Instalaciones de Cocina', 
        description: 'Especialistas en lavabos, tuberías y grifería de alta calidad para tu cocina.',
        features: ['Grifería premium', 'Instalación experta', 'Garantía extendida'],
        image: cocina // <<-- ¡APLICADO!
    }, 
    { 
        icon: Spade, 
        title: 'Tuberías y Plomería', 
        description: 'Diagnóstico y reparación de fugas, así como la instalación completa de sistemas de tuberías.',
        features: ['Detección de fugas', 'Materiales duraderos', 'Servicio 24/7'],
        image: riego // <<-- ¡APLICADO!
    },
    { 
        icon: Home, 
        title: 'Tinacos y Cisternas', 
        description: 'Soluciones de almacenamiento de agua potable con instalaciones seguras y duraderas.',
        features: ['Instalación segura', 'Materiales certificados', 'Mantenimiento preventivo'],
        image: tinaco // <<-- ¡APLICADO!
    },
 { 
        icon: Home, 
        title: 'Industriales', 
        description: 'Soluciones de almacenamiento de agua potable con instalaciones seguras y duraderas.',
        features: ['Instalación segura', 'Materiales certificados', 'Mantenimiento preventivo'],
        image: indus // <<-- ¡APLICADO!
    }

];

export const testimonials = [
    {
        name: "Ana Rodríguez",
        role: "Gerente de Proyectos",
        text: "El equipo de Flucsa superó mis expectativas. Su sistema de riego es impecable y su servicio al cliente, excepcional.",
        rating: 5,
        avatar: "A.R."
    },
    {
        name: "Juan Pérez",
        role: "Dueño de Negocio",
        text: "Los instaladores de tuberías fueron rápidos y profesionales. Un trabajo de calidad que se nota en cada detalle.",
        rating: 5,
        avatar: "J.P."
    },
    {
        name: "María González",
        role: "Arquitecta",
        text: "Flucsa transformó completamente nuestro proyecto. Su expertise en sistemas hidráulicos es incomparable.",
        rating: 5,
        avatar: "M.G."
    }
];

export const historyItems = [
    {
        icon: Award,
        title: "Nuestros Inicios (2015)",
        description: "Fundada como un pequeño taller familiar con una gran visión: revolucionar la industria hidráulica con soluciones innovadoras y de máxima calidad.",
        gradient: "from-[#1C2E82] to-[#2d4bc7]"
    },
    {
        icon: TrendingUp,
        title: "Nuestro Crecimiento",
        description: "Evolucionamos constantemente, incorporando las últimas tecnologías sin perder de vista nuestros valores fundamentales: calidad, confiabilidad y excelencia.",
        gradient: "from-[#ED0000] to-[#ff4444]"
    },
    {
        icon: Star,
        title: "Nuestro Presente",
        description: "Hoy somos un referente de excelencia en el mercado, manteniendo nuestro compromiso con la satisfacción del cliente y la innovación constante.",
        gradient: "from-purple-600 to-pink-600"
    }
];

export const values = [
    {
        icon: CheckCircle,
        title: "Calidad",
        description: "Utilizamos materiales de primera y tecnología de vanguardia"
    },
    {
        icon: Users,
        title: "Confianza",
        description: "10 años construyendo relaciones duraderas con nuestros clientes"
    },
    {
        icon: TrendingUp,
        title: "Innovación",
        description: "Siempre a la vanguardia en soluciones hidráulicas"
    },
    {
        icon: Award,
        title: "Excelencia",
        description: "Comprometidos con superar las expectativas en cada proyecto"
    }
];