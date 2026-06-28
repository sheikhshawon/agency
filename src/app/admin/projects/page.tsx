import { getProjects } from "./actions";
import ProjectsAdmin from "./ProjectsAdmin";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getProjects();
  return <ProjectsAdmin initial={projects} />;
}
