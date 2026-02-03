import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import InputError from '@/components/input-error';

export default function CreateService() {
    const form = useForm({
        name: '',
        description: '',
        base_price: '',
        is_active: true,
        icon: '',
        display_order: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/services');
    };

    return (
        <AppLayout>
            <Head title="Crear Servicio" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4 mx-auto max-w-3xl">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/services">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-lg font-bold">Crear Servicio</h1>
                        <p className="text-muted-foreground">
                            Agrega un nuevo tipo de servicio
                        </p>
                    </div>
                </div>

                {/* Formulario */}
                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre del Servicio *</Label>
                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                placeholder="Ej: Reparación de Electrodomésticos"
                                required
                            />
                            <InputError message={form.errors.name} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Textarea
                                id="description"
                                value={form.data.description}
                                onChange={(e) => form.setData('description', e.target.value)}
                                placeholder="Describe el servicio..."
                                rows={4}
                            />
                            <InputError message={form.errors.description} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="base_price">Precio Base (Opcional)</Label>
                                <Input
                                    id="base_price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={form.data.base_price}
                                    onChange={(e) => form.setData('base_price', e.target.value)}
                                    placeholder="0.00"
                                />
                                <InputError message={form.errors.base_price} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="display_order">Orden de Visualización</Label>
                                <Input
                                    id="display_order"
                                    type="number"
                                    min="0"
                                    value={form.data.display_order}
                                    onChange={(e) => form.setData('display_order', parseInt(e.target.value) || 0)}
                                    placeholder="0"
                                />
                                <InputError message={form.errors.display_order} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="icon">Icono (Emoji o Texto)</Label>
                            <Input
                                id="icon"
                                value={form.data.icon}
                                onChange={(e) => form.setData('icon', e.target.value)}
                                placeholder="🔧"
                                maxLength={10}
                            />
                            <p className="text-xs text-muted-foreground">
                                Puedes usar un emoji o texto corto
                            </p>
                            <InputError message={form.errors.icon} />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="is_active"
                                checked={form.data.is_active}
                                onCheckedChange={(checked) => form.setData('is_active', checked === true)}
                            />
                            <Label htmlFor="is_active" className="cursor-pointer">
                                Servicio activo (visible para clientes)
                            </Label>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Link href="/services" className="flex-1">
                                <Button type="button" variant="outline" className="w-full">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={form.processing}
                                className="flex-1"
                            >
                                {form.processing ? 'Creando...' : 'Crear Servicio'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
