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
    className="text-sm font-medium text-slate-300 transition-colors hover:text-blue-400 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
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
        scrolled ? "bg-slate-950/80 backdrop-blur-md border-slate-800/50 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 relative">
            <AppLogo />
          </div>
          <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-100 transition-colors">
            Ulti<span className="text-blue-400">Cabinet</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink href="#about">Nosotros</NavLink>
          <NavLink href="#services">Soluciones</NavLink>
          <NavLink href="#pricing">Planes</NavLink>
          <NavLink href="#reviews">Clientes</NavLink>
          <NavLink href="#contact">Contacto</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Button asChild className="rounded-full bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <Link href={"/dashboard"}>Panel de Control</Link>
            </Button>
          ) : (
            <>
              <Button asChild className="rounded-full bg-blue-600/90 px-6 py-2 text-white hover:bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] backdrop-blur-sm border border-blue-400/20">
                <Link href={'/solicitar-demo'}>Solicitar Demo</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
