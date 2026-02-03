import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Home, Building2, Users, UserCog } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-slate-950 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="relative rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-8 shadow-[0_0_40px_rgba(59,130,246,0.15)] border border-white/5">
                <div className="absolute inset-0 rounded-3xl opacity-20" style={{
                  backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.5) 2px, transparent 2px)',
                  backgroundSize: '30px 30px'
                }} />
                <div className="relative z-10 overflow-hidden rounded-2xl ring-1 ring-white/10">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                    alt="Equipo de transformación digital"
                    className="h-[400px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Sobre <span className="text-blue-400">ultiCabinet</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Nos especializamos en la Transformación Digital. ultiCabinet es la solución más robusta del mercado para la automatización de procesos. Combinamos un DMS de última generación, BPMN 2.0 nativo y encriptación de grado militar.
            </p>
            <ul className="space-y-4">
              {[
                "Seguridad de 7 capas de grado militar",
                "Automatización de procesos con BPMN 2.0",
                "Portales Transaccionales Dinámicos",
                "Firma Digital y Documentos Encriptados",
                "Tableros de Mando en Tiempo Real",
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <div className="rounded-full bg-blue-900/50 p-1 border border-blue-500/30">
                    <Check className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  </div>
                  <span className="text-slate-300">{feature}</span>
                </motion.li>
              ))}
            </ul>
            <Button className="rounded-full bg-blue-600 text-white hover:bg-blue-700 px-8 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all border border-blue-400/20" onClick={() => window.location.href = '#services'}>
              Ver Soluciones
            </Button>
          </motion.div>
        </div>

        {/* Statistics Section */}
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { icon: Home, number: "3000+", label: "Servicios Implementados" },
            { icon: Building2, number: "300+", label: "Entidades Confían" },
            { icon: Users, number: "1M+", label: "Usuarios Finales" },
            { icon: UserCog, number: "100%", label: "Seguridad Garantizada" },
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center bg-slate-900/50 border-slate-800 shadow-lg hover:shadow-blue-900/20 transition-all backdrop-blur-sm group">
                  <div className="flex justify-center mb-3">
                    <div className="rounded-full bg-slate-800 p-3 shadow-inner group-hover:bg-blue-900/30 transition-colors">
                      <IconComponent className="h-8 w-8 text-blue-500 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">{stat.number}</p>
                  <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{stat.label}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

