import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
    Building2,
    Mail,
    Phone,
    User,
    Calendar,
    Clock,
    Target,
    ArrowLeft,
    Save,
    CheckCircle2,
    XCircle,
    AlertCircle,
    FileBarChart,
    BadgeDollarSignIcon
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Solution {
    id: number;
    name: string;
    category: string;
}

interface Staff {
    id: number;
    name: string;
}

interface StatusHistory {
    id: number;
    old_status: string | null;
    new_status: string;
    notes: string | null;
    created_at: string;
    changed_by_staff: Staff | null;
}

interface DemoRequest {
    id: number;
    request_number: string;
    company_name: string;
    company_size: string | null;
    industry: string | null;
    current_solution: string | null;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    pain_points: string[] | null;
    preferred_date: string | null;
    preferred_time: string | null;
    demo_format: string | null;
    additional_notes: string | null;
    status: string;
    assigned_to: number | null;
    scheduled_at: string | null;
    completed_at: string | null;
    cancelled_at: string | null;
    cancellation_reason: string | null;
    demo_notes: string | null;
    follow_up_date: string | null;
    conversion_probability: number | null;
    estimated_value: number | null;
    created_at: string;
    solution: Solution;
    assigned_staff: Staff | null;
    status_history: StatusHistory[];
}

interface Props {
    demoRequest: DemoRequest;
    staff: Staff[];
}

const statusConfig = {
    pending: { label: 'Nuevo Lead', color: 'bg-gray-500 text-white', icon: AlertCircle },
    new: { label: 'Nuevo Lead', color: 'bg-gray-600 text-white', icon: AlertCircle },
    quoted: { label: 'Presupuestado', color: 'bg-gray-500 text-white', icon: FileBarChart },
    for_preview: { label: 'Para Preview', color: 'bg-gray-500 text-white', icon: Clock },
    previewed: { label: 'Presentado', color: 'bg-gray-500 text-white', icon: CheckCircle2 },
    sold: { label: 'Vendido', color: 'bg-gray-500 text-white', icon: BadgeDollarSignIcon },
    completed: { label: 'Vendido', color: 'bg-gray-500 text-white', icon: BadgeDollarSignIcon }, // Compatibility
    cancelled: { label: 'Cancelado', color: 'bg-gray-500 text-blue-800', icon: XCircle },
    lost: { label: 'Perdido', color: 'bg-red-100 text-red-800', icon: XCircle },
    no_show: { label: 'No Show', color: 'bg-orange-100 text-orange-800', icon: XCircle },
    confirmed: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800', icon: CheckCircle2 }, // Compatibility
    in_progress: { label: 'En Proceso', color: 'bg-blue-100 text-blue-800', icon: Clock }, // Compatibility
};

export default function DemoRequestShow({ demoRequest, staff }: Props) {
    const [isEditing, setIsEditing] = useState(false);

    const { data, setData, put, processing } = useForm({
        status: demoRequest.status,
        scheduled_at: demoRequest.scheduled_at ? demoRequest.scheduled_at.split('T')[0] : '', // Adjust for generic datetime input if needed, split works for YYYY-MM-DD
        demo_notes: demoRequest.demo_notes || '',
        follow_up_date: demoRequest.follow_up_date || '',
        conversion_probability: demoRequest.conversion_probability?.toString() || '',
        estimated_value: demoRequest.estimated_value?.toString() || '',
        cancellation_reason: demoRequest.cancellation_reason || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/demo-requests/${demoRequest.id}`, {
            onSuccess: () => {
                setIsEditing(false);
            },
        });
    };

    const statusInfo = statusConfig[demoRequest.status as keyof typeof statusConfig] || statusConfig.pending;
    const StatusIcon = statusInfo.icon;

    return (
        <AppLayout>
            <Head title={`Lead Management - ${demoRequest.company_name}`} />

            <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => window.location.href = '/admin/demo-requests'}
                            className="bg-white border-gray-200 hover:bg-gray-50 text-gray-500"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl md:text-3xl font-bold text-[#1f2937]">
                                    {demoRequest.company_name}
                                </h1>
                                <Badge className={cn("px-3 py-1 text-sm font-medium", statusInfo.color)}>
                                    <StatusIcon className="h-4 w-4 mr-1.5" />
                                    {statusInfo.label}
                                </Badge>
                            </div>
                            <p className="text-[#6b7280] mt-1 flex items-center gap-2">
                                <span>#{demoRequest.request_number}</span>
                                <span>•</span>
                                <span>{demoRequest.industry || 'Industria sin especificar'}</span>
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setIsEditing(!isEditing)}
                        size="lg"
                        className={isEditing ? "bg-red-500 hover:bg-red-600 border-none shadow-sm" : "bg-[#3b82f6] hover:bg-blue-600 border-none shadow-sm"}
                    >
                        {isEditing ? 'Cancelar Edición' : 'Gestionar Estado'}
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-6">

                        {isEditing && (
                            <Card className='border-0 shadow-sm bg-white rounded-lg overflow-hidden'>
                                <CardHeader className="bg-gray-50/50 pb-4 border-b border-gray-100">
                                    <CardTitle className="flex items-center gap-2 text-[#1f2937]">
                                        <Save className="h-5 w-5 text-gray-400" />
                                        Actualizar Lead
                                    </CardTitle>
                                    <CardDescription className="text-gray-500">
                                        Modificar estado, notas y detalles de seguimiento.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="status" className="font-semibold">Estado del Lead</Label>
                                                <Select
                                                    value={data.status}
                                                    onValueChange={(value) => setData('status', value)}
                                                >
                                                    <SelectTrigger id="status" className="h-10">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="new">Nuevo Lead </SelectItem>
                                                        <SelectItem value="quoted">Presupuestado</SelectItem>
                                                        <SelectItem value="for_preview">Para Preview</SelectItem>
                                                        <SelectItem value="previewed">Presentado</SelectItem>
                                                        <SelectItem value="sold">Vendido</SelectItem>
                                                        <SelectItem value="cancelled">Cancelado</SelectItem>
                                                        <SelectItem value="no_show">Sin Presentación</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="scheduled_at">Fecha Agendada</Label>
                                                <Input
                                                    id="scheduled_at"
                                                    type="datetime-local"
                                                    value={data.scheduled_at}
                                                    onChange={(e) => setData('scheduled_at', e.target.value)}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="conversion_probability">Probabilidad (%)</Label>
                                                <Input
                                                    id="conversion_probability"
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={data.conversion_probability}
                                                    onChange={(e) => setData('conversion_probability', e.target.value)}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="estimated_value">Valor Estimado ($)</Label>
                                                <Input
                                                    id="estimated_value"
                                                    type="number"
                                                    step="0.01"
                                                    value={data.estimated_value}
                                                    onChange={(e) => setData('estimated_value', e.target.value)}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="follow_up_date">Fecha de Seguimiento</Label>
                                                <Input
                                                    id="follow_up_date"
                                                    type="date"
                                                    value={data.follow_up_date}
                                                    onChange={(e) => setData('follow_up_date', e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="demo_notes">Notas Internas</Label>
                                            <Textarea
                                                id="demo_notes"
                                                value={data.demo_notes}
                                                onChange={(e) => setData('demo_notes', e.target.value)}
                                                rows={3}
                                                placeholder="Notas sobre el demo, cliente o seguimiento..."
                                                className="resize-none"
                                            />
                                        </div>

                                        {(data.status === 'cancelled' || data.status === 'lost') && (
                                            <div className="space-y-2">
                                                <Label htmlFor="cancellation_reason" className="text-red-700">Razón de Pérdida/Cancelación</Label>
                                                <Textarea
                                                    id="cancellation_reason"
                                                    value={data.cancellation_reason}
                                                    onChange={(e) => setData('cancellation_reason', e.target.value)}
                                                    rows={2}
                                                    className="resize-none border-red-200 focus-visible:ring-red-500"
                                                />
                                            </div>
                                        )}

                                        <div className="flex justify-end gap-3 pt-2">
                                            <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="border-gray-200 text-gray-500 hover:bg-gray-50">
                                                Cancelar
                                            </Button>
                                            <Button type="submit" disabled={processing} className="bg-[#3b82f6] hover:bg-blue-600 shadow-sm border-none">
                                                <Save className="h-4 w-4 mr-2" />
                                                {processing ? 'Guardando...' : 'Guardar Cambios'}
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        )}

                        {/* Company & Contact Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {/* Company Information */}
                            <Card className="h-full border-0 shadow-sm bg-white rounded-lg">
                                <CardHeader className="pb-3 border-b border-gray-100">
                                    <CardTitle className="flex items-center gap-2 text-base text-[#1f2937]">
                                        <Building2 className="h-4 w-4 text-gray-400" />
                                        Información Corporativa
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-4">
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                        <Label className="text-gray-500 text-xs uppercase tracking-wide">Empresa</Label>
                                        <p className="font-medium text-sm col-span-2 mb-3">{demoRequest.company_name}</p>

                                        <Label className="text-gray-500 text-xs uppercase tracking-wide">Industria</Label>
                                        <p className="font-medium text-sm col-span-2 mb-3">{demoRequest.industry || 'No especificada'}</p>

                                        <Label className="text-gray-500 text-xs uppercase tracking-wide">Tamaño</Label>
                                        <p className="font-medium text-sm col-span-2 mb-3">{demoRequest.company_size || 'No especificado'}</p>

                                        <Label className="text-gray-500 text-xs uppercase tracking-wide">Solución Actual</Label>
                                        <p className="font-medium text-sm col-span-2">{demoRequest.current_solution || 'Ninguna / No especificada'}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Contact Information */}
                            <Card className="h-full border-0 shadow-sm bg-white rounded-lg">
                                <CardHeader className="pb-3 border-b border-gray-100">
                                    <CardTitle className="flex items-center gap-2 text-base text-[#1f2937]">
                                        <User className="h-4 w-4 text-gray-400" />
                                        Contacto Principal
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-700 font-bold text-xs">
                                                {demoRequest.contact_name.substring(0, 2).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium">{demoRequest.contact_name}</p>
                                            <p className="text-xs text-gray-500">Solicitante</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            <a href={`mailto:${demoRequest.contact_email}`} className="text-sm font-medium text-blue-600 hover:underline truncate">
                                                {demoRequest.contact_email}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <a href={`tel:${demoRequest.contact_phone}`} className="text-sm font-medium text-gray-700 hover:text-blue-600">
                                                {demoRequest.contact_phone}
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Solution & Preferences */}
                        <Card className="border-0 shadow-sm bg-white rounded-lg">
                            <CardHeader className="pb-3 border-b border-gray-100">
                                <CardTitle className="flex items-center gap-2 text-base text-[#1f2937]">
                                    <Target className="h-4 w-4 text-gray-400" />
                                    Detalles del Requerimiento
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                                    <div>
                                        <Label className="text-gray-500 text-xs uppercase inline-block mb-1">Solución de Interés</Label>
                                        <p className="font-bold text-lg text-blue-900">{demoRequest.solution.name}</p>
                                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 mt-1">
                                            {demoRequest.solution.category}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <Label className="text-gray-500 text-xs uppercase inline-block mb-1">Formato</Label>
                                        <p className="font-medium capitalize">{demoRequest.demo_format || 'Virtual'}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <Label className="text-gray-500 text-xs uppercase mb-1 block">Horario Preferido</Label>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm font-medium">
                                                {demoRequest.preferred_date ? new Date(demoRequest.preferred_date).toLocaleDateString('es-ES') : 'Sin fecha'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Clock className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm font-medium capitalize">{demoRequest.preferred_time || 'Sin hora'}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-gray-500 text-xs uppercase mb-1 block">Desafíos (Pain Points)</Label>
                                        <div className="flex flex-wrap gap-1.5">
                                            {demoRequest.pain_points && demoRequest.pain_points.length > 0 ? (
                                                demoRequest.pain_points.map((point, index) => (
                                                    <Badge key={index} variant="secondary" className="text-xs font-normal">
                                                        {point}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-sm text-gray-400 italic">Ninguno registrado</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {demoRequest.additional_notes && (
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        <Label className="text-gray-500 text-xs uppercase mb-1 block">Notas Adicionales del Cliente</Label>
                                        <p className="text-sm text-gray-700 leading-relaxed">{demoRequest.additional_notes}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Timeline & Stats */}
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <Card className="border-0 shadow-sm rounded-lg bg-yellow-50/50 border-yellow-100">
                            <CardHeader className="pb-2 border-b border-yellow-100/50">
                                <CardTitle className="text-sm font-medium text-yellow-800 uppercase tracking-wider">KPIs del Lead</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-4">
                                <div>
                                    <p className="text-2xl font-bold text-[#1f2937]">
                                        {demoRequest.conversion_probability ? `${demoRequest.conversion_probability}%` : '—'}
                                    </p>
                                    <p className="text-xs text-gray-500">Probabilidad de Conversión</p>
                                    {demoRequest.conversion_probability && (
                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                            <div
                                                className={cn("bg-blue-600 h-1.5 rounded-full",
                                                    demoRequest.conversion_probability > 70 ? "bg-green-500" :
                                                        demoRequest.conversion_probability > 40 ? "bg-blue-500" : "bg-yellow-500"
                                                )}
                                                style={{ width: `${demoRequest.conversion_probability}%` }}
                                            ></div>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-2 border-t border-slate-200">
                                    <p className="text-xl font-bold text-gray-900">
                                        {demoRequest.estimated_value ? `$${Number(demoRequest.estimated_value).toLocaleString()}` : '—'}
                                    </p>
                                    <p className="text-xs text-gray-500">Valor Estimado</p>
                                </div>

                                <div className="pt-2 border-t border-slate-200 space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500">Creado</span>
                                        <span className="font-medium text-gray-900">{new Date(demoRequest.created_at).toLocaleDateString('es-ES')}</span>
                                    </div>
                                    {demoRequest.scheduled_at && (
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-500">Agendado</span>
                                            <span className="font-medium text-blue-700">{new Date(demoRequest.scheduled_at).toLocaleDateString('es-ES')}</span>
                                        </div>
                                    )}
                                    {demoRequest.follow_up_date && (
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-500">Seguimiento</span>
                                            <span className="font-medium text-orange-700">{new Date(demoRequest.follow_up_date).toLocaleDateString('es-ES')}</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Status History */}
                        <Card className="border-0 shadow-sm h-fit bg-white rounded-lg">
                            <CardHeader className="pb-3 border-b border-gray-100">
                                <CardTitle className="flex items-center gap-2 text-base text-[#1f2937]">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    Línea de Tiempo
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-0 relative">
                                    <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-100"></div>

                                    {demoRequest.status_history.length === 0 ? (
                                        <p className="text-sm text-gray-500 py-2">No hay historial registrado.</p>
                                    ) : (
                                        demoRequest.status_history.map((history, index) => {
                                            const newStatusConfig = statusConfig[history.new_status as keyof typeof statusConfig] || statusConfig.pending;

                                            return (
                                                <div key={history.id} className="relative pl-6 pb-6 last:pb-0">
                                                    <div className={cn(
                                                        "absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10",
                                                        newStatusConfig.color.split(' ')[0].replace('bg-', 'bg-') // Extracts bg color roughly
                                                    )}></div>

                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-semibold text-gray-900">
                                                            {history.old_status ? (
                                                                <>Cambio a {newStatusConfig.label}</>
                                                            ) : (
                                                                <>Creado como {newStatusConfig.label}</>
                                                            )}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400">
                                                            {new Date(history.created_at).toLocaleString('es-ES', {
                                                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                            })}
                                                        </span>
                                                        {history.notes && (
                                                            <div className="mt-1 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                                                                {history.notes}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
