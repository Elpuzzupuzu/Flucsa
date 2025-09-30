import { 
  Lightbulb, Wrench, Sprout, Leaf, Sun, Droplet, 
  Users, Zap, ShieldCheck, Handshake, CheckCircle, Award, Clock 
} from "lucide-react";

export const services = [
  { 
    id: "sistemas-riego", // ✅ nuevo ID
    icon: Droplet, 
    title: 'Sistemas de Riego Residencial', 
    description: 'Diseño e instalación de sistemas de riego automáticos que optimizan el consumo de agua para el cuidado de jardines, césped y áreas verdes.',
    items: [ // ✅ antes "features"
      { name: 'Riego automatizado', details: 'Control inteligente del riego en zonas específicas' },
      { name: 'Sensores de humedad', details: 'Ajustes en tiempo real para evitar desperdicio' },
      { name: 'Ahorro hasta 40% de agua', details: 'Mayor eficiencia en consumo de recursos' }
    ],
    color: 'from-blue-600 to-cyan-500'
  },
  { 
    id: "equipos-piscinas",
    icon: Sun, 
    title: 'Equipos para Piscinas', 
    description: 'Soluciones completas para el mantenimiento de piscinas, incluyendo bombas de alta eficiencia, filtros, calentadores y sistemas de limpieza.',
    items: [
      { name: 'Bombas eficientes', details: 'Equipos de alto rendimiento y bajo consumo' },
      { name: 'Filtros premium', details: 'Agua limpia y cristalina todo el año' },
      { name: 'Limpieza automática', details: 'Sistemas inteligentes de limpieza continua' }
    ],
    color: 'from-orange-500 to-yellow-500'
  },
  { 
    id: "plomeria-reparaciones",
    icon: Wrench, 
    title: 'Plomería y Reparaciones', 
    description: 'Servicio de plomería profesional para diagnosticar y reparar fugas, grifos, inodoros y cualquier problema en el sistema de tuberías.',
    items: [
      { name: 'Detección de fugas', details: 'Tecnología avanzada para localizar problemas' },
      { name: 'Reparaciones 24/7', details: 'Disponibilidad inmediata para emergencias' },
      { name: 'Garantía extendida', details: 'Confianza y respaldo en cada trabajo' }
    ],
    color: 'from-gray-600 to-slate-500'
  },
  { 
    id: "iluminacion-exterior",
    icon: Lightbulb, 
    title: 'Instalaciones de Iluminación', 
    description: 'Iluminación especializada para exteriores y jardines, creando ambientes acogedores y seguros con luces LED de bajo consumo.',
    items: [
      { name: 'Iluminación LED', details: 'Tecnología moderna y eficiente' },
      { name: 'Diseños modernos', details: 'Ambientes únicos y personalizados' },
      { name: 'Bajo consumo', details: 'Reduce tu factura de electricidad' }
    ],
    color: 'from-yellow-500 to-amber-400'
  },
  { 
    id: "mantenimiento-preventivo",
    icon: Handshake, 
    title: 'Mantenimiento Preventivo', 
    description: 'Planes de mantenimiento personalizados para sistemas hidráulicos y equipos, asegurando su óptimo funcionamiento y prolongando su vida útil.',
    items: [
      { name: 'Planes personalizados', details: 'Ajustados a las necesidades de tu hogar o empresa' },
      { name: 'Revisiones periódicas', details: 'Detección temprana de fallas' },
      { name: 'Vida útil extendida', details: 'Maximiza el rendimiento de tus equipos' }
    ],
    color: 'from-green-600 to-emerald-500'
  },
  { 
    id: "impermeabilizacion-azoteas",
    icon: ShieldCheck, 
    title: 'Impermeabilización de Azoteas', 
    description: 'Aplicación de productos impermeabilizantes de alta calidad para proteger tu hogar de la humedad y filtraciones.',
    items: [
      { name: 'Materiales premium', details: 'Durabilidad y resistencia garantizada' },
      { name: 'Protección total', details: 'Aislamiento contra filtraciones de agua' },
      { name: 'Garantía 5 años', details: 'Respaldo de nuestro servicio' }
    ],
    color: 'from-indigo-600 to-purple-500'
  },
  { 
    id: "sistemas-hidroneumaticos",
    icon: Zap, 
    title: 'Sistemas Hidroneumáticos', 
    description: 'Instalación y reparación de equipos hidroneumáticos para garantizar una presión de agua constante y uniforme.',
    items: [
      { name: 'Presión constante', details: 'Agua siempre disponible con la misma fuerza' },
      { name: 'Equipos eficientes', details: 'Menor consumo eléctrico y mayor durabilidad' },
      { name: 'Instalación profesional', details: 'Técnicos certificados a tu disposición' }
    ],
    color: 'from-purple-600 to-pink-500'
  },
  { 
    id: "diseno-jardines",
    icon: Sprout, 
    title: 'Diseño de Jardines', 
    description: 'Asesoría y diseño de jardines que se adaptan a tu espacio y estilo, con un enfoque en la sostenibilidad.',
    items: [
      { name: 'Diseño personalizado', details: 'Cada espacio es único y reflejará tu estilo' },
      { name: 'Plantas nativas', details: 'Mayor durabilidad y menos mantenimiento' },
      { name: 'Sostenible', details: 'Ecológico y en armonía con el entorno' }
    ],
    color: 'from-green-500 to-teal-400'
  },
  { 
    id: "cisternas-tinacos",
    icon: Leaf, 
    title: 'Cisternas y Tinacos', 
    description: 'Instalación profesional y sanitización de tanques de almacenamiento de agua, asegurando un suministro limpio y seguro.',
    items: [
      { name: 'Instalación segura', details: 'Montaje especializado para evitar fugas' },
      { name: 'Sanitización completa', details: 'Limpieza profunda certificada' },
      { name: 'Agua limpia', details: 'Garantía de suministro confiable y saludable' }
    ],
    color: 'from-teal-600 to-cyan-500'
  }
];

export const whyChooseUs = [
  {
    icon: Award,
    title: "15 Años de Experiencia",
    description: "Más de una década perfeccionando nuestros servicios"
  },
  {
    icon: Users,
    title: "500+ Clientes Satisfechos",
    description: "Una comunidad creciente que confía en nosotros"
  },
  {
    icon: Clock,
    title: "Servicio 24/7",
    description: "Disponibles cuando más nos necesitas"
  },
  {
    icon: CheckCircle,
    title: "Garantía Extendida",
    description: "Respaldamos la calidad de nuestro trabajo"
  }
];
