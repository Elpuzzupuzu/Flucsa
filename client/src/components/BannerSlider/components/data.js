// data.js
import { Droplet, Gauge, Wrench } from "lucide-react";
import pipes from "../../../assets/images/pipes.jpg";
import pvc from  "../../../assets/images/pvc.jpg";
import bomb from  "../../../assets/images/bombita.jpg";

export const slidesData = [
  {
    id: 1,
    image: pipes,
    category: "Sistemas de Flujo Premium",
    title: "Válvulas y Bombas",
    subtitle: "de Alto Rendimiento",
    description:
      "Componentes hidráulicos de precisión para un control y caudal óptimos en cualquier aplicación.",
    cta: "Ver Hidráulicos",
    icon: Droplet,
  },
  {
    id: 2,
    image: pvc,
    category: "Infraestructura Duradera",
    title: "Tubería PVC y CPVC",
    subtitle: "Industrial y Residencial",
    description:
      "Soluciones resistentes a la corrosión, ideales para instalaciones de agua, drenaje y conducción de fluidos.",
    cta: "Explorar Tubería",
    icon: Gauge,
  },
  {
    id: 3,
    image: bomb,
    category: "Conexiones y Herramientas",
    title: "Todo lo que Necesitas",
    subtitle: "para tu Instalación",
    description:
      "Bridas, codos, adaptadores y herramientas profesionales para garantizar un sellado perfecto y seguro.",
    cta: "Comprar Conexiones",
    icon: Wrench,
  },
];