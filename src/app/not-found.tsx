import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NotFound() {
  return (
    <PageHeader
      eyebrow="404"
      title="That page is not in this story."
      lead="The link may be old, or the page moved. The chapters below are all still here."
      className="min-h-[70svh]"
    >
      <Button href="/" variant="primary" icon={<ArrowUpRight className="size-4" />}>
        Back to the start
      </Button>
      <Button href="/services" variant="secondary">
        Services
      </Button>
      <Button href="/work" variant="secondary">
        Work
      </Button>
    </PageHeader>
  );
}
