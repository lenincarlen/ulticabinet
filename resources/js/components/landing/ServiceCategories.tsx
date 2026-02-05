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
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-white overflow-hidden relative">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-black tracking-tighter text-[#1d1d1d] sm:text-4xl md:text-5xl"
          >
            Nuestras Soluciones
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-[700px] text-lg text-[#1d1d1d]/70 font-medium"
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
                className={`h-full flex cursor-pointer flex-col items-center justify-center gap-3 p-6 transition-all shadow-md group border-[#e8e9eb] ${service.highlighted
                  ? "bg-[#0037ff]/5 border-[#0037ff]/20 hover:shadow-xl hover:shadow-[#0037ff]/20"
                  : "bg-white hover:bg-[#e8e9eb] hover:shadow-lg"
                  }`}
              >
                <div className={`p-3 rounded-full transition-colors ${service.highlighted
                  ? "bg-[#0037ff]/10 group-hover:bg-[#0037ff]/20"
                  : "bg-[#e8e9eb] group-hover:bg-white"
                  }`}>
                  <service.icon className={`h-8 w-8 ${service.highlighted
                    ? "text-[#0037ff] group-hover:text-[#0037ff]"
                    : "text-[#1d1d1d]/60 group-hover:text-[#1d1d1d]"
                    } transition-colors`} />
                </div>
                <p className={`text-sm font-bold text-center ${service.highlighted
                  ? "text-[#0037ff]"
                  : "text-[#1d1d1d]/70 group-hover:text-[#1d1d1d]"
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
