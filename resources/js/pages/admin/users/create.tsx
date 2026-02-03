import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Staff, Role } from './types';
import CreateUserDialog from './components/CreateUserDialog';

interface Props {
    staffWithoutUsers: Staff[];
    roles: Role[];
}

export default function CreateUser({ staffWithoutUsers = [], roles = [] }: Props) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(true);

    const handleDialogClose = (open: boolean) => {
        setIsCreateDialogOpen(open);
        if (!open) {
            // Redirigir a la página de índice cuando se cierra el diálogo
            router.visit('/users');
        }
    };

    return (
        <AppLayout>
            <Head title="Crear Usuario" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.visit('/users')}
                    >
                        <ArrowLeft className="size-4" />
                    </Button>
                    <div>
                        <h1 className="text-lg font-bold">Crear Usuario</h1>
                        <p className="text-muted-foreground">
                            Crea una cuenta de acceso para un empleado
                        </p>
                    </div>
                </div>

                <CreateUserDialog
                    open={isCreateDialogOpen}
                    onOpenChange={handleDialogClose}
                    staffWithoutUsers={staffWithoutUsers}
                    roles={roles}
                />
            </div>
        </AppLayout>
    );
}

