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

export default function ProductShowcase({ solutions = [] }: ProductShowcaseProps) {
    const getImageUrl = (path: string | undefined | null) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `/storage/${path}`;
    };

    return (
        <section id="solutions" className="w-full py-12 md:py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
                    >
                        Soluciones que <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 italic">Transforman</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mx-auto mt-4 max-w-[700px] text-lg text-slate-400"
                    >
                        Nuestra suite de productos de última generación tiene una solución para cada necesidad.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {solutions.map((solution, index) => (
                        <motion.div
                            key={solution.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card
                                className="group flex flex-col items-center justify-center p-8 transition-all bg-white/5 border-white/10 hover:border-blue-500/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] backdrop-blur-sm min-h-[220px]"
                            >
                                <div className="mb-6 h-16 w-full flex items-center justify-center">
                                    {solution.image_path ? (
                                        <img
                                            src={getImageUrl(solution.image_path) || ''}
                                            alt={solution.name}
                                            className="h-full w-auto object-contain max-w-[200px] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                                        />
                                    ) : (
                                        <span className="text-xl font-bold text-slate-300 group-hover:text-blue-300 transition-colors">{solution.name}</span>
                                    )}
                                </div>

                                <div className="text-center">
                                    <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white leading-tight transition-colors">
                                        {solution.description || solution.name}
                                    </h3>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {solutions.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        <p>No hay soluciones disponibles en este momento.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
