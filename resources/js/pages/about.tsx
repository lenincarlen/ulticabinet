import { Head, Link } from "@inertiajs/react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Users, Building2, Globe, ShieldCheck, Zap, Heart, Lightbulb, Clock, Briefcase, Award, Smile } from "lucide-react";
import { motion } from "framer-motion";
import ThemeProvider from "@/components/ThemeProvider";

export default function AboutPage() {
    return (
        <ThemeProvider>
            <Head title="Sobre Nosotros - ultiCabinet" />
            <div className="min-h-screen bg-white text-[#1d1d1d] selection:bg-[#0037ff]/20">
                <Header isAuthenticated={false} />

                <main className="pt-20">
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
                                    Somos los líderes de tecnología en <span className="text-[#0037ff]">Latinoamérica</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-xl text-[#1d1d1d]/70 font-medium leading-relaxed mb-8"
                                >
                                    Somos la empresa líder en soluciones tecnológicas en Latinoamérica, estamos comprometidos con la innovación y la transformación digital.
                                </motion.p>
                                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                                    <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-[#1d1d1d]/5 flex items-start gap-3">
                                        <div className="bg-[#0037ff]/10 p-2 rounded-lg text-[#0037ff]">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#1d1d1d]">Casi 20 años de experiencia</h3>
                                            <p className="text-sm text-[#1d1d1d]/70">Contamos con miles de usuarios satisfechos en todos los países donde tenemos presencia.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-[#1d1d1d]/5 flex items-start gap-3">
                                        <div className="bg-[#0037ff]/10 p-2 rounded-lg text-[#0037ff]">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#1d1d1d]">Amplia red de profesionales</h3>
                                            <p className="text-sm text-[#1d1d1d]/70">Equipo de distribuidores e implementadores comprometidos con la excelencia.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* What are we? & Mission/Vision */}
                    <section className="py-16 md:py-24 bg-white">
                        <div className="container mx-auto px-4 max-w-7xl">
                            {/* Section 1: Introduction */}
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#0037ff]/20">
                                        <img
                                            src="/images/Foto - Emplados y Empresa 11.JPG"
                                            alt="Equipo ultiCabinet"
                                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                                        <div className="absolute bottom-6 left-6 text-white">
                                            <p className="font-bold text-lg">¿Qué somos?</p>
                                            <p className="text-white/80 text-sm">Líderes en gestión digital</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-3xl font-black mb-4">¿Qué somos?</h2>
                                    <p className="text-[#1d1d1d]/70 text-lg leading-relaxed font-medium">
                                        ultiCabinet es la solución líder en el mercado para la gestión y transformación digital.
                                    </p>

                                    <div className="space-y-6 mt-8">
                                        <div className="border-l-4 border-[#0037ff] pl-6 py-2">
                                            <h3 className="text-xl font-bold mb-2">Misión</h3>
                                            <p className="text-[#1d1d1d]/70">Transformar y revolucionar la sostenibilidad de las instituciones mediante el uso de soluciones integrales que sirvan para lograr la excelencia.</p>
                                        </div>
                                        <div className="border-l-4 border-[#00a6e0] pl-6 py-2">
                                            <h3 className="text-xl font-bold mb-2">Visión</h3>
                                            <p className="text-[#1d1d1d]/70">Ser la solución de software por excelencia a nivel mundial para mejorar los servicios que se ofrecen a los ciudadanos y al público en general.</p>
                                        </div>
                                        <div className="border-l-4 border-[#1d1d1d] pl-6 py-2">
                                            <h3 className="text-xl font-bold mb-2">Objetivo (Política)</h3>
                                            <p className="text-[#1d1d1d]/70">Brindar soluciones que se adecuen a la gestión transparente y de conformidad con los lineamientos estratégicos de las organizaciones para contribuir a mantener un estándar de calidad.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Section 2: Experience & Image 2 */}
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="order-2 md:order-1 space-y-6"
                                >
                                    <h2 className="text-3xl font-black mb-4">Más de 25 años de experiencia práctica</h2>
                                    <p className="text-[#1d1d1d]/70 text-lg">La experiencia no se improvisa, contamos con miles de clientes satisfechos.</p>

                                    <ul className="space-y-4 mt-6">
                                        <li className="flex items-start gap-4">
                                            <div className="rounded-full bg-[#0037ff]/10 p-2 mt-1">
                                                <Briefcase className="w-5 h-5 text-[#0037ff]" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">Confíe en expertos</h4>
                                                <p className="text-[#1d1d1d]/70">Tenemos los profesionales más completos del mercado con la mejor disposición para trabajar con usted.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="rounded-full bg-[#0037ff]/10 p-2 mt-1">
                                                <Award className="w-5 h-5 text-[#0037ff]" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">Aplicamos las últimas metodologías</h4>
                                                <p className="text-[#1d1d1d]/70">Contamos con profesionales certificados de manera internacional.</p>
                                            </div>
                                        </li>
                                    </ul>

                                    <div className="pt-6">
                                        <Button className="rounded-full bg-[#0037ff] text-white hover:bg-[#1800ad] px-8 py-6 font-bold text-lg shadow-lg shadow-[#0037ff]/20">
                                            <Link href="/solicitar-demo">Solicitar Demo</Link>
                                        </Button>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="order-1 md:order-2 relative"
                                >
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#0037ff]/20">
                                        <img
                                            src="/images/Foto - Emplados y Empresa 30 (1).JPG"
                                            alt="Cultura ultiCabinet"
                                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                                        <div className="absolute bottom-6 left-6 text-white">
                                            <p className="font-bold text-lg">Excelencia Profesional</p>
                                            <p className="text-white/80 text-sm">Equipo certificado</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Stats Strip */}
                    <section className="py-12 bg-[#1d1d1d] text-white">
                        <div className="container mx-auto px-4 max-w-7xl">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                                {[
                                    { value: "2,531", label: "Proyectos Terminados" },
                                    { value: "3,587", label: "Reconocimientos" },
                                    { value: "25+", label: "Años de Experiencia" },
                                    { value: "1,234", label: "Clientes Felices" },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-4"
                                    >
                                        <p className="text-4xl md:text-5xl font-black text-[#0037ff] mb-2">{stat.value}</p>
                                        <p className="text-lg font-medium text-white/80">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>


                    {/* Values Section */}
                    <section className="py-16 md:py-24 bg-[#e8e9eb]">
                        <div className="container mx-auto px-4 max-w-7xl">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-black mb-4 text-[#1d1d1d]">Nuestros Valores</h2>
                                <p className="text-[#1d1d1d]/70 max-w-2xl mx-auto font-medium">
                                    Los pilares que definen nuestra identidad y guían nuestro trabajo diario.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                                {[
                                    { icon: Briefcase, title: "Profesionalismo", desc: "Somos objetivos y centrados en resultados, basando nuestras decisiones en métodos y datos certeros." },
                                    { icon: ShieldCheck, title: "Integridad", desc: "Nos mantenemos fieles a crear relaciones que valorizan el ser humano manteniendo la calidad y credibilidad de nuestro equipo." },
                                    { icon: Heart, title: "Compromiso", desc: "Nuestro equipo responde constructivamente a los desafíos y contribuye de acuerdo con las metas y expectativas." },
                                    { icon: Zap, title: "Eficiencia", desc: "Contamos con actividades e iniciativas que fomentan la productividad y el desempeño." },
                                    { icon: Lightbulb, title: "Innovación", desc: "Nuestro espíritu innovador nos mantiene alerta para todas las oportunidades que surgen para la empresa." },
                                    { icon: Smile, title: "Servicio", desc: "Siempre disponemos de la mejor actitud y disponibilidad para brindar los mejores servicios." },
                                ].map((val, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Card className="p-8 h-full bg-white border-[#e8e9eb] hover:shadow-xl hover:border-[#0037ff]/30 transition-all group flex flex-col items-center text-center">
                                            <div className="mb-6 rounded-full bg-[#0037ff]/5 p-4 text-[#0037ff] group-hover:bg-[#0037ff] group-hover:text-white transition-colors duration-300">
                                                <val.icon className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 text-[#1d1d1d]">{val.title}</h3>
                                            <p className="text-[#1d1d1d]/70 font-medium leading-relaxed">{val.desc}</p>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* How It Works Section */}
                    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
                        <div className="container mx-auto px-4 max-w-7xl relative z-10">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-black mb-4">¿Cómo funcionan nuestras soluciones?</h2>
                                <p className="text-[#1d1d1d]/70 max-w-2xl mx-auto font-medium text-lg">
                                    Trabajamos de la mano con metodologías ágiles para obtener los productos y proyectos más completos en el mercado.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    { title: "Levantamientos de Procesos Altamente Eficaces", desc: "Acompañamiento profesional en la transformación y levantamiento de procesos digitales." },
                                    { title: "Módulos Altamente Configurables", desc: "Nuestras soluciones se configuran y adaptan a todo tipo de necesidades." },
                                    { title: "Integración Paulatina y Acompañada", desc: "Creamos un plan de implementación y capacitación completo." },
                                ].map((item, i) => (
                                    <div key={i} className="bg-[#e8e9eb]/50 p-8 rounded-2xl border border-[#e8e9eb] hover:border-[#0037ff]/30 transition-colors">
                                        <div className="text-6xl font-black text-[#0037ff]/10 mb-4 select-none">{i + 1}</div>
                                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                        <p className="text-[#1d1d1d]/70 font-medium">{item.desc}</p>
                                    </div>
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
