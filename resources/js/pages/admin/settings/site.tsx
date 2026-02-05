import React, { useState, useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Building2, Palette, Image as ImageIcon, Save, Upload, X, Loader2, Mail, Send } from 'lucide-react';
import axios from 'axios';
import { cn } from '@/lib/utils';

interface Setting {
    id: number;
    key: string;
    value: string | null;
    type: string;
    group: string;
    description: string | null;
}

interface SettingsGroup {
    [key: string]: Setting[];
}

interface Props {
    settings: SettingsGroup;
}

export default function SiteSettings({ settings }: Props) {
    const [formData, setFormData] = useState<Record<string, any>>(() => {
        const initial: Record<string, any> = {};
        Object.values(settings).flat().forEach((setting) => {
            initial[setting.key] = setting.value || '';
        });
        return initial;
    });

    const [uploading, setUploading] = useState<Record<string, boolean>>({});
    const [saving, setSaving] = useState(false);
    const [dragActive, setDragActive] = useState<Record<string, boolean>>({});
    const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

    const handleInputChange = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleImageUpload = async (key: string, file: File) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecciona un archivo de imagen válido');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('El archivo es demasiado grande. El tamaño máximo es 5MB');
            return;
        }

        setUploading(prev => ({ ...prev, [key]: true }));

        const uploadFormData = new FormData();
        uploadFormData.append('image', file);

        try {
            const response = await axios.post(`/admin/configuracion/sitio/upload/${key}`, uploadFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setFormData(prev => ({ ...prev, [key]: response.data.path }));
        } catch (error: any) {
            console.error('Error uploading image:', error);
            alert(error.response?.data?.message || 'Error al subir la imagen. Por favor, intenta nuevamente.');
        } finally {
            setUploading(prev => ({ ...prev, [key]: false }));
        }
    };

    const handleDrag = (e: React.DragEvent, key: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(prev => ({ ...prev, [key]: true }));
        } else if (e.type === 'dragleave') {
            setDragActive(prev => ({ ...prev, [key]: false }));
        }
    };

    const handleDrop = (e: React.DragEvent, key: string) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(prev => ({ ...prev, [key]: false }));

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageUpload(key, e.dataTransfer.files[0]);
        }
    };

    const handleFileInputChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleImageUpload(key, e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await axios.post('/admin/configuracion/sitio', {
                settings: formData
            });

            if (response.status === 200 || response.status === 302) {
                // Reload to apply changes
                window.location.reload();
            }
        } catch (error: any) {
            console.error('Error saving settings:', error);
            if (error.response?.data?.message) {
                alert('Error: ' + error.response.data.message);
            } else {
                alert('Error al guardar la configuración. Por favor, intenta nuevamente.');
            }
        } finally {
            setSaving(false);
        }
    };

    const renderField = (setting: Setting) => {
        const value = formData[setting.key] || '';

        switch (setting.type) {
            case 'textarea':
                return (
                    <Textarea
                        value={value}
                        onChange={(e) => handleInputChange(setting.key, e.target.value)}
                        placeholder={setting.description || ''}
                        rows={3}
                    />
                );

            case 'image':
                const isDragActive = dragActive[setting.key] || false;
                const isUploading = uploading[setting.key] || false;

                return (
                    <div className="space-y-3">
                        {value && (
                            <div className="mb-4 p-3 bg-muted/30 rounded-lg border border-border">
                                <div className="flex items-start gap-4">
                                    <div className="relative flex-shrink-0">
                                        <img
                                            src={`/storage/${value}`}
                                            alt={setting.description || ''}
                                            className="w-32 h-32 object-cover rounded border border-border"
                                        />
                                        {!isUploading && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute -top-2 -right-2 h-7 w-7 shadow-md"
                                                onClick={() => setFormData(prev => ({ ...prev, [setting.key]: '' }))}
                                            >
                                                <X className="h-3.5 w-3.5" />
                                            </Button>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-muted-foreground mb-2">Vista previa de la imagen</p>
                                        <p className="text-xs text-muted-foreground break-all">{value}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div
                            className={cn(
                                "relative border-2 border-dashed rounded transition-colors bg-background",
                                isDragActive
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50",
                                isUploading && "opacity-50 pointer-events-none"
                            )}
                            onDragEnter={(e) => handleDrag(e, setting.key)}
                            onDragLeave={(e) => handleDrag(e, setting.key)}
                            onDragOver={(e) => handleDrag(e, setting.key)}
                            onDrop={(e) => handleDrop(e, setting.key)}
                        >
                            <input
                                ref={(el) => { fileInputRefs.current[setting.key] = el; }}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileInputChange(setting.key, e)}
                                disabled={isUploading}
                                className="hidden"
                                id={`file-input-${setting.key}`}
                            />

                            <label
                                htmlFor={`file-input-${setting.key}`}
                                className={cn(
                                    "flex flex-col items-center justify-center p-6 cursor-pointer min-h-[120px]",
                                    isUploading && "cursor-not-allowed"
                                )}
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="h-8 w-8 mb-2 text-primary animate-spin" />
                                        <p className="text-sm font-medium">Subiendo imagen...</p>
                                        <p className="text-xs text-muted-foreground mt-1">Por favor espera</p>
                                    </>
                                ) : (
                                    <>
                                        <div className={cn(
                                            "rounded p-2 mb-2",
                                            isDragActive ? "bg-primary/10" : "bg-muted"
                                        )}>
                                            <Upload className={cn(
                                                "h-5 w-5",
                                                isDragActive ? "text-primary" : "text-muted-foreground"
                                            )} />
                                        </div>
                                        <p className="text-sm font-medium mb-1 text-center">
                                            {value ? 'Haz clic para reemplazar o arrastra una nueva imagen' : 'Haz clic para subir o arrastra una imagen aquí'}
                                        </p>
                                        <p className="text-xs text-muted-foreground text-center">
                                            Se recomienda subir imágenes en formato PNG, JPG o GIF. Tamaño máximo: 5MB.
                                        </p>
                                    </>
                                )}
                            </label>
                        </div>
                    </div>
                );

            case 'color':
                return (
                    <div className="flex gap-2">
                        <Input
                            type="color"
                            value={value}
                            onChange={(e) => handleInputChange(setting.key, e.target.value)}
                            className="w-20 h-10"
                        />
                        <Input
                            type="text"
                            value={value}
                            onChange={(e) => handleInputChange(setting.key, e.target.value)}
                            placeholder="#000000"
                        />
                    </div>
                );

            case 'password':
                return (
                    <Input
                        type="password"
                        value={value}
                        onChange={(e) => handleInputChange(setting.key, e.target.value)}
                        placeholder={setting.description || ''}
                    />
                );

            case 'number':
                return (
                    <Input
                        type="number"
                        value={value}
                        onChange={(e) => handleInputChange(setting.key, e.target.value)}
                        placeholder={setting.description || ''}
                    />
                );

            case 'email':
                return (
                    <Input
                        type="email"
                        value={value}
                        onChange={(e) => handleInputChange(setting.key, e.target.value)}
                        placeholder={setting.description || ''}
                    />
                );

            case 'boolean':
                return (
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={value === 'true'}
                            onCheckedChange={(checked: boolean) => handleInputChange(setting.key, checked ? 'true' : 'false')}
                        />
                        <span className="text-sm text-muted-foreground">
                            {value === 'true' ? 'Activado' : 'Desactivado'}
                        </span>
                    </div>
                );

            case 'select':
                const options = setting.key === 'mail_driver'
                    ? [{ value: 'smtp', label: 'SMTP' }, { value: 'sendmail', label: 'Sendmail' }, { value: 'log', label: 'Log (Desarrollo)' }]
                    : setting.key === 'mail_encryption'
                        ? [{ value: 'tls', label: 'TLS' }, { value: 'ssl', label: 'SSL' }]
                        : [];

                return (
                    <Select value={value} onValueChange={(val) => handleInputChange(setting.key, val)}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            default:
                if (setting.key === 'hero_background_color' || setting.key === 'landing_hero_background_color') {
                    const gradientOptions = [
                        { label: 'Azul Tecnológico', value: 'from-slate-900 via-blue-900 to-slate-900' },
                        { label: 'Oscuro Profundo', value: 'from-gray-900 via-gray-800 to-gray-900' },
                        { label: 'Indigo Vibrante', value: 'from-indigo-900 via-purple-900 to-indigo-900' },
                        { label: 'Verde Cibernético', value: 'from-slate-900 via-emerald-900 to-slate-900' },
                    ];

                    return (
                        <div className="space-y-3">
                            <Select
                                value={gradientOptions.find(o => o.value === value)?.value || 'custom'}
                                onValueChange={(val) => {
                                    if (val !== 'custom') handleInputChange(setting.key, val);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar tema de color" />
                                </SelectTrigger>
                                <SelectContent>
                                    {gradientOptions.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                    ))}
                                    <SelectItem value="custom">Personalizado</SelectItem>
                                </SelectContent>
                            </Select>

                            <Input
                                type="text"
                                value={value}
                                onChange={(e) => handleInputChange(setting.key, e.target.value)}
                                placeholder="from-slate-900 via-blue-900 to-slate-900"
                                className="font-mono text-xs"
                            />

                            <div className="rounded-lg p-4 border border-border">
                                <p className="text-xs text-muted-foreground mb-2">Vista previa:</p>
                                <div className={`h-20 w-full rounded bg-gradient-to-br ${value || 'from-slate-900 via-blue-900 to-slate-900'}`} />
                            </div>
                        </div>
                    );
                }

                return (
                    <Input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(setting.key, e.target.value)}
                        placeholder={setting.description || ''}
                    />
                );
        }
    };

    return (
        <AppLayout>
            <Head title="Configuración del Sitio" />
            <div className="flex h-full flex-1 flex-col p-4 lg:p-3">
                <div className="max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-lg font-semibold">Configuración del Sitio</h1>
                        <p className="text-muted-foreground text-base">
                            Gestiona la información de la empresa y personaliza el tema de tu sitio
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Tabs defaultValue="company" className="w-full">
                            <TabsList className="mb-6 h-auto p-1 bg-muted">
                                <TabsTrigger value="company" className="px-4 py-2.5 data-[state=active]:bg-background">
                                    <Building2 className="h-4 w-4 mr-2" />
                                    Empresa
                                </TabsTrigger>
                                <TabsTrigger value="email" className="px-4 py-2.5 data-[state=active]:bg-background">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Correo Electrónico
                                </TabsTrigger>
                                <TabsTrigger value="theme" className="px-4 py-2.5 data-[state=active]:bg-background">
                                    <Palette className="h-4 w-4 mr-2" />
                                    Tema
                                </TabsTrigger>
                                <TabsTrigger value="landing" className="px-4 py-2.5 data-[state=active]:bg-background">
                                    <ImageIcon className="h-4 w-4 mr-2" />
                                    Landing Page
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="company" className="mt-0">
                                <Card className="p-0 border-border shadow-sm">
                                    <div className="px-8 py-6 border-b border-border bg-muted/30">
                                        <h2 className="text-xl font-semibold">Información de la Empresa</h2>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Configura los datos básicos de tu empresa que aparecerán en el sitio
                                        </p>
                                    </div>
                                    <div className="p-8 space-y-8">
                                        {settings.company?.map((setting) => (
                                            <div key={setting.id} className="flex gap-8">
                                                <div className="w-64 flex-shrink-0 pt-2">
                                                    <Label htmlFor={setting.key} className="text-base font-medium leading-5">
                                                        {setting.description || setting.key}
                                                    </Label>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    {renderField(setting)}
                                                    <p className="text-xs text-muted-foreground mt-1.5">
                                                        {setting.description && setting.type !== 'image' && setting.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </TabsContent>

                            <TabsContent value="email" className="mt-0">
                                <Card className="p-0 border-border shadow-sm">
                                    <div className="px-8 py-6 border-b border-border bg-muted/30">
                                        <h2 className="text-xl font-semibold">Configuración de Correo Electrónico</h2>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Configura el servidor SMTP para enviar notificaciones automáticas
                                        </p>
                                    </div>
                                    <div className="p-8 space-y-8">
                                        {settings.email?.map((setting) => (
                                            <div key={setting.id} className="flex gap-8">
                                                <div className="w-64 flex-shrink-0 pt-2">
                                                    <Label htmlFor={setting.key} className="text-base font-medium leading-5">
                                                        {setting.description || setting.key}
                                                    </Label>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    {renderField(setting)}
                                                    <p className="text-xs text-muted-foreground mt-1.5">
                                                        {setting.type === 'password' && 'La contraseña se almacena de forma segura'}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </TabsContent>

                            <TabsContent value="theme" className="mt-0">
                                <Card className="p-0 border-border shadow-sm">
                                    <div className="px-8 py-6 border-b border-border bg-muted/30">
                                        <h2 className="text-xl font-semibold">Configuración del Tema</h2>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Personaliza los colores y estilos visuales de tu sitio web
                                        </p>
                                    </div>
                                    <div className="p-8 space-y-8">
                                        {settings.theme?.map((setting) => (
                                            <div key={setting.id} className="flex gap-8">
                                                <div className="w-64 flex-shrink-0 pt-2">
                                                    <Label htmlFor={setting.key} className="text-base font-medium leading-5">
                                                        {setting.description || setting.key}
                                                    </Label>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    {renderField(setting)}
                                                    <p className="text-xs text-muted-foreground mt-1.5">
                                                        {setting.description && setting.type !== 'color' && setting.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </TabsContent>

                            <TabsContent value="landing" className="mt-0">
                                <Card className="p-0 border-border shadow-sm">
                                    <div className="px-8 py-6 border-b border-border bg-muted/30">
                                        <h2 className="text-xl font-semibold">Contenido del Landing Page</h2>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Configura las imágenes y contenido de tu página de inicio
                                        </p>
                                    </div>
                                    <div className="p-8 space-y-8">
                                        {settings.landing?.filter(s => !s.key.startsWith('offer_')).map((setting) => (
                                            <div key={setting.id} className="flex gap-8">
                                                <div className="w-64 flex-shrink-0 pt-2">
                                                    <Label htmlFor={setting.key} className="text-base font-medium leading-5">
                                                        {setting.description || setting.key}
                                                    </Label>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    {renderField(setting)}
                                                    <p className="text-xs text-muted-foreground mt-1.5">
                                                        {setting.description && setting.type !== 'image' && setting.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        {/* Footer con botón de guardar */}
                        <div className="mt-8 p-6 bg-muted/30 border border-border rounded-lg">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Recuerda hacer clic en "Guardar Cambios" para aplicar todas las modificaciones
                                </p>
                                <Button type="submit" disabled={saving} size="lg" className="px-6">
                                    <Save className="h-4 w-4 mr-2" />
                                    {saving ? 'Guardando...' : 'Guardar Cambios'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
