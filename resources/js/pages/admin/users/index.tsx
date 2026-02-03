import React, { useState, useMemo } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Eye, Mail, Search, Shield, MoreVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { User, Staff, Role } from './types';
import CreateUserDialog from './components/CreateUserDialog';
import ViewUserDialog from './components/ViewUserDialog';
import DeleteUserDialog from './components/DeleteUserDialog';

interface Props {
    users: User[];
    staffWithoutUsers: Staff[];
    roles: Role[];
}

export default function UsersIndex({ users = [], staffWithoutUsers = [], roles = [] }: Props) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const openViewDialog = (user: User) => {
        setSelectedUser(user);
        setIsViewDialogOpen(true);
    };

    const openDeleteDialog = (user: User) => {
        setSelectedUser(user);
        setIsDeleteDialogOpen(true);
    };

    const getRoleDisplayName = (user: User) => {
        if (user.roles && user.roles.length > 0) {
            return user.roles[0].display_name;
        }
        return 'Sin rol';
    };

    const getRoleBadgeVariant = (roleName?: string) => {
        switch (roleName) {
            case 'admin':
                return 'destructive';
            case 'tecnico':
                return 'default';
            case 'operador':
                return 'secondary';
            case 'vendedor':
                return 'outline';
            default:
                return 'outline';
        }
    };

    const filteredUsers = useMemo(() => {
        let filtered = users;

        // Filtrar por búsqueda
        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(user => {
                const roleName = user.roles?.[0]?.display_name || '';
                return (
                    user.email?.toLowerCase().includes(searchLower) ||
                    user.staff?.name?.toLowerCase().includes(searchLower) ||
                    roleName.toLowerCase().includes(searchLower)
                );
            });
        }

        // Filtrar por estado
        if (filterStatus === 'active') {
            filtered = filtered.filter(u => u.is_active);
        } else if (filterStatus === 'inactive') {
            filtered = filtered.filter(u => !u.is_active);
        }

        return filtered;
    }, [users, search, filterStatus]);

    const handleSearch = () => {
        // La búsqueda ya se aplica automáticamente
    };

    function getUserStatusLabel(user: User) {
        return user.is_active ? 'Activo' : 'Inactivo';
    }

    function getUserStatusBadgeVariant(user: User) {
        return user.is_active ? 'default' : 'secondary';
    }

    return (
        <AppLayout>
            <Head title="Usuarios" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4 mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-lg font-bold">Usuarios</h1>
                        <p className="text-muted-foreground">
                            Gestiona los usuarios del sistema
                        </p>
                    </div>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo Usuario
                    </Button>
                </div>

                {/* Filtros */}
                <Card className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por email, empleado o rol..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="pl-9"
                            />
                        </div>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Todos los estados" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los estados</SelectItem>
                                <SelectItem value="active">Activos</SelectItem>
                                <SelectItem value="inactive">Inactivos</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={handleSearch} className="w-full">
                            <Search className="mr-2 h-4 w-4" />
                            Buscar
                        </Button>
                    </div>
                </Card>

                {/* Tabla */}
                <Card className="p-4">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b text-xs uppercase">
                                    <th className="px-4 py-3 text-left text-sm font-medium">Usuario</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Email</th>

                                    <th className="px-4 py-3 text-left text-sm font-medium">Rol</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Estado</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                                            {search || filterStatus !== 'all'
                                                ? 'No se encontraron resultados'
                                                : 'No hay usuarios registrados'}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="border-b hover:bg-muted/50 text-xs">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <Shield className="size-4 text-muted-foreground" />
                                                    <span className="font-medium">{user.staff?.name || user.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Mail className="size-3" />
                                                    {user.email}
                                                </div>
                                            </td>

                                            <td className="px-4 py-3">
                                                <Badge variant={getRoleBadgeVariant(user.roles?.[0]?.name)}>
                                                    {getRoleDisplayName(user)}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge variant={getUserStatusBadgeVariant(user)}>
                                                    {getUserStatusLabel(user)}
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
                                                            <DropdownMenuItem onClick={() => openViewDialog(user)}>
                                                                <Eye className="size-4 mr-2" />
                                                                Ver detalles
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => router.visit(`/users/${user.id}/edit`)}>
                                                                <Edit className="size-4 mr-2" />
                                                                Editar
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() => openDeleteDialog(user)}
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

                <CreateUserDialog
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}
                    staffWithoutUsers={staffWithoutUsers}
                    roles={roles}
                />

                <ViewUserDialog
                    open={isViewDialogOpen}
                    onOpenChange={setIsViewDialogOpen}
                    user={selectedUser}
                />

                <DeleteUserDialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                    user={selectedUser}
                />
            </div>
        </AppLayout>
    );
}
