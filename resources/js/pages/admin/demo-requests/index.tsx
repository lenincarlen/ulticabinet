import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Calendar,
    Building2,
    Mail,
    Phone,
    User,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Download,
    Search,
    BadgeDollarSignIcon,
    FileBarChart,
    MoreHorizontal,
    Eye,
    Filter
} from 'lucide-react';
import { useState } from 'react';

interface Solution {
    id: number;
    name: string;
}

interface Staff {
    id: number;
    name: string;
}

interface DemoRequest {
    id: number;
    request_number: string;
    company_name: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    status: string;
    created_at: string;
    scheduled_at: string | null;
    solution: Solution;
    assigned_staff: Staff | null;
}

interface Stats {
    total: number;
    pending: number;
    quoted?: number;
    for_preview?: number;
    sold?: number;
    confirmed: number;
    completed: number;
    cancelled: number;
}

interface Props {
    demoRequests: {
        data: DemoRequest[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    solutions: Solution[];
    staff: Staff[];
    stats: Stats;
    filters: {
        status?: string;
        solution_id?: string;
        assigned_to?: string;
        search?: string;
    };
}

const statusConfig = {
    pending: { label: 'New Lead', color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200', icon: AlertCircle },
    new: { label: 'Nuevo Lead', color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200', icon: AlertCircle },
    quoted: { label: 'Presupuestado', color: 'bg-purple-100 text-purple-800 hover:bg-purple-200', icon: FileBarChart },
    for_preview: { label: 'Para Preview', color: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200', icon: Clock },
    previewed: { label: 'Presentado', color: 'bg-teal-100 text-teal-800 hover:bg-teal-200', icon: CheckCircle2 },
    sold: { label: 'Vendido', color: 'bg-green-100 text-green-800 hover:bg-green-200', icon: BadgeDollarSignIcon },
    completed: { label: 'Vendido', color: 'bg-green-100 text-green-800 hover:bg-green-200', icon: BadgeDollarSignIcon },
    cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-800 hover:bg-red-200', icon: XCircle },
    lost: { label: 'Perdido', color: 'bg-red-100 text-red-800 hover:bg-red-200', icon: XCircle },
    no_show: { label: 'Sin Presentación', color: 'bg-orange-100 text-orange-800 hover:bg-orange-200', icon: XCircle },
    confirmed: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800 hover:bg-blue-200', icon: CheckCircle2 },
    in_progress: { label: 'En Proceso', color: 'bg-blue-100 text-blue-800 hover:bg-blue-200', icon: Clock },
};

export default function DemoRequestsIndex({ demoRequests, solutions, staff, stats, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateParams({ search: searchTerm });
    };

    const handleFilterChange = (key: string, value: string) => {
        updateParams({ [key]: value === 'all' ? '' : value });
    };

    const updateParams = (newParams: Record<string, string>) => {
        const params = new URLSearchParams(window.location.search);
        Object.entries(newParams).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });
        window.location.href = `/admin/demo-requests?${params.toString()}`;
    };

    return (
        <AppLayout>
            <Head title="Gestión de Leads" />

            <div className="space-y-6 p-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Gestión de Leads</h1>
                        <p className="text-muted-foreground">Administra y da seguimiento a tus oportunidades de venta.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => window.location.href = '/admin/demo-requests/export/data'}>
                            <Download className="h-4 w-4 mr-2" />
                            Exportar
                        </Button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-px bg-border border rounded-lg overflow-hidden">
                    <div className="bg-background p-4 flex flex-col justify-center">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Leads</span>
                        <div className="text-2xl font-bold mt-1">{stats.total}</div>
                    </div>
                    <div className="bg-background p-4 border-l border-border/50  flex flex-col justify-center">
                        <span className="text-xs font-medium text-yellow-600 uppercase tracking-wider">Nuevos</span>
                        <div className="text-2xl font-bold mt-1">{stats.pending}</div>
                    </div>
                    <div className="bg-background p-4 flex flex-col justify-center">
                        <span className="text-xs font-medium text-purple-600 uppercase tracking-wider">Presupuestados</span>
                        <div className="text-2xl font-bold mt-1">{stats.quoted || 0}</div>
                    </div>
                    <div className="bg-background p-4 flex flex-col justify-center">
                        <span className="text-xs font-medium text-indigo-600 uppercase tracking-wider">Para Preview</span>
                        <div className="text-2xl font-bold mt-1">{stats.for_preview || 0}</div>
                    </div>
                    <div className="bg-background p-4 flex flex-col justify-center">
                        <span className="text-xs font-medium text-green-600 uppercase tracking-wider">Vendidos</span>
                        <div className="text-2xl font-bold mt-1">{stats.sold || stats.completed}</div>
                    </div>
                    <div className="bg-background p-4 flex flex-col justify-center">
                        <span className="text-xs font-medium text-red-600 uppercase tracking-wider">Perdidos</span>
                        <div className="text-2xl font-bold mt-1">{stats.cancelled}</div>
                    </div>
                </div>

                {/* Main Content Card */}
                <Card className="shadow-sm border-none ring-1 ring-black/5">
                    <div className="p-4 border-b flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="relative w-full sm:w-80">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por empresa, contacto, email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 h-9"
                            />
                        </form>

                        {/* Filters Toolbar */}
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Select
                                value={filters.status || 'all'}
                                onValueChange={(value) => handleFilterChange('status', value)}
                            >
                                <SelectTrigger className="h-9 w-[180px]">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                                        <SelectValue placeholder="Estado" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los estados</SelectItem>
                                    <SelectItem value="new">Nuevo Lead</SelectItem>
                                    <SelectItem value="quoted">Presupuestado</SelectItem>
                                    <SelectItem value="for_preview">Para Preview</SelectItem>
                                    <SelectItem value="previewed">Presentado</SelectItem>
                                    <SelectItem value="sold">Vendido</SelectItem>
                                    <SelectItem value="cancelled">Cancelado</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={filters.solution_id || 'all'}
                                onValueChange={(value) => handleFilterChange('solution_id', value)}
                            >
                                <SelectTrigger className="h-9 w-[180px]">
                                    <SelectValue placeholder="Solución" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas las soluciones</SelectItem>
                                    {solutions.map((solution) => (
                                        <SelectItem key={solution.id} value={solution.id.toString()}>
                                            {solution.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="relative w-full overflow-auto p-2">
                        <Table>
                            <TableHeader>
                                <TableRow className="  hover:bg-muted/50">
                                    <TableHead className="w-[160px] px-4"># ID</TableHead>
                                    <TableHead className="w-[200px]">Empresa</TableHead>
                                    <TableHead>Contacto</TableHead>
                                    <TableHead>Solución</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="hidden md:table-cell">Fecha</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {demoRequests.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            No se encontraron resultados.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    demoRequests.data.map((request) => {
                                        const statusInfo = statusConfig[request.status as keyof typeof statusConfig] || statusConfig.pending;
                                        const StatusIcon = statusInfo.icon;

                                        return (
                                            <TableRow key={request.id} className="hover:bg-muted/50 cursor-pointer" onClick={() => window.location.href = `/admin/demo-requests/${request.id}`}>
                                                <TableCell className="font-mono text-xs font-medium text-muted-foreground px-4">
                                                    #{request.request_number}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium text-gray-900">{request.company_name}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium">{request.contact_name}</span>
                                                        <span className="text-xs text-muted-foreground">{request.contact_email}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="font-normal">
                                                            {request.solution.name}
                                                        </Badge>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className={`pl-1.5 pr-2.5 py-0.5 border-0 font-medium ${statusInfo.color}`}>
                                                        <StatusIcon className="h-3.5 w-3.5 mr-1" />
                                                        {statusInfo.label}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        {new Date(request.created_at).toLocaleDateString('es-ES')}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Abrir menú</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                            <DropdownMenuItem onClick={() => window.location.href = `/admin/demo-requests/${request.id}`}>
                                                                <Eye className="mr-2 h-4 w-4" /> Ver detalles
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(request.contact_email)}>
                                                                <Mail className="mr-2 h-4 w-4" /> Copiar Email
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Footer Pagination */}
                    {demoRequests.last_page > 1 && (
                        <div className="p-4 border-t flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Mostrando {((demoRequests.current_page - 1) * demoRequests.per_page) + 1} a {Math.min(demoRequests.current_page * demoRequests.per_page, demoRequests.total)} de {demoRequests.total} resultados
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateParams({ page: (demoRequests.current_page - 1).toString() })}
                                    disabled={demoRequests.current_page === 1}
                                >
                                    Anterior
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateParams({ page: (demoRequests.current_page + 1).toString() })}
                                    disabled={demoRequests.current_page === demoRequests.last_page}
                                >
                                    Siguiente
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}

