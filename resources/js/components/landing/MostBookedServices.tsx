import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const services = [
  {
    name: "Sistema de Gestión Documental",
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2032&auto=format&fit=crop",
    rating: 4.9,
    reviews: 120,
    category: "Gestión"
  },
  {
    name: "Portal Transaccional",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    reviews: 85,
    category: "Gobierno"
  },
  {
    name: "Dashboard de BI",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    reviews: 94,
    category: "Analítica"
  },
  {
    name: "Seguridad y Encriptación",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
    rating: 5.0,
    reviews: 200,
    category: "Seguridad"
  },
];

export default function MostBookedServices() {
  return (
    <section className="w-full bg-white py-12 md:py-24 lg:py-32 relative">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-black tracking-tighter text-[#1d1d1d] sm:text-4xl md:text-5xl"
          >
            Soluciones Más Demandadas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-[700px] text-lg text-[#1d1d1d]/70 font-medium"
          >
            Descubre las herramientas que están liderando la modernización del sector público y privado.
          </motion.p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="overflow-hidden transition-all bg-white border-[#e8e9eb] hover:shadow-xl hover:shadow-[#0037ff]/10 hover:border-[#0037ff]/30 group h-full flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute top-2 right-2 z-10 bg-[#0037ff] text-white text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wide shadow-lg">
                    {service.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 opacity-60" />
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-[#1d1d1d] mb-2 line-clamp-1 group-hover:text-[#0037ff] transition-colors" title={service.name}>{service.name}</h3>
                  <div className="flex items-center justify-between mb-4 mt-auto">
                    <div className="flex items-center gap-1 bg-[#e8e9eb] px-2 py-1 rounded-md">
                      <Star className="h-4 w-4 fill-[#0037ff] text-[#0037ff]" />
                      <span className="text-sm font-bold text-[#1d1d1d]">
                        {service.rating} <span className="text-[#1d1d1d]/50 font-normal">({service.reviews})</span>
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-full rounded-full bg-white text-[#0037ff] border-2 border-[#1d1d1d] hover:bg-[#1d1d1d] hover:text-white hover:border-[#1d1d1d] transition-all font-bold"
                    onClick={() => window.location.href = '/solicitar-demo'}
                  >
                    Solicitar Demo
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
