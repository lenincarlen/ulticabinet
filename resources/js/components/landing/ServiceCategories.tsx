import { Card } from "@/components/ui/card";
import {
  FileText,
  Workflow,
  LayoutDashboard,
  PenTool,
  ShieldCheck,
  BarChart3,
  Monitor,
  MessageSquare,
  Building2,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { name: "Gestión Documental", icon: FileText, highlighted: true },
  { name: "Automatización BPMN", icon: Workflow },
  { name: "Portales Transaccionales", icon: LayoutDashboard },
  { name: "Firma Digital", icon: PenTool },
  { name: "Control de Accesos", icon: Lock },
  { name: "Business Intelligence", icon: BarChart3 },
  { name: "Oficina Virtual", icon: Monitor },
  { name: "Notificaciones", icon: MessageSquare },
  { name: "e-Government", icon: Building2 },
  { name: "Seguridad Militar", icon: ShieldCheck, highlighted: true },
];

export default function ServiceCategories() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-slate-900 overflow-hidden relative">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl"
          >
            Nuestras Soluciones
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-[700px] text-lg text-slate-400"
          >
            Una suite completa de herramientas para la transformación digital de corporaciones y gobiernos.
          </motion.p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card
                className={`h-full flex cursor-pointer flex-col items-center justify-center gap-3 p-6 transition-all shadow-md group border-slate-800 ${service.highlighted
                    ? "bg-blue-900/20 border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                    : "bg-slate-900/50 hover:bg-slate-800 hover:shadow-lg"
                  } backdrop-blur-sm`}
              >
                <div className={`p-3 rounded-full transition-colors ${service.highlighted
                    ? "bg-blue-500/20 group-hover:bg-blue-500/30"
                    : "bg-slate-800 group-hover:bg-slate-700"
                  }`}>
                  <service.icon className={`h-8 w-8 ${service.highlighted
                      ? "text-blue-400 group-hover:text-blue-300"
                      : "text-slate-400 group-hover:text-slate-200"
                    } transition-colors`} />
                </div>
                <p className={`text-sm font-medium text-center ${service.highlighted
                    ? "text-blue-200 group-hover:text-blue-100"
                    : "text-slate-300 group-hover:text-white"
                  } transition-colors`}>
                  {service.name}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
