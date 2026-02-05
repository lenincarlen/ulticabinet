import { Button } from "@/components/ui/button";
import { usePage } from "@inertiajs/react";
import { SharedData } from "@/types";
import { motion } from "framer-motion";

interface Offer {
  title: string;
  oldPrice: string;
  newPrice: string;
  discount: string;
  description: string;
}

export default function Offers() {
  const { siteSettings } = usePage<SharedData>().props;

  // Obtener ofertas desde configuración o usar valores por defecto
  const getOffers = (): Offer[] => {
    // Intentar obtener ofertas desde siteSettings (JSON)
    if (siteSettings?.offers_data) {
      try {
        const parsed = JSON.parse(siteSettings.offers_data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing offers_data:', e);
      }
    }

    // Si hay ofertas individuales configuradas, usarlas
    const offers: Offer[] = [];
    for (let i = 1; i <= 3; i++) {
      const title = siteSettings?.[`offer_${i}_title`];
      const oldPrice = siteSettings?.[`offer_${i}_old_price`];
      const newPrice = siteSettings?.[`offer_${i}_new_price`];
      const discount = siteSettings?.[`offer_${i}_discount`];
      const description = siteSettings?.[`offer_${i}_description`];

      if (title && oldPrice && newPrice) {
        offers.push({
          title,
          oldPrice,
          newPrice,
          discount: discount || '0%',
          description: description || '',
        });
      }
    }

    // Si no hay ofertas configuradas, usar valores por defecto para B2B
    if (offers.length === 0) {
      return [
        {
          title: "Diagnóstico Digital",
          oldPrice: "$500",
          newPrice: "GRATIS",
          discount: "100%",
          description: "Auditoría inicial de sus procesos documentales actuales.",
        },
        {
          title: "Pilotaje Controlado",
          oldPrice: "$2,500",
          newPrice: "$999",
          discount: "60%",
          description: "Implementación de prueba en un departamento clave.",
        },
        {
          title: "Migración Legacy",
          oldPrice: "Consultar",
          newPrice: "Bono",
          discount: "20%",
          description: "Descuento en servicios de migración de datos históricos.",
        },
      ];
    }

    return offers;
  };

  const offers = getOffers();
  return (
    <section className="w-full bg-[#e8e9eb] py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-[#0037ff]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-black tracking-tighter text-[#1d1d1d] sm:text-4xl md:text-5xl"
          >
            Comience su Transformación
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-[700px] text-lg text-[#1d1d1d]/70 font-medium"
          >
            Ofertas exclusivas para dar el primer paso hacia la digitalización.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="relative overflow-hidden rounded-2xl bg-white p-8 text-[#1d1d1d] shadow-xl hover:shadow-2xl hover:shadow-[#0037ff]/10 transition-all border border-[#e8e9eb] group"
            >
              <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-[#0037ff]/5 blur-2xl group-hover:bg-[#0037ff]/10 transition-colors"></div>
              <div className="absolute right-4 top-4 rounded-full bg-[#0037ff]/5 border border-[#0037ff]/20 px-4 py-2">
                <span className="text-sm font-bold text-[#0037ff]">{offer.discount} OFF</span>
              </div>
              <h3 className="text-2xl font-black mb-2 text-[#1d1d1d]">{offer.title}</h3>
              <p className="text-lg mb-1 opacity-60 font-medium">
                Valor: <span className="line-through decoration-[#1d1d1d]/30">{offer.oldPrice}</span>
              </p>
              <p className="text-5xl font-black mb-4 text-[#0037ff]">{offer.newPrice}</p>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#1d1d1d]/10 to-transparent mb-4"></div>
              <p className="text-base text-[#1d1d1d]/70 mb-8 min-h-[50px] font-medium">{offer.description}</p>

              <Button
                className="w-full bg-[#0037ff] text-white hover:bg-[#1800ad] font-bold rounded-full py-6 shadow-lg shadow-[#0037ff]/20 transition-all"
                onClick={() => window.location.href = '/solicitar-demo'}
              >
                Solicitar Beneficio
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
