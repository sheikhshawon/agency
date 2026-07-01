import MenuManager from "@/components/admin/MenuManager";
import { getMenuItems } from "@/app/admin/menu/actions";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const [header, footer] = await Promise.all([
    getMenuItems("header"),
    getMenuItems("footer"),
  ]);
  return <MenuManager initialHeader={header} initialFooter={footer} />;
}
