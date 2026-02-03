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

interface Solution {
    id: number;
    name: string;
    slug: string;
    short_description: string;
    icon: string;
    category: string;
    demo_duration_minutes: number;
}

interface Props {
    solutions: Solution[];
}

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

export default function DemoRequest({ solutions }: Props) {
    const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);

    const { data, setData, post, processing, errors } = useForm({
        solution_id: '',
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

    const selectedSolution = solutions.find(s => s.id === Number(data.solution_id));

    return (
        <>
            <Head title="Solicitar Demo - ultiCabinet" />

            <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
                <Header isAuthenticated={false} />

                <main className="relative pt-24 pb-12 overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight"
                            >
                                Solicita tu Demo <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Personalizado</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-xl text-slate-400 max-w-2xl mx-auto"
                            >
                                Descubre cómo ultiCabinet puede transformar tu negocio. Agenda una demostración gratuita con nuestro equipo.
                            </motion.p>
                        </div>

                        {/* Form Section */}
                        <div className="max-w-3xl mx-auto bg-slate-700/50 border-slate-800 backdrop-blur-sm shadow-xl p-4">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Solution Selection */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm shadow-xl py-4 ">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-white">
                                                <Target className="h-5 w-5 text-blue-400" />
                                                Selecciona la Solución
                                            </CardTitle>
                                            <CardDescription className="text-slate-400">
                                                ¿Qué sistema te interesa conocer?
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <Label htmlFor="solution_id" className="text-slate-200">Solución *</Label>
                                                <Select
                                                    value={data.solution_id}
                                                    onValueChange={(value) => setData('solution_id', value)}
                                                >
                                                    <SelectTrigger id="solution_id" className="bg-slate-950 border-slate-700 text-slate-200 focus:ring-blue-500/50">
                                                        <SelectValue placeholder="Selecciona una solución" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                                                        {solutions.map((solution) => (
                                                            <SelectItem key={solution.id} value={solution.id.toString()} className="focus:bg-slate-800 focus:text-white">
                                                                {solution.name} - {solution.category}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.solution_id && (
                                                    <p className="text-sm text-red-400">{errors.solution_id}</p>
                                                )}
                                                {selectedSolution && (
                                                    <p className="text-sm text-blue-300 mt-2 bg-blue-900/20 p-2 rounded border border-blue-500/20 inline-block">
                                                        {selectedSolution.short_description} • Duración: {selectedSolution.demo_duration_minutes} min
                                                    </p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Company Information */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm shadow-xl">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-white">
                                                <Building2 className="h-5 w-5 text-blue-400" />
                                                Información de la Empresa
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="company_name" className="text-slate-200">Nombre de la Empresa *</Label>
                                                    <Input
                                                        id="company_name"
                                                        value={data.company_name}
                                                        onChange={(e) => setData('company_name', e.target.value)}
                                                        placeholder="Ej: Mi Empresa S.A."
                                                        className="bg-slate-950 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:ring-blue-500/50"
                                                    />
                                                    {errors.company_name && (
                                                        <p className="text-sm text-red-400">{errors.company_name}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="industry" className="text-slate-200">Industria</Label>
                                                    <Input
                                                        id="industry"
                                                        value={data.industry}
                                                        onChange={(e) => setData('industry', e.target.value)}
                                                        placeholder="Ej: Retail, Servicios, etc."
                                                        className="bg-slate-950 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:ring-blue-500/50"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="company_size" className="text-slate-200">Tamaño de la Empresa</Label>
                                                <Select
                                                    value={data.company_size}
                                                    onValueChange={(value) => setData('company_size', value)}
                                                >
                                                    <SelectTrigger id="company_size" className="bg-slate-950 border-slate-700 text-slate-200 focus:ring-blue-500/50">
                                                        <SelectValue placeholder="Selecciona el tamaño" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                                                        <SelectItem value="1-10" className="focus:bg-slate-800 focus:text-white">1-10 empleados</SelectItem>
                                                        <SelectItem value="11-50" className="focus:bg-slate-800 focus:text-white">11-50 empleados</SelectItem>
                                                        <SelectItem value="51-200" className="focus:bg-slate-800 focus:text-white">51-200 empleados</SelectItem>
                                                        <SelectItem value="201-500" className="focus:bg-slate-800 focus:text-white">201-500 empleados</SelectItem>
                                                        <SelectItem value="500+" className="focus:bg-slate-800 focus:text-white">500+ empleados</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="current_solution" className="text-slate-200">¿Qué solución usas actualmente?</Label>
                                                <Input
                                                    id="current_solution"
                                                    value={data.current_solution}
                                                    onChange={(e) => setData('current_solution', e.target.value)}
                                                    placeholder="Ej: Excel, otro software, proceso manual"
                                                    className="bg-slate-950 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:ring-blue-500/50"
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
                                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm shadow-xl">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-white">
                                                <User className="h-5 w-5 text-blue-400" />
                                                Información de Contacto
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="contact_name" className="text-slate-200">Nombre Completo *</Label>
                                                <Input
                                                    id="contact_name"
                                                    value={data.contact_name}
                                                    onChange={(e) => setData('contact_name', e.target.value)}
                                                    placeholder="Tu nombre"
                                                    className="bg-slate-950 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:ring-blue-500/50"
                                                />
                                                {errors.contact_name && (
                                                    <p className="text-sm text-red-400">{errors.contact_name}</p>
                                                )}
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="contact_email" className="text-slate-200">Email *</Label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                                        <Input
                                                            id="contact_email"
                                                            type="email"
                                                            value={data.contact_email}
                                                            onChange={(e) => setData('contact_email', e.target.value)}
                                                            placeholder="tu@email.com"
                                                            className="pl-10 bg-slate-950 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:ring-blue-500/50"
                                                        />
                                                    </div>
                                                    {errors.contact_email && (
                                                        <p className="text-sm text-red-400">{errors.contact_email}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="contact_phone" className="text-slate-200">Teléfono *</Label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                                        <Input
                                                            id="contact_phone"
                                                            type="tel"
                                                            value={data.contact_phone}
                                                            onChange={(e) => setData('contact_phone', e.target.value)}
                                                            placeholder="(809) 000-0000"
                                                            className="pl-10 bg-slate-950 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:ring-blue-500/50"
                                                        />
                                                    </div>
                                                    {errors.contact_phone && (
                                                        <p className="text-sm text-red-400">{errors.contact_phone}</p>
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
                                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm shadow-xl">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-white">
                                                <Briefcase className="h-5 w-5 text-blue-400" />
                                                ¿Qué desafíos enfrentas?
                                            </CardTitle>
                                            <CardDescription className="text-slate-400">
                                                Selecciona los problemas que te gustaría resolver (opcional)
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {painPointOptions.map((painPoint) => (
                                                    <div key={painPoint} className="flex items-center space-x-2 p-2 rounded hover:bg-slate-800/50 transition-colors">
                                                        <Checkbox
                                                            id={painPoint}
                                                            checked={selectedPainPoints.includes(painPoint)}
                                                            onCheckedChange={() => handlePainPointToggle(painPoint)}
                                                            className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                                        />
                                                        <Label
                                                            htmlFor={painPoint}
                                                            className="text-sm font-normal cursor-pointer text-slate-300"
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
                                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm shadow-xl">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-white">
                                                <Calendar className="h-5 w-5 text-blue-400" />
                                                Preferencias de Agenda
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="preferred_date" className="text-slate-200">Fecha Preferida</Label>
                                                    <Input
                                                        id="preferred_date"
                                                        type="date"
                                                        value={data.preferred_date}
                                                        onChange={(e) => setData('preferred_date', e.target.value)}
                                                        min={new Date().toISOString().split('T')[0]}
                                                        className="bg-slate-950 border-slate-700 text-slate-200 focus:ring-blue-500/50 [color-scheme:dark]"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="preferred_time" className="text-slate-200">Horario Preferido</Label>
                                                    <Select
                                                        value={data.preferred_time}
                                                        onValueChange={(value) => setData('preferred_time', value)}
                                                    >
                                                        <SelectTrigger id="preferred_time" className="bg-slate-950 border-slate-700 text-slate-200 focus:ring-blue-500/50">
                                                            <SelectValue placeholder="Selecciona un horario" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                                                            <SelectItem value="morning" className="focus:bg-slate-800 focus:text-white">Mañana (9:00 AM - 12:00 PM)</SelectItem>
                                                            <SelectItem value="afternoon" className="focus:bg-slate-800 focus:text-white">Tarde (2:00 PM - 5:00 PM)</SelectItem>
                                                            <SelectItem value="evening" className="focus:bg-slate-800 focus:text-white">Noche (6:00 PM - 8:00 PM)</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="demo_format" className="text-slate-200">Formato del Demo</Label>
                                                <Select
                                                    value={data.demo_format}
                                                    onValueChange={(value) => setData('demo_format', value)}
                                                >
                                                    <SelectTrigger id="demo_format" className="bg-slate-950 border-slate-700 text-slate-200 focus:ring-blue-500/50">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                                                        <SelectItem value="online" className="focus:bg-slate-800 focus:text-white">Online (Google Meet/Zoom)</SelectItem>
                                                        <SelectItem value="in-person" className="focus:bg-slate-800 focus:text-white">Presencial</SelectItem>
                                                        <SelectItem value="phone" className="focus:bg-slate-800 focus:text-white">Llamada telefónica</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="additional_notes" className="text-slate-200">Notas Adicionales</Label>
                                                <Textarea
                                                    id="additional_notes"
                                                    value={data.additional_notes}
                                                    onChange={(e) => setData('additional_notes', e.target.value)}
                                                    placeholder="¿Algo más que debamos saber?"
                                                    rows={4}
                                                    className="bg-slate-950 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:ring-blue-500/50"
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
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all"
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
