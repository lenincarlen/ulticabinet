import { type SharedData } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Testimonials from "@/components/landing/Testimonials";
import Footer from "@/components/landing/Footer";
import ReasonsToLove from "@/components/landing/ReasonsToLove";
import Offers from "@/components/landing/Offers";
import ProductShowcase from "@/components/landing/ProductShowcase";
import About from "@/components/landing/About";
import ThemeProvider from "@/components/ThemeProvider";

interface Solution {
  id: number;
  name: string;
  description?: string;
  image_path?: string;
  slug: string;
}

interface WelcomeProps {
  canRegister?: boolean;
  solutions: Solution[];
}

export default function Welcome({ canRegister = true, solutions = [] }: WelcomeProps) {
  const { auth } = usePage<SharedData>().props;

  return (
    <ThemeProvider>
      <Head title="UltiCabinet- Soluciones que se adaptan a ti">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>

      <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-[#0a0a0a] dark:text-gray-50">
        <Header isAuthenticated={!!auth.user} canRegister={canRegister} />

        <main className="flex-1">
          <Hero />
              <About />
          <ProductShowcase solutions={solutions} />
      
          <ReasonsToLove />
         
          <Testimonials />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
