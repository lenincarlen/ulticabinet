import { Link } from "@inertiajs/react";
import AppLogo from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Import Sheet
import { Menu } from "lucide-react"; // Import Menu icon

interface HeaderProps {
  isAuthenticated: boolean;
  canRegister?: boolean;
}

const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link
    href={href}
    className={cn(
      "text-sm font-bold text-[#1d1d1d]/70 transition-colors hover:text-[#0037ff] hover:bg-[#0037ff]/5 px-3 py-2 rounded-md",
      className
    )}
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
          <div className="relative h-12 w-12">
            <AppLogo />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink href="/nosotros">Nosotros</NavLink>
          <NavLink href="/soluciones">Soluciones</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/#reviews">Clientes</NavLink>
          <NavLink href="/#contact">Contacto</NavLink>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <Button asChild className="rounded-full bg-[#0037ff] px-6 py-2 text-white hover:bg-[#1800ad] shadow-lg shadow-blue-500/20 font-bold">
              <Link href={"/dashboard"}>Panel de Control</Link>
            </Button>
          ) : (
            <>
              <Button asChild className="bg-transparent border-2 border-[#1d1d1d] text-[#1d1d1d] hover:bg-[#1d1d1d] hover:text-white uppercase font-bold rounded-full transition-all">
                <Link href={'/solicitar-demo'}>Solicita una Demo</Link>
              </Button>
              <Button asChild className="bg-[#0037ff] text-white hover:bg-[#1800ad] uppercase font-bold rounded-full shadow-lg shadow-blue-500/20 transition-all">
                <Link href={'/ayuda'}>Ayuda</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu (Hamburger) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#1d1d1d]">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                <nav className="flex flex-col gap-4">
                  <NavLink href="/nosotros" className="text-lg">Nosotros</NavLink>
                  <NavLink href="/soluciones" className="text-lg">Soluciones</NavLink>
                  <NavLink href="/blog" className="text-lg">Blog</NavLink>
                  <NavLink href="/#reviews" className="text-lg">Clientes</NavLink>
                  <NavLink href="/#contact" className="text-lg">Contacto</NavLink>
                </nav>
                <div className="flex flex-col gap-4 mt-4 border-t pt-6">
                  {isAuthenticated ? (
                    <Button asChild className="rounded-full bg-[#0037ff] text-white hover:bg-[#1800ad] w-full shadow-lg font-bold">
                      <Link href={"/dashboard"}>Panel de Control</Link>
                    </Button>
                  ) : (
                    <>
                      <Button asChild className="bg-transparent border-2 border-[#1d1d1d] text-[#1d1d1d] hover:bg-[#1d1d1d] hover:text-white uppercase font-bold rounded-full w-full">
                        <Link href={'/solicitar-demo'}>Solicita una Demo</Link>
                      </Button>
                      <Button asChild className="bg-[#0037ff] text-white hover:bg-[#1800ad] uppercase font-bold rounded-full shadow-lg w-full">
                        <Link href={'/ayuda'}>Ayuda</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
