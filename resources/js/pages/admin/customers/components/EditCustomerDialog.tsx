import React, { useEffect, useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import { User, Phone, Mail, MapPin, CreditCard, Calendar, TrendingUp, Clock, Activity, UserCog, Globe, Heart, MessageSquare } from 'lucide-react';
import { Customer } from '../types';

interface Staff {
    id: string;
    name: string;
    email?: string;
}

interface EditCustomerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    customer: Customer;
    // staff?: Staff[];
}

export default function EditCustomerDialog({
    open,
    onOpenChange,
    customer,
    // staff = [],
}: EditCustomerDialogProps) {
    const [socialMedia, setSocialMedia] = useState<Record<string, string>>({
        facebook: customer.social_media?.facebook || '',
        instagram: customer.social_media?.instagram || '',
        linkedin: customer.social_media?.linkedin || '',
        twitter: customer.social_media?.twitter || '',
        tiktok: customer.social_media?.tiktok || '',
        youtube: customer.social_media?.youtube || '',
    });

    const [preferredChannels, setPreferredChannels] = useState<string[]>(customer.preferred_channels || []);

    const form = useForm({
        // Información básica
        nombre: customer.nombre || customer.name || '',
        apellido: customer.apellido || '',
        cedula: customer.cedula || '',
        rnc: customer.rnc || '',
        id_type: customer.id_type || '',
        business_name: customer.business_name || '',
        date_of_birth: customer.date_of_birth || '',
        // Contacto
        telefono: customer.telefono || customer.phone || '',
        email: customer.email || '',
        // Dirección
        address: customer.address || '',
        city: customer.city || '',
        country: customer.country || 'República Dominicana',
        latitude: customer.latitude?.toString() || '',
        longitude: customer.longitude?.toString() || '',
        // CRM
        status: customer.status || 'active',
        customer_lifetime_value: customer.customer_lifetime_value?.toString() || '0',
        segment: customer.segment || '',
        category: customer.category || 'none',
        // account_manager_id: customer.account_manager_id || 'none',
        // Último contacto
        last_contact_date: customer.last_contact_date ? new Date(customer.last_contact_date).toISOString().slice(0, 16) : '',
        last_contact_type: customer.last_contact_type || 'none',
        last_contact_notes: customer.last_contact_notes || '',
        // Próxima acción
        next_action_date: customer.next_action_date ? new Date(customer.next_action_date).toISOString().slice(0, 16) : '',
        next_action_type: customer.next_action_type || 'none',
        next_action_notes: customer.next_action_notes || '',
        // Marketing
        marketing_consent: customer.marketing_consent || false,
        marketing_consent_date: customer.marketing_consent_date ? new Date(customer.marketing_consent_date).toISOString().slice(0, 16) : '',
        // Satisfacción
        satisfaction_score: customer.satisfaction_score?.toString() || '',
        // JSON fields - usar valores iniciales simples
        preferred_channels: [] as any,
        social_media: {} as any,
        preferences: {} as any,
    });

    useEffect(() => {
        if (customer) {
            form.setData({
                nombre: customer.nombre || customer.name || '',
                apellido: customer.apellido || '',
                cedula: customer.cedula || '',
                rnc: customer.rnc || '',
                id_type: customer.id_type || 'none',
                business_name: customer.business_name || '',
                date_of_birth: customer.date_of_birth || '',
                telefono: customer.telefono || customer.phone || '',
                email: customer.email || '',
                address: customer.address || '',
                city: customer.city || '',
                country: customer.country || 'República Dominicana',
                latitude: customer.latitude?.toString() || '',
                longitude: customer.longitude?.toString() || '',
                status: customer.status || 'active',
                customer_lifetime_value: customer.customer_lifetime_value?.toString() || '0',
                segment: customer.segment || '',
                category: customer.category || '',
                // account_manager_id: customer.account_manager_id || '',
                last_contact_date: customer.last_contact_date ? new Date(customer.last_contact_date).toISOString().slice(0, 16) : '',
                last_contact_type: customer.last_contact_type || '',
                last_contact_notes: customer.last_contact_notes || '',
                next_action_date: customer.next_action_date ? new Date(customer.next_action_date).toISOString().slice(0, 16) : '',
                next_action_type: customer.next_action_type || '',
                next_action_notes: customer.next_action_notes || '',
                marketing_consent: customer.marketing_consent || false,
                marketing_consent_date: customer.marketing_consent_date ? new Date(customer.marketing_consent_date).toISOString().slice(0, 16) : '',
                satisfaction_score: customer.satisfaction_score?.toString() || '',
                preferred_channels: (customer.preferred_channels || []) as any,
                social_media: (customer.social_media || {}) as any,
                preferences: (customer.preferences || {}) as any,
            });

            setSocialMedia({
                facebook: customer.social_media?.facebook || '',
                instagram: customer.social_media?.instagram || '',
                linkedin: customer.social_media?.linkedin || '',
                twitter: customer.social_media?.twitter || '',
                tiktok: customer.social_media?.tiktok || '',
                youtube: customer.social_media?.youtube || '',
            });

            setPreferredChannels(customer.preferred_channels || []);
        }
    }, [customer]);

    const handlePreferredChannelChange = (channel: string, checked: boolean) => {
        if (checked) {
            setPreferredChannels([...preferredChannels, channel]);
        } else {
            setPreferredChannels(preferredChannels.filter(c => c !== channel));
        }
    };

    const handleSocialMediaChange = (platform: string, value: string) => {
        setSocialMedia({ ...socialMedia, [platform]: value });
    };

    const handleSubmit = () => {
        // Preparar datos para enviar con todas las conversiones necesarias
        const submitData: any = {
            nombre: form.data.nombre,
            apellido: form.data.apellido,
            cedula: form.data.cedula || null,
            rnc: form.data.rnc || null,
            // Convertir "none" a null para campos opcionales
            id_type: form.data.id_type && form.data.id_type !== "none" ? form.data.id_type : null,
            business_name: form.data.business_name || null,
            date_of_birth: form.data.date_of_birth || null,
            telefono: form.data.telefono,
            email: form.data.email || null,
            address: form.data.address || null,
            city: form.data.city || null,
            country: form.data.country || 'República Dominicana',
            latitude: form.data.latitude ? parseFloat(form.data.latitude) : null,
            longitude: form.data.longitude ? parseFloat(form.data.longitude) : null,
            status: form.data.status,
            customer_lifetime_value: form.data.customer_lifetime_value ? parseFloat(form.data.customer_lifetime_value) : 0,
            segment: form.data.segment || null,
            // Convertir "none" a null para category
            category: form.data.category && form.data.category !== "none" ? form.data.category : null,
            // Convertir "none" a null para account_manager_id
            // account_manager_id: form.data.account_manager_id && form.data.account_manager_id !== "none" ? form.data.account_manager_id : null,
            last_contact_date: form.data.last_contact_date || null,
            // Convertir "none" a null para last_contact_type
            last_contact_type: form.data.last_contact_type && form.data.last_contact_type !== "none" ? form.data.last_contact_type : null,
            last_contact_notes: form.data.last_contact_notes || null,
            next_action_date: form.data.next_action_date || null,
            // Convertir "none" a null para next_action_type
            next_action_type: form.data.next_action_type && form.data.next_action_type !== "none" ? form.data.next_action_type : null,
            next_action_notes: form.data.next_action_notes || null,
            preferred_channels: preferredChannels,
            social_media: socialMedia,
            preferences: form.data.preferences || {},
            marketing_consent: form.data.marketing_consent,
            marketing_consent_date: form.data.marketing_consent ? (form.data.marketing_consent_date || new Date().toISOString().slice(0, 16)) : null,
            satisfaction_score: form.data.satisfaction_score ? parseInt(form.data.satisfaction_score) : null,
        };

        // Usar router.put directamente para enviar los datos
        router.put(`/customers/${customer.id}`, submitData, {
            onSuccess: () => {
                onOpenChange(false);
                router.reload();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden p-0 flex flex-col">
                <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle>Editar Cliente</DialogTitle>
                    <DialogDescription>
                        Actualice los datos del cliente. Los campos marcados con * son obligatorios.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto">
                    <Tabs defaultValue="basic" className="w-full">
                        <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-6 h-auto p-0">
                            <TabsTrigger
                                value="basic"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3"
                            >
                                <User className="w-4 h-4 mr-2" />
                                Información Básica
                            </TabsTrigger>
                            <TabsTrigger
                                value="crm"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3"
                            >
                                <TrendingUp className="w-4 h-4 mr-2" />
                                CRM
                            </TabsTrigger>
                            <TabsTrigger
                                value="contact"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3"
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Contacto y Marketing
                            </TabsTrigger>
                        </TabsList>

                        <div className="px-6 py-6">
                            {/* Información Básica */}
                            <TabsContent value="basic" className="mt-0 space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Datos Personales</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-nombre" className="flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                Nombre *
                                            </Label>
                                            <Input
                                                id="edit-nombre"
                                                value={form.data.nombre}
                                                onChange={(e) => form.setData('nombre', e.target.value)}
                                                placeholder="Juan"
                                                required
                                            />
                                            <InputError message={form.errors.nombre} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-apellido">Apellido</Label>
                                            <Input
                                                id="edit-apellido"
                                                value={form.data.apellido}
                                                onChange={(e) => form.setData('apellido', e.target.value)}
                                                placeholder="Pérez"
                                            />
                                            <InputError message={form.errors.apellido} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-cedula" className="flex items-center gap-2">
                                                <CreditCard className="w-4 h-4" />
                                                Cédula
                                            </Label>
                                            <Input
                                                id="edit-cedula"
                                                value={form.data.cedula}
                                                onChange={(e) => form.setData('cedula', e.target.value)}
                                                placeholder="001-1234567-8"
                                            />
                                            <InputError message={form.errors.cedula} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-rnc">RNC</Label>
                                            <Input
                                                id="edit-rnc"
                                                value={form.data.rnc}
                                                onChange={(e) => form.setData('rnc', e.target.value)}
                                                placeholder="123456789"
                                            />
                                            <InputError message={form.errors.rnc} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-id_type">Tipo de Documento</Label>
                                            <Select
                                                value={form.data.id_type || "none"}
                                                onValueChange={(value) => form.setData('id_type', value === "none" ? "" : value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">Sin tipo</SelectItem>
                                                    <SelectItem value="CEDULA">Cédula</SelectItem>
                                                    <SelectItem value="RNC">RNC</SelectItem>
                                                    <SelectItem value="PASAPORTE">Pasaporte</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={form.errors.id_type} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-business_name">Nombre Comercial</Label>
                                            <Input
                                                id="edit-business_name"
                                                value={form.data.business_name}
                                                onChange={(e) => form.setData('business_name', e.target.value)}
                                                placeholder="Nombre de la empresa"
                                            />
                                            <InputError message={form.errors.business_name} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-date_of_birth" className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                Fecha de Nacimiento
                                            </Label>
                                            <Input
                                                id="edit-date_of_birth"
                                                type="date"
                                                value={form.data.date_of_birth}
                                                onChange={(e) => form.setData('date_of_birth', e.target.value)}
                                            />
                                            <InputError message={form.errors.date_of_birth} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 border-t pt-4">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Información de Contacto</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-telefono" className="flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                Teléfono *
                                            </Label>
                                            <Input
                                                id="edit-telefono"
                                                type="tel"
                                                value={form.data.telefono}
                                                onChange={(e) => form.setData('telefono', e.target.value)}
                                                placeholder="18091234567"
                                                required
                                            />
                                            <InputError message={form.errors.telefono} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-email" className="flex items-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                Correo Electrónico
                                            </Label>
                                            <Input
                                                id="edit-email"
                                                type="email"
                                                value={form.data.email}
                                                onChange={(e) => form.setData('email', e.target.value)}
                                                placeholder="juan@ejemplo.com"
                                            />
                                            <InputError message={form.errors.email} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 border-t pt-4">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        Dirección y Ubicación
                                    </h3>

                                    <div className="space-y-2">
                                        <Label htmlFor="edit-address">Dirección</Label>
                                        <Input
                                            id="edit-address"
                                            value={form.data.address}
                                            onChange={(e) => form.setData('address', e.target.value)}
                                            placeholder="Calle Principal #123"
                                        />
                                        <InputError message={form.errors.address} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-city">Ciudad</Label>
                                            <Input
                                                id="edit-city"
                                                value={form.data.city}
                                                onChange={(e) => form.setData('city', e.target.value)}
                                                placeholder="Santo Domingo"
                                            />
                                            <InputError message={form.errors.city} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-country">País</Label>
                                            <Input
                                                id="edit-country"
                                                value={form.data.country}
                                                onChange={(e) => form.setData('country', e.target.value)}
                                                placeholder="República Dominicana"
                                            />
                                            <InputError message={form.errors.country} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-latitude">Latitud</Label>
                                            <Input
                                                id="edit-latitude"
                                                type="number"
                                                step="any"
                                                value={form.data.latitude}
                                                onChange={(e) => form.setData('latitude', e.target.value)}
                                                placeholder="18.4861"
                                            />
                                            <InputError message={form.errors.latitude} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-longitude">Longitud</Label>
                                            <Input
                                                id="edit-longitude"
                                                type="number"
                                                step="any"
                                                value={form.data.longitude}
                                                onChange={(e) => form.setData('longitude', e.target.value)}
                                                placeholder="-69.9312"
                                            />
                                            <InputError message={form.errors.longitude} />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* CRM */}
                            <TabsContent value="crm" className="mt-0 space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Información CRM</h3>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-status">Estado</Label>
                                            <Select
                                                value={form.data.status}
                                                onValueChange={(value) => form.setData('status', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">Activo</SelectItem>
                                                    <SelectItem value="inactive">Inactivo</SelectItem>
                                                    <SelectItem value="potential">Potencial</SelectItem>
                                                    <SelectItem value="vip">VIP</SelectItem>
                                                    <SelectItem value="blocked">Bloqueado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={form.errors.status} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-segment">Segmento</Label>
                                            <Input
                                                id="edit-segment"
                                                value={form.data.segment}
                                                onChange={(e) => form.setData('segment', e.target.value)}
                                                placeholder="VIP, Regular, etc."
                                            />
                                            <InputError message={form.errors.segment} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-category">Categoría</Label>
                                            <Select
                                                value={form.data.category || "none"}
                                                onValueChange={(value) => form.setData('category', value === "none" ? "" : value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">Sin categoría</SelectItem>
                                                    <SelectItem value="residential">Residencial</SelectItem>
                                                    <SelectItem value="commercial">Comercial</SelectItem>
                                                    <SelectItem value="corporate">Corporativo</SelectItem>
                                                    <SelectItem value="industrial">Industrial</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={form.errors.category} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-customer_lifetime_value">Valor del Cliente (CLV)</Label>
                                            <Input
                                                id="edit-customer_lifetime_value"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={form.data.customer_lifetime_value}
                                                onChange={(e) => form.setData('customer_lifetime_value', e.target.value)}
                                                placeholder="0.00"
                                            />
                                            <InputError message={form.errors.customer_lifetime_value} />
                                        </div>

                                        {/* 
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-account_manager_id">Responsable de Cuenta</Label>
                                            <Select
                                                value={form.data.account_manager_id || "none"}
                                                onValueChange={(value) => form.setData('account_manager_id', value === "none" ? "" : value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">Sin responsable</SelectItem>
                                                    {staff.map((person) => (
                                                        <SelectItem key={person.id} value={person.id}>
                                                            {person.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={form.errors.account_manager_id} />
                                        </div> 
                                        */}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="edit-satisfaction_score">Nivel de Satisfacción (1-10)</Label>
                                        <Input
                                            id="edit-satisfaction_score"
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={form.data.satisfaction_score}
                                            onChange={(e) => form.setData('satisfaction_score', e.target.value)}
                                            placeholder="5"
                                        />
                                        <InputError message={form.errors.satisfaction_score} />
                                    </div>
                                </div>

                                <div className="space-y-4 border-t pt-4">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        Último Contacto
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-last_contact_date">Fecha y Hora</Label>
                                            <Input
                                                id="edit-last_contact_date"
                                                type="datetime-local"
                                                value={form.data.last_contact_date}
                                                onChange={(e) => form.setData('last_contact_date', e.target.value)}
                                            />
                                            <InputError message={form.errors.last_contact_date} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-last_contact_type">Tipo de Contacto</Label>
                                            <Select
                                                value={form.data.last_contact_type || "none"}
                                                onValueChange={(value) => form.setData('last_contact_type', value === "none" ? "" : value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">Sin tipo</SelectItem>
                                                    <SelectItem value="phone">Teléfono</SelectItem>
                                                    <SelectItem value="email">Email</SelectItem>
                                                    <SelectItem value="visit">Visita</SelectItem>
                                                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                                    <SelectItem value="sms">SMS</SelectItem>
                                                    <SelectItem value="meeting">Reunión</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={form.errors.last_contact_type} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="edit-last_contact_notes">Notas del Contacto</Label>
                                        <Textarea
                                            id="edit-last_contact_notes"
                                            value={form.data.last_contact_notes}
                                            onChange={(e) => form.setData('last_contact_notes', e.target.value)}
                                            rows={3}
                                            placeholder="Detalles del último contacto..."
                                        />
                                        <InputError message={form.errors.last_contact_notes} />
                                    </div>
                                </div>

                                <div className="space-y-4 border-t pt-4">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Activity className="w-4 h-4" />
                                        Próxima Acción
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-next_action_date">Fecha y Hora</Label>
                                            <Input
                                                id="edit-next_action_date"
                                                type="datetime-local"
                                                value={form.data.next_action_date}
                                                onChange={(e) => form.setData('next_action_date', e.target.value)}
                                            />
                                            <InputError message={form.errors.next_action_date} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-next_action_type">Tipo de Acción</Label>
                                            <Select
                                                value={form.data.next_action_type || "none"}
                                                onValueChange={(value) => form.setData('next_action_type', value === "none" ? "" : value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">Sin tipo</SelectItem>
                                                    <SelectItem value="follow_up">Seguimiento</SelectItem>
                                                    <SelectItem value="quote">Cotización</SelectItem>
                                                    <SelectItem value="service">Servicio</SelectItem>
                                                    <SelectItem value="call">Llamada</SelectItem>
                                                    <SelectItem value="meeting">Reunión</SelectItem>
                                                    <SelectItem value="email">Email</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={form.errors.next_action_type} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="edit-next_action_notes">Notas de la Acción</Label>
                                        <Textarea
                                            id="edit-next_action_notes"
                                            value={form.data.next_action_notes}
                                            onChange={(e) => form.setData('next_action_notes', e.target.value)}
                                            rows={3}
                                            placeholder="Detalles de la próxima acción..."
                                        />
                                        <InputError message={form.errors.next_action_notes} />
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Contacto y Marketing */}
                            <TabsContent value="contact" className="mt-0 space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4" />
                                        Canales Preferidos
                                    </h3>

                                    <div className="space-y-3">
                                        {['email', 'phone', 'whatsapp', 'sms', 'visit', 'meeting'].map((channel) => (
                                            <div key={channel} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`channel-${channel}`}
                                                    checked={preferredChannels.includes(channel)}
                                                    onCheckedChange={(checked) => handlePreferredChannelChange(channel, checked as boolean)}
                                                />
                                                <Label
                                                    htmlFor={`channel-${channel}`}
                                                    className="text-sm font-normal cursor-pointer"
                                                >
                                                    {channel.charAt(0).toUpperCase() + channel.slice(1)}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4 border-t pt-4">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Globe className="w-4 h-4" />
                                        Redes Sociales
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="edit-social-facebook">Facebook</Label>
                                            <Input
                                                id="edit-social-facebook"
                                                type="url"
                                                value={socialMedia.facebook}
                                                onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                                                placeholder="https://facebook.com/usuario"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-social-instagram">Instagram</Label>
                                            <Input
                                                id="edit-social-instagram"
                                                type="url"
                                                value={socialMedia.instagram}
                                                onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                                                placeholder="https://instagram.com/usuario"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-social-linkedin">LinkedIn</Label>
                                            <Input
                                                id="edit-social-linkedin"
                                                type="url"
                                                value={socialMedia.linkedin}
                                                onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                                                placeholder="https://linkedin.com/in/usuario"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-social-twitter">Twitter/X</Label>
                                            <Input
                                                id="edit-social-twitter"
                                                type="url"
                                                value={socialMedia.twitter}
                                                onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                                                placeholder="https://twitter.com/usuario"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-social-tiktok">TikTok</Label>
                                            <Input
                                                id="edit-social-tiktok"
                                                type="url"
                                                value={socialMedia.tiktok}
                                                onChange={(e) => handleSocialMediaChange('tiktok', e.target.value)}
                                                placeholder="https://tiktok.com/@usuario"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="edit-social-youtube">YouTube</Label>
                                            <Input
                                                id="edit-social-youtube"
                                                type="url"
                                                value={socialMedia.youtube}
                                                onChange={(e) => handleSocialMediaChange('youtube', e.target.value)}
                                                placeholder="https://youtube.com/@usuario"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 border-t pt-4">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Heart className="w-4 h-4" />
                                        Marketing
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="edit-marketing_consent"
                                                checked={form.data.marketing_consent}
                                                onCheckedChange={(checked) => {
                                                    form.setData('marketing_consent', checked as boolean);
                                                    if (checked) {
                                                        form.setData('marketing_consent_date', new Date().toISOString().slice(0, 16));
                                                    } else {
                                                        form.setData('marketing_consent_date', '');
                                                    }
                                                }}
                                            />
                                            <Label
                                                htmlFor="edit-marketing_consent"
                                                className="text-sm font-normal cursor-pointer"
                                            >
                                                Consentimiento para Marketing
                                            </Label>
                                        </div>

                                        {form.data.marketing_consent && (
                                            <div className="space-y-2">
                                                <Label htmlFor="edit-marketing_consent_date">Fecha de Consentimiento</Label>
                                                <Input
                                                    id="edit-marketing_consent_date"
                                                    type="datetime-local"
                                                    value={form.data.marketing_consent_date}
                                                    onChange={(e) => form.setData('marketing_consent_date', e.target.value)}
                                                />
                                                <InputError message={form.errors.marketing_consent_date} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>

                <DialogFooter className="px-6 py-4 border-t">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={form.processing}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={form.processing}
                    >
                        {form.processing ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
