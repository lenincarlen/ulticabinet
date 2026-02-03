import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    FileBarChart
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
    pending: { label: 'New Lead', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
    new: { label: 'New Lead', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
    quoted: { label: 'Quoted', color: 'bg-purple-100 text-purple-800', icon: FileBarChart },
    for_preview: { label: 'For Preview', color: 'bg-indigo-100 text-indigo-800', icon: Clock },
    previewed: { label: 'Previewed', color: 'bg-teal-100 text-teal-800', icon: CheckCircle2 },
    sold: { label: 'Sold', color: 'bg-green-100 text-green-800', icon: BadgeDollarSignIcon },
    completed: { label: 'Sold', color: 'bg-green-100 text-green-800', icon: BadgeDollarSignIcon }, // Compatibility
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle },
    lost: { label: 'Lost', color: 'bg-red-100 text-red-800', icon: XCircle },
    no_show: { label: 'No Show', color: 'bg-orange-100 text-orange-800', icon: XCircle },
    confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800', icon: CheckCircle2 }, // Compatibility
    in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-800', icon: Clock }, // Compatibility
};

export default function DemoRequestsIndex({ demoRequests, solutions, staff, stats, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `/admin/demo-requests?search=${searchTerm}`;
    };

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(window.location.search);
        if (value && value !== 'all') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        window.location.href = `/admin/demo-requests?${params.toString()}`;
    };

    return (
        <AppLayout>
            <Head title="Lead Management" />

            <div className="space-y-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
                        <p className="text-gray-600 mt-1">Track and manage potential clients through the sales funnel.</p>
                    </div>
                    <Button variant="outline" onClick={() => window.location.href = '/admin/demo-requests/export/data'}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                    <Card className='p-3'>
                        <CardHeader className="pb-2 p-3">
                            <CardDescription className="text-xs">Total Leads</CardDescription>
                            <CardTitle className="text-2xl">{stats.total}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className='p-3 border-l-4 border-l-yellow-400'>
                        <CardHeader className="pb-2 p-3">
                            <CardDescription className="text-xs">New Leads</CardDescription>
                            <CardTitle className="text-2xl">{stats.pending}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className='p-3 border-l-4 border-l-purple-400'>
                        <CardHeader className="pb-2 p-3">
                            <CardDescription className="text-xs">Quoted</CardDescription>
                            <CardTitle className="text-2xl">{stats.quoted || 0}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className='p-3 border-l-4 border-l-indigo-400'>
                        <CardHeader className="pb-2 p-3">
                            <CardDescription className="text-xs">For Preview</CardDescription>
                            <CardTitle className="text-2xl">{stats.for_preview || 0}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className='p-3 border-l-4 border-l-green-400'>
                        <CardHeader className="pb-2 p-3">
                            <CardDescription className="text-xs">Sold</CardDescription>
                            <CardTitle className="text-2xl">{stats.sold || stats.completed}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className='p-3 border-l-4 border-l-red-400'>
                        <CardHeader className="pb-2 p-3">
                            <CardDescription className="text-xs">Lost/Cancel</CardDescription>
                            <CardTitle className="text-2xl">{stats.cancelled}</CardTitle>
                        </CardHeader>
                    </Card>
                </div>

                {/* Filters */}
                <Card className='p-3'>

                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Search */}
                            <form onSubmit={handleSearch} className="flex gap-2">
                                <Input
                                    placeholder="Buscar..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Button type="submit" size="icon">
                                    <Search className="h-4 w-4" />
                                </Button>
                            </form>

                            {/* Status Filter */}
                            <Select
                                value={filters.status || 'all'}
                                onValueChange={(value) => handleFilterChange('status', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="new">New Lead</SelectItem>
                                    <SelectItem value="quoted">Quoted</SelectItem>
                                    <SelectItem value="for_preview">For Preview</SelectItem>
                                    <SelectItem value="previewed">Previewed</SelectItem>
                                    <SelectItem value="sold">Sold</SelectItem>
                                    <SelectItem value="cancelled">Cancelled - Lost</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Solution Filter */}
                            <Select
                                value={filters.solution_id || 'all'}
                                onValueChange={(value) => handleFilterChange('solution_id', value)}
                            >
                                <SelectTrigger>
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

                            {/* Assigned To Filter (REMOVED) */}
                            {/* 
                            <Select
                                value={filters.assigned_to || 'all'}
                                onValueChange={(value) => handleFilterChange('assigned_to', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Asignado a" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    {staff.map((member) => (
                                        <SelectItem key={member.id} value={member.id.toString()}>
                                            {member.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select> 
                            */}
                        </div>
                    </CardContent>
                </Card>

                {/* Requests List */}
                <Card className='p-3'>
                    <CardHeader>
                        <CardTitle>Solicitudes ({demoRequests.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {demoRequests.data.length === 0 ? (
                            <div className="text-center py-12">
                                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600">No hay solicitudes de demo</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {demoRequests.data.map((request) => {
                                    // Fallback for unknown statuses
                                    const statusInfo = statusConfig[request.status as keyof typeof statusConfig] || statusConfig.pending;
                                    const StatusIcon = statusInfo.icon;

                                    return (
                                        <div
                                            key={request.id}
                                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                                            onClick={() => window.location.href = `/admin/demo-requests/${request.id}`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="font-semibold text-lg">{request.company_name}</h3>
                                                        <Badge className={statusInfo.color}>
                                                            <StatusIcon className="h-3 w-3 mr-1" />
                                                            {statusInfo.label}
                                                        </Badge>
                                                        <span className="text-sm text-gray-500">#{request.request_number}</span>
                                                    </div>

                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <User className="h-4 w-4" />
                                                            {request.contact_name}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Mail className="h-4 w-4" />
                                                            {request.contact_email}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Phone className="h-4 w-4" />
                                                            {request.contact_phone}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Building2 className="h-4 w-4" />
                                                            {request.solution.name}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                                        <span>Creado: {new Date(request.created_at).toLocaleDateString('es-ES')}</span>
                                                        {request.scheduled_at && (
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="h-4 w-4" />
                                                                Agendado: {new Date(request.scheduled_at).toLocaleDateString('es-ES')}
                                                            </span>
                                                        )}
                                                        {/* 
                                                        {request.assigned_staff && (
                                                            <span>Asignado a: {request.assigned_staff.name}</span>
                                                        )} 
                                                        */}
                                                    </div>
                                                </div>

                                                <Button variant="outline" size="sm">
                                                    Ver Detalles
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Pagination */}
                        {demoRequests.last_page > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-6">
                                {Array.from({ length: demoRequests.last_page }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === demoRequests.current_page ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => {
                                            const params = new URLSearchParams(window.location.search);
                                            params.set('page', page.toString());
                                            window.location.href = `/admin/demo-requests?${params.toString()}`;
                                        }}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
