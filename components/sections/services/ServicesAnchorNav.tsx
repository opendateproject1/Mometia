import { Container } from "@/components/layout/Container";
import { AnchorNav } from "@/components/ui/AnchorNav";
import { servicesPageData } from "@/data/services";

export function ServicesAnchorNav() {
  return (
    <div className="relative py-4 sm:py-6">
      <Container>
        <AnchorNav items={servicesPageData.anchors} />
      </Container>
    </div>
  );
}
