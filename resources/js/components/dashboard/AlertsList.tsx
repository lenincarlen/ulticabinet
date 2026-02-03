import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package, FileText, Calendar } from 'lucide-react';

interface Alert {
    unassigned_orders: number;
    low_stock_products: Array<{ name: string; stock: number; min: number }>;
    overdue_invoices: number;
    upcoming_appointments: Array<{ time: string; customer: string; service: string; date: string }>;
}

interface AlertsListProps {
    alerts: Alert | null;
}

export default function AlertsList({ alerts }: AlertsListProps) {
    if (!alerts) {
        return (
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Alertas y Notificaciones</h3>
                <p className="text-sm text-muted-foreground">Cargando alertas...</p>
            </Card>
        );
    }

    const hasAlerts =
        alerts.unassigned_orders > 0 ||
        alerts.low_stock_products.length > 0 ||
        alerts.overdue_invoices > 0 ||
        alerts.upcoming_appointments.length > 0;

    return (
        <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Alertas y Notificaciones</h3>

            {!hasAlerts ? (
                <div className="text-center py-8 text-muted-foreground">
                    <p>No hay alertas en este momento</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Órdenes sin asignar */}
                    {alerts.unassigned_orders > 0 && (
                        <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <Package className="w-5 h-5 text-orange-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="font-medium text-orange-900">
                                    {alerts.unassigned_orders} {alerts.unassigned_orders === 1 ? 'orden' : 'órdenes'} sin asignar
                                </p>
                                <p className="text-sm text-orange-700">
                                    Asigna un técnico para continuar
                                </p>
                            </div>
                            <Badge variant="secondary">{alerts.unassigned_orders}</Badge>
                        </div>
                    )}

                    {/* Stock bajo */}
                    {alerts.low_stock_products.length > 0 && (
                        <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="font-medium text-red-900">
                                    {alerts.low_stock_products.length} {alerts.low_stock_products.length === 1 ? 'producto' : 'productos'} con stock bajo
                                </p>
                                <ul className="text-sm text-red-700 mt-1 space-y-1">
                                    {alerts.low_stock_products.slice(0, 3).map((product, index) => (
                                        <li key={index}>
                                            • {product.name}: {product.stock} (mín: {product.min})
                                        </li>
                                    ))}
                                    {alerts.low_stock_products.length > 3 && (
                                        <li className="text-xs">
                                            + {alerts.low_stock_products.length - 3} más
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Facturas vencidas */}
                    {alerts.overdue_invoices > 0 && (
                        <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <FileText className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="font-medium text-yellow-900">
                                    {alerts.overdue_invoices} {alerts.overdue_invoices === 1 ? 'factura vencida' : 'facturas vencidas'}
                                </p>
                                <p className="text-sm text-yellow-700">
                                    Requieren seguimiento de pago
                                </p>
                            </div>
                            <Badge variant="secondary">{alerts.overdue_invoices}</Badge>
                        </div>
                    )}

                    {/* Citas próximas */}
                    {alerts.upcoming_appointments.length > 0 && (
                        <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="font-medium text-blue-900">
                                    {alerts.upcoming_appointments.length} {alerts.upcoming_appointments.length === 1 ? 'cita próxima' : 'citas próximas'}
                                </p>
                                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                                    {alerts.upcoming_appointments.slice(0, 3).map((apt, index) => (
                                        <li key={index}>
                                            • {apt.date} {apt.time} - {apt.customer}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
}
