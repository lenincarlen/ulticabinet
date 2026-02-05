import { Button } from "@/components/ui/button";
import { Wrench, ArrowRight } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { SharedData } from "@/types";
import ParticlesBackground from "./ParticlesBackground";
import { motion } from "framer-motion";

interface ServiceType {
  id: string;
  name: string;
  description?: string;
}

interface HeroProps {
  serviceTypes?: ServiceType[];
}

export default function Hero({ serviceTypes = [] }: HeroProps) {
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

          {/* Panel derecho - Visual abstracto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            {/* Abstract decorative elements - Updated for light theme */}
            <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-[#98d6fc]/30 blur-3xl filter animate-pulse" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#00a6e0]/20 blur-3xl filter animate-pulse delay-1000" />

            {/* Glass Card */}
            <div className="relative z-10 rounded-2xl border border-[#e8e9eb] bg-white/80 p-8 backdrop-blur-md shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f8f9fa] to-white rounded-2xl -z-10" />
              <div className="space-y-4">
                <div className="h-4 w-3/4 rounded bg-[#e8e9eb]" />
                <div className="h-4 w-1/2 rounded bg-[#e8e9eb]" />
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="h-32 rounded-lg bg-[#98d6fc]/50 animate-pulse" />
                  <div className="h-32 rounded-lg bg-[#00a6e0]/30 animate-pulse delay-75" />
                </div>
                {/* Stats row */}
                <div className="pt-6 flex justify-between items-center border-t border-[#e8e9eb] mt-6">
                  <div>
                    <div className="h-8 w-16 bg-[#0037ff]/10 rounded mb-1" />
                    <div className="h-3 w-20 bg-[#e8e9eb] rounded" />
                  </div>
                  <div>
                    <div className="h-8 w-16 bg-[#00a6e0]/10 rounded mb-1" />
                    <div className="h-3 w-20 bg-[#e8e9eb] rounded" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
