import Navbar from "@/components/navigation/Navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Services } from "@/components/sections/services";
import { Commitments } from "@/components/sections/commitments";
import { BlogSection } from "@/components/sections/blog-section";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
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
