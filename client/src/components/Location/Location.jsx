import 'leaflet/dist/leaflet.css'; // ¡IMPORTANTE! Añadir el CSS de Leaflet aquí
import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { MapPin, Phone, Mail, Navigation } from "lucide-react";

// Ícono custom de Leaflet
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Location = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [cityName, setCityName] = useState("tu ubicación");
  const [closestStore, setClosestStore] = useState(null);

  // Datos de las sucursales
  const stores = [
    {
      name: "Matriz Playa del Carmen",
      coords: { lat: 20.633370, lng: -87.081880 },
      address:
        "Avenida Juarez No. Ext 7 entre calle 55 y 60 Norte, Colonia Ejido, Playa del Carmen, Quintana Roo. C.P. 77710",
      phone: "9841475861",
    },
    {
      name: "Sucursal Mérida",
      coords: { lat: 20.918226, lng: -89.683174 },
      address:
        "Calle 26a entre 47 y 51, Colonia El Roble, Ciudad Industrial, Mérida, Yucatán. C.P. 97256",
      phone: "9995894846",
    },
    {
      name: "Sucursal Tulum",
      coords: { lat: 20.214077, lng: -87.460640 },
      address:
        "Avenida Tulum, Local 1, Zona 1, Tulum Centro. C.P. 77780",
      phone: "9842317732",
    },
  ];

  const generalPhone = "9993632630";
  const generalEmail = "ventas@flucsa.com.mx";

  // Calcular distancia entre 2 puntos geográficos
  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // Obtener ubicación aproximada (sin API key)
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setUserLocation({ lat: data.latitude, lng: data.longitude });
        setCityName(data.city || "tu zona");
      })
      .catch(() => console.log("No se pudo obtener ubicación aproximada"));
  }, []);

  // Determinar sucursal más cercana
  useEffect(() => {
    if (!userLocation) return;

    let nearest = null;
    let minDist = Infinity;

    stores.forEach((store) => {
      const d = haversine(
        userLocation.lat,
        userLocation.lng,
        store.coords.lat,
        store.coords.lng
      );
      if (d < minDist) {
        minDist = d;
        nearest = store;
      }
    });

    setClosestStore(nearest);
  }, [userLocation, stores]); // Añadida dependencia 'stores'

  const mapCenter = useMemo(() => {
    if (closestStore) return closestStore.coords;
    return { lat: 20.918226, lng: -89.683174 }; // Mérida default
  }, [closestStore]);

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          Nuestra Ubicación
        </h2>
        <p className="text-gray-600 mb-6">
          {closestStore
            ? `Estás viendo resultados cerca de ${cityName}. Sucursal más cercana: ${closestStore.name}.`
            : "Buscando tu sucursal más cercana..."}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Mapa dinámico */}
          <div>
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 shadow-sm h-full">
              <MapContainer
                center={mapCenter}
                zoom={10}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' // Añadir atribución es una buena práctica
                />

                {/* Ubicación del usuario */}
                {userLocation && (
                  <Marker position={userLocation} icon={defaultIcon}>
                    <Popup>Tu ubicación aproximada</Popup>
                  </Marker>
                )}

                {/* Sucursal más cercana */}
                {closestStore && (
                  <Marker position={closestStore.coords} icon={defaultIcon}>
                    <Popup>{closestStore.name}</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          </div>

          {/* Información dinámica */}
          <div className="space-y-6">

            {/* Dirección */}
            {closestStore && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase text-gray-800">
                    Dirección
                  </h3>
                  <p className="text-gray-600">{closestStore.address}</p>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200" />

            {/* Teléfono dinámico */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase text-gray-800">
                  Teléfono
                </h3>
                <a
                  href={`tel:${closestStore?.phone || generalPhone}`}
                  className="text-gray-600 hover:text-green-600"
                >
                  {closestStore?.phone || generalPhone}
                </a>
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase text-gray-800">
                  Email
                </h3>
                <a
                  href={`mailto:${generalEmail}`}
                  className="text-gray-600 hover:text-purple-600"
                >
                  {generalEmail}
                </a>
              </div>
            </div>

            {/* Botón Cómo llegar */}
            {closestStore && (
              <a
                // Enlace corregido para Google Maps
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  closestStore.address
                )}&travelmode=driving`}
                target="_blank"
                rel="noopener noreferrer" // Buena práctica para target="_blank"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
              >
                <Navigation className="w-4 h-4" />
                Cómo llegar
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;