import React from 'react';
import { useForm, router } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { User, Phone, Mail, MapPin, CreditCard } from 'lucide-react';

interface CreateCustomerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateCustomerDialog({
    open,
    onOpenChange,
}: CreateCustomerDialogProps) {
    const form = useForm({
        nombre: '',
        apellido: '',
        cedula: '',
        telefono: '',
        email: '',
        address: '',
        latitude: '',
        longitude: '',
    });

    const handleSubmit = () => {
        form.post('/customers', {
            onSuccess: () => {
                onOpenChange(false);
                form.reset();
                router.reload();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl min-h-screen overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Crear Nuevo Cliente</DialogTitle>
                    <DialogDescription>
                        Complete los datos del cliente. Los campos marcados con * son obligatorios.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="nombre" className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Nombre *
                            </Label>
                            <Input
                                id="nombre"
                                value={form.data.nombre}
                                onChange={(e) => form.setData('nombre', e.target.value)}
                                placeholder="Juan"
                                required
                            />
                            <InputError message={form.errors.nombre} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="apellido">
                                Apellido
                            </Label>
                            <Input
                                id="apellido"
                                value={form.data.apellido}
                                onChange={(e) => form.setData('apellido', e.target.value)}
                                placeholder="Pérez"
                            />
                            <InputError message={form.errors.apellido} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="cedula" className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                Cédula
                            </Label>
                            <Input
                                id="cedula"
                                value={form.data.cedula}
                                onChange={(e) => form.setData('cedula', e.target.value)}
                                placeholder="001-1234567-8"
                            />
                            <InputError message={form.errors.cedula} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="telefono" className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                Teléfono *
                            </Label>
                            <Input
                                id="telefono"
                                type="tel"
                                value={form.data.telefono}
                                onChange={(e) => form.setData('telefono', e.target.value)}
                                placeholder="18091234567"
                                required
                            />
                            <InputError message={form.errors.telefono} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Correo Electrónico
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            placeholder="juan@ejemplo.com"
                        />
                        <InputError message={form.errors.email} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address" className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Dirección
                        </Label>
                        <Input
                            id="address"
                            value={form.data.address}
                            onChange={(e) => form.setData('address', e.target.value)}
                            placeholder="Calle Principal #123, Ciudad"
                        />
                        <InputError message={form.errors.address} />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => {
                            onOpenChange(false);
                            form.reset();
                        }}
                        disabled={form.processing}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={form.processing}
                    >
                        {form.processing ? 'Creando...' : 'Crear Cliente'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

