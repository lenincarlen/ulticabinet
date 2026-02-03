import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface OrderMapProps {
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  options?: google.maps.MapOptions;
}

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 18.4861, // Santo Domingo, República Dominicana
  lng: -69.9312,
};

const defaultOptions = {
  zoomControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  panControl: false,
  rotateControl: false,
  scaleControl: false,
  disableDefaultUI: true,
  keyboardShortcuts: false,
  gestureHandling: 'cooperative',
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ visibility: "off" }],
    },
  ],
};

export default function OrderMap({ address, latitude, longitude, options }: OrderMapProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(defaultCenter);
  const [zoom, setZoom] = useState(14);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey || "",
    libraries: libraries as any,
    version: "weekly",
  });

  useEffect(() => {
    if (scriptLoaded && typeof window !== 'undefined' && window.google && window.google.maps) {
      setIsLoaded(true);
      setGeocoder(new window.google.maps.Geocoder());
    }
  }, [scriptLoaded]);

  useEffect(() => {
    // Si hay coordenadas directas, usarlas primero (más preciso)
    if (latitude && longitude) {
      const newCenter = {
        lat: latitude,
        lng: longitude,
      };
      setCenter(newCenter);
      setMarkerPosition(newCenter);
      setZoom(15);
      return;
    }

    // Si no hay coordenadas pero hay dirección, geocodificar
    if (!isLoaded || !geocoder || !address) {
      return;
    }

    geocoder.geocode(
      { address: address },
      (results, status) => {
        if (status === "OK" && results && results[0]) {
          const location = results[0].geometry.location;
          const newCenter = {
            lat: location.lat(),
            lng: location.lng(),
          };
          setCenter(newCenter);
          setMarkerPosition(newCenter);
          setZoom(15);
        } else {
          console.error("Geocoding failed:", status);
        }
      }
    );
  }, [isLoaded, geocoder, address, latitude, longitude]);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    
    // Ocultar controles y logo de Google Maps después de cargar
    setTimeout(() => {
      const style = document.createElement('style');
      style.id = 'hide-google-maps-logo';
      style.textContent = `
        .gm-style-cc,
        .gm-style-mtc,
        .gm-bundled-control,
        .gm-fullscreen-control,
        .gm-svpc,
        .gm-style-cc div,
        a[href^="https://maps.google.com/maps"],
        a[href^="http://maps.google.com/maps"],
        .gm-ui-hover-effect,
        .gm-style a[href^="https://maps.google.com/maps"],
        .gm-style a[href^="http://maps.google.com/maps"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          width: 0 !important;
          height: 0 !important;
        }
      `;
      if (!document.getElementById('hide-google-maps-logo')) {
        document.head.appendChild(style);
      }
    }, 100);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
        <div className="text-center p-4">
          <p className="text-red-600 font-semibold text-sm">Error de configuración</p>
          <p className="text-xs text-gray-600 mt-2">
            Google Maps API key no configurada
          </p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
        <div className="text-center p-4">
          <p className="text-red-600 font-semibold text-sm">Error al cargar mapa</p>
          <p className="text-xs text-gray-600 mt-2">{loadError.message}</p>
        </div>
      </div>
    );
  }

  if (!scriptLoaded || !isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-600 mt-2 text-sm">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  const mapOptions = options || defaultOptions;

  return (
    <div className="relative w-full h-full" style={{ overflow: 'hidden' }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            title={address || "Ubicación del cliente"}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
          />
        )}
      </GoogleMap>
      {/* Ocultar controles y logo de Google Maps */}
      <style>{`
        .gm-style-cc,
        .gm-style-mtc,
        .gm-bundled-control,
        .gm-fullscreen-control,
        .gm-svpc,
        .gm-style-cc div,
        a[href^="https://maps.google.com/maps"],
        a[href^="http://maps.google.com/maps"],
        .gm-ui-hover-effect {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
        div[style*="position: absolute"][style*="left: 0"][style*="bottom: 0"] {
          display: none !important;
        }
      `}</style>
    </div>
  );
}

