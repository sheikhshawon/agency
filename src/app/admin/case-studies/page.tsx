import { getCaseStudies } from "./actions";
import CaseStudiesAdmin from "./CaseStudiesAdmin";

export const dynamic = "force-dynamic";

export default async function AdminCaseStudiesPage() {
  const caseStudies = await getCaseStudies();
  return <CaseStudiesAdmin initial={caseStudies} />;
}
