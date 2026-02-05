import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ministerio de Obras Públicas",
    location: "República Dominicana",
    avatar: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=100&h=100&fit=crop&crop=face",
    text: "La implementación de ultiCabinet redujo nuestros tiempos de trámite en un 60%. La seguridad de 7 capas nos brinda la tranquilidad que necesitamos para manejar documentación sensible.",
    rating: 5,
  },
  {
    name: "Grupo Logístico Dominicano",
    location: "Santo Domingo",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    text: "El control de despachos y la firma digital transformaron nuestra operación logística. Ahora tenemos visibilidad en tiempo real de cada proceso.",
    rating: 5,
  },
  {
    name: "Dirección General de Salud",
    location: "Santiago",
    avatar: "https://images.unsplash.com/photo-1573496359-136d475583dc?w=100&h=100&fit=crop&crop=face",
    text: "Un aliado estratégico en nuestra transformación digital. Sus dashboards en tiempo real son vitales para la toma de decisiones en el sector salud.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="w-full bg-[#e8e9eb] py-12 md:py-24 lg:py-32 overflow-hidden relative">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-black tracking-tighter text-[#1d1d1d] sm:text-4xl md:text-5xl"
          >
            Lo que dicen nuestros clientes
          </motion.h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full p-8 shadow-lg hover:shadow-2xl hover:shadow-[#0037ff]/10 transition-all border-[#e8e9eb] bg-white group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-16 w-16 rounded-full object-cover border-2 border-[#0037ff]/10 group-hover:border-[#0037ff] transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#0037ff] rounded-full p-1 border-2 border-white">
                      <Star className="h-3 w-3 text-white fill-white" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-[#1d1d1d] group-hover:text-[#0037ff] transition-colors">{testimonial.name}</p>
                    <p className="text-sm text-[#0037ff] font-bold">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#0037ff] text-[#0037ff]" />
                  ))}
                </div>
                <p className="text-[#1d1d1d]/80 leading-relaxed italic group-hover:text-[#1d1d1d] transition-colors font-medium">"{testimonial.text}"</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination dots (visual only for now) */}
        <div className="flex justify-center gap-2 mt-12">
          <div className="h-2 w-8 rounded-full bg-[#0037ff] shadow-[0_0_8px_rgba(37,99,235,0.8)]"></div>
          <div className="h-2 w-2 rounded-full bg-[#1d1d1d]/20"></div>
          <div className="h-2 w-2 rounded-full bg-[#1d1d1d]/20"></div>
        </div>
      </div>
    </section>
  );
}
