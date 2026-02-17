import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Solution {
    id: number;
    name: string;
    description?: string;
    image_path?: string;
    slug: string;
}

interface ProductShowcaseProps {
    solutions: Solution[];
}

// Soluciones estáticas para asegurar que se muestren todas
const staticSolutions = [
    {
        id: "tablero-multiplataforma",
        name: "Tablero Multiplataforma",
        subtitle: "Gestión de Expedientes",
        description: "Plataforma de Interoperabilidad General que permite la tramitación de casos y expedientes.",
        image_path: "images/soluciones/1.png"
    },
    {
        id: "portal-transaccional",
        name: "Portal Transaccional",
        subtitle: "Solicitudes en Tiempo Real",
        description: "Portal que permite la creación de solicitudes en tiempo real para la validación.",
        image_path: "images/soluciones/2.png"
    },
    {
        id: "inteligencia-negocios",
        name: "Inteligencia de Negocios",
        subtitle: "Tableros de Control",
        description: "Herramienta para la visualización de estadísticas en tiempo real.",
        image_path: "images/soluciones/3.png"
    },
    {
        id: "control-accesos",
        name: "Control de Accesos",
        subtitle: "Seguridad Institucional",
        description: "Sistemas de control para determinar si una persona cumple con los requisitos.",
        image_path: "images/soluciones/4.png"
    },
    {
        id: "compras-licitaciones",
        name: "Compras y Licitaciones",
        subtitle: "Gestión de Proveedores",
        description: "Plataforma de compras con interoperabilidad para clientes y suplidores.",
        image_path: "images/soluciones/5.png"
    },
    {
        id: "modulador-flujos",
        name: "Modulador de Flujos",
        subtitle: "BPM Visual",
        description: "Modulador de flujos de manera visual con capacidad de creación de dependencias.",
        image_path: "images/soluciones/6.png"
    },
    {
        id: "chat-linea",
        name: "Chat en Línea",
        subtitle: "Soporte en Vivo",
        description: "Sistema de chat en línea con operadores y representantes.",
        image_path: "images/soluciones/7.png"
    },
    {
        id: "notificaciones",
        name: "Sistema de Notificaciones",
        subtitle: "Comunicación Transversal",
        description: "Envío de notificaciones y correos transversales a clientes y empleados.",
        image_path: "images/soluciones/8.png"
    },
    {
        id: "seguimiento-casos",
        name: "Seguimiento de Casos",
        subtitle: "Control de Mensajería",
        description: "Sistema de seguimiento de casos y correspondencias.",
        image_path: "images/soluciones/9.png"
    },
    {
        id: "carga-descarga",
        name: "Sistema de Carga y Descarga",
        subtitle: "Automatización",
        description: "Sistema de carga automatizado y desatendido.",
        image_path: "images/soluciones/10.png"
    },
    {
        id: "consulta-telefonica",
        name: "Aplicación Telefónica",
        subtitle: "Consulta y Asistencia",
        description: "Aplicación de consulta y asistencia al usuario mediante llamadas telefónicas.",
        image_path: "images/soluciones/11.png"
    },
    {
        id: "repositorio-digital",
        name: "Repositorio Digital",
        subtitle: "Almacenamiento Seguro",
        description: "Data Warehouse y repositorio central de documentos.",
        image_path: "images/soluciones/12.png"
    },
    {
        id: "gestor-multimedia",
        name: "Gestor Multimedia",
        subtitle: "Contenido Digital",
        description: "Servicio de carga y reproducción de contenido multimedia.",
        image_path: "images/soluciones/13.png"
    },
    {
        id: "mensajeria-inmediata",
        name: "Mensajería Inmediata",
        subtitle: "Alta Importancia",
        description: "Sistema de mensajería instantánea para casos de alta importancia.",
        image_path: "images/soluciones/14.png"
    },
    {
        id: "impresora-virtual",
        name: "Impresora Virtual",
        subtitle: "Ecología Digital",
        description: "Impresora Virtual instalable para eliminar el consumo de papel.",
        image_path: "images/soluciones/15.png"
    },
    {
        id: "firma-digital",
        name: "Firma Digital",
        subtitle: "Seguridad Electrónica",
        description: "Sistema de firma digital electrónica para reemplazar rúbricas físicas.",
        image_path: "images/soluciones/16.png"
    },
    {
        id: "digitalizacion-masiva",
        name: "Digitalización Masiva",
        subtitle: "Proyectos Llave en Mano",
        description: "Sistema para digitalización masiva de documentos.",
        image_path: "images/soluciones/17.png"
    },
    {
        id: "repositorio-institucional",
        name: "Repositorio Institucional",
        subtitle: "Archivo Digital",
        description: "Repositorio, depósito o archivo donde se almacenan la información digital.",
        image_path: "images/soluciones/18.png"
    },
    {
        id: "universidad-linea",
        name: "Universidad en Línea",
        subtitle: "E-Learning",
        description: "Sistema para que alumnos y docentes puedan conectarse en un entorno virtual.",
        image_path: "images/soluciones/19.png"
    }
];

export default function ProductShowcase({ solutions = [] }: ProductShowcaseProps) {
    // Usar soluciones estáticas si no vienen props o combinarlas si es necesario
    const displaySolutions = staticSolutions.map(s => ({
        ...s,
        id: 0, // Mock ID for type compatibility if needed, or adjust types
        slug: s.id
    }));
    const getImageUrl = (path: string | undefined | null) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `/storage/${path}`;
    };

    return (
        <section id="solutions" className="w-full py-12 md:py-24 lg:py-32 bg-white relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0037ff]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00a6e0]/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-black tracking-tight text-[#1d1d1d] sm:text-4xl md:text-5xl"
                    >
                        Soluciones que <span className="text-[#0037ff] italic">Transforman</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mx-auto mt-4 max-w-[700px] text-lg text-[#1d1d1d]/70 font-medium"
                    >
                        Nuestra suite de productos de última generación tiene una solución para cada necesidad.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displaySolutions.map((solution, index) => (
                        <motion.div
                            key={solution.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card
                                className="group flex flex-col items-center justify-center p-8 transition-all bg-white border-[#e8e9eb] hover:border-[#0037ff]/30 hover:shadow-xl hover:shadow-[#0037ff]/10 min-h-[220px]"
                            >
                                <div className="mb-6 h-16 w-full flex items-center justify-center">
                                    {solution.image_path ? (
                                        <img
                                            src={getImageUrl(solution.image_path) || ''}
                                            alt={solution.name}
                                            className="h-full w-auto object-contain max-w-[200px]"
                                        />
                                    ) : (
                                        <span className="text-xl font-bold text-[#1d1d1d] group-hover:text-[#0037ff] transition-colors">{solution.name}</span>
                                    )}
                                </div>

                                <div className="text-center">
                                    <h3 className="text-sm font-bold text-[#1d1d1d]/80 group-hover:text-[#1d1d1d] leading-tight transition-colors">
                                        {solution.description || solution.name}
                                    </h3>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {displaySolutions.length === 0 && (
                    <div className="text-center py-12 text-[#1d1d1d]/50">
                        <p>No hay soluciones disponibles en este momento.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
