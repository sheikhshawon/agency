import MediaLibrary from "@/components/admin/MediaLibrary";
import { listMedia } from "@/app/admin/media/actions";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const files = await listMedia();
  return <MediaLibrary initial={files} />;
}
