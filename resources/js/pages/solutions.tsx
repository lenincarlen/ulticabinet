import { Head, Link } from "@inertiajs/react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Database,
    Share2,
    Settings,
    Smartphone,
    BarChart3,
    ShieldCheck,
    Zap,
    CheckCircle2,
    MousePointerClick,
    LayoutGrid,
    RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import ThemeProvider from "@/components/ThemeProvider";

export default function SolutionsPage() {
    return (
        <ThemeProvider>
            <Head title="Soluciones - ultiCabinet" />
            <div className="min-h-screen bg-white text-[#1d1d1d] selection:bg-[#0037ff]/20">
                <Header isAuthenticated={false} />

                <main className="pt-20">
                    {/* Hero Section */}
                    <section className="relative py-20 md:py-32 overflow-hidden bg-[#e8e9eb]">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#0037ff]/5 blur-[80px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#00a6e0]/10 blur-[80px] rounded-full pointer-events-none" />

                        <div className="container mx-auto px-4 relative z-10">
                            <div className="max-w-4xl mx-auto text-center">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-4xl md:text-6xl font-black tracking-tight mb-6"
                                >
                                    Trabajando con <span className="text-[#0037ff]">ultiCabinet</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-xl text-[#1d1d1d]/70 font-medium leading-relaxed mb-8 max-w-2xl mx-auto"
                                >
                                    Trabajar con ultiCabinet mejora su capacidad para organizar y administrar los procesos más complejos de su organización.
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <Button className="rounded-full bg-[#0037ff] text-white hover:bg-[#1800ad] px-8 py-6 font-bold text-lg shadow-lg shadow-[#0037ff]/20">
                                        <Link href="/soluciones/all">Ver más soluciones</Link>
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* What is ultiCabinet */}
                    <section className="py-16 md:py-24 bg-white">
                        <div className="container mx-auto px-4 max-w-7xl">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    <div className="bg-[#e8e9eb] rounded-3xl p-12 relative overflow-hidden group hover:shadow-2xl hover:shadow-[#0037ff]/10 transition-all duration-500">
                                        <div className="absolute -right-10 -top-10 bg-[#0037ff]/5 w-64 h-64 rounded-full blur-3xl group-hover:bg-[#0037ff]/10 transition-colors" />
                                        <Database className="w-24 h-24 text-[#0037ff] mb-6 relative z-10" />
                                        <h2 className="text-3xl font-black mb-4 relative z-10">¿Qué es ultiCabinet?</h2>
                                        <p className="text-[#1d1d1d]/70 text-lg font-medium relative z-10">
                                            ultiCabinet es una solución versátil para guardar y compartir documentos en toda una organización, con clientes y cualquier persona que necesite acceder a documentos confidenciales de forma segura.
                                        </p>
                                    </div>
                                    <div className="mt-8 flex justify-center md:justify-start">
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="font-bold text-lg">Asóciese con nosotros</p>
                                                <Link href="/solicitar-demo" className="text-[#0037ff] font-bold text-sm hover:underline">Ver más</Link>
                                            </div>
                                            <div className="h-12 w-12 bg-[#0037ff] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#0037ff]/30">
                                                <Share2 className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="space-y-6"
                                >
                                    <div className="grid gap-6">
                                        {[
                                            {
                                                icon: Smartphone,
                                                title: "Una plataforma de Interoperabilidad de procesos transversal.",
                                                desc: "Ofrecemos nuestras soluciones en todo tipo de dispositivos."
                                            },
                                            {
                                                icon: Settings,
                                                title: "1k+ Módulos configurables",
                                                desc: "Todos nuestros módulos son configurables a su gusto."
                                            },
                                            {
                                                icon: BarChart3,
                                                title: "Configuración en tiempo real",
                                                desc: "Se adaptan a tus necesidades para obtener las métricas KPI."
                                            },
                                        ].map((feature, i) => (
                                            <div key={i} className="flex gap-4 p-6 rounded-2xl border border-[#e8e9eb] hover:border-[#0037ff]/30 hover:shadow-lg transition-all bg-white group">
                                                <div className="shrink-0 rounded-full bg-[#0037ff]/5 p-4 h-fit group-hover:bg-[#0037ff] group-hover:text-white transition-colors duration-300 text-[#0037ff]">
                                                    <feature.icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                                    <p className="text-[#1d1d1d]/70 font-medium">{feature.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-4">
                                        <Button variant="outline" className="rounded-full border-2 border-[#1d1d1d] text-[#1d1d1d] hover:bg-[#1d1d1d] hover:text-white px-8 py-6 font-bold text-lg">
                                            <Link href="/solicitar-demo">Descubra todas las soluciones</Link>
                                        </Button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Characteristics */}
                    <section className="py-16 md:py-24 bg-[#e8e9eb] relative overflow-hidden">
                        <div className="container mx-auto px-4 max-w-7xl relative z-10">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-black mb-4">Sus Características</h2>
                                <p className="text-[#1d1d1d]/70 max-w-2xl mx-auto font-medium text-lg">
                                    Tenemos la solución número uno en el mercado, lista para mejorar la productividad de su negocio.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    {
                                        icon: LayoutGrid,
                                        title: "Altamente Modulable",
                                        desc: "Se cambia y se configura a las necesidades de su organización de manera inmediata."
                                    },
                                    {
                                        icon: ShieldCheck,
                                        title: "Audita Completamente",
                                        desc: "Ofrece la trazabilidad de todos los procesos realizados en ella."
                                    },
                                    {
                                        icon: MousePointerClick,
                                        title: "Fácil de Utilizar",
                                        desc: "La interacción entre el usuario y nuestra solución es intuitiva."
                                    },
                                    {
                                        icon: Zap,
                                        title: "Eficiente y Rápida",
                                        desc: "Está diseñada para correr en las más altas velocidades."
                                    },
                                ].map((char, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <Card className="h-full p-8 bg-white border-[#e8e9eb] hover:shadow-xl hover:border-[#0037ff]/30 transition-all group text-center flex flex-col items-center">
                                            <div className="mb-6 bg-[#0037ff]/5 p-5 rounded-2xl rotate-3 group-hover:rotate-0 transition-transform duration-300 text-[#0037ff]">
                                                <char.icon className="w-10 h-10" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 text-[#1d1d1d]">{char.title}</h3>
                                            <p className="text-[#1d1d1d]/70 font-medium leading-relaxed">{char.desc}</p>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </ThemeProvider>
    );
}
