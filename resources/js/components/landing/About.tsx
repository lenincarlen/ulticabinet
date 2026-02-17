import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Home, Building2, Users, UserCog } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-[#e8e9eb] overflow-hidden relative">
      {/* Decorative elements - Updated for light theme */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#0037ff]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#00a6e0]/10 rounded-full blur-[80px] pointer-events-none" />

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
              <div className="relative rounded-3xl">
                <div className="absolute inset-0 rounded-3xl opacity-20" style={{
                  backgroundSize: '30px 30px'
                }} />
                <div className="relative z-10 overflow-hidden rounded-2xl ring-1 ring-[#1d1d1d]/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src="images/Foto_Emplados_1.png"
                    alt="Equipo de transformación digital"
                    className="h-[400px] w-full object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
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
            <h2 className="text-2xl font-black tracking-tight text-[#1d1d1d] sm:text-4xl md:text-5xl">
              Sobre <span className="text-[#0037ff]">ultiCabinet</span>
            </h2>
            <p className="text-lg text-[#1d1d1d]/70 leading-relaxed font-medium">
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
                  <div className="rounded-full bg-[#0037ff]/10 p-1 border border-[#0037ff]/20">
                    <Check className="h-4 w-4 text-[#0037ff] flex-shrink-0" />
                  </div>
                  <span className="text-[#1d1d1d]/80 font-medium">{feature}</span>
                </motion.li>
              ))}
            </ul>
            <Button className="rounded-full bg-[#0037ff] text-white hover:bg-[#1800ad] px-8 py-6 text-lg shadow-[0_4px_14px_0_rgba(0,55,255,0.39)] transition-all font-bold" onClick={() => window.location.href = '#services'}>
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
                <Card className="p-6 text-center bg-white border-[#e8e9eb] shadow-lg hover:shadow-xl hover:shadow-[#0037ff]/10 transition-all group">
                  <div className="flex justify-center mb-3">
                    <div className="rounded-full bg-[#0037ff]/5 p-3 group-hover:bg-[#0037ff]/10 transition-colors">
                      <IconComponent className="h-8 w-8 text-[#0037ff] transition-colors" />
                    </div>
                  </div>
                  <p className="text-3xl font-black text-[#1d1d1d] mb-1">{stat.number}</p>
                  <p className="text-sm text-[#1d1d1d]/60 font-medium">{stat.label}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

