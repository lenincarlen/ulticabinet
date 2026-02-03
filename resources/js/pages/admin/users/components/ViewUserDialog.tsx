import React from 'react';
import { router } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, User as UserIcon, Mail, Shield, Calendar } from 'lucide-react';
import { User } from '../types';

interface ViewUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User | null;
}

export default function ViewUserDialog({
    open,
    onOpenChange,
    user,
}: ViewUserDialogProps) {
    if (!user) return null;

    const getRoleDisplayName = () => {
        if (user.roles && user.roles.length > 0) {
            return user.roles[0].display_name;
        }
        return 'Sin rol';
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{user.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-muted-foreground">Nombre</Label>
                            <p className="font-medium flex items-center gap-2 mt-1">
                                <UserIcon className="size-4" />
                                {user.name}
                            </p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">Email</Label>
                            <p className="font-medium flex items-center gap-2 mt-1">
                                <Mail className="size-4" />
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-muted-foreground">Rol</Label>
                            <p className="font-medium flex items-center gap-2 mt-1">
                                <Shield className="size-4" />
                                {getRoleDisplayName()}
                            </p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">Estado</Label>
                            <div className="mt-1">
                                <Badge variant={user.is_active ? 'default' : 'secondary'}>
                                    {user.is_active ? 'Activo' : 'Inactivo'}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {user.staff && (
                        <div>
                            <Label className="text-muted-foreground">Empleado Asociado</Label>
                            <p className="font-medium mt-1">{user.staff.name}</p>
                            {user.staff.role && (
                                <p className="text-sm text-muted-foreground mt-1">
                                    Rol del empleado: {user.staff.role}
                                </p>
                            )}
                        </div>
                    )}

                    {user.email_verified_at && (
                        <div>
                            <Label className="text-muted-foreground">Email Verificado</Label>
                            <p className="font-medium flex items-center gap-2 mt-1">
                                <Calendar className="size-4" />
                                {new Date(user.email_verified_at).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cerrar
                    </Button>
                    <Button
                        onClick={() => router.visit(`/users/${user.id}/edit`)}
                    >
                        <Edit className="size-4 mr-2" />
                        Editar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

