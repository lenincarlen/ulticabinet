import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Plus, Edit2, Eye, Trash2, User, Phone, Mail, MapPin, Search, MoreVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Customer } from './types';
import { SharedData } from '@/types';
import { isAdmin } from '@/lib/roles';
import CreateCustomerDialog from './components/CreateCustomerDialog';
import ViewCustomerDialog from './components/ViewCustomerDialog';
import EditCustomerDialog from './components/EditCustomerDialog';
import DeleteCustomerDialog from './components/DeleteCustomerDialog';

interface Staff {
    id: string;
    name: string;
    email?: string;
}

interface Props {
    customers: Customer[];
    // staff?: Staff[];
}

export default function CustomersIndex({ customers = [] }: Props) {
    const { auth } = usePage<SharedData>().props;
    const userRoles = auth.user?.roles || [];
    const canDelete = isAdmin(userRoles);

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [search, setSearch] = useState('');

    const openViewDialog = (customer: Customer) => {
        setSelectedCustomer(customer);
        setIsViewDialogOpen(true);
    };

    const openEditDialog = (customer: Customer) => {
        setSelectedCustomer(customer);
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (customer: Customer) => {
        setSelectedCustomer(customer);
        setIsDeleteDialogOpen(true);
    };

    const filteredCustomers = customers.filter((customer) => {
        const searchLower = search.toLowerCase();
        const fullName = `${customer.nombre || customer.name || ''} ${customer.apellido || ''}`.toLowerCase();
        const email = (customer.email || '').toLowerCase();
        const phone = (customer.telefono || customer.phone || '').toLowerCase();
        const cedula = (customer.cedula || '').toLowerCase();

        return (
            fullName.includes(searchLower) ||
            email.includes(searchLower) ||
            phone.includes(searchLower) ||
            cedula.includes(searchLower)
        );
    });

    const handleSearch = () => {
        // La búsqueda ya se aplica automáticamente
    };

    return (
        <AppLayout>
            <Head title="Clientes" />

            <div className="flex h-full flex-1 flex-col gap-3 p-4 lg:">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-lg font-bold">Clientes</h1>
                        <p className="text-muted-foreground">
                            Gestiona los clientes de tu empresa
                        </p>
                    </div>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo Cliente
                    </Button>
                </div>

                {/* Filtros */}
                <Card className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative md:col-span-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nombre, email, teléfono o cédula..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="pl-9"
                            />
                        </div>
                        <Button onClick={handleSearch} className="w-full md:w-auto">
                            <Search className="mr-2 h-4 w-4" />
                            Buscar
                        </Button>
                    </div>
                </Card>

                {/* Tabla */}
                <Card className="p-4">
                    {filteredCustomers.length === 0 ? (
                        <div className="py-12 text-center">
                            <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                {search ? 'No se encontraron clientes' : 'No hay clientes registrados'}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                {search
                                    ? 'Intenta con otros términos de búsqueda'
                                    : 'Crea tu primer cliente para comenzar.'
                                }
                            </p>
                            {!search && (
                                <Button onClick={() => setIsCreateDialogOpen(true)}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Crear Cliente
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-3 text-left text-sm font-medium">Cliente</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Contacto</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Dirección</th>

                                        <th className="px-4 py-3 text-left text-sm font-medium">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomers.map((customer) => (
                                        <tr key={customer.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center shrink-0">
                                                        <User className="w-4 h-4 text-gray-500" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">
                                                            {customer.nombre_completo || `${customer.nombre || customer.name || ''} ${customer.apellido || ''}`.trim() || 'Sin nombre'}
                                                        </div>
                                                        {customer.email && (
                                                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                                <Mail className="w-3 h-3" />
                                                                {customer.email}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                {customer.telefono || customer.phone ? (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        {customer.telefono || customer.phone}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground text-sm">-</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground max-w-xs">
                                                    {customer.address ? (
                                                        <>

                                                            <span className="truncate">{customer.address}</span>
                                                        </>
                                                    ) : (
                                                        <span>-</span>
                                                    )}
                                                </div>
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
                                                            <DropdownMenuItem onClick={() => openViewDialog(customer)}>
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                Ver detalles
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => openEditDialog(customer)}>
                                                                <Edit2 className="w-4 h-4 mr-2" />
                                                                Editar
                                                            </DropdownMenuItem>
                                                            {canDelete && (
                                                                <>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem
                                                                        onClick={() => openDeleteDialog(customer)}
                                                                        className="text-destructive focus:text-destructive"
                                                                    >
                                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                                        Eliminar
                                                                    </DropdownMenuItem>
                                                                </>
                                                            )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>

            {/* Dialogs */}
            <CreateCustomerDialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
            />

            {selectedCustomer && (
                <>
                    <ViewCustomerDialog
                        open={isViewDialogOpen}
                        onOpenChange={setIsViewDialogOpen}
                        customer={selectedCustomer}
                    />
                    <EditCustomerDialog
                        open={isEditDialogOpen}
                        onOpenChange={setIsEditDialogOpen}
                        customer={selectedCustomer}
                    // staff={staff}
                    />
                    <DeleteCustomerDialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                        customer={selectedCustomer}
                    />
                </>
            )}
        </AppLayout>
    );
}
