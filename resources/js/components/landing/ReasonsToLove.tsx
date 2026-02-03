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
    <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl"
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
                <Card className={`h-full bg-slate-900/50 border-slate-800 p-8 text-center transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-slate-700/80 backdrop-blur-sm group`}>
                  <div className="flex justify-center mb-6">
                    <div className={`rounded-full bg-gradient-to-br ${reason.gradient} p-4 shadow-inner ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-10 w-10 ${reason.color}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-200 transition-colors">{reason.title}</h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{reason.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
