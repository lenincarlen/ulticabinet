import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Calendar, Mail, Phone, Building2, ArrowRight } from 'lucide-react';

interface Solution {
    id: number;
    name: string;
    category: string;
}

interface DemoRequest {
    id: number;
    request_number: string;
    company_name: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    preferred_date: string | null;
    demo_format: string;
    solution: Solution;
    created_at: string;
}

interface Props {
    demoRequest: DemoRequest;
}

export default function DemoGracias({ demoRequest }: Props) {
    return (
        <>
            <Head title="¡Gracias por tu solicitud! - ultiCabinet" />

            <div className="min-h-screen min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 flex items-center justify-center p-4">
                <div className="max-w-2xl w-full">
                    {/* Success Icon */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-300 mb-4">
                            <CheckCircle2 className="h-12 w-12 text-blue-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            ¡Solicitud Recibida!
                        </h1>
                        <p className="text-xl text-white">
                            Gracias por tu interés en ultiCabinet
                        </p>
                    </div>

                    {/* Request Details Card */}
                    <Card className="mb-6 bg-slate-700/50 border-slate-800 backdrop-blur-sm shadow-xl">
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-4 bg-slate-700 rounded-lg">
                                    <Building2 className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white">Número de Solicitud</p>
                                        <p className="text-lg font-bold text-blue-600">{demoRequest.request_number}</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-white">Empresa</p>
                                            <p className="text-gray-300">{demoRequest.company_name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-white">Solución</p>
                                            <p className="text-gray-300">{demoRequest.solution.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-white">Email</p>
                                            <p className="text-gray-300">{demoRequest.contact_email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-white">Teléfono</p>
                                            <p className="text-gray-300">{demoRequest.contact_phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Next Steps */}
                    <Card className="mb-6 bg-slate-700/50 border-slate-800 backdrop-blur-sm shadow-xl">
                        <CardContent className="pt-6">
                            <h2 className="text-xl font-semibold text-white mb-4">
                                ¿Qué sigue?
                            </h2>
                            <div className="space-y-3">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                        1
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Confirmación por Email</p>
                                        <p className="text-sm text-gray-300">
                                            Recibirás un email de confirmación en {demoRequest.contact_email} con los detalles de tu solicitud.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                        2
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Contacto de Nuestro Equipo</p>
                                        <p className="text-sm text-gray-300">
                                            Un especialista se pondrá en contacto contigo en las próximas 24 horas para coordinar el demo.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                        3
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Demo Personalizado</p>
                                        <p className="text-sm text-gray-600">
                                            Te mostraremos cómo {demoRequest.solution.name} puede ayudar a tu empresa.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white text-center mb-6">
                        <p className="text-lg mb-2">¿Tienes alguna pregunta?</p>
                        <p className="text-blue-100 mb-4">
                            Contáctanos directamente por WhatsApp
                        </p>
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => {
                                const phoneNumber = '1809266979';
                                const message = encodeURIComponent(
                                    `Hola, tengo una pregunta sobre mi solicitud de demo #${demoRequest.request_number}`
                                );
                                window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                            }}
                            className="bg-white text-blue-600 hover:bg-blue-50"
                        >
                            <Phone className="h-4 w-4 mr-2" />
                            Contactar por WhatsApp
                        </Button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => window.location.href = '/'}
                            className="flex items-center gap-2"
                        >
                            Volver al Inicio
                        </Button>
                        <Button
                            size="lg"
                            onClick={() => window.location.href = '/solicitar-demo'}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center gap-2"
                        >
                            Solicitar Otro Demo
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Footer Note */}
                    <p className="text-center text-sm text-gray-300 text-white mt-8">
                        Guarda este número de solicitud para futuras referencias: <strong>{demoRequest.request_number}</strong>
                    </p>
                </div>
            </div>
        </>
    );
}
