import { FloatingNavbar } from "@/components/unlumen-ui/floating-navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { NAV_LINKS, NAV_CTA, NavLogo } from "@/components/layout/nav-config";

export default function HomePage() {
  return (
    <>
      <FloatingNavbar logo={NavLogo} links={NAV_LINKS} cta={NAV_CTA} />
      <Hero />
      <About />
    </>
  );
}
