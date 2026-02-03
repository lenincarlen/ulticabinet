import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import { User, Role } from './types';
import { Eye, EyeOff } from 'lucide-react';
import { validatePassword, getPasswordStrength } from '../staff/utils/passwordValidation';

interface Props {
    user: User;
    roles: Role[];
}

export default function UserEdit({ user, roles = [] }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

    const form = useForm({
        email: user.email,
        password: '',
        role: user.roles?.[0]?.name || '',
        is_active: user.is_active,
    });

    const handlePasswordChange = (value: string) => {
        form.setData('password', value);
        if (value) {
            const validation = validatePassword(value);
            setPasswordErrors(validation.errors);
        } else {
            setPasswordErrors([]);
        }
    };

    const handleSubmit = () => {
        // Si hay contraseña, validarla
        if (form.data.password) {
            const passwordValidation = validatePassword(form.data.password);
            if (!passwordValidation.isValid) {
                setPasswordErrors(passwordValidation.errors);
                return;
            }
        }

        form.put(`/users/${user.id}`, {
            onSuccess: () => {
                router.visit('/users');
            },
        });
    };

    return (
        <AppLayout>
            <Head title={`Editar Usuario - ${user.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-bold">Editar Usuario</h1>
                        <p className="text-muted-foreground">
                            Actualice la información del usuario
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => router.visit('/users')}
                    >
                        Volver
                    </Button>
                </div>

                <div className="rounded-lg border bg-card p-6 max-w-2xl">
                    <div className="space-y-4">
                        <div>
                            <Label className="text-muted-foreground">Empleado</Label>
                            <p className="font-medium mt-1">{user.name}</p>
                            {user.staff && (
                                <p className="text-sm text-muted-foreground mt-1">
                                    {user.staff.name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={form.data.email}
                                onChange={(e) => form.setData('email', e.target.value)}
                            />
                            <InputError message={form.errors.email} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Nueva Contraseña</Label>
                            <p className="text-xs text-muted-foreground mb-2">
                                Deje en blanco si no desea cambiar la contraseña
                            </p>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.data.password}
                                    onChange={(e) => handlePasswordChange(e.target.value)}
                                    placeholder="Nueva contraseña (opcional)"
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
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`h-2 flex-1 rounded ${
                                            getPasswordStrength(form.data.password) === 'weak' ? 'bg-red-500' :
                                            getPasswordStrength(form.data.password) === 'medium' ? 'bg-yellow-500' :
                                            'bg-green-500'
                                        }`} />
                                        <span className="text-xs text-muted-foreground">
                                            {getPasswordStrength(form.data.password) === 'weak' ? 'Débil' :
                                             getPasswordStrength(form.data.password) === 'medium' ? 'Media' :
                                             'Fuerte'}
                                        </span>
                                    </div>
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

                    <div className="flex justify-end gap-2 mt-6">
                        <Button
                            variant="outline"
                            onClick={() => router.visit('/users')}
                        >
                            Cancelar
                        </Button>
                        <Button onClick={handleSubmit} disabled={form.processing}>
                            {form.processing ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

