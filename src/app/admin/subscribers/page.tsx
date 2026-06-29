import { getSubscribers } from "./actions";
import SubscribersAdmin from "./SubscribersAdmin";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  const subscribers = await getSubscribers();
  return <SubscribersAdmin initial={subscribers} />;
}
