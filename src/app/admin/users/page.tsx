import { getAdminUsers } from "./actions";
import UsersAdmin from "./UsersAdmin";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await getAdminUsers();
  return <UsersAdmin initial={users} />;
}
