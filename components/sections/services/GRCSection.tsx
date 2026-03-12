import { ServiceDetailSection } from "@/components/sections/services/ServiceDetailSection";
import { servicesPageData } from "@/data/services";

export function GRCSection() {
  return <ServiceDetailSection section={servicesPageData.sections[0]} />;
}
