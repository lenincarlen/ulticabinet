import AppLogo from "@/components/app-logo";
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { type SharedData } from "@/types";

const services = [
  "Gestión Documental",
  "Automatización BPMN",
  "Firma Digital",
  "Portales Transaccionales",
  "Business Intelligence",
  "Seguridad Militar",
];

export default function Footer() {
  const { siteSettings } = usePage<SharedData>().props;

  const companyName = siteSettings?.company_name || 'ultiCabinet';
  const companyPhone = siteSettings?.company_phone || '+1 (809) 534.2377';
  const companyEmail = siteSettings?.company_email || 'info@ulticabinet.com';
  const companyAddress = siteSettings?.company_address || 'Torre Empresarial Fórum, Santo Domingo, Rep. Dom.';
  const companyWhatsapp = siteSettings?.company_whatsapp;

  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Left Column - Logo & Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ultiCabinet</span>
              </div>
            </div>
            <div className="space-y-3 text-sm text-slate-400">
              {companyPhone && (
                <p className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <Phone className="h-4 w-4" />
                  {companyPhone}
                </p>
              )}
              {companyWhatsapp && (
                <p className="flex items-center gap-2 hover:text-green-400 transition-colors">
                  <Phone className="h-4 w-4" />
                  WhatsApp: {companyWhatsapp}
                </p>
              )}
              {companyEmail && (
                <p className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <Mail className="h-4 w-4" />
                  {companyEmail}
                </p>
              )}
              {companyAddress && (
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {companyAddress}
                </p>
              )}
            </div>
          </div>

          {/* Middle Left - Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-lg">Soluciones</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {services.map((service, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-blue-400 transition-colors block">{service}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle Right - Help & Information */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-lg">Ayuda e Información</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#about" className="hover:text-blue-400 transition-colors block">Sobre Nosotros</Link></li>
              <li><Link href="#pricing" className="hover:text-blue-400 transition-colors block">Planes</Link></li>
              <li><Link href="#reviews" className="hover:text-blue-400 transition-colors block">Casos de Éxito</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors block">Blog</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors block">Política de Privacidad</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors block">Términos de Uso</Link></li>
            </ul>
          </div>

          {/* Right Column - Academy */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-lg">Academia Virtual</h3>
            <p className="text-sm text-slate-400 mb-6">
              Entérese de las últimas metodologías de transformación digital y certifíquese en línea.
            </p>
            <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-full w-full shadow shadow-blue-900/20">
              Ver Cursos
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {companyName}. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors p-2 bg-slate-900 rounded-full">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors p-2 bg-slate-900 rounded-full">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-pink-500 transition-colors p-2 bg-slate-900 rounded-full">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
