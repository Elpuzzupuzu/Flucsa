import { 
  Lightbulb, Wrench, Sprout, Leaf, Sun, Droplet, 
  Users, Zap, ShieldCheck, Handshake, CheckCircle, Award, Clock 
} from "lucide-react";

import riegoImg from '../../assets/serviceimages/riego.jpg'; // Importa la imagen al inicio del archivo
import sensorImg from '../../assets/serviceimages/sensore.jpg'; // Importa la imagen al inicio del archivo
import ahorroagua from '../../assets/serviceimages/ahorro.jpg'; // Importa la imagen al inicio del archivo
import alberca1 from '../../assets/serviceimages/alberca1.jpg'; // Importa la imagen al inicio del archivo
import alberca2 from '../../assets/serviceimages/alberca2.jpg'; // Importa la imagen al inicio del archivo
import alberca3 from '../../assets/serviceimages/alberca3.jpg'; // Importa la imagen al inicio del archivo
import pipe1 from '../../assets/serviceimages/pipe1.jpg'; // Importa la imagen al inicio del archivo
import pipe2 from '../../assets/serviceimages/pipe2.jpg'; // Importa la imagen al inicio del archivo
import pipe3 from '../../assets/serviceimages/pipe3.jpg'; // Importa la imagen al inicio del archivo






export const services = [
  { 
    id: "sistemas-riego",
    icon: Droplet, 
    title: 'Sistemas de Riego Residencial', 
    description: 'Diseño e instalación de sistemas de riego automáticos que optimizan el consumo de agua, garantizando jardines y áreas verdes saludables.',
    items: [
      { 
        name: 'Riego automatizado', 
        details: 'Control inteligente y programable por zonas para eficiencia máxima.',
        image: riegoImg // Usa la variable importada aquí
      },
      { 
        name: 'Sensores de humedad', 
        details: 'Ajustes en tiempo real para evitar desperdicio de agua.',
        image: sensorImg
      },
      { 
        name: 'Ahorro hasta 40% de agua', 
        details: 'Optimización de recursos sin comprometer la salud de tus plantas.',
        image: ahorroagua
      }
    ],
    color: 'from-blue-600 to-cyan-500'
  },
  { 
    id: "equipos-piscinas",
    icon: Sun, 
    title: 'Equipos para Piscinas', 
    description: 'Proveemos soluciones completas para mantener tu piscina en perfectas condiciones durante todo el año.',
    items: [
      { 
        name: 'Bombas eficientes', 
        details: 'Máximo rendimiento con bajo consumo energético.',
        image: alberca1
      },
      { 
        name: 'Filtros premium', 
        details: 'Agua cristalina y libre de impurezas constantemente.',
        image: alberca2

      },
      { 
        name: 'Limpieza automática', 
        details: 'Sistemas inteligentes que mantienen la piscina limpia sin esfuerzo.',
        image: alberca3
      }
    ],
    color: 'from-orange-500 to-yellow-500'
  },
  { 
    id: "plomeria-reparaciones",
    icon: Wrench, 
    title: 'Plomería y Reparaciones', 
    description: 'Servicios profesionales para cualquier problema hidráulico, garantizando funcionamiento seguro y confiable.',
    items: [
      { 
        name: 'Detección de fugas', 
        details: 'Localización precisa para reparación rápida y eficaz.',
        image: pipe1
      },
      { 
        name: 'Reparaciones', 
        details: 'Atención inmediata para emergencias en cualquier momento.',
        image: pipe2
      },
      { 
        name: 'Garantía extendida', 
        details: 'Confianza total en cada servicio realizado.',
        image: pipe3
      }
    ],
    color: 'from-gray-600 to-slate-500'
  },
  { 
    id: "iluminacion-exterior",
    icon: Lightbulb, 
    title: 'Instalaciones de Iluminación', 
    description: 'Creamos ambientes seguros y acogedores con sistemas de iluminación modernos y eficientes.',
    items: [
      { 
        name: 'Iluminación LED', 
        details: 'Eficiente y de bajo consumo, con larga duración.',
        image: '/images/iluminacion/led.jpg'
      },
      { 
        name: 'Diseños modernos', 
        details: 'Estética innovadora que realza tus espacios.',
        image: '/images/iluminacion/diseños.jpg'
      },
      { 
        name: 'Bajo consumo', 
        details: 'Ahorro energético sin sacrificar luminosidad.',
        image: '/images/iluminacion/ahorro.jpg'
      }
    ],
    color: 'from-yellow-500 to-amber-400'
  },
  { 
    id: "mantenimiento-preventivo",
    icon: Handshake, 
    title: 'Mantenimiento Preventivo', 
    description: 'Planes adaptados a tus necesidades para prolongar la vida útil de tus equipos y sistemas.',
    items: [
      { 
        name: 'Planes personalizados', 
        details: 'Diseñados según el tipo y uso de tus instalaciones.',
        image: '/images/mantenimiento/planes.jpg'
      },
      { 
        name: 'Revisiones periódicas', 
        details: 'Detección temprana de fallas antes de convertirse en problemas.',
        image: '/images/mantenimiento/revisiones.jpg'
      },
      { 
        name: 'Vida útil extendida', 
        details: 'Mayor durabilidad y funcionamiento óptimo de tus sistemas.',
        image: '/images/mantenimiento/durabilidad.jpg'
      }
    ],
    color: 'from-green-600 to-emerald-500'
  },
  { 
    id: "impermeabilizacion-azoteas",
    icon: ShieldCheck, 
    title: 'Impermeabilización de Azoteas', 
    description: 'Protege tu hogar de filtraciones y humedad con materiales de alta calidad y garantía comprobada.',
    items: [
      { 
        name: 'Materiales premium', 
        details: 'Productos resistentes y duraderos.',
        image: '/images/impermeabilizacion/materiales.jpg'
      },
      { 
        name: 'Protección total', 
        details: 'Aislamiento completo contra filtraciones de agua.',
        image: '/images/impermeabilizacion/proteccion.jpg'
      },
      { 
        name: 'Garantía 5 años', 
        details: 'Respaldo confiable de nuestro servicio profesional.',
        image: '/images/impermeabilizacion/garantia.jpg'
      }
    ],
    color: 'from-indigo-600 to-purple-500'
  },
  { 
    id: "sistemas-hidroneumaticos",
    icon: Zap, 
    title: 'Sistemas Hidroneumáticos', 
    description: 'Instalación y mantenimiento de sistemas que garantizan presión constante y eficiente en toda tu red de agua.',
    items: [
      { 
        name: 'Presión constante', 
        details: 'Distribución uniforme del agua en toda la instalación.',
        image: '/images/hidroneumaticos/presion.jpg'
      },
      { 
        name: 'Equipos eficientes', 
        details: 'Menor consumo eléctrico con máximo rendimiento.',
        image: '/images/hidroneumaticos/equipos.jpg'
      },
      { 
        name: 'Instalación profesional', 
        details: 'Técnicos certificados para asegurar funcionamiento óptimo.',
        image: '/images/hidroneumaticos/instalacion.jpg'
      }
    ],
    color: 'from-purple-600 to-pink-500'
  },
  { 
    id: "diseno-jardines",
    icon: Sprout, 
    title: 'Diseño de Jardines', 
    description: 'Transformamos tu espacio exterior en un entorno estético, funcional y sostenible.',
    items: [
      { 
        name: 'Diseño personalizado', 
        details: 'Jardines únicos adaptados a tu estilo y espacio.',
        image: '/images/jardines/diseño.jpg'
      },
      { 
        name: 'Plantas nativas', 
        details: 'Bajo mantenimiento y mayor adaptación al clima local.',
        image: '/images/jardines/plantas.jpg'
      },
      { 
        name: 'Sostenible', 
        details: 'Prácticas ecológicas que promueven la conservación del medio ambiente.',
        image: '/images/jardines/sostenible.jpg'
      }
    ],
    color: 'from-green-500 to-teal-400'
  },
  { 
    id: "cisternas-tinacos",
    icon: Leaf, 
    title: 'Cisternas y Tinacos', 
    description: 'Instalación y sanitización de tanques de agua asegurando calidad y seguridad en el suministro.',
    items: [
      { 
        name: 'Instalación segura', 
        details: 'Montaje profesional para evitar fugas y problemas.',
        image: '/images/cisternas/instalacion.jpg'
      },
      { 
        name: 'Sanitización completa', 
        details: 'Limpieza profunda certificada para agua potable.',
        image: '/images/cisternas/sanitizacion.jpg'
      },
      { 
        name: 'Agua limpia', 
        details: 'Garantía de suministro confiable y saludable para tu familia.',
        image: '/images/cisternas/agua-limpia.jpg'
      }
    ],
    color: 'from-teal-600 to-cyan-500'
  }
];

export const whyChooseUs = [
  {
    icon: Award,
    title: "15 Años de Experiencia",
    description: "Más de una década perfeccionando nuestros servicios con innovación y calidad."
  },
  {
    icon: Users,
    title: "Satisfacción al cliete",
    description: "Una comunidad creciente que confía en nuestro compromiso y profesionalismo."
  },
  {
    icon: Clock,
    title: "Servicio eficiente",
    description: "Disponibles cuando más nos necesitas, atención rápida y confiable."
  },
  {
    icon: CheckCircle,
    title: "Garantía",
    description: "Respaldamos cada trabajo para ofrecer seguridad y confianza a nuestros clientes."
  }
];