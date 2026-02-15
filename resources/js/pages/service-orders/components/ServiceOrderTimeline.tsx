
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { ServiceOrder } from '../types';

interface Props {
    serviceOrder: ServiceOrder;
}

export default function ServiceOrderTimeline({ serviceOrder }: Props) {
    const history = serviceOrder.status_history || [];

    if (history.length === 0) {
        return (
            <div className="text-sm text-gray-500 italic">
                No hay historial disponible.
            </div>
        );
    }

    const getStatusLabel = (status: string) => {
        const statusMap: Record<string, string> = {
            pending: 'Orden Creada',
            pendiente: 'Orden Creada',
            technician_assigned: 'Técnico Asignado',
            scheduled: 'Agendada',
            programada: 'Agendada',
            in_progress: 'En Proceso',
            en_proceso: 'En Proceso',
            completed: 'Completada',
            completada: 'Completada',
            pending_billing: 'Pendiente Facturación',
            cancelled: 'Cancelada',
            cancelada: 'Cancelada',
        };
        return statusMap[status.toLowerCase()] || status;
    };

    return (
        <div className="relative border-l border-gray-200 ml-3 space-y-6">
            {history.map((item, index) => (
                <div key={item.id || index} className="mb-6 ml-4">
                    <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-gray-200 border-2 border-white ring-1 ring-gray-200" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                        <time className="text-xs font-normal text-gray-400">
                            {format(new Date(item.created_at), "d MMM yyyy, HH:mm", { locale: es })}
                        </time>
                        <Badge variant="outline" className="w-fit text-xs font-normal">
                            {getStatusLabel(item.status)}
                        </Badge>
                    </div>
                    {item.notes && (
                        <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded">
                            {item.notes}
                        </p>
                    )}
                    {item.user && (
                        <p className="text-xs text-gray-400 mt-1">
                            Por: {item.user.name}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
