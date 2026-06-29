import { notFound } from "next/navigation";
import { getCaseStudyById } from "../../actions";
import CaseStudyForm from "../../CaseStudyForm";

export const dynamic = "force-dynamic";

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseStudy = await getCaseStudyById(id);
  if (!caseStudy) notFound();
  return <CaseStudyForm initial={caseStudy} />;
}
