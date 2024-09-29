import { Suspense } from "react";
import ReportDetail from "@/components/report-detail";
import Loading from "@/components/loading";

export default function ReportDetailPage({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <ReportDetail id={params.id} />
    </Suspense>
  );
}
