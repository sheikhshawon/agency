import PartnersManager from "@/components/admin/PartnersManager";
import { getPartners } from "@/app/admin/partners/actions";

export const dynamic = "force-dynamic";

export default async function AdminPartnersPage() {
  const partners = await getPartners();
  return <PartnersManager initial={partners} />;
}
