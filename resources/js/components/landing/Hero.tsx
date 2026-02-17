import { Button } from "@/components/ui/button";
import { Wrench, ArrowRight } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { SharedData } from "@/types";
import ParticlesBackground from "./ParticlesBackground";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const solutions = [
  {
    id: "tablero-multiplataforma",
    title: "Tablero Multiplataforma",
    image: "/images/soluciones/1.png"
  },
  {
    id: "portal-transaccional",
    title: "Portal Transaccional",
    image: "/images/soluciones/2.png"
  },
  {
    id: "inteligencia-negocios",
    title: "Inteligencia de Negocios",
    image: "/images/soluciones/3.png"
  },
  {
    id: "control-accesos",
    title: "Control de Accesos",
    image: "/images/soluciones/4.png"
  },
  {
    id: "compras-licitaciones",
    title: "Compras y Licitaciones",
    image: "/images/soluciones/5.png"
  },
  {
    id: "modulador-flujos",
    title: "Modulador de Flujos",
    image: "/images/soluciones/6.png"
  },
  {
    id: "chat-linea",
    title: "Chat en Línea",
    image: "/images/soluciones/7.png"
  },
  {
    id: "notificaciones",
    title: "Sistema de Notificaciones",
    image: "/images/soluciones/8.png"
  },
  {
    id: "seguimiento-casos",
    title: "Seguimiento de Casos",
    image: "/images/soluciones/9.png"
  },
  {
    id: "carga-descarga",
    title: "Sistema de Carga y Descarga",
    image: "/images/soluciones/10.png"
  },
  {
    id: "consulta-telefonica",
    title: "Aplicación Telefónica",
    image: "/images/soluciones/11.png"
  },
  {
    id: "repositorio-digital",
    title: "Repositorio Digital",
    image: "/images/soluciones/12.png"
  },
  {
    id: "gestor-multimedia",
    title: "Gestor Multimedia",
    image: "/images/soluciones/13.png"
  },
  {
    id: "mensajeria-inmediata",
    title: "Mensajería Inmediata",
    image: "/images/soluciones/14.png"
  },
  {
    id: "impresora-virtual",
    title: "Impresora Virtual",
    image: "/images/soluciones/15.png"
  },
  {
    id: "firma-digital",
    title: "Firma Digital",
    image: "/images/soluciones/16.png"
  },
  {
    id: "digitalizacion-masiva",
    title: "Digitalización Masiva",
    image: "/images/soluciones/17.png"
  },
  {
    id: "repositorio-institucional",
    title: "Repositorio Institucional",
    image: "/images/soluciones/18.png"
  },
  {
    id: "universidad-linea",
    title: "Universidad en Línea",
    image: "/images/soluciones/19.png"
  }
];

export default function Hero() {
  const { siteSettings } = usePage<SharedData>().props;

  // Obtener logo y banner desde configuración
  const getImageUrl = (path: string | undefined | null): string | null => {
    if (!path) return null;
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
      return path;
    }
    return `/storage/${path}`;
  };

  const logoUrl = getImageUrl(siteSettings?.landing_logo || siteSettings?.landing_hero_image);
  const bannerUrl = getImageUrl(siteSettings?.landing_banner);

  // Background (Strict white as requested)
  // Palette: #e8e9eb (Light), #98d6fc (Light Blue), #00a6e0 (Cyan), #0037ff (Blue), #1800ad (Dark Blue), #1d1d1d (Black)

  return (
    <section
      className="w-full min-h-screen py-12 md:py-24 lg:py-32 bg-white relative overflow-hidden"
      style={bannerUrl ? {
        backgroundImage: `linear-gradient(to bottom right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url(${bannerUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      } : {}}
    >
      <ParticlesBackground color="#0037ff" />
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Panel izquierdo - Contenido */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {logoUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="h-20 w-auto object-contain"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#e8e9eb] px-4 py-1.5 text-sm font-medium border border-[#98d6fc] text-[#1800ad]"
            >
              <Wrench className="h-4 w-4 text-[#0037ff]" />
              <span className="tracking-wide uppercase text-xs font-bold">{siteSettings?.hero_badge_text || 'Líderes en Transformación Digital'}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-6xl text-[#1d1d1d] drop-shadow-sm"
            >
              <span className="block">{siteSettings?.hero_title || 'Expertos en Soluciones'}</span>
              <span className="text-[#0037ff] block mt-2">Tecnológicas</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-[#1d1d1d]/80 max-w-2xl text-lg sm:text-xl leading-relaxed font-medium"
            >
              {siteSettings?.hero_description || siteSettings?.landing_hero_subtitle || 'Más de 300 empresas y organizaciones confían en nuestra suite de automatización de procesos, seguridad militar y gestión documental.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-4 flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={() => window.location.href = '/solicitar-demo'}
                className="group relative overflow-hidden rounded-full bg-[#0037ff] px-8 py-6 text-base font-bold text-white shadow-[0_4px_14px_0_rgba(0,55,255,0.39)] transition-all hover:bg-[#1800ad] hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Solicitar Demo Gratuito
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const phoneNumber = '18095342377';
                  const message = encodeURIComponent('Hola, me gustaría solicitar información sobre sus soluciones de transformación digital');
                  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                }}
                className="rounded-full border-2 border-[#1d1d1d] bg-transparent px-8 py-6 text-base font-bold text-[#1d1d1d] transition-all hover:bg-[#1d1d1d] hover:text-white"
              >
                Chat con Ventas
              </Button>
            </motion.div>
          </motion.div>

          {/* Panel derecho - Soluciones Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block h-[600px] overflow-hidden rounded-2xl border border-[#e8e9eb] bg-white/50 backdrop-blur-sm p-6 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#f8f9fa] to-white/50 -z-10" />

            {/* Grid with auto-scroll effect or just scrollable */}
            <div className="h-full overflow-y-auto pr-2 custom-scrollbar grid grid-cols-2 md:grid-cols-3 gap-4 pb-4">
              {solutions.map((sol, i) => (
                <motion.div
                  key={sol.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="group"
                >
                  <Card className="h-28 flex items-center justify-center p-4 bg-white border-[#e8e9eb] hover:shadow-lg hover:border-[#0037ff]/30 transition-all cursor-default">
                    <img
                      src={sol.image}
                      alt={sol.title}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      title={sol.title}
                    />
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
