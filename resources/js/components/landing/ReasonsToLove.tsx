import { Card } from "@/components/ui/card";
import { Settings, Award, Shield } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: Shield,
    title: "Seguridad Militar",
    description: "Infraestructura de 7 capas de encriptación de grado militar. Trazabilidad completa y auditoría por roles para garantizar la integridad de su información.",
    color: "text-blue-400",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Settings,
    title: "Transformación Digital",
    description: "Automatización de procesos con BPMN 2.0 nativo. Simplifique trámites complejos y reduzca tiempos de respuesta con nuestra plataforma colaborativa.",
    color: "text-purple-400",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Award,
    title: "Inteligencia Real",
    description: "Tableros de control y BI en tiempo real. Tome decisiones informadas con indicadores clave (KPIs) y reportes dinámicos al instante.",
    color: "text-emerald-400",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
];

export default function ReasonsToLove() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#e8e9eb] relative overflow-hidden">
      {/* Decorative blob - Updated for light theme */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#0037ff]/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#00a6e0]/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-black tracking-tighter text-[#1d1d1d] sm:text-4xl md:text-5xl"
          >
            ¿Por qué elegir ultiCabinet?
          </motion.h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className={`h-full bg-white border-[#e8e9eb] p-8 text-center transition-all hover:shadow-xl hover:shadow-[#0037ff]/10 hover:border-[#0037ff]/30 group`}>
                  <div className="flex justify-center mb-6">
                    <div className={`rounded-full bg-[#e8e9eb] p-4 shadow-sm ring-1 ring-[#1d1d1d]/5 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-10 w-10 ${reason.color}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#1d1d1d] mb-3 group-hover:text-[#0037ff] transition-colors">{reason.title}</h3>
                  <p className="text-[#1d1d1d]/70 leading-relaxed font-medium group-hover:text-[#1d1d1d]/90 transition-colors">{reason.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
