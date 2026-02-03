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
import { Staff, Role } from '../types';
import { Eye, EyeOff } from 'lucide-react';
import { validatePassword, getPasswordStrength } from '../../staff/utils/passwordValidation';

interface CreateUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    staffWithoutUsers: Staff[];
    roles: Role[];
}

export default function CreateUserDialog({
    open,
    onOpenChange,
    staffWithoutUsers,
    roles,
}: CreateUserDialogProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

    const form = useForm({
        staff_id: '',
        email: '',
        password: '',
        role: '',
        is_active: true,
    });

    const handlePasswordChange = (value: string) => {
        form.setData('password', value);
        const validation = validatePassword(value);
        setPasswordErrors(validation.errors);
    };

    const handleSubmit = () => {
        // Validar contraseña antes de enviar
        const passwordValidation = validatePassword(form.data.password);
        if (!passwordValidation.isValid) {
            setPasswordErrors(passwordValidation.errors);
            return;
        }

        // Si hay staff seleccionado, usar su email
        const submitData = { ...form.data };
        if (selectedStaff && submitData.email !== selectedStaff.email) {
            submitData.email = selectedStaff.email;
            form.setData('email', selectedStaff.email);
        }

        form.post('/users', {
            onSuccess: () => {
                onOpenChange(false);
                form.reset();
                setPasswordErrors([]);
            },
        });
    };

    const selectedStaff = staffWithoutUsers.find(s => s.id === form.data.staff_id);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Nuevo Usuario</DialogTitle>
                    <DialogDescription>
                        Crea una cuenta de acceso para un empleado
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="staff_id">Empleado *</Label>
                        <Select
                            value={form.data.staff_id}
                            onValueChange={(value) => form.setData('staff_id', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar empleado" />
                            </SelectTrigger>
                            <SelectContent>
                                {staffWithoutUsers.length === 0 ? (
                                    <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                        No hay empleados disponibles
                                    </div>
                                ) : (
                                    staffWithoutUsers.map((staff) => (
                                        <SelectItem key={staff.id} value={staff.id}>
                                            {staff.name} ({staff.email})
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                        {selectedStaff && (
                            <p className="text-xs text-muted-foreground">
                                Se usará el nombre del empleado: <strong>{selectedStaff.name}</strong>
                            </p>
                        )}
                        <InputError message={form.errors.staff_id} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            placeholder={selectedStaff?.email || 'usuario@ejemplo.com'}
                            disabled={!!selectedStaff}
                        />
                        {selectedStaff && (
                            <p className="text-xs text-muted-foreground">
                                El email debe coincidir con el email del empleado: <strong>{selectedStaff.email}</strong>
                            </p>
                        )}
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
                        <p className="text-xs text-muted-foreground mt-1">
                            La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales.
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
                    <Button onClick={handleSubmit} disabled={form.processing || staffWithoutUsers.length === 0}>
                        {form.processing ? 'Creando...' : 'Crear Usuario'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

