
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceOrder {
    latitude?: number;
    longitude?: number;
    customer?: {
        address?: string;
    };
    customer_address?: string;
}

interface Props {
    serviceOrder: ServiceOrder;
}

export default function ServiceOrderMapInfo({ serviceOrder }: Props) {
    const address = serviceOrder.customer?.address || serviceOrder.customer_address || '';
    const lat = serviceOrder.latitude;
    const lng = serviceOrder.longitude;

    const openInMaps = () => {
        if (lat && lng) {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
        } else if (address) {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, '_blank');
        }
    };

    return (
        <div className="h-full flex flex-col">
            <CardHeader className="pb-3 border-b border-gray-100">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    Ubicación del Servicio
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative min-h-[300px] bg-gray-100 flex items-center justify-center">
                {/* Placeholder map or integration if API key available */}
                <div className="text-center p-6">
                    <div className="bg-white p-4 rounded-full shadow-sm inline-flex mb-4">
                        <MapPin className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="font-medium text-gray-900 mb-1">
                        {address || 'Dirección no disponible'}
                    </p>
                    {(lat && lng) && (
                        <p className="text-xs text-gray-500 mb-4">
                            Lat: {lat}, Lng: {lng}
                        </p>
                    )}
                    <Button onClick={openInMaps} className="mt-4">
                        <Navigation className="h-4 w-4 mr-2" />
                        Navegar con Google Maps
                    </Button>
                </div>
            </CardContent>
        </div>
    );
}
