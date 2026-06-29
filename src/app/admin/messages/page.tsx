import { getMessages } from "./actions";
import MessagesAdmin from "./MessagesAdmin";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await getMessages();
  return <MessagesAdmin initial={messages} />;
}
