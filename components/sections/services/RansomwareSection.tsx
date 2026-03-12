import { ServiceDetailSection } from "@/components/sections/services/ServiceDetailSection";
import { servicesPageData } from "@/data/services";

export function RansomwareSection() {
  return <ServiceDetailSection section={servicesPageData.sections[2]} />;
}
