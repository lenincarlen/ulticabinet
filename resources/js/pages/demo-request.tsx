import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Building2, User, Mail, Phone, Briefcase, Target } from 'lucide-react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';



const painPointOptions = [
    'Procesos manuales lentos',
    'Falta de visibilidad en tiempo real',
    'Errores frecuentes en datos',
    'Dificultad para escalar',
    'Costos operativos altos',
    'Mala experiencia del cliente',
    'Falta de integración entre sistemas',
    'Reportes insuficientes',
];

export default function DemoRequest() {
    const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);

    const { data, setData, post, processing, errors } = useForm({

        company_name: '',
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        company_size: '',
        industry: '',
        current_solution: '',

        pain_points: [] as string[],
        preferred_date: '',
        preferred_time: '',
        demo_format: 'online',
        additional_notes: '',
    });

    const handlePainPointToggle = (painPoint: string) => {
        const updated = selectedPainPoints.includes(painPoint)
            ? selectedPainPoints.filter(p => p !== painPoint)
            : [...selectedPainPoints, painPoint];

        setSelectedPainPoints(updated);
        setData('pain_points', updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/solicitar-demo');
    };


    return (
        <>
            <Head title="Solicitar Demo - ultiCabinet" />

            <div className="min-h-screen text-[#1d1d1d] selection:bg-[#0037ff]/20">
                <Header isAuthenticated={false} />

                <main className="relative pt-24 pb-12 overflow-hidden">
                    {/* Decorative Elements - Updated for light theme */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-20 left-10 w-96 h-96 bg-[#98d6fc]/20 rounded-full blur-[100px]" />
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00a6e0]/10 rounded-full blur-[100px]" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-4xl md:text-5xl font-black mb-4 text-[#1d1d1d] tracking-tight"
                            >
                                Solicita tu Demo <span className="text-[#0037ff]">Personalizado</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-xl text-[#1d1d1d]/70 max-w-2xl mx-auto font-medium"
                            >
                                Descubre cómo ultiCabinet puede transformar tu negocio. Agenda una demostración gratuita con nuestro equipo.
                            </motion.p>
                        </div>

                        {/* Form Section */}
                        <div className="max-w-3xl mx-auto bg-white/50 border border-[#e8e9eb] backdrop-blur-sm shadow-xl p-4 rounded-xl">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Solution Selection */}


                                {/* Company Information */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <Card className="bg-white border-[#e8e9eb] shadow-md">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-[#1d1d1d]">
                                                <Building2 className="h-5 w-5 text-[#0037ff]" />
                                                Información de la Empresa
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="company_name" className="text-[#1d1d1d]">Nombre de la Empresa *</Label>
                                                    <Input
                                                        id="company_name"
                                                        value={data.company_name}
                                                        onChange={(e) => setData('company_name', e.target.value)}
                                                        placeholder="Ej: Mi Empresa S.A."
                                                        className="bg-white border-[#e8e9eb] text-[#1d1d1d] placeholder:text-[#1d1d1d]/40 focus:ring-[#0037ff]/50"
                                                    />
                                                    {errors.company_name && (
                                                        <p className="text-sm text-red-500">{errors.company_name}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="industry" className="text-[#1d1d1d]">Industria</Label>
                                                    <Input
                                                        id="industry"
                                                        value={data.industry}
                                                        onChange={(e) => setData('industry', e.target.value)}
                                                        placeholder="Ej: Retail, Servicios, etc."
                                                        className="bg-white border-[#e8e9eb] text-[#1d1d1d] placeholder:text-[#1d1d1d]/40 focus:ring-[#0037ff]/50"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="company_size" className="text-[#1d1d1d]">Tamaño de la Empresa</Label>
                                                <Select
                                                    value={data.company_size}
                                                    onValueChange={(value) => setData('company_size', value)}
                                                >
                                                    <SelectTrigger id="company_size" className="bg-white border-[#e8e9eb] text-[#1d1d1d] focus:ring-[#0037ff]/50">
                                                        <SelectValue placeholder="Selecciona el tamaño" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white border-[#e8e9eb] text-[#1d1d1d]">
                                                        <SelectItem value="1-10" className="focus:bg-[#e8e9eb] focus:text-[#1d1d1d]">1-10 empleados</SelectItem>
                                                        <SelectItem value="11-50" className="focus:bg-[#e8e9eb] focus:text-[#1d1d1d]">11-50 empleados</SelectItem>
                                                        <SelectItem value="51-200" className="focus:bg-[#e8e9eb] focus:text-[#1d1d1d]">51-200 empleados</SelectItem>
                                                        <SelectItem value="201-500" className="focus:bg-[#e8e9eb] focus:text-[#1d1d1d]">201-500 empleados</SelectItem>
                                                        <SelectItem value="500+" className="focus:bg-[#e8e9eb] focus:text-[#1d1d1d]">500+ empleados</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="current_solution" className="text-[#1d1d1d]">¿Qué solución usas actualmente?</Label>
                                                <Input
                                                    id="current_solution"
                                                    value={data.current_solution}
                                                    onChange={(e) => setData('current_solution', e.target.value)}
                                                    placeholder="Ej: Excel, otro software, proceso manual"
                                                    className="bg-white border-[#e8e9eb] text-[#1d1d1d] placeholder:text-[#1d1d1d]/40 focus:ring-[#0037ff]/50"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Contact Information */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                    <Card className="bg-white border-[#e8e9eb] shadow-md">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-[#1d1d1d]">
                                                <User className="h-5 w-5 text-[#0037ff]" />
                                                Información de Contacto
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="contact_name" className="text-[#1d1d1d]">Nombre Completo *</Label>
                                                <Input
                                                    id="contact_name"
                                                    value={data.contact_name}
                                                    onChange={(e) => setData('contact_name', e.target.value)}
                                                    placeholder="Tu nombre"
                                                    className="bg-white border-[#e8e9eb] text-[#1d1d1d] placeholder:text-[#1d1d1d]/40 focus:ring-[#0037ff]/50"
                                                />
                                                {errors.contact_name && (
                                                    <p className="text-sm text-red-500">{errors.contact_name}</p>
                                                )}
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="contact_email" className="text-[#1d1d1d]">Email *</Label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-[#1d1d1d]/50" />
                                                        <Input
                                                            id="contact_email"
                                                            type="email"
                                                            value={data.contact_email}
                                                            onChange={(e) => setData('contact_email', e.target.value)}
                                                            placeholder="tu@email.com"
                                                            className="pl-10 bg-white border-[#e8e9eb] text-[#1d1d1d] placeholder:text-[#1d1d1d]/40 focus:ring-[#0037ff]/50"
                                                        />
                                                    </div>
                                                    {errors.contact_email && (
                                                        <p className="text-sm text-red-500">{errors.contact_email}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="contact_phone" className="text-[#1d1d1d]">Teléfono *</Label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-[#1d1d1d]/50" />
                                                        <Input
                                                            id="contact_phone"
                                                            type="tel"
                                                            value={data.contact_phone}
                                                            onChange={(e) => setData('contact_phone', e.target.value)}
                                                            placeholder="(809) 000-0000"
                                                            className="pl-10 bg-white border-[#e8e9eb] text-[#1d1d1d] placeholder:text-[#1d1d1d]/40 focus:ring-[#0037ff]/50"
                                                        />
                                                    </div>
                                                    {errors.contact_phone && (
                                                        <p className="text-sm text-red-500">{errors.contact_phone}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Pain Points */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <Card className="bg-white border-[#e8e9eb] shadow-md">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-[#1d1d1d]">
                                                <Briefcase className="h-5 w-5 text-[#0037ff]" />
                                                ¿Qué desafíos enfrentas?
                                            </CardTitle>
                                            <CardDescription className="text-[#1d1d1d]/60">
                                                Selecciona los problemas que te gustaría resolver (opcional)
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {painPointOptions.map((painPoint) => (
                                                    <div key={painPoint} className="flex items-center space-x-2 p-2 rounded hover:bg-[#e8e9eb]/50 transition-colors">
                                                        <Checkbox
                                                            id={painPoint}
                                                            checked={selectedPainPoints.includes(painPoint)}
                                                            onCheckedChange={() => handlePainPointToggle(painPoint)}
                                                            className="border-[#1d1d1d]/30 data-[state=checked]:bg-[#0037ff] data-[state=checked]:border-[#0037ff]"
                                                        />
                                                        <Label
                                                            htmlFor={painPoint}
                                                            className="text-sm font-normal cursor-pointer text-[#1d1d1d]/80"
                                                        >
                                                            {painPoint}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Schedule Preferences */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                >
                                    <Card className="bg-white border-[#e8e9eb] shadow-md">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-[#1d1d1d]">
                                                <Calendar className="h-5 w-5 text-[#0037ff]" />
                                                Preferencias de Agenda
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="preferred_date" className="text-[#1d1d1d]">Fecha Preferida</Label>
                                                    <Input
                                                        id="preferred_date"
                                                        type="date"
                                                        value={data.preferred_date}
                                                        onChange={(e) => setData('preferred_date', e.target.value)}
                                                        min={new Date().toISOString().split('T')[0]}
                                                        className="bg-white border-[#e8e9eb] text-[#1d1d1d] focus:ring-[#0037ff]/50"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="preferred_time" className="text-[#1d1d1d]">Horario Preferido</Label>
                                                    <Select
                                                        value={data.preferred_time}
                                                        onValueChange={(value) => setData('preferred_time', value)}
                                                    >
                                                        <SelectTrigger id="preferred_time" className="bg-white border-[#e8e9eb] text-[#1d1d1d] focus:ring-[#0037ff]/50">
                                                            <SelectValue placeholder="Selecciona un horario" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-white border-[#e8e9eb] text-[#1d1d1d]">
                                                            <SelectItem value="morning" className="focus:bg-[#e8e9eb] focus:text-[#1d1d1d]">Mañana (9:00 AM - 12:00 PM)</SelectItem>
                                                            <SelectItem value="afternoon" className="focus:bg-[#e8e9eb] focus:text-[#1d1d1d]">Tarde (2:00 PM - 5:00 PM)</SelectItem>
                                                            <SelectItem value="evening" className="focus:bg-[#e8e9eb] focus:text-[#1d1d1d]">Noche (6:00 PM - 8:00 PM)</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="demo_format" className="text-[#1d1d1d]">Formato del Demo</Label>
                                                <Select
                                                    value={data.demo_format}
                                                    onValueChange={(value) => setData('demo_format', value)}
                                                >
                                                    <SelectTrigger id="demo_format" className="bg-white border-[#e8e9eb] text-[#1d1d1d] focus:ring-[#0037ff]/50">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white border-[#e8e9eb] text-[#1d1d1d]">
                                                        <SelectItem value="online" className="focus:bg-[#e8e9eb] focus:text-[#1d1d1d]">Online (Google Meet/Zoom)</SelectItem>
                                                        <SelectItem value="in-person" className="focus:bg-[#e8e9eb] focus:text-[#1d1d1d]">Presencial</SelectItem>
                                                        <SelectItem value="phone" className="focus:bg-[#e8e9eb] focus:text-[#1d1d1d]">Llamada telefónica</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="additional_notes" className="text-[#1d1d1d]">Notas Adicionales</Label>
                                                <Textarea
                                                    id="additional_notes"
                                                    value={data.additional_notes}
                                                    onChange={(e) => setData('additional_notes', e.target.value)}
                                                    placeholder="¿Algo más que debamos saber?"
                                                    rows={4}
                                                    className="bg-white border-[#e8e9eb] text-[#1d1d1d] placeholder:text-[#1d1d1d]/40 focus:ring-[#0037ff]/50"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div
                                    className="flex justify-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                >
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={processing}
                                        className="bg-[#0037ff] hover:bg-[#1800ad] text-white px-12 py-6 text-lg rounded-full shadow-[0_4px_14px_0_rgba(0,55,255,0.39)] transition-all font-bold"
                                    >
                                        {processing ? 'Enviando...' : 'Solicitar Demo Gratuito'}
                                    </Button>
                                </motion.div>
                            </form>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
