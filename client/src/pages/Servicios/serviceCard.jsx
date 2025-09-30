import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service, isVisible, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirige a la página de menú de servicio según el id
    navigate(`/servicios/${service.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`group glass-card rounded-3xl p-8 shadow-lg border border-slate-100 hover-lift animate-scale-in ${
        isVisible ? "visible" : ""
      }`}
      data-animate
      id={`service-${index}`}
      style={{ animationDelay: `${index * 0.1}s`, cursor: "pointer" }}
    >
      {/* Icono */}
      <div
        className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform sparkle`}
      >
        <service.icon className="w-8 h-8 text-white" />
      </div>

      {/* Título */}
      <h3 className="text-2xl font-bold text-[#1C2E82] mb-4 group-hover:text-[#ED0000] transition-colors">
        {service.title}
      </h3>

      {/* Descripción */}
      <p className="text-slate-700 leading-relaxed mb-6">{service.description}</p>

      {/* Items */}
      <ul className="space-y-2 mb-6">
        {service.items.map((item, idx) => (
          <li key={idx} className="flex items-center text-sm text-slate-600">
            <CheckCircle className="w-4 h-4 text-[#ED0000] mr-3 flex-shrink-0" />
            {item.name}
          </li>
        ))}
      </ul>

      {/* Botón */}
      <div className="w-full bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-xl flex items-center justify-center transition-all duration-300 group/btn">
        <span className="mr-2">Ver Detalles</span>
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

export default ServiceCard;
