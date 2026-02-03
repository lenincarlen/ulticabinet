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

  // Background gradient (technological blue/dark theme preference)
  const bgColor = siteSettings?.hero_background_color || siteSettings?.landing_hero_background_color || 'from-slate-900 via-blue-900 to-slate-900';

  return (
    <section
      className={`w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br ${bgColor} relative overflow-hidden`}
      style={bannerUrl ? {
        backgroundImage: `linear-gradient(to bottom right, rgba(26, 38, 68, 0.9), rgba(30, 58, 138, 0.9), rgba(15, 23, 42, 0.9)), url(${bannerUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      } : {}}
    >
      {/* Particles Effect */}
      <ParticlesBackground />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Panel izquierdo - Contenido */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-white"
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
                  className="h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 backdrop-blur-md px-4 py-1.5 text-sm font-medium border border-blue-400/30 text-blue-200"
            >
              <Wrench className="h-4 w-4 text-blue-400" />
              <span className="tracking-wide uppercase text-xs">{siteSettings?.hero_badge_text || 'Líderes en Transformación Digital'}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 drop-shadow-sm"
            >
              {siteSettings?.hero_title || siteSettings?.landing_hero_title || 'Expertos en Soluciones Tecnológicas que Transforman el Futuro'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-slate-300 max-w-2xl text-lg sm:text-xl leading-relaxed"
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
                className="group relative overflow-hidden rounded-full bg-blue-600 px-8 py-6 text-base font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Solicitar Demo Gratuito
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-transparent opacity-0 transition-opacity group-hover:opacity-20" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const phoneNumber = '18095342377';
                  const message = encodeURIComponent('Hola, me gustaría solicitar información sobre sus soluciones de transformación digital');
                  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                }}
                className="rounded-full border-blue-400/30 bg-white/5 px-8 py-6 text-base font-semibold text-blue-100 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white hover:border-blue-400/50"
              >
                Chat con Ventas
              </Button>
            </motion.div>
          </motion.div>

          {/* Panel derecho - Visual abstracto o imagen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            {/* Abstract decorative elements to enhance tech feel */}
            <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl filter animate-pulse" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl filter animate-pulse delay-1000" />

            {/* You could place a 3D illustration or dashboard mockup here if available */}
            <div className="relative z-10 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl" />
              <div className="space-y-4">
                <div className="h-4 w-3/4 rounded bg-white/10" />
                <div className="h-4 w-1/2 rounded bg-white/10" />
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="h-32 rounded-lg bg-blue-500/20 animate-pulse" />
                  <div className="h-32 rounded-lg bg-purple-500/20 animate-pulse delay-75" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
