import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
    User,
    Phone,
    Mail,
    MapPin,
    CreditCard,
    Calendar,
    FileText,
    TrendingUp,
    Clock,
    DollarSign,
    Activity,
    UserCog,
    Hash
} from 'lucide-react';
import { Customer } from '../types';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface ViewCustomerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    customer: Customer;
}

export default function ViewCustomerDialog({
    open,
    onOpenChange,
    customer,
}: ViewCustomerDialogProps) {
    // Manejar notas que pueden ser string[] o Array<{date, note, author}>
    const normalizeNotes = (notes: string[] | Array<{ date: string; note: string; author?: string }> | undefined): string[] => {
        if (!notes) return [];
        if (Array.isArray(notes)) {
            return notes.map((note: any) => {
                if (typeof note === 'string') return note;
                if (note && typeof note === 'object' && note.note) return note.note;
                return String(note);
            });
        }
        return [];
    };

    const [customerNotes, setCustomerNotes] = useState<string[]>(() => normalizeNotes(customer.notes));
    const [newNote, setNewNote] = useState('');
    const [selectedManagerTechnician, setSelectedManagerTechnician] = useState('');

    // Ejemplo de managers/técnicos (en un caso real, esto vendría de una API)
    const managersTechnicians = [
        { id: 'manager1', name: 'Manager 1' },
        { id: 'tecnico1', name: 'Técnico 1' },
        { id: 'manager2', name: 'Manager 2' },
        { id: 'tecnico2', name: 'Técnico 2' },
    ];

    const handleAddNote = () => {
        if (newNote.trim()) {
            setCustomerNotes([...customerNotes, newNote.trim()]);
            setNewNote('');
            console.log('Nueva nota añadida:', newNote.trim());
        }
    };

    const handleTransferCustomer = () => {
        if (selectedManagerTechnician) {
            console.log(`Cliente ${customer.nombre || customer.name} transferido a: ${selectedManagerTechnician}`);
            alert(`Cliente transferido a ${selectedManagerTechnician}`);
        } else {
            alert('Por favor, selecciona un Manager/Técnico para transferir.');
        }
    };

    // Get initials for avatar
    const getInitials = () => {
        const firstName = customer.nombre || customer.name || '';
        const lastName = customer.apellido || '';
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'CL';
    };

    // Calculate customer metrics
    const totalInvoices = customer.invoices?.length || 0;
    const totalQuotes = customer.quotes?.length || 0;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl h-[95vh] overflow-hidden p-0 flex flex-col">
                {/* Header */}
                <div className="border-b bg-gray-50 px-6 py-4">
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <DialogTitle className="text-2xl font-semibold text-gray-900">
                                    {customer.nombre || customer.name} {customer.apellido}
                                </DialogTitle>
                                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                    {customer.cedula && (
                                        <span className="flex items-center gap-1.5">
                                            <Hash className="w-3.5 h-3.5" />
                                            {customer.cedula}
                                        </span>
                                    )}
                                    {customer.created_at && (
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            Cliente desde {new Date(customer.created_at).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                {/* Stats Bar */}
                <div className="border-b bg-white px-6 py-4">
                    <div className="grid grid-cols-2 gap-6">


                        <div className="flex items-center gap-3">

                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Facturas</p>
                                <p className="text-2xl font-semibold text-gray-900">{totalInvoices}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">

                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Cotizaciones</p>
                                <p className="text-2xl font-semibold text-gray-900">{totalQuotes}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabbed Content */}
                <div className="flex-1 overflow-hidden">
                    <Tabs defaultValue="overview" className="h-full flex flex-col">
                        <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-6 h-auto p-0">
                            <TabsTrigger
                                value="overview"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3"
                            >
                                <User className="w-4 h-4 mr-2" />
                                Información
                            </TabsTrigger>
                            <TabsTrigger
                                value="activity"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3"
                            >
                                <Activity className="w-4 h-4 mr-2" />
                                Actividad
                            </TabsTrigger>
                            <TabsTrigger
                                value="notes"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3"
                            >
                                <FileText className="w-4 h-4 mr-2" />
                                Notas
                            </TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="flex-1 overflow-y-auto px-6 py-6 mt-0">
                            <div className="space-y-8 max-w-5xl">
                                {/* Contact & Personal Info Grid */}
                                <div className="grid grid-cols-2 gap-8">
                                    {/* Contact Information */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-gray-600" />
                                            Información de Contacto
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3 pb-3 border-b">
                                                <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-medium text-gray-500 mb-1">Teléfono</p>
                                                    <p className="text-sm text-gray-900">
                                                        {customer.telefono || customer.phone || 'No registrado'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3 pb-3 border-b">
                                                <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-medium text-gray-500 mb-1">Email</p>
                                                    <p className="text-sm text-gray-900 truncate">
                                                        {customer.email || 'No registrado'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3 pb-3 border-b">
                                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-medium text-gray-500 mb-1">Dirección</p>
                                                    <p className="text-sm text-gray-900">
                                                        {customer.address || 'No registrada'}
                                                    </p>
                                                    {(customer.city || customer.country) && (
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {customer.city ? `${customer.city}` : ''}{customer.city && customer.country ? ', ' : ''}{customer.country || ''}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {customer.preferred_channels && customer.preferred_channels.length > 0 && (
                                                <div className="flex items-start gap-3 pb-3">
                                                    <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-medium text-gray-500 mb-1">Canales Preferidos</p>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {customer.preferred_channels.map((channel, idx) => (
                                                                <Badge key={idx} variant="outline" className="text-xs">
                                                                    {channel}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Personal Information */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-600" />
                                            Información Personal
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3 pb-3 border-b">
                                                <User className="w-4 h-4 text-gray-400 mt-0.5" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-medium text-gray-500 mb-1">Nombre Completo</p>
                                                    <p className="text-sm text-gray-900">
                                                        {customer.nombre || customer.name} {customer.apellido}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3 pb-3 border-b">
                                                <CreditCard className="w-4 h-4 text-gray-400 mt-0.5" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-medium text-gray-500 mb-1">Cédula/NIF</p>
                                                    <p className="text-sm text-gray-900">
                                                        {customer.cedula || customer.rnc || 'No registrada'}
                                                    </p>
                                                    {customer.id_type && (
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Tipo: {customer.id_type}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {customer.date_of_birth && (
                                                <div className="flex items-start gap-3 pb-3 border-b">
                                                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-medium text-gray-500 mb-1">Fecha de Nacimiento</p>
                                                        <p className="text-sm text-gray-900">
                                                            {new Date(customer.date_of_birth).toLocaleDateString('es-ES', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {customer.createdBy && (
                                                <div className="flex items-start gap-3 pb-3 border-b">
                                                    <UserCog className="w-4 h-4 text-gray-400 mt-0.5" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-medium text-gray-500 mb-1">Creado por</p>
                                                        <p className="text-sm text-gray-900">
                                                            {customer.createdBy.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {customer.accountManager && (
                                                <div className="flex items-start gap-3 pb-3">
                                                    <UserCog className="w-4 h-4 text-gray-400 mt-0.5" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-medium text-gray-500 mb-1">Responsable de Cuenta</p>
                                                        <p className="text-sm text-gray-900">
                                                            {customer.accountManager.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* CRM Information Grid */}
                                <div className="grid grid-cols-2 gap-8 mt-8">
                                    {/* CRM Status & Segment */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-gray-600" />
                                            Información CRM
                                        </h3>
                                        <div className="space-y-4">
                                            {customer.status && (
                                                <div className="flex items-center justify-between pb-3 border-b">
                                                    <span className="text-xs font-medium text-gray-500">Estado</span>
                                                    <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                                                        {customer.status === 'active' ? 'Activo' :
                                                            customer.status === 'inactive' ? 'Inactivo' :
                                                                customer.status === 'potential' ? 'Potencial' :
                                                                    customer.status === 'vip' ? 'VIP' :
                                                                        customer.status}
                                                    </Badge>
                                                </div>
                                            )}

                                            {customer.segment && (
                                                <div className="flex items-center justify-between pb-3 border-b">
                                                    <span className="text-xs font-medium text-gray-500">Segmento</span>
                                                    <Badge variant="outline">{customer.segment}</Badge>
                                                </div>
                                            )}

                                            {customer.category && (
                                                <div className="flex items-center justify-between pb-3 border-b">
                                                    <span className="text-xs font-medium text-gray-500">Categoría</span>
                                                    <span className="text-sm font-medium text-gray-900">{customer.category}</span>
                                                </div>
                                            )}

                                            {customer.customer_lifetime_value !== undefined && customer.customer_lifetime_value !== null && (
                                                <div className="flex items-center justify-between pb-3 border-b">
                                                    <span className="text-xs font-medium text-gray-500">Valor del Cliente (CLV)</span>
                                                    <span className="text-sm font-semibold text-green-600">
                                                        RD$ {typeof customer.customer_lifetime_value === 'number'
                                                            ? customer.customer_lifetime_value.toFixed(2)
                                                            : parseFloat(String(customer.customer_lifetime_value || 0)).toFixed(2)}
                                                    </span>
                                                </div>
                                            )}

                                            {customer.satisfaction_score !== undefined && customer.satisfaction_score !== null && (
                                                <div className="flex items-center justify-between pb-3">
                                                    <span className="text-xs font-medium text-gray-500">Nivel de Satisfacción</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex">
                                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                                <div
                                                                    key={num}
                                                                    className={`w-3 h-3 rounded-full mr-0.5 ${num <= (customer.satisfaction_score || 0)
                                                                            ? 'bg-yellow-400'
                                                                            : 'bg-gray-200'
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900">{customer.satisfaction_score}/10</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Contact & Action Information */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-600" />
                                            Contacto y Acciones
                                        </h3>
                                        <div className="space-y-4">
                                            {customer.last_contact_date && (
                                                <div className="flex items-start gap-3 pb-3 border-b">
                                                    <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-medium text-gray-500 mb-1">Último Contacto</p>
                                                        <p className="text-sm text-gray-900">
                                                            {new Date(customer.last_contact_date).toLocaleDateString('es-ES', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </p>
                                                        {customer.last_contact_type && (
                                                            <Badge variant="outline" className="mt-1 text-xs">
                                                                {customer.last_contact_type}
                                                            </Badge>
                                                        )}
                                                        {customer.last_contact_notes && (
                                                            <p className="text-xs text-gray-500 mt-1">{customer.last_contact_notes}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {customer.next_action_date && (
                                                <div className="flex items-start gap-3 pb-3 border-b">
                                                    <Activity className="w-4 h-4 text-gray-400 mt-0.5" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-medium text-gray-500 mb-1">Próxima Acción</p>
                                                        <p className="text-sm text-gray-900">
                                                            {new Date(customer.next_action_date).toLocaleDateString('es-ES', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </p>
                                                        {customer.next_action_type && (
                                                            <Badge variant="outline" className="mt-1 text-xs">
                                                                {customer.next_action_type}
                                                            </Badge>
                                                        )}
                                                        {customer.next_action_notes && (
                                                            <p className="text-xs text-gray-500 mt-1">{customer.next_action_notes}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {customer.marketing_consent !== undefined && (
                                                <div className="flex items-center justify-between pb-3">
                                                    <span className="text-xs font-medium text-gray-500">Consentimiento Marketing</span>
                                                    <Badge variant={customer.marketing_consent ? 'default' : 'secondary'}>
                                                        {customer.marketing_consent ? 'Sí' : 'No'}
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media & Preferences */}
                                {(customer.social_media || customer.preferences) && (
                                    <div className="grid grid-cols-2 gap-8 mt-8">
                                        {customer.social_media && Object.keys(customer.social_media).length > 0 && (
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Redes Sociales</h3>
                                                <div className="space-y-2">
                                                    {customer.social_media.facebook && (
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">Facebook</span>
                                                            <a href={customer.social_media.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-xs">
                                                                {customer.social_media.facebook}
                                                            </a>
                                                        </div>
                                                    )}
                                                    {customer.social_media.instagram && (
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">Instagram</span>
                                                            <a href={customer.social_media.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline truncate max-w-xs">
                                                                {customer.social_media.instagram}
                                                            </a>
                                                        </div>
                                                    )}
                                                    {customer.social_media.linkedin && (
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">LinkedIn</span>
                                                            <a href={customer.social_media.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline truncate max-w-xs">
                                                                {customer.social_media.linkedin}
                                                            </a>
                                                        </div>
                                                    )}
                                                    {customer.social_media.twitter && (
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">Twitter</span>
                                                            <a href={customer.social_media.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate max-w-xs">
                                                                {customer.social_media.twitter}
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {customer.preferences && Object.keys(customer.preferences).length > 0 && (
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Preferencias</h3>
                                                <div className="space-y-2">
                                                    {customer.preferences.language && (
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">Idioma</span>
                                                            <span className="text-gray-900">{customer.preferences.language}</span>
                                                        </div>
                                                    )}
                                                    {customer.preferences.timezone && (
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">Zona Horaria</span>
                                                            <span className="text-gray-900">{customer.preferences.timezone}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Location Map */}
                                {(customer.latitude && customer.longitude) && (
                                    <div>
                                         
                                         
                                        <div className="w-full h-80 rounded-lg overflow-hidden border border-gray-200">
                                           
                                        </div>
                                        
                                    </div>
                                )}

                                {/* Transfer Customer */}
                                <div className="border-t pt-6">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <UserCog className="w-4 h-4 text-gray-600" />
                                        Transferir Cliente
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-4">
                                        Asignar este cliente a otro manager o técnico
                                    </p>
                                    <div className="flex gap-3 max-w-md">
                                        <Select
                                            value={selectedManagerTechnician}
                                            onValueChange={setSelectedManagerTechnician}
                                        >
                                            <SelectTrigger className="flex-1">
                                                <SelectValue placeholder="Seleccionar Manager/Técnico" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {managersTechnicians.map((item) => (
                                                    <SelectItem key={item.id} value={item.name}>
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Button onClick={handleTransferCustomer}>
                                            Transferir
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Activity Tab */}
                        <TabsContent value="activity" className="flex-1 overflow-y-auto px-6 py-6 mt-0">
                            <div className="max-w-3xl">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-600" />
                                    Historial de Actividad
                                </h3>
                                <p className="text-xs text-gray-500 mb-6">
                                    Últimas interacciones y actividades del cliente
                                </p>

                                <div className="text-center py-12 bg-gray-50 rounded-lg">
                                    <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-sm text-gray-500">
                                        No hay actividad registrada
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Notes Tab */}
                        <TabsContent value="notes" className="flex-1 overflow-y-auto px-6 py-6 mt-0">
                            <div className="max-w-3xl">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-gray-600" />
                                    Notas del Cliente
                                </h3>
                                <p className="text-xs text-gray-500 mb-6">
                                    Información adicional y observaciones importantes
                                </p>

                                {customerNotes.length > 0 && (
                                    <div className="space-y-3 mb-6">
                                        {customerNotes.map((note, index) => (
                                            <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                                <p className="text-sm text-gray-700">{note}</p>
                                            </div>
                                        ))}
                                        <Separator className="my-6" />
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-900">Añadir Nueva Nota</label>
                                    <Textarea
                                        placeholder="Escribe una nota sobre este cliente..."
                                        rows={4}
                                        value={newNote}
                                        onChange={(e) => setNewNote(e.target.value)}
                                        className="resize-none"
                                    />
                                    <Button
                                        onClick={handleAddNote}
                                        disabled={!newNote.trim()}
                                    >
                                        <FileText className="w-4 h-4 mr-2" />
                                        Guardar Nota
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
}

