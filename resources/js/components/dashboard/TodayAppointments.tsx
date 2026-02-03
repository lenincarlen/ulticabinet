import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, User } from 'lucide-react';

interface Appointment {
    id: string;
    time: string;
    customer: string;
    service: string;
    technician: string;
    status: string;
    address?: string;
}

interface TodayAppointmentsProps {
    appointments: Appointment[];
}

const statusColors: Record<string, string> = {
    scheduled: 'bg-blue-100 text-blue-800',
    programada: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-green-100 text-green-800',
    en_proceso: 'bg-green-100 text-green-800',
};

const statusLabels: Record<string, string> = {
    scheduled: 'Programada',
    programada: 'Programada',
    in_progress: 'En Proceso',
    en_proceso: 'En Proceso',
};

export default function TodayAppointments({ appointments }: TodayAppointmentsProps) {
    return (
        <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Citas de Hoy</h3>

            {appointments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                    <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No hay citas programadas para hoy</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {appointments.map((apt) => (
                        <div
                            key={apt.id}
                            className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                        <span className="font-semibold">{apt.time}</span>
                                        <Badge className={statusColors[apt.status] || 'bg-gray-100 text-gray-800'}>
                                            {statusLabels[apt.status] || apt.status}
                                        </Badge>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm">
                                        <User className="w-4 h-4 text-muted-foreground" />
                                        <span className="font-medium">{apt.customer}</span>
                                    </div>

                                    <p className="text-sm text-muted-foreground">
                                        {apt.service}
                                    </p>

                                    {apt.address && (
                                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                            <span className="line-clamp-1">{apt.address}</span>
                                        </div>
                                    )}

                                    <div className="text-sm">
                                        <span className="text-muted-foreground">Técnico: </span>
                                        <span className="font-medium">{apt.technician}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}
