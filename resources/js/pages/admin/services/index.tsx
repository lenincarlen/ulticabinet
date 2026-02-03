import React, { useState, useMemo } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2, Search, Wrench, DollarSign, MoreVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import type { Service } from './types';

interface Props {
    services: Service[];
}

export default function ServicesIndex({ services = [] }: Props) {
    const [search, setSearch] = useState('');

    const filteredServices = useMemo(() => {
        if (!search) return services;

        const searchLower = search.toLowerCase();
        return services.filter(service =>
            service.name.toLowerCase().includes(searchLower) ||
            service.description?.toLowerCase().includes(searchLower)
        );
    }, [services, search]);

    const handleDelete = (service: Service) => {
        if (confirm(`¿Estás seguro de eliminar el servicio "${service.name}"?`)) {
            router.delete(`/services/${service.id}`, {
                preserveScroll: true,
            });
        }
    };

    const formatPrice = (price?: number) => {
        if (!price) return 'N/A';
        return `RD$ ${parseFloat(String(price)).toFixed(2)}`;
    };

    return (
        <AppLayout>
            <Head title="Servicios" />

            <div className="flex h-full flex-1 flex-col gap-3 lg:p-3">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-lg font-bold flex items-center gap-2">
                         
                            Servicios
                        </h1>
                        <p className="text-muted-foreground">
                            Gestiona los tipos de servicios disponibles
                        </p>
                    </div>
                    <Link href="/services/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nuevo Servicio
                        </Button>
                    </Link>
                </div>

                {/* Filtros */}
                <Card className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por nombre o descripción..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </Card>

                {/* Tabla */}
                <Card className="p-4">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-3 text-left text-sm font-medium">Orden</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Nombre</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Descripción</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Precio Base</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Estado</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredServices.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                                            {search
                                                ? 'No se encontraron resultados'
                                                : 'No hay servicios registrados'}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredServices.map((service) => (
                                        <tr key={service.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3">
                                                <span className="font-mono text-sm">{service.display_order}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    {service.icon && (
                                                        <span className="text-lg">{service.icon}</span>
                                                    )}
                                                    <span className="font-medium">{service.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {service.description || 'Sin descripción'}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1 text-sm font-medium">
                                                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                                                    {formatPrice(service.base_price)}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge variant={service.is_active ? 'default' : 'secondary'}>
                                                    {service.is_active ? 'Activo' : 'Inactivo'}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/services/${service.id}/edit`} className="cursor-pointer">
                                                                    <Edit className="size-4 mr-2" />
                                                                    Editar
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() => handleDelete(service)}
                                                                className="text-destructive focus:text-destructive"
                                                            >
                                                                <Trash2 className="size-4 mr-2" />
                                                                Eliminar
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
