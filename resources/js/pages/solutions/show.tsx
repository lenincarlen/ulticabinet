import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import ThemeProvider from '@/components/ThemeProvider';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';

interface Solution {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    image_path: string;
}

interface Props {
    solution: Solution;
}

export default function Show({ solution }: Props) {
    return (
        <ThemeProvider>
            <Head title={`${solution.name} - ultiCabinet`} />
            <div className="min-h-screen bg-white text-gray-900 selection:bg-[#0037ff]/20 flex flex-col">
                <Header isAuthenticated={false} />

                <main className="flex-1 pt-32 pb-16">
                    <div className="container mx-auto px-4 max-w-7xl">
                        {/* Back Button */}
                        <div className="mb-8">
                            <Link
                                href="/#solutions"
                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#0037ff] transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Volver a Soluciones
                            </Link>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Image Section */}
                            <div className="relative order-2 lg:order-1">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-[#0037ff]/10 to-[#00a6e0]/10 rounded-3xl blur-2xl -z-10" />
                                <div className="bg-gray-50 rounded-2xl p-12 border border-gray-100 shadow-xl shadow-gray-200/50 flex items-center justify-center">
                                    <img
                                        src={solution.image_path.startsWith('http') || solution.image_path.startsWith('/') ? solution.image_path : `/${solution.image_path}`}
                                        alt={solution.name}
                                        className="w-full h-auto object-contain max-h-[400px] drop-shadow-lg"
                                    />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="space-y-8 order-1 lg:order-2">
                                <div>
                                    <h2 className="text-[#0037ff] font-bold tracking-wide uppercase text-sm mb-3">
                                        {solution.subtitle}
                                    </h2>
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight">
                                        {solution.name}
                                    </h1>
                                </div>

                                <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
                                    <p className="text-xl">{solution.description}</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Button
                                        size="lg"
                                        onClick={() => window.location.href = '/solicitar-demo'}
                                        className="bg-[#0037ff] hover:bg-[#0028cc] text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                                    >
                                        Solicitar Demo
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        onClick={() => window.open(`https://wa.me/18095342377?text=${encodeURIComponent(`Hola, me interesa saber más sobre ${solution.name}`)}`, '_blank')}
                                        className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-[#0037ff] hover:border-[#0037ff] rounded-full px-8 py-6 text-lg transition-all"
                                    >
                                        Chat con Ventas
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </ThemeProvider>
    );
}
