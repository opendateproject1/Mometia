import { FloatingNavbar } from "@/components/unlumen-ui/floating-navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Services } from "@/components/sections/services";
import { Commitments } from "@/components/sections/commitments";
import { BlogSection } from "@/components/sections/blog-section";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { NAV_LINKS, NAV_CTA, NavLogo } from "@/components/layout/nav-config";

export default function HomePage() {
  return (
    <>
      <FloatingNavbar logo={NavLogo} links={NAV_LINKS} cta={NAV_CTA} />
      <Hero />
      <About />
      <Capabilities />
      <Services />
      <Commitments />
      <BlogSection />
      <Contact />
      <Footer />
    </>
  );
}
