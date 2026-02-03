import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { isAdmin } from '@/lib/roles';
import type { SharedData } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Receipt,
    Search,
    CheckCircle2,
    Clock,
    XCircle,
    Eye,
    FileText,
    User,
    Calendar,
    DollarSign,
    AlertTriangle,
    Plus
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface Invoice {
    id: string;
    invoice_number: string;
    date: string;
    status: 'pending' | 'paid' | 'cancelled';
    total: number;
    paid_amount: number;
    service_order_id?: string; // ID directo de la orden
    customer?: {
        id: string;
        name: string;
        phone?: string;
        email?: string;
    };
    billedBy?: {
        id: number;
        name: string;
        email: string;
    };
    serviceOrder?: {
        id: string;
        service_order_number?: string;
        status: string;
        assignedTo?: {
            id: string;
            name: string;
        };
        attendedBy?: {
            id: string;
            name: string;
        };
    };
    items?: Array<{
        id: string;
        type: string;
        description: string;
        quantity: number;
        sell_price: number;
    }>;
}

interface PendingBillingOrder {
    id: string;
    service_order_number?: string;
    status: string;
    final_cost?: number;
    is_checkup_only?: boolean;
    customer?: {
        id: string;
        name: string;
        phone?: string;
    };
    assignedTo?: {
        id: string;
        name: string;
    };
    attendedBy?: {
        id: string;
        name: string;
    };
    parts?: Array<{
        id: string;
        part_name: string;
        quantity: number;
        unit_price?: number;
    }>;
}

interface InvoicesIndexProps {
    invoices: {
        data: Invoice[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    pendingBillingOrders: PendingBillingOrder[];
    operatorReviewOrders?: PendingBillingOrder[];
    filters: {
        status?: string;
    };
}

export default function InvoicesIndex({
    invoices,
    pendingBillingOrders,
    operatorReviewOrders = [],
    filters: initialFilters
}: InvoicesIndexProps) {
    const { auth } = usePage<SharedData>().props;
    const userRoles = auth.user?.roles || [];
    const canMarkAsPaid = isAdmin(userRoles);

    const [statusFilter, setStatusFilter] = useState(initialFilters.status || 'all');
    const [typeFilter, setTypeFilter] = useState<'all' | 'service' | 'pos'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
    const [isEditConfirmDialogOpen, setIsEditConfirmDialogOpen] = useState(false);
    const [invoiceToEdit, setInvoiceToEdit] = useState<Invoice | null>(null);

    const formatPrice = (price: number | null | undefined): string => {
        if (price === null || price === undefined) return 'RD$ 0.00';
        return `RD$ ${parseFloat(String(price)).toFixed(2)}`;
    };

    const formatDate = (date: string | null | undefined): string => {
        if (!date) return 'N/A';
        try {
            return new Date(date).toLocaleDateString('es-DO', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        } catch {
            return date;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return <Badge className="bg-green-500">Pagada</Badge>;
            case 'pending':
                return <Badge variant="secondary">Pendiente</Badge>;
            case 'cancelled':
                return <Badge variant="destructive">Cancelada</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const handleViewInvoice = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setIsDetailDialogOpen(true);
    };

    const handleCloseOrder = (orderId: string) => {
        if (confirm('¿Estás seguro de cerrar esta orden? Esta acción no se puede deshacer.')) {
            router.post(`/service-orders/${orderId}/close-order`, {}, {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload();
                },
            });
        }
    };

    const handleMarkAsPaid = (invoiceId: string) => {
        if (confirm('¿Estás seguro de marcar esta factura como pagada? Esto procesará las comisiones y reducirá el inventario.')) {
            router.post(`/invoices/${invoiceId}/mark-as-paid`, {}, {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload();
                },
            });
        }
    };

    const handleEditInvoice = (invoice: Invoice) => {
        // Si es una factura pagada, mostrar confirmación primero
        if (invoice.status === 'paid') {
            if (!canMarkAsPaid) {
                alert('Solo los administradores pueden editar facturas pagadas.');
                return;
            }
            setInvoiceToEdit(invoice);
            setIsEditConfirmDialogOpen(true);
        } else {
            // Para facturas pendientes, redirigir directamente
            if (invoice.serviceOrder?.id) {
                router.visit(`/facturacion?service_order_id=${invoice.serviceOrder.id}`);
            }
        }
    };

    const handleConfirmEditPaidInvoice = () => {
        console.log('=== CONFIRMING EDIT ===');
        console.log('invoiceToEdit:', invoiceToEdit);
        console.log('serviceOrder:', invoiceToEdit?.serviceOrder);
        console.log('service_order_id:', (invoiceToEdit as any)?.service_order_id);

        setIsEditConfirmDialogOpen(false);

        if (!invoiceToEdit) {
            console.error('No invoice to edit');
            alert('Error: No se encontró la factura para editar.');
            return;
        }

        // Intentar obtener el service_order_id de diferentes formas
        let serviceOrderId = invoiceToEdit.serviceOrder?.id;

        // Si no está en serviceOrder, intentar obtenerlo directamente del objeto invoice
        if (!serviceOrderId) {
            serviceOrderId = (invoiceToEdit as any).service_order_id;
        }

        if (!serviceOrderId) {
            console.error('Invoice has no service order:', invoiceToEdit);
            alert('Error: Esta factura no tiene una orden de servicio asociada.\n\nID de factura: ' + invoiceToEdit.id + '\n\nPor favor, contacta al administrador.');
            return;
        }

        const url = `/facturacion?service_order_id=${serviceOrderId}`;
        console.log('Redirecting to:', url);

        router.visit(url);
    };

    const handleCancelInvoice = (invoiceId: string) => {
        if (confirm('¿Estás seguro de cancelar esta factura? Esta acción no se puede deshacer.')) {
            router.put(`/invoices/${invoiceId}/cancel`, {}, {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload();
                },
            });
        }
    };

    // Separar facturas por tipo
    const serviceInvoices = invoices.data.filter(invoice => invoice.service_order_id);
    const posInvoices = invoices.data.filter(invoice => !invoice.service_order_id);

    // Aplicar filtro de tipo
    let invoicesByType = invoices.data;
    if (typeFilter === 'service') {
        invoicesByType = serviceInvoices;
    } else if (typeFilter === 'pos') {
        invoicesByType = posInvoices;
    }

    // Separar por estado
    const paidInvoices = invoicesByType.filter(invoice => invoice.status === 'paid');
    const pendingInvoices = invoicesByType.filter(invoice => invoice.status === 'pending');
    const cancelledInvoices = invoicesByType.filter(invoice => invoice.status === 'cancelled');

    const filteredInvoices = invoicesByType.filter(invoice => {
        const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
        const matchesSearch = !searchTerm ||
            invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.serviceOrder?.service_order_number?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Determinar si la factura actual es POS (para deshabilitar edición)
    const isInvoicePOS = (invoice: Invoice) => !invoice.service_order_id;

    return (
        <AppLayout>
            <Head title="Facturas" />
            <div className="flex h-full flex-1 flex-col gap-3 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-lg font-bold flex items-center gap-2">

                            Facturas
                        </h1>
                        <p className="text-muted-foreground">
                            Gestión de facturas de servicios y punto de venta
                        </p>
                    </div>
                    <Button onClick={() => router.visit('/invoices/create')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Nueva Factura
                    </Button>
                </div>

                {/* Unified Toolbar: Search + Status Tabs + Type Filter */}
                <Tabs defaultValue="pending" className="max-w-full flex-1 flex flex-col">
                    <div className="flex flex-col gap-3 bg-white p-4 rounded-lg border">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por número, cliente u orden..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        {/* Status Tabs + Type Filter */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <TabsList className="grid grid-cols-4 flex-1">
                                <TabsTrigger value="pending">Pendientes ({pendingInvoices.length})</TabsTrigger>
                                <TabsTrigger value="paid">Pagadas ({paidInvoices.length})</TabsTrigger>
                                <TabsTrigger value="cancelled">Canceladas ({cancelledInvoices.length})</TabsTrigger>
                                <TabsTrigger value="all">Todas ({invoices.data.length})</TabsTrigger>
                            </TabsList>

                            <Select value={typeFilter} onValueChange={(value: 'all' | 'service' | 'pos') => setTypeFilter(value)}>
                                <SelectTrigger className="w-full sm:w-[200px]">
                                    <SelectValue placeholder="Tipo de factura" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas ({invoices.data.length})</SelectItem>
                                    <SelectItem value="service">Facturas F ({serviceInvoices.length})</SelectItem>
                                    <SelectItem value="pos">Facturas POS ({posInvoices.length})</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Órdenes enviadas por técnicos (solo para operadores) */}
                    {operatorReviewOrders.length > 0 && (
                        <Card className="p-4 rounded-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    Órdenes Enviadas por Técnicos ({operatorReviewOrders.length})
                                </h2>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Revisa estas órdenes y envíalas a facturación para que el administrador las procese.
                            </p>
                            <div className="space-y-2">
                                {operatorReviewOrders.map((order) => (
                                    <div key={order.id} className="border rounded-lg p-4 flex items-center justify-between bg-white">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium">
                                                    Orden #{order.service_order_number || order.id.slice(0, 8)}
                                                </span>
                                                {order.is_checkup_only && (
                                                    <Badge variant="outline" className="text-xs">Solo Chequeo</Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Cliente: {order.customer?.name || 'N/A'}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Técnico: {order.attendedBy?.name || order.assignedTo?.name || 'N/A'}
                                            </p>
                                            {order.final_cost && (
                                                <p className="text-sm font-medium mt-1">
                                                    Costo: {formatPrice(order.final_cost)}
                                                </p>
                                            )}
                                            {order.parts && order.parts.length > 0 && (
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Piezas: {order.parts.length}
                                                </p>
                                            )}
                                        </div>
                                        <Button
                                            onClick={() => {
                                                router.post(`/service-orders/${order.id}/send-billing`, {}, {
                                                    preserveScroll: true,
                                                    onSuccess: () => {
                                                        router.reload();
                                                    },
                                                });
                                            }}
                                            size="sm"
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            <FileText className="w-4 h-4 mr-2" />
                                            Enviar a Facturación
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    {/* Órdenes pendientes de facturación (para admin) */}
                    {pendingBillingOrders.length > 0 && (
                        <Card className="p-4 rounded-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    Órdenes Pendientes de Facturación ({pendingBillingOrders.length})
                                </h2>
                            </div>
                            <div className="space-y-2">
                                {pendingBillingOrders.map((order) => (
                                    <div key={order.id} className="border rounded-lg p-4 flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium">
                                                    Orden #{order.service_order_number || order.id.slice(0, 8)}
                                                </span>
                                                {order.is_checkup_only && (
                                                    <Badge variant="outline" className="text-xs">Solo Chequeo</Badge>
                                                )}
                                            </div>


                                            {order.final_cost && (
                                                <p className="text-sm font-medium mt-1">
                                                    Costo: {formatPrice(order.final_cost)}
                                                </p>
                                            )}
                                        </div>
                                        <Button
                                            onClick={() => router.visit(`/facturacion?service_order_id=${order.id}`)}
                                            size="sm"
                                        >
                                            <FileText className="w-4 h-4 mr-2" />
                                            Facturar
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    <TabsContent value="pending">
                        {pendingInvoices.length > 0 ? (
                            <Card className="p-4 rounded-2xl">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-yellow-600" />
                                    Facturas Pendientes ({pendingInvoices.length})
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2 text-sm font-semibold">Número</th>
                                                <th className="text-left py-2 text-sm font-semibold">Fecha</th>
                                                <th className="text-left py-2 text-sm font-semibold">Cliente</th>
                                                <th className="text-left py-2 text-sm font-semibold">Técnico</th>
                                                <th className="text-left py-2 text-sm font-semibold">Orden</th>
                                                <th className="text-right py-2 text-sm font-semibold">Total</th>
                                                <th className="text-center py-2 text-sm font-semibold">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pendingInvoices.filter(invoice => {
                                                const matchesSearch = !searchTerm ||
                                                    invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    invoice.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    invoice.serviceOrder?.service_order_number?.toLowerCase().includes(searchTerm.toLowerCase());
                                                return matchesSearch;
                                            }).map((invoice) => (
                                                <tr key={invoice.id} className="border-b hover:bg-muted/50">
                                                    <td className="py-3">
                                                        <span className="font-medium">{invoice.invoice_number}</span>
                                                    </td>
                                                    <td className="py-3 text-sm text-muted-foreground">
                                                        {formatDate(invoice.date)}
                                                    </td>
                                                    <td className="py-3">
                                                        {invoice.customer?.name || 'N/A'}
                                                    </td>
                                                    <td className="py-3">
                                                        {invoice.serviceOrder?.attendedBy?.name || invoice.serviceOrder?.assignedTo?.name || 'N/A'}
                                                    </td>
                                                    <td className="py-3">
                                                        {invoice.serviceOrder?.service_order_number
                                                            ? `#${invoice.serviceOrder.service_order_number}`
                                                            : 'N/A'}
                                                    </td>
                                                    <td className="py-3 text-right font-medium">
                                                        {formatPrice(invoice.total)}
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleViewInvoice(invoice)}
                                                                title="Ver detalles"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                            {!isInvoicePOS(invoice) && (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleEditInvoice(invoice)}
                                                                    title="Editar factura"
                                                                >
                                                                    <FileText className="w-4 h-4 mr-1" />
                                                                    Editar
                                                                </Button>
                                                            )}
                                                            {isInvoicePOS(invoice) && (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    disabled
                                                                    title="Las facturas POS no se pueden editar"
                                                                >
                                                                    <FileText className="w-4 h-4 mr-1" />
                                                                    Solo lectura
                                                                </Button>
                                                            )}
                                                            {canMarkAsPaid && (
                                                                <Button
                                                                    variant="default"
                                                                    size="sm"
                                                                    onClick={() => handleMarkAsPaid(invoice.id)}
                                                                    className="bg-green-600 hover:bg-green-700"
                                                                    title="Marcar como pagada"
                                                                >
                                                                    <DollarSign className="w-4 h-4 mr-1" />
                                                                    Pagar
                                                                </Button>
                                                            )}
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => handleCancelInvoice(invoice.id)}
                                                                title="Cancelar factura"
                                                            >
                                                                <XCircle className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        ) : (
                            <div className="text-start p-5 text-muted-foreground   bg-white rounded-lg border border-gray-200">
                                <h1 className="text-lg font-extrabold text-red-500 uppercase">No hay facturas pendientes</h1>
                                <p className="text-sm text-muted-foreground">No hay facturas pendientes para mostrar. Puedes crear una nueva factura desde la sección de órdenes.</p>
                                <Button variant="outline" size="sm" className="mt-4">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Crear nueva factura
                                </Button>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="paid">
                        {paidInvoices.length > 0 ? (
                            <Card className="p-4 rounded-2xl">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    Facturas Pagadas ({paidInvoices.length})
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2 text-sm font-semibold">Número</th>
                                                <th className="text-left py-2 text-sm font-semibold">Fecha</th>
                                                <th className="text-left py-2 text-sm font-semibold">Cliente</th>
                                                <th className="text-left py-2 text-sm font-semibold">Técnico</th>
                                                <th className="text-left py-2 text-sm font-semibold">Orden</th>
                                                <th className="text-right py-2 text-sm font-semibold">Total</th>
                                                <th className="text-center py-2 text-sm font-semibold">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paidInvoices.filter(invoice => {
                                                const matchesSearch = !searchTerm ||
                                                    invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    invoice.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    invoice.serviceOrder?.service_order_number?.toLowerCase().includes(searchTerm.toLowerCase());
                                                return matchesSearch;
                                            }).map((invoice) => (
                                                <tr key={invoice.id} className="border-b hover:bg-muted/50">
                                                    <td className="py-3">
                                                        <span className="font-medium">{invoice.invoice_number}</span>
                                                    </td>
                                                    <td className="py-3 text-sm text-muted-foreground">
                                                        {formatDate(invoice.date)}
                                                    </td>
                                                    <td className="py-3">
                                                        {invoice.customer?.name || 'N/A'}
                                                    </td>
                                                    <td className="py-3">
                                                        {invoice.serviceOrder?.attendedBy?.name || invoice.serviceOrder?.assignedTo?.name || 'N/A'}
                                                    </td>
                                                    <td className="py-3">
                                                        {invoice.serviceOrder?.service_order_number
                                                            ? `#${invoice.serviceOrder.service_order_number}`
                                                            : 'N/A'}
                                                    </td>
                                                    <td className="py-3 text-right font-medium">
                                                        {formatPrice(invoice.total)}
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleViewInvoice(invoice)}
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                            {!isInvoicePOS(invoice) && (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleEditInvoice(invoice)}
                                                                    title={canMarkAsPaid ? "Editar factura" : "Solo administradores pueden editar facturas pagadas"}
                                                                    disabled={!canMarkAsPaid}
                                                                >
                                                                    <FileText className="w-4 h-4 mr-1" />
                                                                    Editar
                                                                </Button>
                                                            )}
                                                            {isInvoicePOS(invoice) && (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    disabled
                                                                    title="Las facturas POS no se pueden editar"
                                                                >
                                                                    <FileText className="w-4 h-4 mr-1" />
                                                                    Solo lectura
                                                                </Button>
                                                            )}
                                                            {invoice.serviceOrder && (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleCloseOrder(invoice.serviceOrder!.id)}
                                                                >
                                                                    <CheckCircle2 className="w-4 h-4 mr-1" />
                                                                    Cerrar Orden
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground border rounded-lg bg-muted/10">
                                <Receipt className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p>No hay facturas pagadas</p>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="cancelled">
                        {cancelledInvoices.length > 0 ? (
                            <Card className="p-4 rounded-2xl">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <XCircle className="w-5 h-5 text-red-600" />
                                    Facturas Canceladas ({cancelledInvoices.length})
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2 text-sm font-semibold">Número</th>
                                                <th className="text-left py-2 text-sm font-semibold">Fecha</th>
                                                <th className="text-left py-2 text-sm font-semibold">Cliente</th>
                                                <th className="text-left py-2 text-sm font-semibold">Técnico</th>
                                                <th className="text-left py-2 text-sm font-semibold">Orden</th>
                                                <th className="text-right py-2 text-sm font-semibold">Total</th>
                                                <th className="text-center py-2 text-sm font-semibold">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cancelledInvoices.filter(invoice => {
                                                const matchesSearch = !searchTerm ||
                                                    invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    invoice.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    invoice.serviceOrder?.service_order_number?.toLowerCase().includes(searchTerm.toLowerCase());
                                                return matchesSearch;
                                            }).map((invoice) => (
                                                <tr key={invoice.id} className="border-b hover:bg-muted/50">
                                                    <td className="py-3">
                                                        <span className="font-medium">{invoice.invoice_number}</span>
                                                    </td>
                                                    <td className="py-3 text-sm text-muted-foreground">
                                                        {formatDate(invoice.date)}
                                                    </td>
                                                    <td className="py-3">
                                                        {invoice.customer?.name || 'N/A'}
                                                    </td>
                                                    <td className="py-3">
                                                        {invoice.serviceOrder?.attendedBy?.name || invoice.serviceOrder?.assignedTo?.name || 'N/A'}
                                                    </td>
                                                    <td className="py-3">
                                                        {invoice.serviceOrder?.service_order_number
                                                            ? `#${invoice.serviceOrder.service_order_number}`
                                                            : 'N/A'}
                                                    </td>
                                                    <td className="py-3 text-right font-medium">
                                                        {formatPrice(invoice.total)}
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleViewInvoice(invoice)}
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground border rounded-lg bg-muted/10">
                                <Receipt className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p>No hay facturas canceladas</p>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="all">
                        <Card className="p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-4">Todas las Facturas</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2 text-sm font-semibold">Número</th>
                                            <th className="text-left py-2 text-sm font-semibold">Fecha</th>
                                            <th className="text-left py-2 text-sm font-semibold">Cliente</th>
                                            <th className="text-left py-2 text-sm font-semibold">Técnico</th>
                                            <th className="text-left py-2 text-sm font-semibold">Orden</th>
                                            <th className="text-left py-2 text-sm font-semibold">Estado</th>
                                            <th className="text-right py-2 text-sm font-semibold">Total</th>
                                            <th className="text-center py-2 text-sm font-semibold">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredInvoices.map((invoice) => (
                                            <tr key={invoice.id} className="border-b hover:bg-muted/50">
                                                <td className="py-3">
                                                    <span className="font-medium">{invoice.invoice_number}</span>
                                                </td>
                                                <td className="py-3 text-sm text-muted-foreground">
                                                    {formatDate(invoice.date)}
                                                </td>
                                                <td className="py-3">
                                                    {invoice.customer?.name || 'N/A'}
                                                </td>
                                                <td className="py-3">
                                                    {invoice.serviceOrder?.attendedBy?.name || invoice.serviceOrder?.assignedTo?.name || 'N/A'}
                                                </td>
                                                <td className="py-3">
                                                    {invoice.serviceOrder?.service_order_number
                                                        ? `#${invoice.serviceOrder.service_order_number}`
                                                        : 'N/A'}
                                                </td>
                                                <td className="py-3">
                                                    {getStatusBadge(invoice.status)}
                                                </td>
                                                <td className="py-3 text-right font-medium">
                                                    {formatPrice(invoice.total)}
                                                </td>
                                                <td className="py-3">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleViewInvoice(invoice)}
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                        {canMarkAsPaid && invoice.status === 'pending' && (
                                                            <Button
                                                                variant="default"
                                                                size="sm"
                                                                onClick={() => handleMarkAsPaid(invoice.id)}
                                                                className="bg-green-600 hover:bg-green-700"
                                                            >
                                                                <DollarSign className="w-4 h-4 mr-1" />
                                                                Marcar como Pagada
                                                            </Button>
                                                        )}
                                                        {invoice.status === 'paid' && invoice.serviceOrder && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleCloseOrder(invoice.serviceOrder!.id)}
                                                            >
                                                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                                                Cerrar Orden
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {filteredInvoices.length === 0 && (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <Receipt className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                        <p>No se encontraron facturas</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Dialog de Detalle de Factura */}
                <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Detalle de Factura</DialogTitle>
                            <DialogDescription>
                                {selectedInvoice?.invoice_number}
                            </DialogDescription>
                        </DialogHeader>
                        {selectedInvoice && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-xs text-muted-foreground">Fecha</Label>
                                        <p className="font-medium">{formatDate(selectedInvoice.date)}</p>
                                    </div>
                                    <div>
                                        <Label className="text-xs text-muted-foreground">Estado</Label>
                                        <div>{getStatusBadge(selectedInvoice.status)}</div>
                                    </div>
                                    <div>
                                        <Label className="text-xs text-muted-foreground">Cliente</Label>
                                        <p className="font-medium">{selectedInvoice.customer?.name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <Label className="text-xs text-muted-foreground">Orden de Servicio</Label>
                                        <p className="font-medium">
                                            {selectedInvoice.serviceOrder?.service_order_number
                                                ? `#${selectedInvoice.serviceOrder.service_order_number}`
                                                : 'N/A'}
                                        </p>
                                    </div>
                                    {selectedInvoice.billedBy && (
                                        <div>
                                            <Label className="text-xs text-muted-foreground">Facturado por</Label>
                                            <p className="font-medium">
                                                {selectedInvoice.billedBy.name || selectedInvoice.billedBy.email || 'N/A'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {selectedInvoice.items && selectedInvoice.items.length > 0 && (
                                    <div>
                                        <Label className="text-xs text-muted-foreground mb-2 block">Items</Label>
                                        <div className="space-y-2">
                                            {selectedInvoice.items.map((item) => (
                                                <div key={item.id} className="flex justify-between border-b pb-2">
                                                    <div>
                                                        <p className="font-medium text-sm">{item.description}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Cantidad: {item.quantity} × {formatPrice(item.sell_price)}
                                                        </p>
                                                    </div>
                                                    <p className="font-medium">
                                                        {formatPrice(item.sell_price * item.quantity)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-bold pt-4 border-t">
                                    <span>Total:</span>
                                    <span>{formatPrice(selectedInvoice.total)}</span>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                                Cerrar
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Dialog de Confirmación para Editar Factura Pagada */}
                <Dialog open={isEditConfirmDialogOpen} onOpenChange={setIsEditConfirmDialogOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-orange-600">
                                <AlertTriangle className="w-5 h-5" />
                                ¿Editar Factura Pagada?
                            </DialogTitle>
                            <DialogDescription>
                                Estás a punto de editar una factura que ya fue procesada y pagada.
                            </DialogDescription>
                        </DialogHeader>
                        {invoiceToEdit && (
                            <div className="space-y-4">
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                                    <p className="text-sm font-medium mb-2">Factura: {invoiceToEdit.invoice_number}</p>
                                    <p className="text-sm text-muted-foreground">Total: {formatPrice(invoiceToEdit.total)}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-semibold">Los cambios tendrán los siguientes efectos:</p>
                                    <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                                        <li>Se actualizará el inventario si agregas o eliminas piezas</li>
                                        <li>Se recalcularán las comisiones del personal</li>
                                        <li>Se registrará en el historial de cambios</li>
                                        <li>No podrás reducir el total de la factura</li>
                                        <li>Deberás proporcionar una razón para el cambio</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditConfirmDialogOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="default"
                                onClick={handleConfirmEditPaidInvoice}
                                className="bg-orange-600 hover:bg-orange-700"
                            >
                                Continuar con Edición
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout >
    );
}

