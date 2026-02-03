import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Phone, Mail, User, Wrench, CheckCircle2, ArrowRight } from "lucide-react";
import InputError from "@/components/input-error";

interface Props {
    serviceTypes: Array<{ id: string; name: string; description?: string }>;
}

export default function SolicitarServicio({ serviceTypes = [] }: Props) {
    const [step, setStep] = useState(1);

    const form = useForm({
        // Paso 1: Tipo de servicio y fecha
        service_type_id: "",
        appliance_type: "",
        scheduled_date: "",
        preferred_time: "",

        // Paso 2: Dirección
        address: "",
        issue_description: "",

        // Paso 3: Datos de contacto
        customer_name: "",
        customer_phone: "",
        customer_email: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.post('/solicitar-servicio', {
            onSuccess: () => {
                alert('¡Solicitud enviada exitosamente! Nos pondremos en contacto pronto.');
                window.location.href = '/';
            },
        });
    };

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const canProceedStep1 = form.data.service_type_id && form.data.scheduled_date && form.data.preferred_time;
    const canProceedStep2 = form.data.address && form.data.issue_description;
    const canSubmit = canProceedStep1 && canProceedStep2 && form.data.customer_name && form.data.customer_phone;

    return (
        <>
            <Head title="Solicitar Servicio - Mister Services RD">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
                {/* Hero Section con Formulario */}
                <div className="container mx-auto px-4 py-8 md:py-12">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Lado Izquierdo - Contenido */}
                        <div className="text-white space-y-6">
                            <div className="inline-block">
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2">
                                    Mister Services
                                </h1>
                                <p className="text-blue-200 text-sm md:text-base">
                                    Tu socio de confianza en reparaciones
                                </p>
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                Solicita tu servicio técnico
                            </h2>

                            <p className="text-lg md:text-xl text-blue-100">
                                Obtén ayuda profesional de técnicos expertos, entregada a tiempo y sin estrés.
                            </p>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="flex items-center gap-2 text-sm md:text-base">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span>Servicio garantizado</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm md:text-base">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span>Técnicos certificados</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm md:text-base">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span>Atención 24/7</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm md:text-base">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span>Precios justos</span>
                                </div>
                            </div>

                            {/* Social Proof */}
                            <div className="flex items-center gap-4 pt-4">
                                <div className="flex -space-x-2">
                                    <div className="w-10 h-10 rounded-full bg-blue-400 border-2 border-white"></div>
                                    <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white"></div>
                                    <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white"></div>
                                </div>
                                <div>
                                    <p className="font-semibold">500+</p>
                                    <p className="text-sm text-blue-200">Clientes Satisfechos</p>
                                </div>
                            </div>
                        </div>

                        {/* Lado Derecho - Formulario */}
                        <Card className="bg-white p-6 md:p-8 shadow-2xl">
                            <div className="mb-6">
                                <h3 className="text-xl md:text-2xl font-bold mb-2">
                                    Obtén ayuda de expertos
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Completa el formulario en 3 simples pasos
                                </p>
                            </div>

                            {/* Progress Steps */}
                            <div className="flex items-center justify-between mb-8">
                                {[1, 2, 3].map((s) => (
                                    <div key={s} className="flex items-center flex-1">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                                            }`}>
                                            {s}
                                        </div>
                                        {s < 3 && (
                                            <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-200'
                                                }`} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Paso 1: Tipo de Servicio y Fecha */}
                                {step === 1 && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="service_type_id">Tipo de Servicio *</Label>
                                            <Select
                                                value={form.data.service_type_id}
                                                onValueChange={(value) => form.setData('service_type_id', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un servicio" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {serviceTypes.map((type) => (
                                                        <SelectItem key={type.id} value={type.id}>
                                                            {type.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={form.errors.service_type_id} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="appliance_type">Tipo de Electrodoméstico</Label>
                                            <Input
                                                id="appliance_type"
                                                value={form.data.appliance_type}
                                                onChange={(e) => form.setData('appliance_type', e.target.value)}
                                                placeholder="Ej: Nevera, Lavadora, Aire Acondicionado"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="scheduled_date">Fecha Preferida *</Label>
                                                <Input
                                                    id="scheduled_date"
                                                    type="date"
                                                    value={form.data.scheduled_date}
                                                    onChange={(e) => form.setData('scheduled_date', e.target.value)}
                                                    min={new Date().toISOString().split('T')[0]}
                                                />
                                                <InputError message={form.errors.scheduled_date} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="preferred_time">Horario *</Label>
                                                <Select
                                                    value={form.data.preferred_time}
                                                    onValueChange={(value) => form.setData('preferred_time', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Horario" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="morning">Mañana (8AM-12PM)</SelectItem>
                                                        <SelectItem value="afternoon">Tarde (12PM-5PM)</SelectItem>
                                                        <SelectItem value="evening">Noche (5PM-8PM)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <InputError message={form.errors.preferred_time} />
                                            </div>
                                        </div>

                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!canProceedStep1}
                                            className="w-full h-12 text-base"
                                        >
                                            Continuar
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </div>
                                )}

                                {/* Paso 2: Dirección */}
                                {step === 2 && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="address">Dirección del Servicio *</Label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                                <Input
                                                    id="address"
                                                    value={form.data.address}
                                                    onChange={(e) => form.setData('address', e.target.value)}
                                                    placeholder="Calle, número, sector, ciudad"
                                                    className="pl-10"
                                                />
                                            </div>
                                            <InputError message={form.errors.address} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="issue_description">Describe el Problema *</Label>
                                            <Textarea
                                                id="issue_description"
                                                value={form.data.issue_description}
                                                onChange={(e) => form.setData('issue_description', e.target.value)}
                                                placeholder="Describe qué está fallando o qué necesitas reparar..."
                                                rows={4}
                                            />
                                            <InputError message={form.errors.issue_description} />
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={prevStep}
                                                className="flex-1"
                                            >
                                                Atrás
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={nextStep}
                                                disabled={!canProceedStep2}
                                                className="flex-1"
                                            >
                                                Continuar
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Paso 3: Datos de Contacto */}
                                {step === 3 && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="customer_name">Nombre Completo *</Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                                <Input
                                                    id="customer_name"
                                                    value={form.data.customer_name}
                                                    onChange={(e) => form.setData('customer_name', e.target.value)}
                                                    placeholder="Tu nombre completo"
                                                    className="pl-10"
                                                />
                                            </div>
                                            <InputError message={form.errors.customer_name} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="customer_phone">Teléfono *</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                                <Input
                                                    id="customer_phone"
                                                    type="tel"
                                                    value={form.data.customer_phone}
                                                    onChange={(e) => form.setData('customer_phone', e.target.value)}
                                                    placeholder="(809) 000-0000"
                                                    className="pl-10"
                                                />
                                            </div>
                                            <InputError message={form.errors.customer_phone} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="customer_email">Email (Opcional)</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                                <Input
                                                    id="customer_email"
                                                    type="email"
                                                    value={form.data.customer_email}
                                                    onChange={(e) => form.setData('customer_email', e.target.value)}
                                                    placeholder="tu@email.com"
                                                    className="pl-10"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={prevStep}
                                                className="flex-1"
                                            >
                                                Atrás
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={!canSubmit || form.processing}
                                                className="flex-1 bg-green-600 hover:bg-green-700"
                                            >
                                                {form.processing ? 'Enviando...' : 'Enviar Solicitud'}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </Card>
                    </div>
                </div>

                {/* Footer Simple */}
                <div className="container mx-auto px-4 py-8 text-center text-white/80 text-sm">
                    <p>© 2024 Mister Services RD. Todos los derechos reservados.</p>
                </div>
            </div>
        </>
    );
}
