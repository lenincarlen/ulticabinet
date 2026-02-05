import { Link } from "@inertiajs/react";
import AppLogo from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isAuthenticated: boolean;
  canRegister?: boolean;
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-sm font-bold text-[#1d1d1d]/70 transition-colors hover:text-[#0037ff] hover:bg-[#0037ff]/5 px-3 py-2 rounded-md"
  >
    {children}
  </Link>
);

export default function Header({ isAuthenticated, canRegister = true }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-white/90 backdrop-blur-md border-[#e8e9eb] shadow-sm" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <AppLogo />
          </div>

        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink href="/nosotros">Nosotros</NavLink>
          <NavLink href="/soluciones">Soluciones</NavLink>
          <NavLink href="/#pricing">Planes</NavLink>
          <NavLink href="/#reviews">Clientes</NavLink>
          <NavLink href="/#contact">Contacto</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Button asChild className="rounded-full bg-[#0037ff] px-6 py-2 text-white hover:bg-[#1800ad] shadow-lg shadow-blue-500/20 font-bold">
              <Link href={"/dashboard"}>Panel de Control</Link>
            </Button>
          ) : (
            <>
              <Button asChild className="bg-transparent border-2 border-[#1d1d1d] text-[#1d1d1d] hover:bg-[#1d1d1d] hover:text-white uppercase font-bold rounded-full">
                <Link href={'/solicitar-demo'}>Solicita una Demo</Link>
              </Button>
              <Button asChild className="bg-[#0037ff] text-white hover:bg-[#1800ad] uppercase font-bold rounded-full shadow-lg shadow-blue-500/20">
                <Link href={'/ayuda'}>Ayuda</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
