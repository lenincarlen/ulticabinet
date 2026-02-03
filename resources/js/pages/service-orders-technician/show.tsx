import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
    ArrowLeft,
    MapPin,
    Clock,
    Calendar,
    User,
    Phone,
    CheckCircle2,
    Navigation,
} from 'lucide-react';
import type { ServiceOrder } from '../service-orders/types';
import ServiceOrderMapInfo from '../service-orders/components/ServiceOrderMapInfo';
import ServiceOrderTimeline from '../service-orders/components/ServiceOrderTimeline';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';

interface Props {
    serviceOrder: ServiceOrder;
}

export default function TechnicianOrderShow({ serviceOrder }: Props) {
    const [isMarkAttendedDialogOpen, setIsMarkAttendedDialogOpen] = useState(false);

    const markAttendedForm = useForm({
        service_notes: '',
    });

    const getStatusLabel = (status?: string) => {
        if (!status) return 'Sin estado';
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

    const getStatusBadgeVariant = (status?: string) => {
        switch (status?.toLowerCase()) {
            case 'pending':
            case 'pendiente':
                return 'outline';
            case 'scheduled':
            case 'programada':
                return 'secondary';
            case 'in_progress':
            case 'en_proceso':
                return 'default';
            case 'completed':
            case 'completada':
                return 'default';
            case 'pending_billing':
                return 'secondary';
            case 'cancelled':
            case 'cancelada':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const isDelayed =
        Boolean(serviceOrder.start || serviceOrder.desired_date) &&
        new Date(serviceOrder.start || serviceOrder.desired_date || '') < new Date() &&
        serviceOrder.status?.toLowerCase() !== 'completed' &&
        serviceOrder.status?.toLowerCase() !== 'completada';

    const isCompleted =
        serviceOrder.status?.toLowerCase() === 'completed' ||
        serviceOrder.status?.toLowerCase() === 'completada';

    const formatDate = (value?: string) =>
        value
            ? new Date(value).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
              })
            : 'No disponible';

    const formatTime = (value?: string) =>
        value
            ? new Date(value).toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
              })
            : '';

    const handleMarkAsAttended = () => {
        const existingNotes = serviceOrder.service_notes;
        let notesText = '';
        if (existingNotes && typeof existingNotes === 'object') {
            notesText = existingNotes.description || existingNotes.notes || '';
        } else if (typeof existingNotes === 'string') {
            notesText = existingNotes;
        }
        markAttendedForm.setData({
            service_notes: notesText,
        });
        setIsMarkAttendedDialogOpen(true);
    };

    const handleSubmitMarkAttended = () => {
        markAttendedForm.post(`/service-orders/${serviceOrder.id}/mark-attended`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsMarkAttendedDialogOpen(false);
                markAttendedForm.reset();
                router.reload();
            },
        });
    };

    const openInMaps = () => {
        const address = serviceOrder.customer?.address || serviceOrder.customer_address || '';
        const lat = serviceOrder.latitude;
        const lng = serviceOrder.longitude;

        if (lat && lng) {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
        } else if (address) {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, '_blank');
        }
    };

    return (
        <AppLayout>
            <Head title={`Orden ${serviceOrder.service_order_number || serviceOrder.id.slice(0, 8)}`} />
            <div className="min-h-screen bg-background">
                <div className="flex flex-col lg:flex-row gap-4 p-4 lg:p-6">
                    {/* Panel izquierdo - Información */}
                    <div className="w-full lg:max-w-[40%] space-y-4">
                        {/* Header */}
                        <div className="flex items-center justify-between gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => router.visit('/service-orders-technician')}
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Volver
                            </Button>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant={getStatusBadgeVariant(serviceOrder.status)}>
                                    {getStatusLabel(serviceOrder.status)}
                                </Badge>
                                {isDelayed && (
                                    <Badge variant="destructive">Retraso</Badge>
                                )}
                            </div>
                        </div>

                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold">
                                {serviceOrder.service_order_number || `#${serviceOrder.id.slice(0, 8)}`}
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Creada {formatDate(serviceOrder.created_at)}
                            </p>
                        </div>

                        {/* Botón de acción */}
                        {(serviceOrder.status?.toLowerCase() === 'scheduled' ||
                            serviceOrder.status?.toLowerCase() === 'programada') &&
                            !isCompleted && (
                                <Button
                                    onClick={handleMarkAsAttended}
                                    className="w-full"
                                    size="lg"
                                >
                                    <CheckCircle2 className="h-5 w-5 mr-2" />
                                    Marcar como Atendida
                                </Button>
                            )}

                        {/* Información del Cliente */}
                        <Card className="p-4 space-y-4">
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <h2 className="text-lg font-semibold">Cliente</h2>
                            </div>
                            <div className="space-y-3 pl-7">
                                <div>
                                    <p className="text-sm text-muted-foreground">Nombre</p>
                                    <p className="text-base font-semibold">
                                        {serviceOrder.customer?.name || serviceOrder.customer_name || 'Sin nombre'}
                                    </p>
                                </div>

                                {(serviceOrder.customer?.phone || serviceOrder.customer_phone) && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">Teléfono</p>
                                        <a
                                            href={`tel:${serviceOrder.customer?.phone || serviceOrder.customer_phone}`}
                                            className="flex items-center gap-2 text-primary hover:underline"
                                        >
                                            <Phone className="h-4 w-4" />
                                            <span className="font-medium">
                                                {serviceOrder.customer?.phone || serviceOrder.customer_phone}
                                            </span>
                                        </a>
                                    </div>
                                )}

                                {serviceOrder.customer?.email || serviceOrder.customer_email ? (
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <a
                                            href={`mailto:${serviceOrder.customer?.email || serviceOrder.customer_email}`}
                                            className="text-primary hover:underline"
                                        >
                                            {serviceOrder.customer?.email || serviceOrder.customer_email}
                                        </a>
                                    </div>
                                ) : null}

                                {serviceOrder.appliance_type && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">Tipo de Aparato</p>
                                        <p className="font-medium">{serviceOrder.appliance_type}</p>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Dirección */}
                        {(serviceOrder.customer?.address || serviceOrder.customer_address) && (
                            <Card className="p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <MapPin className="h-5 w-5 text-muted-foreground" />
                                    <h2 className="text-lg font-semibold">Dirección</h2>
                                </div>
                                <p className="text-sm leading-relaxed pl-7">
                                    {serviceOrder.customer?.address || serviceOrder.customer_address}
                                </p>
                                <Button
                                    onClick={openInMaps}
                                    variant="outline"
                                    size="sm"
                                    className="mt-3 w-full"
                                >
                                    <Navigation className="h-4 w-4 mr-2" />
                                    Abrir en Google Maps
                                </Button>
                            </Card>
                        )}

                        {/* Descripción del Problema */}
                        {serviceOrder.issue_description && (
                            <Card className="p-4 bg-amber-50 border-amber-200">
                                <h2 className="text-lg font-semibold mb-3 text-amber-900">
                                    Problema Reportado
                                </h2>
                                <p className="text-sm leading-relaxed text-amber-950">
                                    {serviceOrder.issue_description}
                                </p>
                            </Card>
                        )}

                        {/* Información de la Cita */}
                        {(serviceOrder.start || serviceOrder.desired_date) && (
                            <Card className="p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                    <h2 className="text-lg font-semibold">Fecha Programada</h2>
                                </div>
                                <div className="space-y-2 pl-7">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">
                                            {formatDate(serviceOrder.start || serviceOrder.desired_date || serviceOrder.created_at)}
                                        </span>
                                    </div>
                                    {(serviceOrder.start || serviceOrder.desired_time) && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">
                                                {formatTime(serviceOrder.start) || serviceOrder.desired_time || 'No especificada'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        )}

                        {/* Notas del Servicio */}
                        {serviceOrder.service_notes && (
                            <Card className="p-4">
                                <h2 className="text-lg font-semibold mb-3">Notas del Servicio</h2>
                                <div className="text-sm text-muted-foreground">
                                    {typeof serviceOrder.service_notes === 'object' ? (
                                        <div className="space-y-2">
                                            {serviceOrder.service_notes.description && (
                                                <p className="leading-relaxed">
                                                    {serviceOrder.service_notes.description}
                                                </p>
                                            )}
                                            {serviceOrder.service_notes.notes && (
                                                <p className="leading-relaxed">
                                                    {serviceOrder.service_notes.notes}
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="leading-relaxed">{serviceOrder.service_notes}</p>
                                    )}
                                </div>
                            </Card>
                        )}

                        {/* Timeline */}
                        <Card className="p-4">
                            <h2 className="text-lg font-semibold mb-3">Historial</h2>
                            <ServiceOrderTimeline serviceOrder={serviceOrder} />
                        </Card>
                    </div>

                    {/* Panel derecho - Mapa */}
                    <div className="flex-1">
                        <Card className="h-full">
                            <ServiceOrderMapInfo serviceOrder={serviceOrder} />
                        </Card>
                    </div>
                </div>
            </div>

            {/* Dialog para marcar como atendida */}
            <Dialog open={isMarkAttendedDialogOpen} onOpenChange={setIsMarkAttendedDialogOpen}>
                <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold">Marcar como Atendida</DialogTitle>
                        <DialogDescription className="text-sm">
                            Describe el trabajo realizado y las piezas necesarias
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="service_notes" className="text-sm font-semibold">
                                Descripción del Trabajo *
                            </Label>
                            <Textarea
                                id="service_notes"
                                value={markAttendedForm.data.service_notes}
                                onChange={(e) => markAttendedForm.setData('service_notes', e.target.value)}
                                placeholder="Ejemplo: Limpieza de filtro, cambio de compresor modelo XYZ, 2 unidades de gas refrigerante..."
                                rows={6}
                                className="text-sm resize-none"
                                required
                            />
                            <p className="text-xs text-muted-foreground">
                                Incluye todos los detalles del trabajo y las piezas utilizadas
                            </p>
                            <InputError message={markAttendedForm.errors.service_notes} />
                        </div>
                    </div>
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsMarkAttendedDialogOpen(false)}
                            className="w-full sm:w-auto h-11"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSubmitMarkAttended}
                            disabled={markAttendedForm.processing || !markAttendedForm.data.service_notes.trim()}
                            className="w-full sm:w-auto h-11"
                        >
                            {markAttendedForm.processing ? 'Guardando...' : 'Confirmar'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}