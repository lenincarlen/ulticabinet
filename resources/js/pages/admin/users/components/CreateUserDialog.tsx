import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import { Role } from '../types';
import { Eye, EyeOff } from 'lucide-react';


interface CreateUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    roles: Role[];
}

export default function CreateUserDialog({
    open,
    onOpenChange,
    roles,
}: CreateUserDialogProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

    const form = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
        is_active: true,
    });

    const handlePasswordChange = (value: string) => {
        form.setData('password', value);
        if (value.length > 0 && value.length < 8) {
            setPasswordErrors(['La contraseña debe tener al menos 8 caracteres.']);
        } else {
            setPasswordErrors([]);
        }
    };

    const handleSubmit = () => {
        if (form.data.password.length < 8) {
            setPasswordErrors(['La contraseña debe tener al menos 8 caracteres.']);
            return;
        }

        form.post('/users', {
            onSuccess: () => {
                onOpenChange(false);
                form.reset();
                setPasswordErrors([]);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Nuevo Usuario</DialogTitle>
                    <DialogDescription>
                        Crea una cuenta de acceso para un usuario.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre *</Label>
                        <Input
                            id="name"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            placeholder="Nombre del usuario"
                        />
                        <InputError message={form.errors.name} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            placeholder="usuario@ejemplo.com"
                        />
                        <InputError message={form.errors.email} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña *</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={form.data.password}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                placeholder="Ingrese una contraseña segura"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="size-4" />
                                ) : (
                                    <Eye className="size-4" />
                                )}
                            </Button>
                        </div>
                        {form.data.password && (
                            <div className="mt-2">
                                {passwordErrors.length > 0 && (
                                    <ul className="text-sm text-destructive space-y-1 mt-2">
                                        {passwordErrors.map((error, index) => (
                                            <li key={index} className="flex items-start gap-1">
                                                <span>•</span>
                                                <span>{error}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                            La contraseña debe tener al menos 8 caracteres.
                        </p>
                        <InputError message={form.errors.password} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Rol *</Label>
                        <Select
                            value={form.data.role}
                            onValueChange={(value) => form.setData('role', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar rol" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem key={role.id} value={role.name}>
                                        {role.display_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={form.errors.role} />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="is_active"
                            checked={form.data.is_active}
                            onCheckedChange={(checked) => form.setData('is_active', checked === true)}
                        />
                        <Label htmlFor="is_active" className="cursor-pointer">
                            Usuario activo
                        </Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => {
                            onOpenChange(false);
                            form.reset();
                            setPasswordErrors([]);
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} disabled={form.processing}>
                        {form.processing ? 'Creando...' : 'Crear Usuario'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

