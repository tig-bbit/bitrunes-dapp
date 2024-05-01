import { PagePaper } from "~/shared/ui/layout";
import { BridgeForm } from "./BridgeForm";

export function Page() {
  return (
    <PagePaper>
      <div className="flex flex-col items-center gap-[1rem] max-md:gap-[1rem]">
        <h1 className="font-semibold text-[2rem]">Bridge</h1>
        <BridgeForm />
      </div>
    </PagePaper>
  );
}
