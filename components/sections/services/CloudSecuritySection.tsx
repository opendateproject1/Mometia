import { ServiceDetailSection } from "@/components/sections/services/ServiceDetailSection";
import { servicesPageData } from "@/data/services";

export function CloudSecuritySection() {
  return <ServiceDetailSection section={servicesPageData.sections[1]} />;
}
