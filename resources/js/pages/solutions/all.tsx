import { Head, Link } from "@inertiajs/react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import ThemeProvider from "@/components/ThemeProvider";
import { ArrowLeft } from "lucide-react";

const solutions = [
    {
        id: "tablero-multiplataforma",
        title: "Tablero Multiplataforma",
        subtitle: "Gestión de Expedientes",
        description: "Plataforma de Interoperabilidad General que permite la tramitación de casos y expedientes para la gestión, asignación, consulta y control visualización de los expedientes de acuerdo al nivel de seguridad del usuario.",
        image: "/images/soluciones/1.png"
    },
    {
        id: "portal-transaccional",
        title: "Portal Transaccional",
        subtitle: "Solicitudes en Tiempo Real",
        description: "Portal que permite la creación de solicitudes en tiempo real para la validación por parte de la institución con capacidad para adaptarse y personalizarse utilizando plantillas.",
        image: "/images/soluciones/2.png"
    },
    {
        id: "inteligencia-negocios",
        title: "Inteligencia de Negocios",
        subtitle: "Tableros de Control",
        description: "Herramienta para la visualización de estadísticas en tiempo real de los casos y procesos para estimar y determinar el comportamiento utilizando tableros de control.",
        image: "/images/soluciones/3.png"
    },
    {
        id: "control-accesos",
        title: "Control de Accesos",
        subtitle: "Seguridad Institucional",
        description: "Sistemas de control para determinar si una persona cumple con los requisitos establecidos por la organización para permitir el ingreso, enlazando en tiempo real con entidades.",
        image: "/images/soluciones/4.png"
    },
    {
        id: "compras-licitaciones",
        title: "Compras y Licitaciones",
        subtitle: "Gestión de Proveedores",
        description: "Plataforma de compras con interoperabilidad para clientes y suplidores por rubros, consolidación de propuestas y depuración de oferentes.",
        image: "/images/soluciones/5.png"
    },
    {
        id: "modulador-flujos",
        title: "Modulador de Flujos",
        subtitle: "BPM Visual",
        description: "Modulador de flujos de manera visual con capacidad de creación de dependencias, requisitos, gestiones, asignaciones y reglas de negocio.",
        image: "/images/soluciones/6.png"
    },
    {
        id: "chat-linea",
        title: "Chat en Línea",
        subtitle: "Soporte en Vivo",
        description: "Sistema de chat en línea con operadores y representantes, con capacidad de cargar imágenes y reportar inconvenientes en línea como parte de la experiencia.",
        image: "/images/soluciones/7.png"
    },
    {
        id: "notificaciones",
        title: "Sistema de Notificaciones",
        subtitle: "Comunicación Transversal",
        description: "Envío de notificaciones y correos transversales a clientes y empleados, incluyendo avisos omnicanales sobre el cambio de estado en las solicitudes.",
        image: "/images/soluciones/8.png"
    },
    {
        id: "seguimiento-casos",
        title: "Seguimiento de Casos",
        subtitle: "Control de Mensajería",
        description: "Sistema de seguimiento de casos y correspondencias que permite tomar fotos y cambiar estados automáticamente, con geolocalización para el control de mensajeros.",
        image: "/images/soluciones/9.png"
    },
    {
        id: "carga-descarga",
        title: "Sistema de Carga y Descarga",
        subtitle: "Automatización",
        description: "Sistema de carga automatizado y desatendido que replica el funcionamiento humano, con reconocimiento automático de documentos basado en perfiles de indexación inteligente.",
        image: "/images/soluciones/10.png"
    },
    {
        id: "consulta-telefonica",
        title: "Aplicación Telefónica",
        subtitle: "Consulta y Asistencia",
        description: "Aplicación de consulta y asistencia al usuario mediante llamadas telefónicas a la central, con reenvío inteligente a personal de soporte.",
        image: "/images/soluciones/11.png"
    },
    {
        id: "repositorio-digital",
        title: "Repositorio Digital",
        subtitle: "Almacenamiento Seguro",
        description: "Data Warehouse y repositorio central de documentos que funciona On Premise y en la nube, con sistema de almacenamiento y digitalización.",
        image: "/images/soluciones/12.png"
    },
    {
        id: "gestor-multimedia",
        title: "Gestor Multimedia",
        subtitle: "Contenido Digital",
        description: "Servicio de carga y reproducción de contenido multimedia (fotos, videos, audios) y gestión de carga y descarga sin límite de espacio.",
        image: "/images/soluciones/13.png"
    },
    {
        id: "mensajeria-inmediata",
        title: "Mensajería Inmediata",
        subtitle: "Alta Importancia",
        description: "Sistema de mensajería instantánea para casos de alta importancia, permitiendo el envío y distribución de notas automatizadas basadas en el expediente.",
        image: "/images/soluciones/14.png"
    },
    {
        id: "impresora-virtual",
        title: "Impresora Virtual",
        subtitle: "Ecología Digital",
        description: "Impresora Virtual instalable para eliminar el consumo de papel y generar documentos electrónicos que se cargan automáticamente al repositorio.",
        image: "/images/soluciones/15.png"
    },
    {
        id: "firma-digital",
        title: "Firma Digital",
        subtitle: "Seguridad Electrónica",
        description: "Sistema de firma digital electrónica para reemplazar rúbricas físicas, complementado con una bóveda de seguridad que requiere token de acceso.",
        image: "/images/soluciones/16.png"
    },
    {
        id: "digitalizacion-masiva",
        title: "Digitalización Masiva",
        subtitle: "Proyectos Llave en Mano",
        description: "Sistema para digitalización masiva de documentos con entrega de proyectos llave en mano o entrenamiento a usuarios.",
        image: "/images/soluciones/17.png"
    },
    {
        id: "repositorio-institucional",
        title: "Repositorio Institucional",
        subtitle: "Archivo Digital",
        description: "Repositorio, depósito o archivo donde se almacenan, distribuyen y mantienen la información digital de la institución.",
        image: "/images/soluciones/18.png"
    },
    {
        id: "universidad-linea",
        title: "Universidad en Línea",
        subtitle: "E-Learning",
        description: "Sistema para que alumnos y docentes puedan conectarse en un entorno virtual para un aprendizaje colaborativo y flexible.",
        image: "/images/soluciones/19.png"
    }
];

export default function AllSolutionsPage() {
    return (
        <ThemeProvider>
            <Head title="Todas las Soluciones - ultiCabinet" />
            <div className="min-h-screen bg-white text-[#1d1d1d] selection:bg-[#0037ff]/20">
                <Header isAuthenticated={false} />

                <main className="pt-20">
                    {/* Hero Section */}
                    <section className="relative py-20 bg-[#e8e9eb] overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#0037ff]/5 blur-[80px] rounded-full pointer-events-none" />
                        <div className="container mx-auto px-4 relative z-10">
                            <div className="max-w-4xl mx-auto text-center">
                                <Link href="/soluciones" className="inline-flex items-center gap-2 text-[#0037ff] font-bold mb-6 hover:underline">
                                    <ArrowLeft className="w-4 h-4" />
                                    Volver a Soluciones
                                </Link>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-4xl md:text-5xl font-black tracking-tight mb-6"
                                >
                                    Nuestra Suite de <span className="text-[#0037ff]">Productos</span>
                                </motion.h1>
                                <p className="text-xl text-[#1d1d1d]/70 font-medium leading-relaxed max-w-2xl mx-auto">
                                    Una solución para cada necesidad. Descubra la suite completa de herramientas diseñadas para la transformación digital.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Solutions Grid */}
                    <section className="py-16 md:py-24 bg-white">
                        <div className="container mx-auto px-4 max-w-7xl">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {solutions.map((sol, i) => (
                                    <motion.div
                                        key={sol.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Card className="h-full overflow-hidden bg-white border-[#e8e9eb] hover:shadow-xl hover:border-[#0037ff]/30 transition-all group flex flex-col">
                                            <div className="aspect-video bg-[#f4f5f7] p-8 flex items-center justify-center relative overflow-hidden">
                                                <div className="absolute inset-0 bg-[#0037ff]/0 group-hover:bg-[#0037ff]/5 transition-colors duration-500" />
                                                <img
                                                    src={sol.image}
                                                    alt={sol.title}
                                                    className="w-full h-full object-contain drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-8 flex-1 flex flex-col">
                                                <div className="mb-4">
                                                    <h3 className="text-2xl font-black text-[#1d1d1d] group-hover:text-[#0037ff] transition-colors">{sol.title}</h3>
                                                    <p className="text-sm font-bold text-[#0037ff] uppercase tracking-wider">{sol.subtitle}</p>
                                                </div>
                                                <p className="text-[#1d1d1d]/70 font-medium leading-relaxed mb-6 flex-1">
                                                    {sol.description}
                                                </p>
                                                <Link href="/solicitar-demo" className="text-sm font-bold text-[#1d1d1d] hover:text-[#0037ff] flex items-center gap-2 group/link">
                                                    Solicitar información
                                                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                                </Link>
                                            </div>
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
