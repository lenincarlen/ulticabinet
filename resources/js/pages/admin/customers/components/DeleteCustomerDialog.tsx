import React from 'react';
import { router } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { Customer } from '../types';

interface DeleteCustomerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    customer: Customer;
}

export default function DeleteCustomerDialog({
    open,
    onOpenChange,
    customer,
}: DeleteCustomerDialogProps) {
    const handleDelete = () => {
        router.delete(`/customers/${customer.id}`, {
            onSuccess: () => {
                onOpenChange(false);
                router.reload();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="w-5 h-5" />
                        Eliminar Cliente
                    </DialogTitle>
                    <DialogDescription>
                        ¿Está seguro de que desea eliminar a{' '}
                        <strong>
                            {customer.nombre_completo || `${customer.nombre || customer.name || ''} ${customer.apellido || ''}`.trim()}
                        </strong>?
                        <br />
                        Esta acción no se puede deshacer.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancelar
                    </Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

